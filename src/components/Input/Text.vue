<script setup>
import { computed } from 'vue';
import InputWrapper from '../InputWrapper.vue';
import { InputText } from 'primevue';

const props = defineProps({
  modelValue: String,
  id: String,
  label: String
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <InputWrapper :id="id" :label="label">
    <InputText v-model="inputValue" :id="id" size="large" />
  </InputWrapper>
</template>
