<script setup>
import Chart from "primevue/chart";

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--p-text-color');
const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

const chartOptions = {
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder
            }
        }
    }
}

const props = defineProps({
    type: String,
    chartData: Object,
});

</script>

<template>
    <Chart :type="props.type" :data="props.chartData" :options="chartOptions" />
</template>

<style scoped>
</style>