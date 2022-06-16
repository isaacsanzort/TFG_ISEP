<template>
  <div class="row justify-content-center">
    <prueba-individual
      v-for="i in data_region"
      :key="i"
      :url="getUrl(i,'',region_codes[i].isCovid)"
      :id="i"
    />
  </div>
</template>

<script>
import PruebaIndividual from "./PruebaContainerIndividualGraph.vue";
import { API_INFO } from "../assets/js/global.js";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  props: {
    dataType: String,
  },
  data (){
    return {
      region_codes: API_INFO[this.$route.params.id].codes,
    }
  },
  computed: {
    data_region: function () {
      let api_codes = Object.keys(this.region_codes);
      let code_type = [];

      for (let code of api_codes){
        if(this.region_codes[code].type == this.dataType){
          code_type.push(code);
        }
      }
      return code_type; // url/individual/:type/:id
    },
  },
  components: {
    PruebaIndividual,
  },
  mixins: [sharedLogic], //This is being used in :url="getUrl(i)"
};
</script>
