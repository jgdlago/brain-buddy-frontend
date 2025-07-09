<script setup>
import { Button, Slider, Toast, Toolbar, useToast, Accordion, AccordionTab, Tag } from 'primevue';
import { createChart } from '../utils/graphUtils';
import Graph from '../components/Graph.vue';
import { onMounted, ref, toRaw } from 'vue';
import { listPlayers } from '../services/PlayerService';
import FilterSelect from '../components/FilterSelect.vue';
import { listActivityArea } from '../services/ActivityAreaService';
import { listGroups, listEducationLevel } from '../services/GroupService';
import { useUserStore } from '../stores/userStore';
import { characters, genders } from '../utils/objUtils';
import { toastError } from '../utils/utils';
import { report, reportExcel } from '../services/ReportService';

// Dados reativos
const charts = ref([]);
const graphData = ref(null);
const players = ref([]);
const groups = ref([]);
const activityAreas = ref([]);
const educationLevel = ref([]);
const levelList = ref([]);
const generated = ref(false);

// Filtros
const selectedGroup = ref(null);
const selectedPlayers = ref([]);
const selectedGenders = ref(null);
const selectedAges = ref([6, 12]);
const selectedEducationLevel = ref(null);
const selectedActivityAreas = ref(null);
const selectedCharacters = ref(null);
const selectedLevel = ref(null);

// Store e Toast
const userStore = useUserStore();
const toast = useToast();

// Carrega dados iniciais
onMounted(async () => {
    players.value = await listPlayers(selectedGroup);
    activityAreas.value = await listActivityArea();
    educationLevel.value = await listEducationLevel();
    levelList.value = await listEducationLevel();
    groups.value = await listGroups(userStore.id);
});

// Helper functions
const rawArray = (arr) => {
    try {
        return toRaw(arr).map((item) => item.key);
    } catch (error) {
        return null;
    }
};

const calculateSuccessRate = (correct, wrong) => {
    const total = correct + wrong;
    return total > 0 ? Math.round((correct / total) * 100) : 0;
};

const getPerformanceSeverity = (performanceFlag) => {
    switch (performanceFlag?.toLowerCase()) {
        case 'alto': return 'success';
        case 'médio': return 'warning';
        case 'baixo': return 'danger';
        default: return 'info';
    }
};

const createPlayerRadarChart = (player) => {
    const totals = player.totals;

    return createChart({
        type: 'radar',
        height: 350,
        title: `Desempenho de ${player.name}`,
        labels: ['Acertos', 'Erros', 'Tentativas', 'Níveis Completos', 'Pedidos de Ajuda'],
        datasets: [{
            name: player.name,
            data: [
                totals.correct,
                totals.wrong,
                totals.attempts,
                totals.levels_completed,
                totals.help_flags
            ]
        }],
        stepSize: 5
    });
};

// Handlers
const handleGetGraph = async () => {
    generated.value = true;
    const params = {
        activity_area: rawArray(selectedActivityAreas.value),
        age_min: selectedAges.value[0],
        age_max: selectedAges.value[1],
        character: selectedCharacters.value?.key,
        education_level: selectedEducationLevel.value?.key,
        level: selectedLevel.value?.key,
        gender: selectedGenders.value?.key,
        group: rawArray(selectedGroup.value),
        player: rawArray(selectedPlayers.value),
    };

    try {
        graphData.value = await report(params);
        charts.value = [];

        // Gráfico de dados totais
        charts.value.push(
            createChart({
                type: 'bar',
                height: 350,
                title: 'Métricas de Aprendizado',
                labels: ['Tentativas', 'Completos', 'Acertos', 'Erros', 'Pedidos de Ajuda'],
                datasets: [{
                    label: 'Total',
                    data: [
                        graphData.value.totals.total_attempts,
                        graphData.value.totals.total_completed,
                        graphData.value.totals.total_correct,
                        graphData.value.totals.total_wrong,
                        graphData.value.totals.total_help_flags
                    ]
                }],
                horizontal: true,
                dataLabels: true
            })
        );
    } catch (error) {
        toastError(toast, error.response?.data?.message || 'Erro ao carregar gráficos de aprendizado');
    }
};

const handleDownload = async () => {
    const params = {
        activity_area: rawArray(selectedActivityAreas.value),
        age_min: selectedAges.value[0],
        age_max: selectedAges.value[1],
        character: selectedCharacters.value?.key,
        education_level: selectedEducationLevel.value?.key,
        level: selectedLevel.value?.key,
        gender: selectedGenders.value?.key,
        group: rawArray(selectedGroup.value),
        player: rawArray(selectedPlayers.value),
    };

    try {
        await reportExcel(params);
    } catch (error) {
        toastError(toast, error.response?.data?.message || 'Erro ao exportar gráficos de aprendizado');
    }
};
</script>

<template>
    <div class="min-h-full bg-gray-50 py-2 px-4">
        <Toast position="top-right" />
        <div class="max-w-7xl mx-auto">
            <!-- Cabeçalho -->
            <div class="text-center mb-4">
                <h1 class="text-3xl font-bold text-gray-800">Análise de Aprendizado</h1>
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
                    </template>
                </Toolbar>

                <!-- Filtros -->
                <div class="p-6">
                    <!-- Primeira linha de filtros -->
                    <div class="grid grid-cols-5 gap-4 mb-6">
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
                                placeholder="Seleciona as turmas" class="w-full" />
                        </div>

                        <!-- Filtro Gênero -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                            <FilterSelect v-model="selectedGenders" :options="genders" placeholder="Todos" single
                                class="w-full" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <FilterSelect v-model="selectedLevel" :options="levelList" placeholder="Todos" single
                                class="w-full" />
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
                    </div>

                    <!-- Segunda linha de filtros -->
                    <div class="grid grid-cols-4 md:grid-cols-3 gap-4 mb-8">
                        <!-- Filtro Ano Escolar -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ano Escolar</label>
                            <FilterSelect v-model="selectedEducationLevel" :options="educationLevel"
                                placeholder="Selecione" single class="w-full" />
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
                            <FilterSelect v-model="selectedCharacters" :options="characters" placeholder="Selecione"
                                single class="w-full" />
                        </div>

                        <!-- Botão de ação -->
                        <div class="flex justify-center items-end">
                            <Button label="Aplicar filtros" icon="pi pi-chart-bar" @click="handleGetGraph"
                                class="p-button-raised h-7/10 w-7/10" />
                        </div>
                    </div>

                    <!-- Gráficos -->
                    <div v-if="generated" class="mb-6">
                        <!-- Seção de Dados Totais -->
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Dados Totais</h3>
                            <div class="flex gap-2">
                                <Button icon="pi pi-download" class="p-button-text p-button-sm"
                                    @click="handleDownload" />
                            </div>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                            <Accordion :multiple="true" :activeIndex="[0]">
                                <AccordionTab v-for="(chart, index) in charts" :key="index">
                                    <template #header>
                                        <div class="flex items-center">
                                            <i class="pi pi-chart-bar mr-2"></i>
                                            <span>{{ chart.options.title.text }}</span>
                                        </div>
                                    </template>
                                    <div class="flex justify-center w-full p-4">
                                        <div class="w-full max-w-4xl">
                                            <Graph :chartData="chart" class="w-full h-[350px]" />
                                        </div>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>

                        <!-- Seção de Dados dos Jogadores -->
                        <div v-if="graphData?.players?.length > 0">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-semibold">Dados dos Jogadores</h3>
                                <span class="text-sm text-gray-500">{{ graphData.players.length }} jogadores</span>
                            </div>

                            <div class="bg-white border border-gray-200 rounded-lg p-4">
                                <Accordion :multiple="true">
                                    <AccordionTab v-for="player in graphData.players" :key="player.id">
                                        <template #header>
                                            <div class="flex items-center justify-between w-full">
                                                <div class="flex items-center">
                                                    <i class="pi pi-user mr-2"></i>
                                                    <p class="font-medium">{{ player.name }}
                                                        <span class="text-gray-500 ml-2">{{ player.age }} anos</span>
                                                    </p>

                                                </div>
                                                <Tag :value="player.performance_flag"
                                                    :severity="getPerformanceSeverity(player.performance_flag)" />
                                            </div>
                                        </template>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                                            <!-- Gráfico Radar -->
                                            <div class="flex justify-center items-center">
                                                <Graph :chartData="createPlayerRadarChart(player)"
                                                    class="w-full h-[350px]" />
                                            </div>

                                            <!-- Dados Estatísticos -->
                                            <div class="space-y-3">
                                                <div class="p-3 bg-gray-50 rounded-lg">
                                                    <div class="font-medium">Desempenho Geral</div>
                                                    <div class="flex items-center mt-2">
                                                        <span class="text-gray-600 mr-2">Taxa de acerto:</span>
                                                        <span class="font-semibold">
                                                            {{ calculateSuccessRate(player.totals.correct,
                                                                player.totals.wrong) }}%
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="grid grid-cols-2 gap-3">
                                                    <div class="p-3 bg-gray-50 rounded-lg">
                                                        <div class="text-gray-600">Acertos</div>
                                                        <div class="text-xl font-bold">{{ player.totals.correct }}</div>
                                                    </div>
                                                    <div class="p-3 bg-gray-50 rounded-lg">
                                                        <div class="text-gray-600">Erros</div>
                                                        <div class="text-xl font-bold">{{ player.totals.wrong }}</div>
                                                    </div>
                                                    <div class="p-3 bg-gray-50 rounded-lg">
                                                        <div class="text-gray-600">Tentativas</div>
                                                        <div class="text-xl font-bold">{{ player.totals.attempts }}
                                                        </div>
                                                    </div>
                                                    <div class="p-3 bg-gray-50 rounded-lg">
                                                        <div class="text-gray-600">Níveis completos</div>
                                                        <div class="text-xl font-bold">{{ player.totals.levels_completed
                                                            }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
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
        transition: all 0.2s ease !important;
    }

    :deep(.p-slider-range) {
        transition: all 0.2s ease !important;
    }
}
</style>