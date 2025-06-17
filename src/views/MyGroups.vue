<script setup>
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, Carousel, Column, DataTable } from 'primevue';
import { onMounted, ref } from 'vue';
import { getGroups } from '../services/GroupService';
import { useUserStore } from '../stores/userStore';
import { getPlayers } from '../services/PlayerService';

const groups = ref([]);
const players = ref([]);
const expandedRows = ref(null);
const userStore = useUserStore();

onMounted(async () => {
    groups.value = await getGroups(userStore.id);
})

const handleGetPlayers = async (id) => {
    // players.value = await getPlayers(id);
    players.value = [{
        "id": 0,
        "name": "string",
        "age": 0,
        "gender": "Masculino",
        "character": "Tito",
        "institution": "string",
        "performance_flag": "string",
        "help_flags": "string"
    }]
}

const onTabOpen = async (event) => {
    await handleGetPlayers(event.index);
}

</script>

<template>
    <div class="container">
        <div class="box">
            <Accordion @tabOpen="(event) => onTabOpen(event)">
                <AccordionPanel v-for="group in groups" :key="group.id" :value="group.id" >
                    <AccordionHeader>{{ group.name }}</AccordionHeader>
                    <AccordionContent>
                        <DataTable :value="players" class="size-full" paginator :rows="15" strippedRows paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
                        currentPageReportTemplate="{first} até {last} de {totalRecords}" removableSort sort>
                            <Column field="name" header="Nome" class="w-4/10" sortable/>
                            <Column field="institution.name" header="Instituição" class="w-5/10" sortable/>
                            <template #empty> Nenhum jogador encontrado. </template> 
                            <template #loading> Carregando jogadores, por favor aguarde. </template>
                        </DataTable>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>