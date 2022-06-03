<template>
  <div>
    <p class="d-flex flex-row mt-2 mb-1 ms-4">Economic</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="i in economicCheckbox.title.length"
      :key="i - 1"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="economicCheckbox.cod[i - 1]"
        :value="economicCheckbox.cod[i - 1]"
        v-model="checkedValues"
      />
      <label class="form-check-label ms-2" :for="economicCheckbox.cod[i - 1]">{{
        economicCheckbox.title[i - 1]
      }}</label>
    </div>

    <p class="d-flex flex-row mt-2 mb-1 ms-4">Health</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="i in healthCheckbox.title.length"
      :key="i - 1"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="healthCheckbox.cod[i - 1]"
        :value="healthCheckbox.cod[i - 1]"
        v-model="checkedValues"
      />
      <label class="form-check-label ms-2" :for="healthCheckbox.cod[i - 1]">{{
        healthCheckbox.title[i - 1]
      }}</label>
    </div>

    <p class="d-flex flex-row mt-2 mb-1 ms-4">Sociodemographic</p>
    <div
      class="d-flex flex-row form-switch ms-4"
      v-for="i in sociodemographicCheckbox.title.length"
      :key="i - 1"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :id="sociodemographicCheckbox.cod[i - 1]"
        :value="sociodemographicCheckbox.cod[i - 1]"
        v-model="checkedValues"
      />
      <label
        class="form-check-label ms-2"
        :for="sociodemographicCheckbox.cod[i - 1]"
        >{{ sociodemographicCheckbox.title[i - 1] }}</label
      >
    </div>
  </div>
</template>
<script>
import { API_INFO } from "../assets/js/global.js";

export default {
  data() {
    return {
      economicCheckbox: API_INFO[this.$route.params.id]["Economic"],
      healthCheckbox: API_INFO[this.$route.params.id]["Health"],
      sociodemographicCheckbox:
        API_INFO[this.$route.params.id]["Sociodemographic"],
      checkedValues: [],
    };
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
