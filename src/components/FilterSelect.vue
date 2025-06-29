<script setup>
import { MultiSelect, Select } from 'primevue';
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Array, Object, String, Number],
        default: null
    },
    options: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: ''
    },
    filter: {
        type: Boolean,
        default: false,
    },
    single: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});
</script>

<template>
    <MultiSelect
        v-if="!single"
        v-model="value"
        :options="options"
        optionLabel="label"
        :filter="filter"
        showClear
        display="chip"
        class="w-full"
        :placeholder="placeholder"
        :showToggleAll="filter"
        :maxSelectedLabels="1"
    />
    <Select
        v-else
        v-model="value"
        :options="options"
        optionLabel="label"
        :filter="filter"
        showClear
        class="w-full"
        :placeholder="placeholder"
    />
</template>
