<template>
    <div class="row" aria-label="Category Checkboxes">
        <div
            v-for="data in dataCheckbox"
            :key="data.id"
            :class="divClassCheckbox"
        >
            <input
            type="radio"
            class="btn-check"
            name="btnradio"
            :id="'btnradio' + data.id"
            :value="data.msg"
            v-model="selectedDataType"
            />
            <label :class="labelClassCheckbox" :for="'btnradio' + data.id"
            >{{ data.msg }} Data</label
            >
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataCheckbox: [
                { id: 0, msg: "Health" },
                { id: 1, msg: "Economic" },
                { id: 2, msg: "Sociodemographic" },
            ],
            selectedDataType: "Health", // button selected by default 
            divClassCheckbox: "col-4",
            labelClassCheckbox: "btn btn-outline-primary col-10",
        }
    },
    emits: ["selectedDataType"],
    beforeUpdate() {
        this.$emit("selectedDataType", this.selectedDataType);
    },
}
</script>