<script setup>
  import FloatLabel from 'primevue/floatlabel';
  import { Button } from 'primevue';

  const props = defineProps({
    id: String,
    label: String,
    showForgot: {
      type: Boolean,
      default: false
    },
    forgotRef: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['update:forgotRef']);
</script>

<template>
  <div class="p-inputwrapper">
    <FloatLabel variant="on">
      <slot />
      <label :for="id">{{ label }}</label>
    </FloatLabel>

    <div v-if="showForgot" class="text-right">
      <Button
        label="Esqueci minha senha"
        text
        size="small"
        @click="emit('update:forgotRef', true)"
      />
    </div>
  </div>
</template>
