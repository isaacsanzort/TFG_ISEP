<template>
        <canvas id="hola" width="400" height="400"></canvas>
</template>

<script>
    import Chart from 'chart.js/auto';

    export default {
        props: {
            labelsChart: {
                type: Array
            },
            dataChart:{
                type: Array
            }

        },
        mounted () {
            console.log(this.dataChart);
            const ctx = document.getElementById('hola').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.labelsChart,
                    datasets: [{
                        label: 'Prueba',
                        data: this.dataChart,
                    }]
                },
            
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            myChart; //Esto se pone para cargarlo se supone, pero si lo quito sigue funcionando. Creo que es para que no salgan errores del eslint
        }
    }
</script>