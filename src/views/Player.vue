<script setup>
import { onMounted, ref } from 'vue';
import { Button, Carousel, Column, DataTable, IconField, InputIcon, InputText, Select, Tag, Toolbar } from 'primevue';
import { getPlayers } from '../services/PlayerService';
import { getGroups } from '../services/GroupService';
import { useUserStore } from '../stores/userStore';
import { formatDateTime } from '../utils/utils';
import Graph from '../components/Graph.vue';
import { createChart } from '../utils/graphUtils';
import { FilterMatchMode } from '@primevue/core/api';
import { PERFORMANCE } from '../utils/objUtils';

const players = ref([]);
const turmas = ref([]);
const expandedRows = ref(null);
const userStore = useUserStore();
const selectedGroup = ref(null);
const loading = ref(false);

onMounted(async () => {
    if (userStore.id) {
        loading.value = true;
        try {
            turmas.value = await getGroups(userStore.id);
            if (turmas.value.length > 0) {
                selectedGroup.value = turmas.value[0];
                await handleGetPlayers(selectedGroup);
            }
        } finally {
            loading.value = false;
        }
    }
});

const handleGetPlayers = async (row) => {
    loading.value = true;
    try {
        const rawPlayers = await getPlayers(row.value.id);

        players.value = rawPlayers.map(player => ({
            ...player,
            performance_index: PERFORMANCE[player.performance_flag].index,
            charts: [
                createChart({
                    labels: ['Fase 1', 'Fase 2', 'Fase 3'],
                    label: 'Desempenho',
                    data: [540, 325, 702],
                    type: 'bar'
                }),
                createChart({
                    labels: ['Fase 1', 'Fase 2', 'Fase 3'],
                    label: 'Desempenho',
                    data: [540, 325, 702],
                    type: 'pie'
                }),
            ]
        }));
    } finally {
        loading.value = false;
    }
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
    <div class="min-h-full bg-gray-50 py-2 px-4">
        <div class="w-full mx-auto">
            <!-- Cabeçalho -->
            <div class="text-center mb-4">
                <h1 class="text-3xl font-bold text-gray-800">Gerenciamento de Jogadores</h1>
                <p class="text-gray-600 mt-2">Visualize e acompanhe o desempenho dos alunos</p>
            </div>

            <!-- Container principal -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <!-- Toolbar superior -->
                <Toolbar class="custom-toolbar !p-4 !border-none !rounded-t-xl">
                    <template #start>
                        <div class="flex items-center gap-4">
                            <IconField iconPosition="left" class="w-64">
                                <InputIcon class="flex items-center justify-center pl-3">
                                    <i class="pi pi-search text-gray-400" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Buscar jogador..."
                                    class="pl-10 w-full h-full border border-gray-300 rounded-lg" />
                            </IconField>
                        </div>
                    </template>
                    <template #end>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-600 hidden sm:inline">Turma:</span>
                            <Select :options="turmas" v-model="selectedGroup" optionLabel="name"
                                placeholder="Selecione a turma" class="min-w-[220px]" :loading="loading"
                                @change="(row) => handleGetPlayers(row)" />
                        </div>
                    </template>
                </Toolbar>

                <!-- Tabela de jogadores -->
                <div class="p-6">
                    <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="players"
                        :loading="loading" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]"
                        :globalFilterFields="['name']" stripedRows removableSort :sortField="null"
                        currentPageReportTemplate="{first} até {last} de {totalRecords}"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        class="custom-datatable">
                        <Column expander style="width: 3rem" />

                        <Column field="name" header="Nome" sortable>

                            <template #body="{ data }">
                                <div class="font-medium text-gray-800">{{ data.name }}</div>
                            </template>
                        </Column>

                        <Column field="age" header="Idade" sortable>

                            <template #body="{ data }">
                                <div class="flex justify-center">
                                    <Tag :value="data.age" severity="info" class="min-w-[50px] justify-center" />
                                </div>
                            </template>
                        </Column>

                        <Column field="gender" header="Gênero" sortable>
                            <template #body="{ data }">
                                <div class="capitalize text-center text-gray-700">
                                    {{ data.gender}}
                                </div>
                            </template>
                        </Column>

                        <Column field="character" header="Personagem" sortable>
                            <template #body="{ data }">
                                <div class="flex justify-center">
                                    <Tag :value="data.character" severity="success"
                                        class="min-w-[70px] justify-center" />
                                </div>
                            </template>
                        </Column>

                        <Column field="performance_flag" header="Nível" sortable sortField="performance_index">

                            <template #body="{ data }">
                                <div class="flex justify-center">
                                    <Tag :value="PERFORMANCE[data.performance_flag].label"
                                        :severity="PERFORMANCE[data.performance_flag].severity"
                                        class="font-medium min-w-[100px] justify-center" />
                                </div>
                            </template>
                        </Column>

                        <Column field="performance_flag">
                            <template #body="{ data }">
                                <div class="flex justify-center">
                                    <i v-if="data.performance_flag === 'very_low'"
                                        class="pi pi-exclamation-triangle text-red-500 text-lg"
                                        v-tooltip.top="'Necessita de atenção especial'" />
                                    <span v-else class="text-gray-400">-</span>
                                </div>
                            </template>
                        </Column>

                        <template #expansion="{ data }">
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <div class="mb-4">
                                    <h4 class="font-semibold text-gray-700">Último progresso salvo:</h4>
                                    <p class="text-gray-600">{{ formatDateTime(data.updated_at) }}</p>
                                </div>

                                <div class="bg-white p-4 rounded-lg border border-gray-200">
                                    <Carousel :value="data.charts" :numVisible="1" :numScroll="1" circular>
                                        <template #item="chartSlot">
                                            <div>
                                                <Graph :chartData="chartSlot.data" />
                                            </div>
                                        </template>
                                        <!-- <template #previousicon>
                                            <Button icon="pi pi-chevron-left"
                                                class="p-button-rounded p-button-text absolute left-2" />
                                        </template>
                                        <template #nexticon>
                                            <Button icon="pi pi-chevron-right"
                                                class="p-button-rounded p-button-text absolute right-2" />
                                        </template> -->
                                    </Carousel>
                                </div>
                            </div>
                        </template>

                        <template #empty>
                            <div class="text-center py-8">
                                <i class="pi pi-users text-4xl text-gray-400 mb-3"></i>
                                <p class="text-gray-600">Nenhum jogador encontrado</p>
                                <p class="text-sm text-gray-500 mt-1">Selecione uma turma para visualizar os jogadores
                                </p>
                            </div>
                        </template>

                        <template #loading>
                            <div
                                class="absolute inset-0 flex items-center justify-center bg-white backdrop-blur-[1px] z-20">
                                <div class="flex flex-col items-center justify-center gap-2">
                                    <i class="pi pi-spinner pi-spin text-3xl text-primary"></i>
                                    <p class="text-primary">Carregando...</p>
                                </div>
                            </div>
                        </template>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-toolbar {
    border: none !important;
}

/* Estilo para a tabela */
:deep(.custom-datatable) {
    font-size: 0.9rem;
}

:deep(.p-datatable-loading-overlay),
:deep(.p-component-overlay) {
    background: none !important;
    backdrop-filter: none !important;
}
</style>