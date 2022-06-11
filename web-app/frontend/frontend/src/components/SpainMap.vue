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
            <h5>for {{ selectedRegion }}</h5>
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
            <div v-if="selectedOption == 1">
              <small>Cumulative cases <br /> </small>
              <span>Stats: {{ cumulativeCases }}<br /></span>
              <small>Cases today<br /></small>
              <span>Stats: {{ dailyCases }}</span>
            </div>
            <div v-if="selectedOption == 2">
              <small>Vaccine doses administeres <br /></small>
              <span>Stats:<br /></span>
              <small>Fully vaccinated people <br /></small>
              <span>Stats: </span>
            </div>
            <div v-if="selectedOption == 3">
              <small>Cumulative deaths<br /></small>
              <span>Stats: <br /></span>
              <small>Deaths today<br /></small>
              <span>Stats: </span>
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
      center: [37, 7749, -122, 4194],
      cumulativeCases: null,
      dailyCases: null,
      recentDate: null,
      selectedData: null,
      showMainData: false,
      showData: false,
      selectedRegion: null,
      selectedOption: 1,
    };
  },
  emits: ["selectedRegion"],
  mixins: [sharedLogic],
  methods: {
    async getCovidData(type, region) {
      let regionTransformed = region.replaceAll("ñ", "n");
      let url =
        "http://127.0.0.1:5000/recent_covid_info/" +
        type +
        "/" +
        regionTransformed;
      let value = await this.fetchData(url);
      return value;
    },
    async updateCardValues(prop) {
      this.selectedRegion = prop.NAMEUNIT;

      // Cases
      let cumulativeCases = await this.getCovidData(
        "CumulativeCases",
        prop.APINAME
      );
      let dailyCases = await this.getCovidData("DailyCases", prop.APINAME);
      this.recentDate = cumulativeCases.Date;
      this.cumulativeCases = cumulativeCases.Value;
      this.dailyCases = dailyCases.Value;

      //Deaths
      //
    },
    async setupLeafletMap() {
      let map = L.map("map").setView([40.2085, 3.713], 5);
      const attribution = "©OpenStreetMap";
      const tileUrl =
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png";
      const tiles = L.tileLayer(tileUrl, { attribution });

      let statesData = await fetch("http://127.0.0.1:5000/spainmap");
      const gObject = await statesData.json();

      //Así espera a cargar el mapa
      tiles.addTo(map);
      //Spain map button
      this.showMainData = true;

      //Cholopleth

      function getColor(d) {
        return d > 1000
          ? "#800026"
          : d > 500
          ? "#BD0026"
          : d > 200
          ? "#E31A1C"
          : d > 100
          ? "#FC4E2A"
          : d > 50
          ? "#FD8D3C"
          : d > 20
          ? "#FEB24C"
          : d > 10
          ? "#FED976"
          : "#FFEDA0";
      }

      function style(feature) {
        return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        };
      }

      //L.geoJSON(gObject, {style: style}).addTo(map);

      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7,
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }

        info.update(layer.feature.properties);
      }

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      //Voy a crear mi funcion
      async function prueba1(prop) {
        console.log(prop.APINAME);
        //this.$emit('selectedRegion', prop.APINAME);
      }

      let geojson;
      // ... our listeners
      //geojson = L.geoJSON(gObject);

      // I need to give context to this variable because if not the "this" will have a different context inside the nested function
      let p = this;

      async function zoomToFeature(e) {
        //map.fitBounds(e.target.getBounds());
        prueba1(e.target.feature.properties);
        covidStats.update(e.target.feature.properties);
        await p.updateCardValues(e.target.feature.properties);
        p.showData = true;
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
      }

      geojson = L.geoJSON(gObject, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(map);

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
            : "Hover over a state");
      };

      info.addTo(map);

      let covidStats = L.control({ position: "topleft" });

      covidStats.onAdd = function () {
        this._div = L.DomUtil.create("div", "covidStats");
        this.update();
        return this._div;
      };

      covidStats.update = async function () {
        //this._div.innerHTML = "<button>ES</button>";
        console.log("Hello world");
      };

      covidStats.addTo(map);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#map,
.card {
  width: 100%; /* It will occupy the 100% width of the col assigned*/
  height: 80vh;
}
</style>
