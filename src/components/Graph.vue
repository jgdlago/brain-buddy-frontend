<script setup>
import Chart from "primevue/chart";

const props = defineProps({
    chartData: Object,
});

</script>

<template>
    <Chart :type="props.chartData.type" :data="props.chartData.data" :options="props.chartData.option" />
</template>

<style scoped>
</style>