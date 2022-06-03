<template>
  <div>
    <select
      class="form-select"
      aria-label="Select Feature"
      v-model="selectedFeature"
    >
      <option v-for="i in features.length" :value="i - 1" :key="i - 1">
        {{ features[i - 1] }}
      </option>
    </select>
  </div>
</template>
<script>
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      selectedFeature: 5,
      features: API_INFO[this.$route.params.id]["Compare"].title,
    };
  },
  emits: ["selectedData"],
  watch: {
    selectedFeature: function (selectedFeature) {
      this.$emit("selectedData", selectedFeature);
    },
  },
};
</script>
