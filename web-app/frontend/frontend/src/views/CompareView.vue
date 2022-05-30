<template>
    <div class="row">
        <div class="col-9">
            <line-chart 
                :idChart="'compareChart'"
                :dataChart="pruebaData"
                :labelsChart="pruebaLabel"
                v-if="true"
            />
        </div>
        <div class="col mt-5 pt-5">
            <div class="form-switch" v-for="i in economicCheckbox.title.length" :key="i - 1">
                <input class="form-check-input" type="checkbox" :id="economicCheckbox.cod[i - 1]" :value="economicCheckbox.cod[i - 1]" v-model="checkedValues">
                <label class="form-check-label" :for="economicCheckbox.cod[i - 1]">{{economicCheckbox.title[i - 1]}}</label>
            </div>
        </div>
    </div>    
</template>
<script>
import LineChart from "../components/LineChart.vue" ;
import { API_INFO } from "../assets/js/global.js";

export default({
    data() {
        return {
            pruebaData: [],
            pruebaLabel:[1,2,3,4,5,6,7,8,9],
            economicCheckbox: API_INFO[this.$route.params.id]['Economic'],
            checkedValues: []
        }
    },
  components: {
    LineChart,
  },
  methods: {
      generateValues(){
          if (this.checkedValues.length > 0) {
              this.pruebaData = [{
                'label': 'Prueba #1',
                'data': [{'x': 2, 'y': 4}, {'x':3, 'y': 5}, {'x': 1, 'y': 7}],
                'borderColor': "green"
            },
            {
                'label': 'Prueba #2',
                'data': [{'x': 10, 'y': 3}, {'x':5, 'y': 20}, {'x': 3, 'y': 2}],
                'borderColor': "red"
            }]
          } else {
            this.pruebaData = []
          }
      }
  },
  beforeUpdate(){
      this.generateValues();
  }
});
</script>
