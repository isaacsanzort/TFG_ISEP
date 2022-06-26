<template>
  <div class="card">
    <div class="card-body">
      <div v-if="showCorrData">
        <p><b>Pearson</b> coefficient:</p>
        <span>{{ pearsonCorr }}</span>
        <p class="p-value">Two-tailed p-value (Pearson):</p>
        <span>{{ pearsonPValue }}</span>
        <p><b>Spearman</b> coefficient:</p>
        <span>{{ spearmanCorr }}</span>
        <p class="p-value">Two-tailed p-value (Spearman):</p>
        <span>{{ spearmanPValue }}</span>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="showCorrData = false"
          >
            Calculate other
          </button>
        </div>
      </div>
      <div v-else>
        <h4 id="corr">Correlation</h4>
        <p class="corr-info">
          The Pearson and Spearman correlation coefficient will be calculated
          for 2 variables. It is recommended that you use data with same time periodicity.
          Anyway, missing data will be interpolated linearly.
        </p>
        <button type="button" class="btn btn-primary" @click="getCorr">
          Calculate
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import sharedLogic from "../assets/js/sharedLogic";

export default {
  props: {
    chartData: Array,
    isCorrelatable: Boolean,
  },
  data() {
    return {
      pearsonCorr: null,
      pearsonPValue: null,
      spearmanCorr: null,
      spearmanPValue: null,
      showCorrData: false,
    };
  },
  mixins: [sharedLogic],
  methods: {
    async fetchCorrData(body) {
      let bodyUrl = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      let url = "flask_api/corr";
      let data = await this.fetchCorr(url, bodyUrl);

      return data;
    },
    //This method only for CompareView, for CompareRegion much easier
    async getCorr() {
      if (this.isCorrelatable) {
        const data = new FormData();
        data.append("data-1", JSON.stringify(this.chartData[0].data));
        data.append("data-2", JSON.stringify(this.chartData[1].data));
        let body = {
          data: {
            data1: this.chartData[0].data,
            data2: this.chartData[1].data,
          },
        };
        let corr_data = await this.fetchCorrData(body);
        //Update variables
        this.pearsonCorr = corr_data["Pearson"].corr;
        this.pearsonPValue = corr_data["Pearson"].p_value;
        this.spearmanCorr = corr_data["Spearman"].corr;
        this.spearmanPValue = corr_data["Spearman"].p_value;
        this.showCorrData = true;
      } else {
        alert("Only select two Features");
      }
    },
  },
  goToCorrInfo() {
    this.showCorrData = false;
  },
};
</script>
<style scoped>
p {
  margin-bottom: 1vh;
  text-align: left;
}
span {
  border-style: solid;
  border-radius: 5px;
  border-width: 2px;
  display: inline-block;
  margin-bottom: 2vh;
  min-height: 2.2rem;
  min-width: 40%;
  padding: 1vh 3vh;
}

.corr-info {
  text-align: center;
}

.p-value {
  font-size: 0.8rem;
}
</style>
