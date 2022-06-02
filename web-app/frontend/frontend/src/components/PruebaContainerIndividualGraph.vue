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
  methods: {
    generateDateRange() {
      const startDate = this.$route.params.startDate;
      const endDate = this.$route.params.endDate;

      const startYear = +startDate.substring(0, 4); // the + converts strings to number
      const startMonth = +startDate.substring(4, 6);
      const startDay = +startDate.substring(6, 8);

      const endYear = +endDate.substring(0, 4); // the + converts strings to number
      const endMonth = +endDate.substring(4, 6);
      const endDay = +endDate.substring(6, 8);

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
  },
  async mounted() {
    this.loaded = false;

    try {
      this.chartLabels = this.generateDateRange();
      //Peticion API
      const getResponse = await fetch(this.url);
      const gObject = await getResponse.json();
      //Asignamos el valor (ejeY y ejeX)
      this.chartData = [
        {
          label: "Prueba COVID",
          data: gObject.Value,
        },
      ];
      //renderizamos el componente
      this.loaded = true;
    } catch (e) {
      console.log(e);
    }
  },
  components: {
    LineChart,
  },
};
</script>
