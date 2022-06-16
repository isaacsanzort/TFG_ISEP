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
          <download-graph
            :idChart="'compareregionChart'"
            :dataChart="chartData"
            :region="region"
            :otherRegion="selectedRegion"
          />
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
import DownloadGraph from "./DownloadGraph.vue";

export default {
  data() {
    return {
      chartLabel: [],
      chartData: null,
      selectedRegion: null,
      chart: null,
      selectedFeature: null,
      region: this.$route.params.id,
      region_codes: API_INFO[this.$route.params.id].codes,
      startDate: this.$route.params.startDate,
      endDate: this.$route.params.endDate,
    };
  },
  components: {
    RegionSelect,
    LineChart,
    DataSelect,
    DownloadGraph,
  },
  mixins: [sharedLogic],
  methods: {
    async getChartData(code, color,  isCovid, region = "",) {
      if (!isCovid){
        region = "";
      }
      let url = this.getUrl(code, region, isCovid);
      let data = await this.fetchData(url);
      return {
        label: "Prueba #1",
        data: data,
        borderColor: color,
      };
    },
    //Get the API code 
    getRegionCode(region,title){
      let sameTitleCode = "";
      
      for (let code of Object.keys(region)){
        if (region[code].title == title){
          sameTitleCode = code;
          break;
        }
      }
      //returns the code for the other region that has the same title
      return sameTitleCode;
    },
    async setChartData() {
      //To avoid errors during creation, because selectedFeature is null
      if(this.selectedFeature != null){
        let chartData = [];
        let code = this.getRegionCode(this.region_codes,this.selectedFeature);
        let isCovid = this.region_codes[code].isCovid;
        let data = await this.getChartData(code, "green", isCovid);
        chartData.push(data);
        //To compare
        if (this.selectedRegion != null) {
          let otherRegion = API_INFO[this.selectedRegion].codes;
          code = this.getRegionCode(otherRegion,this.selectedFeature);
          isCovid = otherRegion[code].isCovid;
          let data = await this.getChartData(code, "red", isCovid, this.selectedRegion);
          chartData.push(data);
        }
        //Update chart
        this.chartData = chartData;
        this.chart.data.datasets = chartData;
        this.chart.update();
      }
    },
  },
  watch: {
    selectedRegion() {
      this.setChartData();
    },
    selectedFeature() {
      this.setChartData();
    },
  },
  created() {
    this.chartLabel = this.generateDateRange();
    this.setChartData();
  },
};
</script>

<style scoped>
p {
  font-weight: bold;
  align-self: center;
}
</style>
