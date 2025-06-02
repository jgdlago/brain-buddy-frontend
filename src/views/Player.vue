<script setup>
    import { onMounted, ref } from 'vue';
    import { Column, DataTable, Select } from 'primevue';
    import { getPlayers } from '../services/PlayerService';
    import { getGroups } from '../services/GroupService';
    import { useUserStore } from '../stores/userStore';
    import { formatDateTime } from '../utils';

    const players = ref([]);
    const turmas = ref([]);
    const expandedRows = ref(null);
    const userStore = useUserStore();
    const selectedGroup = ref(null);

    onMounted(async () => {
        if (userStore.id) {
            turmas.value = await getGroups(userStore.id);
            if (turmas.value.length > 0) {
                selectedGroup.value = turmas.value[0];
                await handleGetPlayers(selectedGroup);
            }
        }
    });

    const handleGetPlayers = async (row) => {
        players.value = await getPlayers(row.value.id);
    }
</script>

<template>
    <div class="container">
        <div class="box">
            <Select :options="turmas" v-model="selectedGroup" key="id" optionLabel="name" placeholder="Selecione" @change="(row) => handleGetPlayers(row)"/>
                <DataTable v-model:expandedRows="expandedRows" :value="players" class="size-full" showGridlines>
                <Column expander style="width: 5%;"/>
                <Column field="name" header="Nome"/>
                <Column field="age" header="Idade"/>
                <template #expansion="slotProps">
                    <div class="p-4 bg-gray-100 rounded">
                        <strong>Detalhes</strong>
                        <p>Nome: {{ slotProps.data.name }}</p>
                        <p>Idade: {{ slotProps.data.age }}</p>
                        <p>Gênero: {{ slotProps.data.gender }}</p>
                        <p>Personagem: {{ slotProps.data.character }}</p>
                        <p>Criado em: {{ formatDateTime(slotProps.data.created_at) }}</p>
                        <p>Último progresso salvo: {{ formatDateTime(slotProps.data.updated_at) }}</p>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
</style>