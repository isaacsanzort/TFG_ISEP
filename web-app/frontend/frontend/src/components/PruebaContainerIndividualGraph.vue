<template>
  <div class="col-md-5">
    <line-chart
      :idChart="this.id"
      :dataChart="chartData"
      :labelsChart="null"
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
      chartLabels: {},
      loaded: false,
    };
  },
  async mounted() {
    this.loaded = false;

    try {
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
