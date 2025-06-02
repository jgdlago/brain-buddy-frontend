<script setup>
  import Textarea from 'primevue/textarea';
  import { computed } from 'vue';
  import InputWrapper from '../InputWrapper.vue';

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
    <Textarea v-model="inputValue" :id="id" autoResize size="large"/>
  </InputWrapper>
</template>
