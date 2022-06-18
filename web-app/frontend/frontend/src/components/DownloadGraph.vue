<template>
  <div class="row">
      <div class="col-8 d-flex justify-content-start">
        <div class="btn-group  me-3" role="group">
            <button id="btnGroup" type="button" class="btn btn-sm btn-success dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-download"></i> Image</button>
            <ul class="dropdown-menu" aria-labelledby="btnGroup">
                <li><a id="png" download="ChartImage.png" class="dropdown-item" @click="downloadChart('png')" href="#">as .png file</a></li>
                <li><a id="jpg" download="ChartImage.jpg" class="dropdown-item" @click="downloadChart('jpg')" href="#">as .jpg file</a></li>
            </ul>
        </div>
        <div class="btn-group" role="group">
            <button id="btnGroup" type="button" class="btn btn-sm btn-success dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-download"></i> Data</button>
            <ul class="dropdown-menu" aria-labelledby="btnGroup">
                <li><a class="dropdown-item" href="#" @click="downloadCsv">as .csv file</a></li>
                <li><a class="dropdown-item" href="#" @click="downloadJSON">as .json file</a></li>
                <li><a class="dropdown-item" href="#" @click="downloadXML">as .xml file</a></li>
            </ul>
        </div>
      </div>
      <div class="col-4">
        <button type="button" class="btn btn-sm btn-secondary" @click="resetZoomChart">Reset zoom</button>
      </div>
  </div>
</template>

<script>
import { toXML } from "jstoxml";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  props: {
    idChart: {
      type: String,
    },
    dataChart: {
      type: Array,
    },
    region: {
      type: String,
    },
    otherRegion: {
      type: String,
    },
    chart: {
      type: Object,
    }
  },
  data() {
    return {
      //To avoid .xml problems with the tags
      format_region: this.region.replaceAll("ñ", "n"),
      format_otherRegion: null,
    };
  },
  methods: {
    downloadChart(type) {
      /*Get image of canvas element*/
      var url_base64jp = document.getElementById(this.idChart).toDataURL({
        format: type,
        multiplier: 2,
      });
      /*get download button (tag: <a></a>) */
      var a = document.getElementById("download");
      /*insert chart image url to download button (tag: <a></a>) */
      a.href = url_base64jp;
    },
    dataCsv() {
      console.log(this.otherRegion);
      const headers = ['"Date","Value","Region","Label"'];
      const csvRows = [];
      //To access dates (x) and values (y)
      const data_key = ["x", "y"];

      csvRows.push(headers.join(","));

      //In case we are in the Compare Region Section, we push the rest of the regions
      let isOtherRegion = this.otherRegion != null ? true : false;
      let region = this.format_region;

      for (const values of this.dataChart) {
        let data = values.data;
        let label = values.label;

        if (isOtherRegion) {
          if (values.borderColor == "green") {
            region = this.format_region;
          } else {
            region = this.format_otherRegion;
          }
        }

        for (const row of data) {
          const value = data_key.map((key) => {
            const val = row[key];
            return `${val}`;
          });
          value.push(region, label);

          csvRows.push(value.join(","));
        }
      }
      let csv = csvRows.join("\n");
      console.log(csv);
      return csv;
    },
    downloadCsv() {
      let csv = this.dataCsv();

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "csv-data.csv";
      anchor.click();
    },

    dataJSON() {
      let dates = [];
      let value = [];
      let obj = {};

      //In case we are in the Compare Region Section, we push the rest of the regions
      let isOtherRegion = this.otherRegion != null ? true : false;
      let region = this.format_region;

      //So I can add the labels assign to a region
      obj[region] = {};

      for (const values of this.dataChart) {
        let data = values.data;
        let label = values.label;
        //In case the label contains characters that could cause problems in the .xml file
        label = label.replace(/[^A-Z0-9]/gi, "_");

        for (const row of data) {
          dates.push(row.x);
          value.push(row.y);
        }

        if (isOtherRegion) {
          //The difference between regions is based on color green -> region, red -> otherRegion
          if (values.borderColor == "green") {
            region = this.format_region;
          } else {
            region = this.format_otherRegion;
          }

          obj[region] = {};
        }
        obj[region][label] = {
          Dates: dates,
          Values: value,
        };
      }

      return obj;
    },

    downloadJSON() {
      let json_obj = this.dataJSON();

      let dataJSON = JSON.stringify(json_obj);
      let dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataJSON);

      const anchor = document.createElement("a");
      anchor.href = dataUri;
      anchor.target = "_blank";
      anchor.download = "json-data.json";
      anchor.click();

      return json_obj;
    },

    downloadXML() {
      const content = this.dataJSON();
      const config = {
        header: true,
        indent: "    ",
      };
      let result = toXML({ root: content }, config); // so <root> wraps the rest of the tags

      let bb = new Blob([result], { type: "text/plain" });
      const anchor = document.createElement("a");

      anchor.href = window.URL.createObjectURL(bb);
      anchor.target = "_blank";
      anchor.download = "xml-data.xml";
      anchor.dataset.downloadurl = [
        "text/plain",
        anchor.download,
        anchor.href,
      ].join(":");
      anchor.click();
    },
    resetZoomChart(){
      this.chart.resetZoom();
    },
  },
  watch: {
    otherRegion() {
      this.format_otherRegion =
        this.otherRegion != null ? this.otherRegion.replaceAll("ñ", "n") : null;
    },
  },
};
</script>
