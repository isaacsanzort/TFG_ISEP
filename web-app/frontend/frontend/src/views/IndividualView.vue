<template>
  <div>
    <h2>Vista Individual de Gráficos</h2>
    <div class="col-6">
      <line-chart :dataChart="chartData" :labelsChart="chartLabels" v-if="loaded"/> <!-- Si no pongo las comillas simples, entonces me lo trata como una funcion-->
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LinearChart.vue";

export default {
  data () {
    return {
      chartData: {},
      chartLabels: {},
      loaded: false
    }
  },
  async mounted () {
    this.loaded = false 

    try {
      //Peticion API
      const getResponse = await fetch("http://127.0.0.1:5000/covid");
      const gObject = await getResponse.json();

      //Asignamos el valor (ejeY)
      this.chartData = gObject.Valor;
      //Aigmanos fechas (ejeX)
      this.chartLabels = gObject.Fecha;

      //renderizamos el componente
      this.loaded = true; 
    } catch (e) {
        console.log(e)
    }
  },
  components: {
    LineChart
  }
}
</script>
