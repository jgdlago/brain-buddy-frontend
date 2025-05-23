<script setup>
import { computed, ref, useTemplateRef } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const props = defineProps({
  modelValue: String,
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text' // 'text' or 'password'
  },
  showForgot: {
    type: Boolean,
    default: false
  },
  forgotRef: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:forgotRef']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

</script>

<template>
  <div class="form-field">
    <FloatLabel variant="on">
      <component
        :is="type === 'password' ? Password : InputText"
        v-model="inputValue"
        :id="id"
        size="large"
        :feedback="type === 'password' ? false : undefined"
        :toggleMask="type === 'password'"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>

    <div v-if="showForgot" class="forgot-link">
      <Button
        label="Esqueci minha senha"
        text
        size="small"
        @click="emit('update:forgotRef', true)"
      />
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  margin-bottom: 0.5rem;
}

.forgot-link {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

</style>
