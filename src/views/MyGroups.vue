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
    players.value = await getPlayers(id);
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
                        <p>
                            <span class="font-semibold text-gray-600">Usuário administrador: </span>
                            {{ group.responsible_user.name }}
                        </p>
                        <p>
                            <span class="font-semibold text-gray-600">Instituição: </span>
                            {{ group.institution.name }}
                        </p>
                        <p>
                            <span class="font-semibold text-gray-600">Código de acesso: </span>
                            {{ group.access_code }}
                        </p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>