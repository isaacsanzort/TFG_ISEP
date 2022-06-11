<template>
  <div>
    <a
      id="download"
      download="ChartImage.jpg"
      href=""
      class="btn btn-primary float-right bg-flat-color-1"
      title="Descargar Gráfico"
      @click="downloadChart"
      >download</a
    >
    <canvas :id="idChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { shallowRef } from "vue";

Chart.register(zoomPlugin);

export default {
  props: {
    idChart: {
      type: String,
    },
    labelsChart: {
      type: Array,
    },
    dataChart: {
      type: Array,
    },
  },
  emits: ["chart"],
  mounted() {
    //borrar
    //let obj = JSON.parse(JSON.stringify(this.dataChart));
    // console.log(obj[0].data);
    //this.jsontocsv(obj[0].data);
    //
    const ctx = document.getElementById(this.idChart).getContext("2d");

    const myChart = shallowRef(
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labelsChart,
          datasets: this.dataChart,
        },

        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Custom Chart COVID",
            },
            zoom: {
              pan: {
                // Allows dragging with the mouse to move in zoom
                enabled: true,
                mode: "xy",
              },
              zoom: {
                // zoom with wheel
                wheel: {
                  enabled: true,
                },
                mode: "xy",
              },
            },
          },
        },
      })
    );
    this.$emit("chart", myChart); //Esto se pone para cargarlo se supone, pero si lo quito sigue funcionando. Creo que es para que no salgan errores del eslint
  },
  methods: {
    downloadChart() {
      /*Get image of canvas element*/
      var url_base64jp = document.getElementById(this.idChart).toDataURL({
        format: "png",
        multiplier: 2,
      });
      /*get download button (tag: <a></a>) */
      var a = document.getElementById("download");
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    },
    // jsontocsv(json){
    //   const csvString = [
    //     [
    //       "Date",
    //       "Value"
    //     ]
    //   ];
    // }
  },
};
</script>
