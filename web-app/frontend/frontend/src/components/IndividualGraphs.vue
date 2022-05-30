<template>
  <div class="row justify-content-center">
    <p>{{ data_region }}</p>
    <prueba-individual 
        v-for="i in data_region"   
        :key="i"
        :url="getUrl(i)"
        :id="i"
    /> 
  </div>
</template>

<script>
import PruebaIndividual from './PruebaContainerIndividualGraph.vue'
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      data_region: API_INFO[this.$route.params.id][this.$route.params.type].cod // url/individual/:type/:id
    };
  },
  components: {
    PruebaIndividual,
  },
  methods: {
    getUrl(code) {
      let startDate = this.$route.params.startDate;
      let endDate = this.$route.params.endDate;

      return 'http://127.0.0.1:5000/ine/' + code + '/' + startDate + '/' + endDate;
    }
  }
};
</script>
