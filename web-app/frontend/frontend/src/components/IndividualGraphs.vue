<template>
  <div class="row justify-content-center">
    <p>{{ data_region }}</p>
    <prueba-individual 
        v-for="i in data_region"   
        :key="i"
        :url="'http://127.0.0.1:5000/ine/' + i + '/20190808/20220508'"
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
};
</script>
