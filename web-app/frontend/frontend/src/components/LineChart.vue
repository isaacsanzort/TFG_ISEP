<template>
  <canvas :id="idChart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

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
  mounted() {
    const ctx = document.getElementById(this.idChart).getContext("2d");
    const myChart = new Chart(ctx, {
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
              text: 'Custom Chart COVID',
          }
        }
      },
    });
    myChart; //Esto se pone para cargarlo se supone, pero si lo quito sigue funcionando. Creo que es para que no salgan errores del eslint
  },
};
</script>
