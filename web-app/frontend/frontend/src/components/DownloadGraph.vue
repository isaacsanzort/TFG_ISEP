<template>
<div>
    <a
        id="download"
        download="ChartImage.jpg"
        href=""
        class="btn btn-primary float-right bg-flat-color-1"
        title="Descargar Gráfico"
        @click="downloadChart"
        >download</a
    >
    <p id="csv" href="" @click="downloadCsv">To csv</p>
    <p id="json" href="" @click="downloadJSON">To json</p>
    <p id="xml" href="" @click="downloadXML">To xml</p>
</div>
</template>

<script>
import { toXML } from "jstoxml";

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
    },
    data (){
        return {
            //To avoid .xml problems with the tags
            format_region: this.region.replaceAll("ñ", "n"),
            format_otherRegion: this.otherRegion != null ? this.otherRegion.replaceAll("ñ","n") : null, 
        }
    },
    methods: {
        downloadChart() {
            /*Get image of canvas element*/
            var url_base64jp = document.getElementById(this.idChart).toDataURL({
                format: "png",
                multiplier: 2,
            });
            /*get download button (tag: <a></a>) */
            var a = document.getElementById("download");
            /*insert chart image url to download button (tag: <a></a>) */
            a.href = url_base64jp;
        },
        dataCsv(){
            console.log(this.dataChart);
            const headers = ['"Date","Value","Region","Label"'];
            const csvRows = []; 
            //To access dates (x) and values (y)
            const data_key = ["x", "y"];
            
            csvRows.push(headers.join(","));

            //In case we are in the Compare Region Section, we push the rest of the regions
            let isOtherRegion = this.otherRegion != null ? true : false;
            let region = this.format_region;


            for (const values of this.dataChart){
                let data = values.data;
                let label = values.label;

                if(isOtherRegion){
                    console.log(values.borderColor);
                    if (values.borderColor == "green"){
                        region = this.format_region;
                    }else{
                        region = this.format_otherRegion;
                    }
                }
                console.log(region);
                for (const row of data){
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
            console.log(this.format_region);
            
            for (const values of this.dataChart){
                let data = values.data;
                let label = values.label;
                //In case the label contains characters that could cause problems in the .xml file
                label = label.replace(/[^A-Z0-9]/ig, "_");
                
                for (const row of data) {
                    dates.push(row.x);
                    value.push(row.y);
                }

                obj[label] = {
                    Dates: dates,
                    Values: value
                }
            }

            let json_obj = {};
            json_obj[this.format_region]=obj;

            return json_obj;
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
    }
}
</script>