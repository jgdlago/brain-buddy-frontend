<script setup>
    import { ref } from 'vue';
    import { Column, DataTable, Select } from 'primevue';
    import { getPlayers } from '../services/PlayerService';
    import { getGroups } from '../services/GroupService';

    // const players = ref([]);
    // const turmas = ref([]);
    const expandedRows = ref(null);

    const players = [{id: 1, nome: 'Maria Aparecida'}, {id: 2, nome: 'João Sumido'}];
    const turmas = [{key: 1, nome: 'Turma 1'}, {key: 2, nome: 'Turma 2'}];

    // players = getPlayers(groupId);
    // turmas = getGroups(userId);
</script>

<template>
    <div class="container">
        <div class="box">
            <Select class="select" :options="turmas" optionLabel="nome" placeholder="Selecione"/>
            <DataTable v-model:expandedRows="expandedRows" :value="players" class="size-full" showGridlines>
                <Column expander style="width: 5%;"/>
                <Column field="id" header="Código"/>
                <Column field="nome" header="Nome"/>
                <template #expansion="slotProps">
                    <div class="p-4 bg-gray-100 rounded">
                        <strong>Detalhes:</strong> {{ slotProps.data.nome }}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
</style>