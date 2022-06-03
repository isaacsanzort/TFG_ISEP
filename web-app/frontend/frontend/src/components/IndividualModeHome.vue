<template>
  <div
    class="border-end border-3 border-secondary col-12 col-md-6 px-0"
  >
    <div class="mb-4 d-flex justify-content-center">
      <div class="col-6">
        <region-select
          @selectedRegion="(msg) => (selectedRegion = msg)"
          :defaulSelect="selectedRegion"
        />
        <home-dates
          @startDate="(date) => (startDate = date)"
          @endDate="(date) => (endDate = date)"
          :maxEndDate="maxEndDate"
          :parentEndDate="endDate"
          :parentStartDate="startDate"
        />
      </div>
    </div>
    <div>
      <home-buttons
        :mode="'individual'"
        :endDate="endDate"
        :startDate="startDate"
        :selectedRegion="selectedRegion"
        >Individual Data</home-buttons
      >
      <home-buttons
        :mode="'compare'"
        :endDate="endDate"
        :startDate="startDate"
        :selectedRegion="selectedRegion"
        >Compare Data</home-buttons
      >
      <home-buttons
        :mode="'compareregion'"
        :endDate="endDate"
        :startDate="startDate"
        :selectedRegion="selectedRegion"
        >Compare Region</home-buttons
      >
    </div>
  </div>
</template>

<script>
import RegionSelect from "../components/RegionSelect.vue";
import HomeButtons from "../components/HomeButtons.vue";
import HomeDates from "../components/HomeDates.vue";

export default {
  data() {
    return {
      startDate: '2019-01-01', // Put COVID start as default date
      endDate: null,
      maxEndDate: null,
      selectedRegion: "España",
    };
  },
  components: {
    RegionSelect,
    HomeButtons,
    HomeDates,
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
  }
};
</script>
