<template>
  <div
    class="border-end border-3 border-secondary col-12 col-md-6 px-0"
    id="individual-mode"
  >
    <div class="mb-4 d-flex justify-content-center">
      <div class="col-6">
        {{selectedRegion}}
        <select class="form-select" aria-label="Select CCAA" v-model="selectedRegion">
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
    {{picked}}
    <div class="d-flex justify-content-center">
      <router-link :to="getUrl" class="btn btn-outline-success">Individual Mode</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRegion: 'España',
      picked: 'Health', //COn esto además se seleccionan por defecto. Lo cual me resuelve el problema de checked
      divClassCheckbox: "d-flex justify-content-center mb-2",
      labelClassCheckbox: "btn btn-outline-primary col-6",
      dataCheckbox: [
        { id: 0, msg: "Health"},
        { id: 1, msg: "Economic"},
        { id: 2, msg: "Sociodemographic"},
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
  computed: {
    getUrl() {
      return  "/individual/" + this.picked + "/" + this.selectedRegion;
    }
  }
};
</script>
