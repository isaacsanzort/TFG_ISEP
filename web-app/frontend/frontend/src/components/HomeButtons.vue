<template>
  <div>
    <div>
      <router-link :to="getUrl()" class="btn btn-outline-success"
        ><slot></slot
      ></router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mode: String,
    selectedRegion: String,
    startDate: String,
    endDate: String,
  },
  methods: {
    getUrl() {
      return (
        "/" +
        this.mode +
        "/" +
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
