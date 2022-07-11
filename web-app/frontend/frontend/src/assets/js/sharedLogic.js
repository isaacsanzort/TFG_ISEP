const server = "http://127.0.0.1:5000/";
const api_name = "flask_api";
export default {
  methods: {
    getUrl(code, region = "", isCovidApi = false) {
      let startDate = this.$route.params.startDate;
      let endDate = this.$route.params.endDate;

      if (isCovidApi) {
        region = region == "" ? "/" + this.$route.params.id : "/" + region; //Transformar nombres de CAtaluña a cataluna etc..
        region = region.replaceAll("ñ", "n"); //España a Espana, Cataluña a Cataluna
      }

      // if (region != "") {
      //   region = "/" + region;
      // }

      return api_name + "/" + code + "/" + startDate + "/" + endDate + region;
    },
    generateDateRange() {
      const startDate = this.$route.params.startDate;
      const endDate = this.$route.params.endDate;

      const startYear = +startDate.substring(0, 4); // the + converts strings to number
      const startMonth = +startDate.substring(4, 6);
      const startDay = +startDate.substring(6, 8);

      const endYear = +endDate.substring(0, 4); // the + converts strings to number
      const endMonth = +endDate.substring(4, 6);
      const endDay = +endDate.substring(6, 8);

      const sDate = new Date(startYear, startMonth - 1, startDay);
      const eDate = new Date(endYear, endMonth - 1, endDay);

      const dates = [];

      //Retraso 1 dia el dia inicial porque la API del INE, porque devuelve datos fuera del rango
      sDate.setDate(sDate.getDate() - 1);

      while (sDate <= eDate) {
        let dd = String(sDate.getDate()).padStart(2, "0");
        let mm = String(sDate.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = sDate.getFullYear();
        let stringDate = yyyy + "-" + mm + "-" + dd;

        dates.push(stringDate);
        sDate.setDate(sDate.getDate() + 1);
      }
      return dates;
    },
    async fetchUrl(url) {
      url = server + url;
      url = encodeURI(url);
      let gObject = {};

      try {
        //API call
        const getResponse = await fetch(url);
        gObject = await getResponse.json();
      } catch (e) {
        console.log(e);
      }

      return gObject;
    },
    async fetchData(url) {
      let data = [];
      try {
        const gObject = await this.fetchUrl(url);
        //Asignamos el valor (ejeY y ejeX)
        data = gObject.Value;
      } catch (e) {
        console.log(e);
      }
      return data;
    },
    async fetchCorr(url, body) {
      let data = "";
      url = server + url;
      url = encodeURI(url);
      try {
        const getResponse = await fetch(url, body);
        const gObject = await getResponse.json();
        data = gObject;
      } catch (e) {
        console.log(e);
      }

      return data;
    },
  },
};
