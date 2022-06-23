<template>
  <div class="col-md-12 px-0 mb-5">
    <spain-map
      @region="(region) => (selectedRegion = region)"
      @showData="(isShown) => (showMainInfo = isShown)"
    />
    <div id="more-stats" class="mt-3" v-show="showMainInfo">
      <h3 class="mt-2">More Information on: {{ selectedRegion }}</h3>
      <div class="mt-3 mb-4">
        <p class="info-instr mb-0">
          <b>1. Specify a date range if you want:</b>
        </p>
        <div class="d-flex justify-content-center">
          <div class="col-6">
            <home-dates
              @startDate="(date) => (startDate = date)"
              @endDate="(date) => (endDate = date)"
              :maxEndDate="maxEndDate"
              :parentEndDate="endDate"
              :parentStartDate="startDate"
            />
          </div>
        </div>
      </div>
      <div>
        <p class="info-instr mb-0">
          <b>2. Select the mode you want to visualize:</b>
        </p>
        <div class="mb-5 row">
          <div class="border-end border-secondary border-3 col-4 btn-select">
            <p>{{ indivText }}</p>
            <home-buttons
              :mode="'individual'"
              :endDate="endDate"
              :startDate="startDate"
              :selectedRegion="selectedRegion"
              >Individual Data</home-buttons
            >
          </div>
          <div class="border-end border-secondary border-3 col-4 btn-select">
            <p>{{ compFeatureText }}</p>
            <home-buttons
              :mode="'compare'"
              :endDate="endDate"
              :startDate="startDate"
              :selectedRegion="selectedRegion"
              >Compare Data</home-buttons
            >
          </div>
          <div class="col-4 btn-select">
            <p>{{ compRegionText }}</p>
            <home-buttons
              :mode="'compareregion'"
              :endDate="endDate"
              :startDate="startDate"
              :selectedRegion="selectedRegion"
              >Compare Region</home-buttons
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeButtons from "./HomeButtons.vue";
import HomeDates from "./HomeDates.vue";
import SpainMap from "./SpainMap.vue";

export default {
  data() {
    return {
      startDate: "2019-01-01", // Put COVID start as default date
      endDate: null,
      maxEndDate: null,
      selectedRegion: "España",
      showMainInfo: false,
      indivText:
        "In this mode, all the data of the region is displayed sorted into categories",
      compRegionText:
        "In this mode a feature can be compared between the selected region and another",
      compFeatureText:
        "In this mode it is possible to compare different characteristics for the same region",
    };
  },
  components: {
    HomeButtons,
    HomeDates,
    SpainMap,
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
  created() {
    this.endDate = this.getMaxStartDate();
    this.maxEndDate = this.getMaxStartDate();
  },
  watch: {
    selectedRegion() {
      console.log(this.selectedRegion);
    },
  },
};
</script>
<style scoped>
p {
  height: 3rem;
  text-align: center;
  padding: 4px 10px;
  overflow: hidden;
}

.info-instr {
  text-align: left;
}

#more-stats {
  border: 2px solid black;
}
</style>
