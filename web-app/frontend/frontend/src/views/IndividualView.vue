<template>
  <div>
    <div class="d-flex justify-content-center">
      <h3 class="border border-dark col-8 mt-3">
        Individual graphs for {{ this.$route.params.id }}
      </h3>
    </div>
    <data-type-buttons
      class="mb-4 mt-4"
      @selectedDataType="(category) => (selectedCategory = category)"
    />
    <individual-graphs :dataType="selectedCategory" />
  </div>
</template>

<script>
import IndividualGraphs from "../components/IndividualGraphs.vue";
import DataTypeButtons from "../components/DataTypeButtons.vue";

export default {
  data() {
    return {
      selectedCategory: "Health",
    };
  },
  components: {
    IndividualGraphs,
    DataTypeButtons,
  },
  watch: {
    selectedCategory: function (category) {
      console.log(category);
      this.selectedCategory = category;
    },
  },
};
</script>
