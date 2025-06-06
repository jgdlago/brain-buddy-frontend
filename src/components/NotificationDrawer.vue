<script setup>
    import { Drawer } from 'primevue';
import { ref } from 'vue';

    const data = ref([
        {
            id: 1,
            title: 'Exemplo 1'
        }
    ])

    const props = defineProps({
        visible: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['update:visible']);

</script>

    <template>
        <!-- TODO terminar -->
        <Drawer :visible="visible" header="Notificações" position="right" dismissable @update:visible="() => {emit('update:visible', false)}">
            <div v-for="n in data" :key="n.id">
                {{ n.title }}
            </div>   
        </Drawer>
    </template>

    <style scoped>
    </style> 