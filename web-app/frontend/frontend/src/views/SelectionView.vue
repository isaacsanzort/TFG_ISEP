<template>
  <div class="container-fluid">
    <div class="align-items-center row mt-5">
      <individual-mode-home />
      <compare-mode-home />
    </div>
  </div>
</template>

<script>
import IndividualModeHome from "../components/IndividualModeHome.vue";
import CompareModeHome from "../components/CompareModeHome.vue";

export default {
  components: {
    IndividualModeHome,
    CompareModeHome,
  },
};
</script>
