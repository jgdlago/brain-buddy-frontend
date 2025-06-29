<script setup>
import { Button, Carousel, Select, Slider, Toolbar } from 'primevue';
import { createChart } from '../utils/graphUtils';
import Graph from '../components/Graph.vue';
import { onMounted, ref, toRaw, watch } from 'vue';
import { getPlayers, listPlayers } from '../services/PlayerService';
import FilterSelect from '../components/FilterSelect.vue';
import { listActivityArea } from '../services/ActivityAreaService';
import { getGroups, groupReport, listGroups } from '../services/GroupService';
import { useUserStore } from '../stores/userStore';
import { characters, educationLevel, genders } from '../utils/objUtils';

//TODO ver como implementar o filtro, rever opções, adicionar "TODOS" como uma opção do multiselect, rever como fazer o filtro da idade

const charts = [
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

const selectedGroup = ref(null);
const selectedPlayers = ref([]);
const selectedGenders = ref(null);
const selectedAges = ref([6, 12]);
const selectedEducationLevel = ref(null);
const selectedActivityAreas = ref(null);
const selectedCharacters = ref(null);

const players = ref([]);
const groups = ref([]);
const activityAreas = ref([]);

const userStore = useUserStore();

onMounted(async () => {
    players.value = await listPlayers(selectedGroup);
    activityAreas.value = await listActivityArea();
    groups.value = await listGroups(userStore.id);
})

//TODO conferir tudo certo
//o select de players n deveria mostrar só os das turmas selecionadas?
//etc

const rawArray = (arr) => {
    try {
        return toRaw(arr).map((item) => item.key);
    } catch (error) {
        return null;
    }
};

const handleGetGraph = async () => {
    const params = {
        activity_area: rawArray(selectedActivityAreas.value),
        age_min: selectedAges.value[0],
        age_max: selectedAges.value[1],
        character: selectedCharacters.value?.key,
        education_level: selectedEducationLevel.value?.key,
        gender: selectedGenders.value?.key,
        group: rawArray(selectedGroup.value),
        player: rawArray(selectedPlayers.value),
    }

    console.log(params);

    const response = await groupReport(params);
}

</script>

<template>
    <div class="min-h-screen bg-gray-50 py-2 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Cabeçalho -->
            <div class="text-center mb-4">
                <h1 class="text-3xl font-bold text-gray-800">Análise de Desempenho</h1>
                <p class="text-gray-600 mt-2">Visualização de dados educacionais</p>
            </div>

            <!-- Container principal -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <!-- Toolbar superior -->
                <Toolbar class="custom-toolbar !p-4 !border-b !border-gray-200 !rounded-t-xl">
                    <template #start>
                        <div class="flex items-center">
                            <i class="pi pi-users text-primary mr-3"></i>
                            <h3 class="text-xl font-semibold">Visão geral da turma</h3>
                        </div>
                    </template>
                    <template #end>
                        <!-- <div class="flex items-center gap-2">
                            <span class="text-gray-600 hidden sm:inline">Grupo:</span>
                            <Select :options="groups" v-model="selectedGroup" optionLabel="name" placeholder="Selecione"
                                class="min-w-[200px]" @change="handleGetGraph" />
                        </div> -->
                    </template>
                </Toolbar>

                <!-- Filtros -->
                <div class="p-6">
                    <!-- Primeira linha de filtros -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <!-- Filtro Jogadores -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Jogadores</label>
                            <FilterSelect v-model="selectedPlayers" :options="players" filter
                                placeholder="Selecione jogadores" class="w-full" />
                        </div>

                        <!-- Filtro de turmas -->
                         <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Turmas</label>
                            <FilterSelect v-model="selectedGroup" :options="groups" filter
                                placeholder="Seleciona as turmas" class="w-full"/>
                         </div>

                        <!-- Filtro Idade -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <div class="px-2">
                                <div class="text-center text-sm text-gray-600 mb-1">
                                    {{ selectedAges[0] }} a {{ selectedAges[1] }} anos
                                </div>
                                <Slider v-model="selectedAges" :min="6" :max="12" range class="w-full custom-slider" />
                            </div>
                        </div>

                        <!-- Filtro Gênero -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                            <FilterSelect v-model="selectedGenders" :options="genders" placeholder="Todos" single
                                class="w-full" />
                        </div>
                    </div>

                    <!-- Segunda linha de filtros -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <!-- Filtro Ano Escolar -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ano Escolar</label>
                            <FilterSelect v-model="selectedEducationLevel" :options="educationLevel" placeholder="Selecione" single
                                class="w-full" />
                        </div>

                        <!-- Filtro Instituição -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Instituição</label>
                            <FilterSelect v-model="selectedActivityAreas" :options="activityAreas" filter
                                placeholder="Selecione" class="w-full" />
                        </div>

                        <!-- Filtro Personagem -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Personagem</label>
                            <FilterSelect v-model="selectedCharacters" :options="characters" placeholder="Selecione" single
                                class="w-full" />
                        </div>
                    </div>

                    <!-- Botão de ação -->
                    <div class="flex justify-center">
                        <Button label="Atualizar Gráficos" icon="pi pi-chart-bar" @click="handleGetGraph" class="p-button-raised" />
                    </div>

                    <!-- Gráficos -->
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Desempenho dos Alunos</h3>
                            <div class="flex gap-2">
                                <Button icon="pi pi-download" class="p-button-text p-button-sm" />
                                <Button icon="pi pi-refresh" class="p-button-text p-button-sm" />
                            </div>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-lg p-4 flex justify-center">
                            <Carousel :value="charts" :numVisible="1" :numScroll="1" circular :autoplayInterval="5000">
                                <template #item="chartSlot">
                                    <div class="flex items-center justify-center">
                                        <Graph :chartData="chartSlot.data" />
                                    </div>
                                </template>
                                <template #previousicon>
                                    <Button icon="pi pi-chevron-left"
                                        class="p-button-rounded p-button-text absolute left-2" />
                                </template>
                                <template #nexticon>
                                    <Button icon="pi pi-chevron-right"
                                        class="p-button-rounded p-button-text absolute right-2" />
                                </template>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-toolbar {

    border: none !important;
}

.custom-slider {
    :deep(.p-slider-range) {
        background: linear-gradient(to right, #3b82f6, #10b981) !important;
    }

    :deep(.p-slider-handle) {
        border: 2px solid #3b82f6 !important;
    }
}
</style>