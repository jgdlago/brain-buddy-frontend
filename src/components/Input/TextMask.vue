<script setup>
  import InputMask from 'primevue/inputmask';
  import { computed, ref } from 'vue';
  import InputWrapper from '../InputWrapper.vue';

  const props = defineProps({
    modelValue: String,
    id: String,
    label: String,
    mask: String
  });

  const emit = defineEmits(['update:modelValue']);

  const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  const maskModel = ref('');
  switch (props.mask) {
    case 'cnpj':
      maskModel.value = '99.999.999.9999-99';
      break;
  
    default:
      break;
  }
</script>

<template>
  <InputWrapper :id="id" :label="label">
    <InputMask
      v-model="inputValue"
      :id="id"
      size="large"
      :mask="maskModel"
    />
  </InputWrapper>
</template>
