<template>
    <div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Start Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            id="start-date"
            v-model="startDate"
            :max="endDate"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">End Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            id="end-date"
            v-model="endDate"
            :min="startDate"
            :max="maxEndDate"
          />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        maxEndDate:String,
        parentEndDate: String,
        parentStartDate: String,
    },
    data () {
        return {
            startDate: this.parentStartDate,
            endDate: this.parentEndDate,
        }
    },
    emits: ["startDate", "endDate"],
    watch: {
        startDate: function (date){
            this.$emit("startDate", date);
        },
        endDate: function(date){
            this.$emit("endDate", date);
        },
    },
}
</script>