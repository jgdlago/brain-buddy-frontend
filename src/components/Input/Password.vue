<script setup>
import Password from 'primevue/password';
import { computed } from 'vue';
import InputWrapper from '../InputWrapper.vue';

const props = defineProps({
  modelValue: String,
  id: String,
  label: String,
  showForgot: Boolean,
  forgotRef: Boolean
});

const emit = defineEmits(['update:modelValue', 'update:forgotRef']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <InputWrapper
    :id="id"
    :label="label"
    :showForgot="showForgot"
    :forgotRef="forgotRef"
    @update:forgotRef="emit('update:forgotRef', true)"
  >
    <Password
      v-model="inputValue"
      :id="id"
      size="large"
      :feedback="false"
      :toggleMask="true"
    />
  </InputWrapper>
</template>
