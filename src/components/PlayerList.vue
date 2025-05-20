<script setup>
    import { ref } from 'vue';
    import Toolbar from './Toolbar.vue';

    const players = [{id: 1, nome: 'Maria Aparecida'}, {id: 2, nome: 'João Sumido'}];
    const turmas = [{key: 1, nome: 'Turma 1'}, {key: 2, nome: 'Turma 2'}];
    const expandedRows = ref(null);
</script>

<template>
    <Toolbar/>
    <div class="container">
        <div class="controls">
            <Select class="select" :options="turmas" optionLabel="nome" placeholder="Selecione"/>
        </div>
        <DataTable v-model:expandedRows="expandedRows" :value="players" class="table" showGridlines>
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
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .table, .controls {
        width: 80%;
        margin-top: 1rem;
    }
    .controls {
        display: flex;
        flex-direction: row-reverse;
    }
    .select {
        width: 10vw;
    }
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>