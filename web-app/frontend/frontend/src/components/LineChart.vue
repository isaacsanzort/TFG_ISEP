<template>
  <canvas :id="idChart"></canvas>
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
              pan: { // Allows dragging with the mouse to move in zoom
                enabled: true,
                mode: 'xy'
              },
              zoom: { // zoom with wheel
                wheel: {
                  enabled:true,
                },
                mode: 'xy', 
              }
            },
          },
        },
      })
    );
    this.$emit("chart", myChart); //Esto se pone para cargarlo se supone, pero si lo quito sigue funcionando. Creo que es para que no salgan errores del eslint
  },
};
</script>
