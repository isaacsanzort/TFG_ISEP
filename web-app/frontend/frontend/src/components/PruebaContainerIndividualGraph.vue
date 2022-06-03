<template>
  <div class="col-md-5">
    <line-chart
      :idChart="this.id"
      :dataChart="chartData"
      :labelsChart="chartLabels"
      v-if="loaded"
    />
    <div v-else class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  props: {
    url: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      chartData: [],
      chartLabels: [],
      loaded: false,
    };
  },
  mixins: [sharedLogic],
  methods: {
    async setChartData (){
      this.loaded = false;
      try {
        //Get data for the chart
        await this.fetchData(this.url);
        //renderizamos el componente
        this.loaded = true
      }catch(e){
        console.log(e);
      }
    }
  },
  async mounted() {
    await this.setChartData();
  },
  components: {
    LineChart,
  },
};
</script>
