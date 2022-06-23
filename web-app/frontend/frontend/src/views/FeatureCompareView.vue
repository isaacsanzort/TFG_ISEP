<template>
  <div>
    <div class="d-flex justify-content-center">
      <h3 class="border border-dark col-8 mt-3">
        Compare Data graph for {{ this.$route.params.id }}
      </h3>
    </div>
    <div id="compare-section" class="col-12 mt-3 row">
      <div class="col-md-3">
        <data-checkbox
          class="data-checkbox h-75"
          @checkedValues="(checked) => (checkedValues = checked)"
        />
      </div>
      <div id="graph" class="col-md-6 h-75 indiv-chart">
        <download-graph
          :idChart="idChart"
          :chart="chart"
          :dataChart="chartData"
          :region="region"
          :otherRegion="null"
        />
        <line-chart
          :idChart="idChart"
          :dataChart="[]"
          :labelsChart="chartLabel"
          :text="'Compare Graph'"
          @chart="(canvas) => (chart = canvas)"
        />
      </div>
      <div class="col-md-3">
        <correlation-section
          :chartData="chartData"
          :isCorrelatable="isCorrelatable"
        />
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "../components/LineChart.vue";
import DataCheckbox from "../components/DataCheckbox.vue";
import sharedLogic from "../assets/js/sharedLogic.js";
import DownloadGraph from "../components/DownloadGraph.vue";
import CorrelationSection from "../components/CorrelationSection.vue";
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      chartLabel: [],
      chartData: [],
      checkedValues: [],
      chart: null,
      idChart: "compareChart",
      region: this.$route.params.id,
      region_codes: API_INFO[this.$route.params.id].codes,
      startDate: this.$route.params.startDate,
      endDate: this.$route.params.endDate,
      isCorrelatable: false,
    };
  },
  components: {
    LineChart,
    DataCheckbox,
    DownloadGraph,
    CorrelationSection,
  },
  mixins: [sharedLogic],
  methods: {
    async setChartData(checkedValues) {
      //generar colores random prueba
      let dynamicColors = function () {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      let chartData = [];
      if (checkedValues.length > 0) {
        for (let code of checkedValues) {
          //To check if I need to call the covid API
          let isCovid = this.region_codes[code].isCovid;
          let label = this.region_codes[code].title;

          let url = this.getUrl(code, "", isCovid);
          let data = await this.fetchData(url);
          chartData.push({
            label: label,
            data: data,
            borderColor: dynamicColors(),
          });
        }
      }
      this.chartData = chartData;
      //Update chart with new data
      this.chart.data.datasets = chartData;
      this.chart.update();
    },
  },
  watch: {
    checkedValues: async function (checkedValues) {
      this.setChartData(checkedValues);
    },
  },
  created() {
    this.chartLabel = this.generateDateRange();
  },
  updated() {
    //To make sure you can only calculate correlation for 2 variables
    if (Object.keys(this.chartData).length == 2) {
      //checks if variables have the same frequency (i.e data is monthly,daily,annually... given) for correlation purposes
      let [code_feature_1, code_feature_2] = this.checkedValues;
      if (
        this.region_codes[code_feature_1].category ==
        this.region_codes[code_feature_2].category
      ) {
        this.isCorrelatable = true;
      }
    } else {
      this.isCorrelatable = false;
    }
  },
};
</script>
<style scoped>
.indiv-chart {
  border: 1px double black;
  border-radius: 5px;
  padding: 5px;
}

.data-checkbox{
  overflow: auto;
}

#compare-section{
  max-height: 10px;
}
</style>
