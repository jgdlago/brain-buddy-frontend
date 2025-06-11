<script setup>
import Password from 'primevue/password';
import { computed } from 'vue';
import InputWrapper from '../InputWrapper.vue';

const props = defineProps({
  modelValue: String,
  id: String,
  label: String,
  showForgot: Boolean,
  forgotRef: Boolean,
  feedback: [Boolean, false]
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
      :feedback="props.feedback"
      :toggleMask="true"
      autocomplete="new-password"
      mediumRegex="^.{8,}" 
      strongRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
    />
    <!-- medio: 8 chars -->
    <!-- forte: 1 minusculo, 1 maiusculo e 1 numero, 8 char -->
  </InputWrapper>
</template>
