<template>
  <div class="mb-4 d-flex justify-content-center">
    <region-select
      @selectedRegion="(msg) => (selectedRegion = msg)"
      :defaulSelect="selectedRegion"
    ></region-select>
    <div class="select-feature">
      <select
        class="form-select"
        aria-label="Select Feature"
        v-model="selectedFeature"
      >
        <option v-for="i in features.length" :value="i - 1" :key="i - 1">
          {{ features[i - 1] }}
        </option>
      </select>
    </div>
    <div class="col-6">
      <line-chart
        :idChart="'compareregionChart'"
        :dataChart="[]"
        :labelsChart="[]"
        @chart="(canvas) => (chart = canvas)"
      />
    </div>
  </div>
</template>
<script>
import RegionSelect from "../components/RegionSelect.vue";
import LineChart from "../components/LineChart.vue";
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
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
  },
  methods: {
    async setDataInChart() {
      let url = "";
      let allData = [];
      let region = "";
      let mode = "ine";
      let i =
        API_INFO[this.$route.params.id]["Compare"].cod[this.selectedFeature];
      if (
        API_INFO[this.$route.params.id]["Compare"].cod[
          this.selectedFeature
        ].substring(0, 6) == "COVID-"
      ) {
        region = this.$route.params.id + "/";
        mode = "covid";
        i =
          API_INFO[this.$route.params.id]["Compare"].cod[
            this.selectedFeature
          ].substring(6);
      }

      url =
        "http://127.0.0.1:5000/" +
        mode +
        "/" +
        i +
        "/" +
        region +
        this.startDate +
        "/" +
        this.endDate;
      console.log(url);
      let data = await this.getData(url);
      let obj_add = {
        label: "Prueba #1",
        data: data,
        borderColor: "green",
      };
      allData.push(obj_add);

      //Para comparar
      if (this.selectedRegion != null) {
        let url = "";
        let region = "";
        let mode = "ine";
        let i =
          API_INFO[this.selectedRegion]["Compare"].cod[this.selectedFeature];
        if (
          API_INFO[this.selectedRegion]["Compare"].cod[
            this.selectedFeature
          ].substring(0, 6) == "COVID-"
        ) {
          region = this.selectedRegion + "/";
          mode = "covid";
          i =
            API_INFO[this.selectedRegion]["Compare"].cod[
              this.selectedFeature
            ].substring(6);
        }

        url =
          "http://127.0.0.1:5000/" +
          mode +
          "/" +
          i +
          "/" +
          region +
          this.startDate +
          "/" +
          this.endDate;
        let data = await this.getData(url);
        let obj_add = {
          label: "Prueba #2",
          data: data,
          borderColor: "red",
        };
        allData.push(obj_add);
      }
      this.chart.data.datasets = allData;
      this.chart.update();
    },
    async getData(url) {
      let data = [];
      try {
        //Peticion API
        const getResponse = await fetch(url);
        const gObject = await getResponse.json();
        //Asignamos el valor (ejeY y ejeX)
        data = gObject.Value;
      } catch (e) {
        console.log(e);
      }
      return data;
    },
  },
  watch: {
    selectedRegion() {
      this.setDataInChart();
    },
    selectedFeature() {
      this.setDataInChart();
    },
  },
};
</script>
