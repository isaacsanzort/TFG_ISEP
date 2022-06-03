<template>
  <div>
    <div class="d-flex justify-content-center">
      <h3 class="border border-dark col-8 mt-3">
        Compare Data graph for {{ this.$route.params.id }}
      </h3>
    </div>
    <div class="col-12 row">
      <div class="col-md-3 mt-4">
        <data-checkbox
          @checkedValues="(checked) => (checkedValues = checked)"
        />
      </div>
      <div class="col-md-8">
        <line-chart
          :idChart="'compareChart'"
          :dataChart="[]"
          :labelsChart="chartLabel"
          @chart="(canvas) => chart = canvas"
        />
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "../components/LineChart.vue";
import DataCheckbox from "../components/DataCheckbox.vue";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  data() {
    return {
      chartLabel: [],
      checkedValues: [],
      chart: null,
      startDate: this.$route.params.startDate,
      endDate: this.$route.params.endDate,
    };
  },
  components: {
    LineChart,
    DataCheckbox,
  },
  mixins: [sharedLogic],
  methods: {
    async setChartData (checkedValues){
       //generar colores random prueba
      let dynamicColors = function() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      let chartData = [];
      if (checkedValues.length > 0){
        for (let code of checkedValues){
          let url = this.getUrl(code);
          let data = await this.fetchData(url);
          chartData.push({
            label: "Prueba #1",
            data: data,
            borderColor: dynamicColors(),
          })
        }
      }

      //Update chart with new data
      this.chart.data.datasets = chartData;
      this.chart.update();
    }
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
