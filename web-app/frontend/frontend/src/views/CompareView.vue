<template>
  <div>
    <div class="d-flex justify-content-center">
      <h3 class="border border-dark col-8 mt-3">
        Compare Data graph for {{ this.$route.params.id }}
      </h3>
    </div>
    <p id="corr" href="" @click="getCorr">CORRELATION</p>
    <div class="col-12 row">
      <div class="col-md-3 mt-4">
        <data-checkbox
          @checkedValues="(checked) => (checkedValues = checked)"
        />
      </div>
      <div class="col-md-8">
        <download-graph
          :idChart="idChart"
          :dataChart="chartData"
          :region="region"
          :otherRegion="null"
        />
        <line-chart
          :idChart="idChart"
          :dataChart="[]"
          :labelsChart="chartLabel"
          @chart="(canvas) => (chart = canvas)"
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
    };
  },
  components: {
    LineChart,
    DataCheckbox,
    DownloadGraph,
  },
  mixins: [sharedLogic],
  methods: {
    getCorr() {
      if (Object.keys(this.chartData).length == 2) {
        console.log(this.chartData[0].data.length);
        console.log(this.chartData[1].data);
        if (this.chartData[0].data.length == this.chartData[1].data.length) {
          const data = new FormData();
          data.append("data-1", JSON.stringify(this.chartData[0].data));
          data.append("data-2", JSON.stringify(this.chartData[1].data));
          fetch("http://127.0.0.1:5000/flask_api/corr", {
            method: "POST",
            body: JSON.stringify({
              data1: this.chartData[0].data,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }) // Converting to JSON
            .then((response) => response)
            //Displaying results to console
            .then((json) => console.log(json));
        } else {
          console.log("bad");
        }
      }
    },
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

          let url = this.getUrl(code,"",isCovid);
          let data = await this.fetchData(url);
          chartData.push({
            label: "Prueba #1",
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
};
</script>
