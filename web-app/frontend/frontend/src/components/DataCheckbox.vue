<template>
  <div>
    <p class="d-flex flex-row mt-2 mb-1 ms-4">Economic</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="key in economicData"
      :key="key"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="key"
        :value="key"
        v-model="checkedValues"
      />
      <label class="form-check-label ms-2" :for="key">{{
        region_codes[key].title + " " + "(" + region_codes[key].category + ")"
      }}</label>
    </div>

    <p class="d-flex flex-row mt-2 mb-1 ms-4">Health</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="key in healthData"
      :key="key"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="key"
        :value="key"
        v-model="checkedValues"
      />
      <label class="form-check-label ms-2" :for="key">{{
        region_codes[key].title + " " + "(" + region_codes[key].category + ")"
      }}</label>
    </div>

    <p class="d-flex flex-row mt-2 mb-1 ms-4">Sociodemographic</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="key in sociodemographicData"
      :key="key"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="key"
        :value="key"
        v-model="checkedValues"
      />
      <label class="form-check-label ms-2" :for="key">{{
        region_codes[key].title + " " + "(" + region_codes[key].category + ")"
      }}</label>
    </div>
  </div>
</template>
<script>
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      region_codes: API_INFO[this.$route.params.id].codes,
      region_codes_array: Object.keys(API_INFO[this.$route.params.id].codes),
      checkedValues: [],
    };
  },
  methods: {
    getDataArray(type) {
      let codes = [];
      for (let code of this.region_codes_array) {
        if (this.region_codes[code].type == type) {
          codes.push(code);
        }
      }
      return codes;
    },
  },
  computed: {
    economicData() {
      let economicCodes = this.getDataArray("Economic");
      return economicCodes;
    },
    healthData() {
      let healthCodes = this.getDataArray("Health");
      return healthCodes;
    },
    sociodemographicData() {
      let sociodemographicCodes = this.getDataArray("Sociodemographic");
      return sociodemographicCodes;
    },
  },
  emits: ["checkedValues"],
  watch: {
    checkedValues: function (checked) {
      this.$emit("checkedValues", checked);
    },
  },
};
</script>

<style scoped>
p {
  font-weight: bold;
}
</style>
