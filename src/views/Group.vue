<script setup>
import { Carousel, Select, Slider, Toolbar } from 'primevue';
import { createChart } from '../utils/graphUtils';
import Graph from '../components/Graph.vue';
import { onMounted, ref, watch } from 'vue';
import { getPlayers, listPlayers } from '../services/PlayerService';
import FilterSelect from '../components/FilterSelect.vue';
import { listActivityArea } from '../services/ActivityAreaService';
import { getGroups } from '../services/GroupService';
import { useUserStore } from '../stores/userStore';

//TODO ver como implementar o filtro, rever opções, adicionar "TODOS" como uma opção do multiselect, rever como fazer o filtro da idade

const charts =[
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
const selectedAges = ref([]);
const selectedSchoolYears = ref(null);
const selectedInstitutionType = ref(null);
const selectedCharacters = ref(null);

const players = ref([]);
const groups = ref([]);
const institutionType = ref([]);

const genders = [{
        value: 'male',
        label: 'Masculino'
    },
    {
        value: 'female',
        label: 'Feminino'
    }
];

const characters = [{
        value: 'tito',
        label: 'Tito'
    },
    {
        value: 'nina',
        label: 'Nina'
    }
];

//TODO descobrir oq por aqui
const schoolYears = [{
        value: 1,
        label: '1-2° ano'
    },
    {
        value: 2,
        label: 'exemplo'
    }
];

const userStore = useUserStore();

onMounted(async () => {
    players.value = await listPlayers(selectedGroup);
    institutionType.value = await listActivityArea();
    groups.value = await getGroups(userStore.id);
    selectedGroup.value = groups.value[0];
})

const handleGetGraph = () => {
    //TODO melhorar
    let filter = `?group=${selectedGroup.value.id}`;

    if (selectedPlayers.value.length > 0) {
    filter += `&player=${selectedPlayers.value.map(player => player.key).join(',')}`;
    }

    console.log(filter);
}

watch(selectedPlayers, () => {
    handleGetGraph();
})

//provisório, só pra ver q funciona
// watch(selectedPlayers, () => {
//     console.log('players:', selectedPlayers.value);
// });

</script>

<template>
    <div class="container">
        <div class="box items-center">
            <Toolbar class="w-full toolbar">
                <template #center>
                    <h3>Visão geral da turma</h3>
                </template>
                <template #end>
                    <Select :options="groups" v-model="selectedGroup" key="id" optionLabel="name" placeholder="Selecione" @change="() => handleGetGraph()"/>
                </template>
            </Toolbar>
            <div class="filters">
                <Toolbar class="w-full toolbar">
                    <template #start>
                        <FilterSelect
                            placeholder="Jogadores"
                            v-model="selectedPlayers"
                            :options="players"
                            filter
                        />
                    </template>
                    <template #center>
                        <div class="flex flex-col justify-between w-full h-full items-center">
                            <div class="text-center mb-[5px]">
                            Idade: {{ selectedAges[0] }} a {{ selectedAges[1] }}
                            </div>
                            <Slider
                                v-model="selectedAges"
                                :min="6"
                                :max="18"
                                range
                                class="w-8/10 md:w-80"
                                id="age"
                            />
                        </div>
                    </template>
                    <template #end>
                        <FilterSelect
                            placeholder="Gênero"
                            v-model="selectedGenders"
                            :options="genders"
                        />
                    </template>
                </Toolbar>
                <Toolbar class="w-full toolbar">
                    <template #start>
                        <FilterSelect
                            placeholder="Ano escolar" 
                            v-model="selectedSchoolYears"
                            :options="schoolYears"
                        />
                    </template>
                    <template #center>
                        <FilterSelect
                            placeholder="Tipo de instituição" 
                            v-model="selectedInstitutionType"
                            :options="institutionType"
                            filter
                        />
                    </template>
                    <template #end>
                        <FilterSelect
                            placeholder="Personagem" 
                            v-model="selectedCharacters"
                            :options="characters"
                        />
                    </template>
                </Toolbar>
            </div>
            <div class="flex flex-col w-full">
                <div class="flex justify-center">
                    <Carousel
                    :value="charts"
                    :numVisible="1"
                    :numScroll="1"
                    circular
                    >
                        <template #item="chart">
                            <Graph :type="chart.data.type" :data="chart.data"/>
                        </template>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .filters {
        width: 80%;
    }
</style>