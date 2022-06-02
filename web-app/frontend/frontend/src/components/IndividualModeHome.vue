<template>
  <div
    class="border-end border-3 border-secondary col-12 col-md-6 px-0"
    id="individual-mode"
  >
    <div class="mb-4 d-flex justify-content-center">
      <div class="col-6">
        <region-select
          @selectedRegion="(msg) => (selectedRegion = msg)"
          :defaulSelect="selectedRegion"
        ></region-select>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Start Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            id="start-date"
            v-model="startDate"
            :max="endDate"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">End Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            id="end-date"
            v-model="endDate"
            :min="startDate"
            :max="getMaxStartDate()"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <router-link :to="getIndividualUrl" class="btn btn-outline-success"
        >Individual Mode</router-link
      >
    </div>
    <div class="col-12 col-md-6" id="compare-mode">
      <div class="d-flex justify-content-center">
        <router-link :to="getCompareUrl" class="btn btn-outline-success"
          >Compare Mode</router-link
        >
      </div>
    </div>
    <div class="col-12 col-md-6" id="compare-region-mode">
      <div class="d-flex justify-content-center">
        <router-link :to="getCompareRegionUrl" class="btn btn-outline-success"
          >Compare Region Mode</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import RegionSelect from "../components/RegionSelect.vue";

export default {
  data() {
    return {
      startDate: "2019-01-01", // Put COVID start as default date
      endDate: null,
      selectedRegion: "España",
    };
  },
  methods: {
    getMaxStartDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      return yyyy + "-" + mm + "-" + dd;
    },
  },
  components: {
    RegionSelect,
  },
  created() {
    this.endDate = this.getMaxStartDate();
  },
  computed: {
    getIndividualUrl() {
      return (
        "/individual/" +
        this.selectedRegion +
        "/" +
        this.startDate.replaceAll("-", "") +
        "/" +
        this.endDate.replaceAll("-", "")
      );
    },
    getCompareUrl() {
      return (
        "/compare/" +
        this.selectedRegion +
        "/" +
        this.startDate.replaceAll("-", "") +
        "/" +
        this.endDate.replaceAll("-", "")
      );
    },
    getCompareRegionUrl() {
      return (
        "/compareregion/" +
        this.selectedRegion +
        "/" +
        this.startDate.replaceAll("-", "") +
        "/" +
        this.endDate.replaceAll("-", "")
      );
    },
  },
};
</script>
