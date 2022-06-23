<template>
  <div class="row justify-content-center">
    <individual-graph-wrapper
      v-for="i in data_region"
      :key="i"
      :url="getUrl(i, '', region_codes[i].isCovid)"
      :label="region_codes[i].title"
      :id="i"
    />
  </div>
</template>

<script>
import IndividualGraphWrapper from "./IndividualGraphWrapper.vue";
import { API_INFO } from "../assets/js/global.js";
import sharedLogic from "../assets/js/sharedLogic.js";

export default {
  props: {
    dataType: String,
  },
  data() {
    return {
      region_codes: API_INFO[this.$route.params.id].codes,
    };
  },
  computed: {
    data_region: function () {
      let api_codes = Object.keys(this.region_codes);
      let code_type = [];

      for (let code of api_codes) {
        if (this.region_codes[code].type == this.dataType) {
          code_type.push(code);
        }
      }
      return code_type; // url/individual/:type/:id
    },
  },
  components: {
    IndividualGraphWrapper,
  },
  mixins: [sharedLogic], //This is being used in :url="getUrl(i)"
};
</script>
<style scoped>
.indiv-chart {
  border: 1px double black;
  border-radius: 5px;
  padding: 5px;
}
</style>
