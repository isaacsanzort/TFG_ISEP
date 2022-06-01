<template>
    <div>
        <select
          class="form-select"
          aria-label="Select CCAA"
          v-model="selectedRegion"
        >
          <option
            v-for="region in regions"
            :value="region.name"
            :key="region.id"
          >
            {{ region.name }}
          </option>
        </select>
    </div>
</template>
<script>
export default {
    props: {
        defaulSelect: {
            type:String,
        },
    },
    data () {
        return {
            selectedRegion: this.defaulSelect,
            regions: [
                { id: 0, name: "España" },
                { id: 1, name: "Andalucia" },
                { id: 2, name: "Aragon" },
                { id: 3, name: "Principado de Asturias" },
                { id: 4, name: "Illes Balears" },
                { id: 5, name: "Canarias" },
                { id: 6, name: "Cantabria" },
                { id: 7, name: "Castilla y Leon" },
                { id: 8, name: "Castilla-La Mancha" },
                { id: 9, name: "Cataluña" },
                { id: 10, name: "Comunitat Valenciana" },
                { id: 11, name: "Extremadura" },
                { id: 12, name: "Galicia" },
                { id: 13, name: "Comunidad de Madrid" },
                { id: 14, name: "Region de Murcia" },
                { id: 15, name: "Comunidad Foral de Navarra" },
                { id: 16, name: "Pais Vasco" },
                { id: 17, name: "La Rioja" },
                { id: 18, name: "Ceuta" },
                { id: 19, name: "Melilla" },
            ]
        }
    },
    emits: ['selectedRegion'],
    beforeUpdate () {
        this.$emit('selectedRegion',this.selectedRegion);
    }
}
</script>