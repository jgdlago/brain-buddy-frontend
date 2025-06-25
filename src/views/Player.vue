<script setup>
    import { onMounted, ref } from 'vue';
    import { Carousel, Column, DataTable, IconField, InputIcon, InputText, Select, Tag, Toolbar } from 'primevue';
    import { getPlayers } from '../services/PlayerService';
    import { getGroups } from '../services/GroupService';
    import { useUserStore } from '../stores/userStore';
    import { formatDateTime, PERFORMANCE} from '../utils/utils';
    import Graph from '../components/Graph.vue';
    import { createChart } from '../utils/graphUtils';
    import { FilterMatchMode } from '@primevue/core/api';

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
        // players.value = await getPlayers(row.value.id);

        const rawPlayers = await getPlayers(row.value.id);

        //TODO provisório, até a api retornar os dados pros gráficos
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
        }))
    }

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

</script>

<template>
    <div class="container">
        <div class="box">
            <Toolbar class="w-full toolbar">
                <template #start>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar" />
                    </IconField>
                </template>
                <template #center>
                    <h3>Jogadores</h3>
                </template>
                <template #end>
                    <Select :options="turmas" v-model="selectedGroup" key="id" optionLabel="name" placeholder="Selecione" @change="(row) => handleGetPlayers(row)"/>
                </template>
            </Toolbar>
            <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="players" class="size-full" paginator :rows="15" :globalFilterFields="['name']" strippedRows paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
            currentPageReportTemplate="{first} até {last} de {totalRecords}" removableSort sort>
                <Column expander class="w-1/20"/>
                <Column field="name" header="Nome" class="w-7/20" sortable/>
                <Column field="age" header="Idade" class="w-2/20" sortable/>
                <Column field="gender" header="Gênero" class="w-3/20" sortable/>
                <Column field="character" header="Personagem" class="w-1/20" sortable/>
                <Column field="performance_flag" header="Nível de conhecimento" class="w-6/20" sortable sortField="performance_index">
                    <template #body="{data}">
                        <Tag :value="PERFORMANCE[data.performance_flag].label" :severity="PERFORMANCE[data.performance_flag].severity" />
                    </template>
                </Column>
                <Column field="performance_flag">
                    <template #body="{data}">
                        <!-- TODO provisório -->
                        <i class="pi pi-flag-fill" v-if="data.performance_flag === 'very_low'" style="color: var(--p-primary-danger)"/> 
                    </template>
                </Column>
                <template #expansion="{data}">
                    <div class="flex flex-col">
                        <strong>Último progresso salvo: {{ formatDateTime(data.updated_at) }}</strong>
                        <div class="flex justify-center">
                            <Carousel
                            :value="data.charts"
                            :numVisible="1"
                            :numScroll="1"
                            circular
                            >
                                <template #item="chartSlot">
                                    <Graph :chartData="chartSlot.data"/>
                                </template>
                            </Carousel>
                        </div>
                    </div>
                </template>
                <template #empty> Nenhum jogador encontrado. </template> 
                <template #loading> Carregando jogadores, por favor aguarde. </template>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
</style>