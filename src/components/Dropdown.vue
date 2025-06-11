<script setup>
import { Select } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    placeholder: String,
    getData: Function,
    modelValue: Object,
});

const data = ref([]);

onMounted(async () => {
    data.value = await props.getData();
})

const emit = defineEmits(['update:modelValue']);

const model = computed({
    get() {
        if (props.modelValue) {
            return props.modelValue.key ?? props.modelValue.id ?? null;
        }
        return null;
    },
    set: val => emit('update:modelValue', val)
});

</script>

<template>
    <Select v-model="model" :options="data" optionLabel="label" optionValue="key" :placeholder="placeholder" emptyMessage="Nenhum item encontrado" editable/>
</template>

<style scoped>
</style>
