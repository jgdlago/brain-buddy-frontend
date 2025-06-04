<script setup>
    import { onMounted, ref } from 'vue';
    import { Carousel, Column, DataTable, IconField, InputIcon, InputText, Select } from 'primevue';
    import { getPlayers } from '../services/PlayerService';
    import { getGroups } from '../services/GroupService';
    import { useUserStore } from '../stores/userStore';
    import { formatDateTime} from '../utils/utils';
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

        players.value = rawPlayers.map(player => ({
            ...player,
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
            <div class="flex justify-between w-full">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Busca" />
                </IconField>
                <Select :options="turmas" v-model="selectedGroup" key="id" optionLabel="name" placeholder="Selecione" @change="(row) => handleGetPlayers(row)"/>
            </div>
            <DataTable v-model:filters="filters" v-model:expandedRows="expandedRows" :value="players" class="size-full" showGridlines paginator :rows="15" :globalFilterFields="['name']" strippedRows paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
            currentPageReportTemplate="{first} até {last} de {totalRecords}" removableSort>
                <Column expander class="w-1/20"/>
                <Column field="name" header="Nome" class="w-9/20" sortable/>
                <Column field="age" header="Idade" class="w-2/20" sortable/>
                <Column field="gender" header="Gênero" class="w-3/20" sortable/>
                <Column field="" header="Desempenho" sortable/>
                <template #expansion="slotProps">
                    <div>
                        <strong>Último progresso salvo: {{ formatDateTime(slotProps.data.updated_at) }}</strong>
                        <Carousel
                        :value="slotProps.data.charts"
                        :numVisible="1"
                        :numScroll="1"
                        >
                            <template #item="chartSlot">
                                <Graph :type="chartSlot.data.type" :data="chartSlot.data"/>
                            </template>
                        </Carousel>
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