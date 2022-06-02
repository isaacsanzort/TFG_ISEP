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

export default {
  props: {
    dataType: String,
  },
  computed: {
    data_region: function () {
      return API_INFO[this.$route.params.id][this.dataType].cod; // url/individual/:type/:id
    }
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

      if (
        this.dataType == "Health" &&
        code.substring(0, 6) == "COVID-"
      ) {
        region = this.$route.params.id + "/"; //Transformar nombres de CAtaluña a cataluna etc..
        mode = "covid";
        code = code.substring(6);
      }

      return (
        "http://127.0.0.1:5000/" +
        mode +
        "/" +
        code +
        "/" +
        region +
        startDate +
        "/" +
        endDate
      );
    },
  }
};
</script>
