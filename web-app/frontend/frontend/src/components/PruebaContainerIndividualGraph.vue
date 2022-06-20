<template>
  <div class="col-md-5 mx-2">
    <div class="indiv-chart" v-if="loaded">
      <div class="indiv-chart">
        <download-graph
          :idChart="id"
          :chart="chart"
          :dataChart="chartData"
          :region="region"
          :otherRegion="null"
        />
        <line-chart
          :idChart="id"
          :dataChart="chartData"
          :labelsChart="chartLabels"
          :text="label"
          @chart="(canvas) => (chart = canvas)"
        />
      </div>
    </div>
    <div v-else class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import DownloadGraph from "./DownloadGraph.vue";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  props: {
    url: {
      type: String,
    },
    id: {
      type: String,
    },
    label: {
      type: String,
    }
  },
  data() {
    return {
      chart: null,
      chartData: [],
      chartLabels: [],
      region: this.$route.params.id,
      loaded: false,
    };
  },
  mixins: [sharedLogic],
  methods: {
    async setChartData() {
      this.loaded = false;
      this.chartLabels = this.generateDateRange();

      try {
        //Get data for the chart
        let chartData = await this.fetchData(this.url);
        this.chartData = [
          {
            label: this.label,
            data: chartData,
            borderColor: 'blue',
          },
        ];
        //renderizamos el componente
        this.loaded = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
  async mounted() {
    await this.setChartData();
  },
  components: {
    LineChart,
    DownloadGraph,
  },
};
</script>
<style scoped>
  .indiv-chart{
    border: 1px double black;
    border-radius: 5px;
    padding: 5px;
  }
</style>

