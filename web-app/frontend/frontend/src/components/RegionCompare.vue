<template>
  <div>
    <div class="d-flex justify-content-center mb-3">
      <div class="border border-dark col-8 mt-3 mb-3 py-3 row">
        <h4 class="col-5 d-flex flex-row-reverse">
          {{ this.$route.params.id }} vs
        </h4>
        <region-select
          class="col-4"
          @selectedRegion="(msg) => (selectedRegion = msg)"
          :defaulSelect="selectedRegion"
        />
      </div>
    </div>
    <div class="mb-4">
      <div class="mb-5">
        <p class="mb-2">Select the Data you wish to compare:</p>
        <div class="d-flex justify-content-center">
          <data-select
            class="col-6"
            @selectedData="(msg) => (selectedFeature = msg)"
          />
        </div>
      </div>
      <div class="d-flex justify-content-around">
        <div class="col-9">
          <line-chart
            :idChart="'compareregionChart'"
            :dataChart="[]"
            :labelsChart="chartLabel"
            @chart="(canvas) => (chart = canvas)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RegionSelect from "../components/RegionSelect.vue";
import LineChart from "../components/LineChart.vue";
import { API_INFO } from "../assets/js/global.js";
import DataSelect from "../components/DataSelect.vue";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  data() {
    return {
      chartLabel: [],
      selectedRegion: null,
      chart: null,
      selectedFeature: 5,
      selectedCategory: null,
      features: API_INFO[this.$route.params.id]["Compare"].title,
      startDate: this.$route.params.startDate,
      endDate: this.$route.params.endDate,
    };
  },
  components: {
    RegionSelect,
    LineChart,
    DataSelect,
  },
  mixins: [sharedLogic],
  methods: {
    async getChartData(code, color, region=""){
      let url = this.getUrl(code, region);
      let data = await this.fetchData(url);
      return {
        label: "Prueba #1",
        data: data,
        borderColor: color,
      };
    },
    async setChartData() {
      let chartData = [];
      let code = API_INFO[this.$route.params.id]["Compare"].cod[this.selectedFeature];
      let data = await this.getChartData(code, "green");
      chartData.push(data);
      //To compare
      if(this.selectedRegion != null){
        code = API_INFO[this.selectedRegion]["Compare"].cod[this.selectedFeature];
        let data = await this.getChartData(code, "red", this.selectedRegion);
        chartData.push(data);
      }
      //Update chart
      this.chart.data.datasets = chartData;
      this.chart.update();
    },
    // async setDataInChart() {
    //   let url = "";
    //   let allData = [];
    //   let region = "";
    //   let mode = "ine";
    //   let i =
    //     API_INFO[this.$route.params.id]["Compare"].cod[this.selectedFeature];
    //   if (
    //     API_INFO[this.$route.params.id]["Compare"].cod[
    //       this.selectedFeature
    //     ].substring(0, 6) == "COVID-"
    //   ) {
    //     region = this.$route.params.id + "/";
    //     mode = "covid";
    //     i =
    //       API_INFO[this.$route.params.id]["Compare"].cod[
    //         this.selectedFeature
    //       ].substring(6);
    //   }

    //   url =
    //     "http://127.0.0.1:5000/" +
    //     mode +
    //     "/" +
    //     i +
    //     "/" +
    //     region +
    //     this.startDate +
    //     "/" +
    //     this.endDate;
    //   console.log(url);
    //   let data = await this.getData(url);
    //   let obj_add = {
    //     label: "Prueba #1",
    //     data: data,
    //     borderColor: "green",
    //   };
    //   allData.push(obj_add);

    //   //Para comparar
    //   if (this.selectedRegion != null) {
    //     let url = "";
    //     let region = "";
    //     let mode = "ine";
    //     let i =
    //       API_INFO[this.selectedRegion]["Compare"].cod[this.selectedFeature];
    //     if (
    //       API_INFO[this.selectedRegion]["Compare"].cod[
    //         this.selectedFeature
    //       ].substring(0, 6) == "COVID-"
    //     ) {
    //       region = this.selectedRegion + "/";
    //       mode = "covid";
    //       i =
    //         API_INFO[this.selectedRegion]["Compare"].cod[
    //           this.selectedFeature
    //         ].substring(6);
    //     }

    //     url =
    //       "http://127.0.0.1:5000/" +
    //       mode +
    //       "/" +
    //       i +
    //       "/" +
    //       region +
    //       this.startDate +
    //       "/" +
    //       this.endDate;
    //     let data = await this.getData(url);
    //     let obj_add = {
    //       label: "Prueba #2",
    //       data: data,
    //       borderColor: "red",
    //     };
    //     allData.push(obj_add);
    //   }
    //   this.chart.data.datasets = allData;
    //   this.chart.update();
    // },
    // async getData(url) {
    //   let data = [];
    //   try {
    //     //Peticion API
    //     const getResponse = await fetch(url);
    //     const gObject = await getResponse.json();
    //     //Asignamos el valor (ejeY y ejeX)
    //     data = gObject.Value;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   return data;
    // },
  },
  watch: {
    selectedRegion() {
      console.log("Hello");
      this.setChartData();
    },
    selectedFeature() {
      this.setChartData();
    },
  },
  created(){
    this.chartLabel = this.generateDateRange();
    this.setChartData();
  }
};
</script>

<style scoped>
p {
  font-weight: bold;
  align-self: center;
}
</style>
