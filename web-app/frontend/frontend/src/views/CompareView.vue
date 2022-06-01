<template>
  <div class="row">
    <div class="col-2 mt-5 pt-5">
      <div
        class="form-switch"
        v-for="i in economicCheckbox.title.length"
        :key="i - 1"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :id="economicCheckbox.cod[i - 1]"
          :value="economicCheckbox.cod[i - 1]"
          v-model="checkedValues"
        />
        <label class="form-check-label" :for="economicCheckbox.cod[i - 1]">{{
          economicCheckbox.title[i - 1]
        }}</label>
      </div>
    </div>
    <div class="col-9">
      <line-chart
        :idChart="'compareChart'"
        :dataChart="pruebaData"
        :labelsChart="pruebaLabel"
        @chart="pruebaBorrar"
      />
    </div>
  </div>
</template>
<script>
import LineChart from "../components/LineChart.vue";
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      pruebaData: [],
      pruebaLabel: [],
      economicCheckbox: API_INFO[this.$route.params.id]["Economic"],
      checkedValues: [],
      chart: null,
      startDate: this.$route.params.startDate,
      endDate: this.$route.params.endDate,
    };
  },
  components: {
    LineChart,
  },
  methods: {
    pruebaBorrar(value) {
      this.chart = value;
    },
    generateDateRange() {
      const startYear = +this.startDate.substring(0, 4); // the + converts strings to number
      const startMonth = +this.startDate.substring(4, 6);
      const startDay = +this.startDate.substring(6, 8);

      const endYear = +this.endDate.substring(0, 4); // the + converts strings to number
      const endMonth = +this.endDate.substring(4, 6);
      const endDay = +this.endDate.substring(6, 8);

      const sDate = new Date(startYear, startMonth - 1, startDay);
      const eDate = new Date(endYear, endMonth - 1, endDay);

      const dates = [];

      //Retraso 1 dia el dia inicial porque la API del INE, porque devuelve datos fuera del rango
      sDate.setDate(sDate.getDate() - 1);

      while (sDate <= eDate) {
        let dd = String(sDate.getDate()).padStart(2, "0");
        let mm = String(sDate.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = sDate.getFullYear();
        let stringDate = yyyy + "-" + mm + "-" + dd;

        dates.push(stringDate);
        sDate.setDate(sDate.getDate() + 1);
      }
      return dates;
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
  created() {
    this.pruebaLabel = this.generateDateRange();
  },
  async beforeUpdate() {
    let url = "";
    let allData = [];
    if (this.checkedValues.length > 0) {
      //In JS for Objects its *for of*
      for (let i of this.checkedValues) {
        let region = "";
        let mode = "ine";
        if (i.substring(0,6) == "COVID-"){
          region = this.$route.params.id + "/";
          mode = "covid";
          i = i.substring(6);
        }
        url =
          "http://127.0.0.1:5000/"+mode+"/" +
          i +
          "/" + 
          region +
          this.startDate +
          "/" +
          this.endDate;
        let data = await this.getData(url);
        let obj_add = {
          label: "Prueba #1",
          data: data,
          borderColor: "green",
        };
        allData.push(obj_add);
      }
    }
    this.chart.data.datasets = allData;
    this.chart.update();
  },
};
</script>
