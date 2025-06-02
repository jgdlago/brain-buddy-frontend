<script setup>
import { Select } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: String,
    getData: Function,
    modelValue: Object
});

const data = ref([]);

onMounted(async () => {
    data.value = await props.getData();
})

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get: () => {
    return data.value.find(item => item.id === props.modelValue); //TODO tá demorando e tá feio
  },
  set: (val) => {
    emit('update:modelValue', val.id);
  }
});

</script>

<template>
    <Select v-model="selectedValue" :options="data" key="id" optionLabel="name" :placeholder="placeholder" emptyMessage="Nenhum item encontrado"/>
</template>

<style scoped>
</style>
