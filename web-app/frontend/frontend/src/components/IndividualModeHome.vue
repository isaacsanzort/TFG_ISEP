<template>
  <div
    class="border-end border-3 border-secondary col-12 col-md-6 px-0"
    id="individual-mode"
  >
    <div class="mb-4 d-flex justify-content-center">
      <div class="col-6">
        {{ selectedRegion }}
        <select
          class="form-select"
          aria-label="Select CCAA"
          v-model="selectedRegion"
        >
          <option
            v-for="region in autonomousCommunities"
            :value="region.name"
            :key="region.id"
          >
            {{ region.name }}
          </option>
        </select>
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
    <div class="mb-3">
      <div class="row" aria-label="Category Checkboxes">
        <div
          v-for="data in dataCheckbox"
          :key="data.id"
          :class="divClassCheckbox"
        >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            :id="'btnradio' + data.id"
            :value="data.msg"
            v-model="picked"
          />
          <label :class="labelClassCheckbox" :for="'btnradio' + data.id"
            >{{ data.msg }} Data</label
          >
        </div>
      </div>
    </div>
    {{ picked }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "2019-01-01", // Put COVID start as default date
      endDate: null,
      selectedRegion: "España",
      picked: "Health", //COn esto además se seleccionan por defecto. Lo cual me resuelve el problema de checked
      divClassCheckbox: "d-flex justify-content-center mb-2",
      labelClassCheckbox: "btn btn-outline-primary col-6",
      dataCheckbox: [
        { id: 0, msg: "Health" },
        { id: 1, msg: "Economic" },
        { id: 2, msg: "Sociodemographic" },
      ],
      autonomousCommunities: [
        { id: 0, name: "España" },
        { id: 1, name: "Andalucia" },
        { id: 2, name: "Aragon" },
        { id: 3, name: "Principado de Asturias" },
        { id: 4, name: "Illes Balears" },
        { id: 5, name: "Canarias" },
        { id: 6, name: "Cantabria" },
        { id: 7, name: "Castilla y Leon" },
        { id: 8, name: "Castilla-La Mancha" },
        { id: 9, name: "Cataluña" },
        { id: 10, name: "Comunitat Valenciana" },
        { id: 11, name: "Extremadura" },
        { id: 12, name: "Galicia" },
        { id: 13, name: "Comunidad de Madrid" },
        { id: 14, name: "Region de Murcia" },
        { id: 15, name: "Comunidad Foral de Navarra" },
        { id: 16, name: "Pais Vasco" },
        { id: 17, name: "La Rioja" },
        { id: 18, name: "Ceuta" },
        { id: 19, name: "Melilla" },
      ],
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
  created() {
    this.endDate = this.getMaxStartDate();
  },
  computed: {
    getIndividualUrl() {
      return (
        "/individual/" +
        this.picked +
        "/" +
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
  },
};
</script>
