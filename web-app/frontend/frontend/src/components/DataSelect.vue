<template>
  <div>
    <select
      class="form-select"
      aria-label="Select Feature"
      v-model="selectedFeature"
    >
      <option
        v-for="code in Object.keys(region_codes)"
        :value="region_codes[code].title"
        :key="region_codes[code].title"
      >
        {{ region_codes[code].title }}
      </option>
    </select>
  </div>
</template>
<script>
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      selectedFeature: null,
      region_codes: API_INFO[this.$route.params.id].codes,
    };
  },
  emits: ["selectedData"],
  watch: {
    selectedFeature: function (selectedFeature) {
      this.$emit("selectedData", selectedFeature);
    },
  },
  created() {
    let code = Object.keys(this.region_codes)[0];
    let title = this.region_codes[code].title;
    this.selectedFeature = title;
  },
};
</script>
