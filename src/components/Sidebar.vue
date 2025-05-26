<script setup>
    import { Drawer } from 'primevue';
import { ref } from 'vue';

    const props = defineProps({
        visible: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['update:visible']);

</script>

    <template>
        <Drawer :visible="visible" header="" position="left" dismissable @update:visible="() => {emit('update:visible', false)}">
        </Drawer>
    </template>

    <style scoped>
    </style> 