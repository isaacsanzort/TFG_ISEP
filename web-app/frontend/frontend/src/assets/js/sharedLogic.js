const server = "http://127.0.0.1:5000/";
const api_name = "flask_api";
export default {
  methods: {
    getUrl(code, region = "") {
      let startDate = this.$route.params.startDate;
      let endDate = this.$route.params.endDate;

      if (code.substring(0, 6) == "COVID-") {
        region = region == "" ? "/" + this.$route.params.id : "/" + region; //Transformar nombres de CAtaluña a cataluna etc..
        region = region.replaceAll("ñ", "n"); //España a Espana, Cataluña a Cataluna
        code = code.substring(6);
      }

      if(region != ""){
        region = "/" + region;
      }

      return (
        server +
        api_name +
        "/" +
        code +
        "/" +
        startDate +
        "/" +
        endDate +
        region
      );
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
    async fetchData(url) {
      let data = [];
      try {
        //Peticion API
        const getResponse = await fetch(url);
        const gObject = await getResponse.json();
        //Asignamos el valor (ejeY y ejeX)
        data = gObject.Value;
      } catch (e) {
        console.log(e);
      }
      return data;
    },
  },
};
