<script setup>
    import { Button, Drawer } from 'primevue';
    import router from '../router';

    const props = defineProps({
        visible: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['update:visible']);

    const logoff = () => {
        sessionStorage.clear();
        router.push('/login');
    }

</script>

    <template>
        <Drawer :visible="visible" header="Menu" position="left" dismissable @update:visible="() => {emit('update:visible', false)}" class="menu">
            <div class="flex flex-col items-start">
                <Button link label="Player" @click="router.push('/player')"/>
                <Button link label="Áreas de atividade" @click="router.push('/activity-area')"/>
                <Button link label="Instituições" @click="router.push('/institutions')"/>
            </div>
            <template #footer>
                <Button link label="Sair" style="color: var(--p-primary-danger)" @click="logoff()"/>
            </template>
        </Drawer>
    </template>

    <style scoped>
        Button {
            color: var(--p-primary-dark-blue);
        }
    </style> 