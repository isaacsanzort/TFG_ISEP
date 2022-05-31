<template>
  <div class="row justify-content-center">
    <p>{{ data_region }}</p>
    <div class="col-5">
      <line-chart
        :idChart="'1'"
        :dataChart="chartData"
        :labelsChart="chartLabels"
        v-if="loaded"
      />
      <!-- Si no pongo las comillas simples, entonces me lo trata como una funcion-->
    </div>
    <div class="col-5">
      <line-chart
        v-if="loaded"
        :idChart="'2'"
        :dataChart="chartData"
        :labelsChart="chartLabels"
      />
      <!-- Si no pongo las comillas simples, entonces me lo trata como una funcion-->
    </div>
    <div class="col-5">
      <line-chart
        :idChart="'3'"
        :dataChart="chartData"
        :labelsChart="chartLabels"
        v-if="loaded"
      />
      <!-- Si no pongo las comillas simples, entonces me lo trata como una funcion-->
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import { prueba } from "../assets/js/global.js";

export default {
  data() {
    return {
      chartData: {},
      chartLabels: {},
      loaded: false,
      data_type: this.$route.params.type, // url/individual/:type/:id  coge el type
      data_region: prueba[this.$route.params.id][this.$route.params.type].cod,
    };
  },
  async mounted() {
    this.loaded = false;

    try {
      //Peticion API
      const getResponse = await fetch(
        "http://127.0.0.1:5000/ine/IPC251852/20190808:20220508"
      );
      const gObject = await getResponse.json();
      //Asignamos el valor (ejeY)
      this.chartData = gObject.Value;
      //Aigmanos fechas (ejeX)
      this.chartLabels = gObject.Date;

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
