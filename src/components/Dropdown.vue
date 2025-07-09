<script setup>
import { Select } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: String,
    getData: Function,
    modelValue: Object,
});

const data = ref([]);

const resolveId = item => item?.key ?? item?.id ?? null;

onMounted(async () => {
  const result = await props.getData();
  data.value = Array.isArray(result) ? result : Object.values(result);
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return resolveId(props.modelValue);
  },
  set(val) {
    const selected = data.value.find(item => item.key === val);
    emit('update:modelValue', selected ?? null);
  }
});

</script>

<template>
    <Select v-model="model" :options="data" optionLabel="label" optionValue="key" :placeholder="placeholder" emptyMessage="Nenhum item encontrado"/>
</template>
