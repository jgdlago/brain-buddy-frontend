<script setup>
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
    chartData: Object,
});

</script>

<template>
    <VueApexCharts width="500" height="400" :type="props.chartData.type" :options="props.chartData.options" :series="props.chartData.series"/>
</template>

<style scoped>
</style>