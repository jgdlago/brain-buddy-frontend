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

    const navigate = (route) => {
        router.push(route);
        emit('update:visible', false);
    }

    const logoff = () => {
        sessionStorage.clear();
        router.push('/login');
    }

</script>

    <template>
        <Drawer :visible="visible" header="Menu" position="left" dismissable @update:visible="() => {emit('update:visible', false)}" class="menu">
            <div class="flex flex-col items-start">
                <Button link label="Jogadores" @click="navigate('/player')"/>
                <Button link label="Áreas de atividade" @click="navigate('/activity-area')"/>
                <Button link label="Instituições" @click="navigate('/institutions')"/>
                <Button link label="Turmas" @click="navigate('/group')"/>
            </div>
            <template #footer>
                <Button link label="Sair" style="color: var(--p-primary-danger)" @click="logoff()"/>
            </template>
        </Drawer>
    </template>

    <style scoped>
        Button {
            color: var(--p-primary-contrast-text);
        }
    </style> 