<script setup>
import { Select } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: String,
    getData: Function,
    modelValue: Number
});

const data = ref([]);

onMounted(async () => {
    data.value = await props.getData();
})

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
});

</script>

<template>
    <Select v-model="model" :options="data" optionLabel="label" optionValue="key" :placeholder="placeholder" emptyMessage="Nenhum item encontrado"/>
</template>

<style scoped>
</style>
