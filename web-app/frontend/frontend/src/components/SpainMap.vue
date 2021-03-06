<template>
  <div id="container" class="row">
    <div class="col-md-9">
      <div id="map"></div>
    </div>
    <div id="main-stats" class="col-md-3" v-show="showMainData">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">COVID-19 Panel</h4>
          <div v-show="showData">
            <h5>
              for <b>{{ selectedRegion }}</b>
            </h5>
            <p>
              <small>Last update: {{ recentDate }}</small>
            </p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedOption"
            >
              <option value="1">Cases</option>
              <option value="2">Vaccination</option>
              <option value="3">Death</option>
            </select>
            <div class="mt-4">
              <div v-if="selectedOption == 1">
                <div class="info">
                  <p class="mb-0">
                    <b>{{ cumulativeCases }}</b>
                  </p>
                  <p class="detail-info mb-0">Cumulative cases</p>
                </div>
                <div class="info mt-3">
                  <p class="mb-0">
                    <b>{{ dailyCases }}</b>
                  </p>
                  <p class="detail-info mb-0">Daily cases</p>
                </div>
              </div>
              <div v-if="selectedOption == 2">
                <div class="info">
                  <p class="mb-0">
                    <b>{{ dosesAdministered }}</b>
                  </p>
                  <p class="detail-info mb-0">Vaccine doses administeres</p>
                </div>
                <div class="info mt-3">
                  <p class="mb-0">
                    <b>{{ completedVaccinated }}</b>
                  </p>
                  <p class="detail-info mb-0">Fully vaccinated people</p>
                </div>
                <div class="info mt-3">
                  <p class="mb-0">
                    <b>{{ percentageVaccinated }}</b
                    >%
                  </p>
                  <p class="detail-info mb-0">
                    Percentage of fully vaccinated people
                  </p>
                </div>
              </div>
              <div v-if="selectedOption == 3">
                <div class="info">
                  <p class="mb-0">
                    <b>{{ cumulativeDeaths }}</b>
                  </p>
                  <p class="detail-info mb-0">Cumulative deaths</p>
                </div>
                <div class="info mt-3">
                  <p class="mb-0">
                    <b>{{ dailyDeaths }}</b>
                  </p>
                  <p class="detail-info mb-0">Deaths today</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="div-btn-circle">
                <button
                  type="button"
                  class="btn btn-outline-success btn-circle btn-sm"
                  onclick="document.getElementById('more-stats').scrollIntoView();"
                >
                  <i class="bi bi-caret-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet/";
import sharedLogic from "../assets/js/sharedLogic";

export default {
  name: "SpainMap",
  data() {
    return {
      center: [38, -5],
      spainBtn: {},
      geojson: {},
      regionSelectInfo: {},
      cumulativeDeaths: null,
      cumulativeCases: null,
      dailyCases: null,
      dailyDeaths: null,
      dosesAdministered: null,
      completedVaccinated: null,
      percentageVaccinated: null,
      recentDate: null,
      selectedData: null,
      showMainData: false,
      showData: false,
      selectedRegion: null,
      selectedOption: 1,
    };
  },
  mixins: [sharedLogic],
  methods: {
    async getCovidData(type, region) {
      let regionTransformed = region.replaceAll("ñ", "n");
      let url = "recent_covid_info/" + type + "/" + regionTransformed;
      let value = await this.fetchData(url);
      return value;
    },

    //Display number with dot notation e.g 10000 -> 10.000
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    async updateCardValues(region_api_name, region_name) {
      this.selectedRegion = region_name;

      // Cases
      let cumulativeCases = await this.getCovidData(
        "CumulativeCases",
        region_api_name
      );
      let dailyCases = await this.getCovidData("DailyCases", region_api_name);
      this.recentDate = cumulativeCases.Date;
      this.cumulativeCases = this.formatNumber(cumulativeCases.Value);
      this.dailyCases = this.formatNumber(dailyCases.Value);

      //Deaths
      let cumulativeDeaths = await this.getCovidData(
        "CumulativeDeaths",
        region_api_name
      );
      let dailyDeaths = await this.getCovidData("DailyDeaths", region_api_name);
      this.cumulativeDeaths = this.formatNumber(cumulativeDeaths.Value);
      this.dailyDeaths = this.formatNumber(dailyDeaths.Value);

      //Vaccination
      let dosesAdministered = await this.getCovidData(
        "DosesAdministered",
        region_api_name
      );
      let completedVaccinated = await this.getCovidData(
        "CompletedVaccinated",
        region_api_name
      );
      let percentageVaccinated = await this.getCovidData(
        "PercentageCompletedVaccinated",
        region_api_name
      );
      this.dosesAdministered = this.formatNumber(dosesAdministered.Value);
      this.completedVaccinated = this.formatNumber(completedVaccinated.Value);
      this.percentageVaccinated = percentageVaccinated.Value.replace(".", ",");
    },

    setMapLayout() {
      let map = L.map("map").setView(this.center, 5);
      const attribution = "©OpenStreetMap";
      const tileUrl =
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png";
      const tiles = L.tileLayer(tileUrl, { attribution });

      //Display the Main Data section
      return [map, tiles];
    },

    async setMap() {
      let [map, tiles] = this.setMapLayout();
      let geojsonLayer = await this.getSpainLayer();
      //Order in which layers will  display
      tiles.addTo(map);
      geojsonLayer.addTo(map);
      this.geojson = geojsonLayer;

      return map;
    },

    style() {
      return {
        fillColor: "#FFEDA0",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },

    highlightFeature(e) {
      let layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      this.regionSelectInfo.update(layer.feature.properties);
    },

    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
      this.regionSelectInfo.update();
    },

    async selectRegionAux(e) {
      //map.fitBounds(e.target.getBounds());
      let prop = e.target.feature.properties;
      await this.selectRegion(prop.APINAME, prop.NAMEUNIT);
    },

    async selectRegion(region_api_name, region_name) {
      this.$emit("region", region_api_name);
      //Displays Covid Stats
      this.showData = true;
      this.$emit("showData", true);
      await this.updateCardValues(region_api_name, region_name);
    },

    onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.selectRegionAux,
      });
    },

    async getSpainLayer() {
      let spain_regions_geojson = await this.fetchUrl("spainmap");
      let geojson = L.geoJSON(spain_regions_geojson, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      });
      return geojson;
    },

    setRegionSelectInfoControl(map) {
      let info = L.control();

      info.onAdd = function () {
        this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
        this.update();
        return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
        this._div.innerHTML =
          "<h3>Spain Regions</h3>" +
          (props
            ? "<h4><b>" + props.NAMEUNIT + "</b><h4><br />"
            : "Hover over a region");
      };

      info.addTo(map);
      this.regionSelectInfo = info;
    },

    setSpainBtnControl(map) {
      let spainBtn = L.control({ position: "topleft" });

      spainBtn.onAdd = function () {
        this._div = L.DomUtil.create("div", "spainBtn");
        this.update();
        return this._div;
      };

      spainBtn.update = function () {
        this._div.innerHTML =
          '<button id="btn-spain" class="btn-spain" type="button">ESP</button>';
      };

      spainBtn.addTo(map);

      // I need to give context to this variable because if not the "this" will have a different context inside the nested function
      let _this = this;
      document
        .getElementById("btn-spain")
        .addEventListener("click", function () {
          _this.selectRegion("España", "España");
        });

      this.spainBtn = spainBtn;
    },

    setControlFeatures(map) {
      this.setRegionSelectInfoControl(map);
      this.setSpainBtnControl(map);
    },

    async setupLeafletMap() {
      let map = await this.setMap();
      //Display the section where covid stats will be displayed
      this.showMainData = true;

      this.setControlFeatures(map);
    },
  },
  emits: ["region", "showData"],
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
i {
  font-size: x-large;
}

.btn-circle {
  border-radius: 50%;
  height: 2.5rem;
  width: 2.7rem;
}

.div-btn-circle {
  position: absolute;
  bottom: 2%;
}

.card-body {
  overflow: auto;
}

.info p {
  text-align: end;
}

p:first-child {
  font-size: larger;
}

.detail-info {
  line-height: 80%;
  font-size: smaller;
}

#map,
.card {
  width: 100%; /* It will occupy the 100% width of the col assigned*/
  height: 80vh;
}
</style>
