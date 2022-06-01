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
import PruebaIndividual from "./PruebaContainerIndividualGraph.vue";
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      data_region: API_INFO[this.$route.params.id][this.$route.params.type].cod, // url/individual/:type/:id
    };
  },
  components: {
    PruebaIndividual,
  },
  methods: {
    getUrl(code) {
      let startDate = this.$route.params.startDate;
      let endDate = this.$route.params.endDate;
      
      let mode = "ine";
      let region = "";

      if (this.$route.params.type == "Health" && code.substring(0,6) == "COVID-"){
          region = this.$route.params.id + "/" //Transformar nombres de CAtaluña a cataluna etc..
          mode = "covid";
          code = code.substring(6);
      }

      return (
        "http://127.0.0.1:5000/" + mode + "/" + code + "/" + region + startDate + "/" + endDate
      );
    },
  },
};
</script>
