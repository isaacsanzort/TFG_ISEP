<template>
  <div class="row justify-content-center">
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
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  props: {
    dataType: String,
  },
  computed: {
    data_region: function () {
      return API_INFO[this.$route.params.id][this.dataType].cod; // url/individual/:type/:id
    },
  },
  components: {
    PruebaIndividual,
  },
  mixins: [sharedLogic], //This is being used in :url="getUrl(i)"
};
</script>
