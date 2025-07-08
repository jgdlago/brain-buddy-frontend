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
    <div class="min-h-full bg-gray-50 py-2 px-4">
        <div class="max-w-full mx-auto">
            <!-- Cabeçalho melhorado -->
            <div class="text-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Gerenciamento de Turmas</h1>
                <p class="text-gray-600 mt-2">Visualize e administre todas as suas turmas cadastradas</p>

            </div>

            <!-- Container principal -->
            <div class="w-full overflow-hidden">
                <Accordion @tabOpen="(event) => onTabOpen(event)">
                    <AccordionPanel v-for="group in groups" :key="group.id" :value="group.id">
                        <AccordionHeader>
                            <div class="flex items-center justify-between w-full">
                                <span>{{ group.name }}</span>
                                <span class="text-sm font-normal text-gray-500">Código: {{ group.access_code }}</span>
                            </div>
                        </AccordionHeader>
                        <AccordionContent>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                                <div>
                                    <p class="text-sm font-semibold text-gray-500">Informações da Turma</p>
                                    <p class="mt-1">
                                        <span class="font-medium text-gray-700">Instituição: </span>
                                        {{ group.institution.name }}
                                    </p>
                                    <p class="mt-1">
                                        <span class="font-medium text-gray-700">Responsável: </span>
                                        {{ group.responsible_user.name }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-500">Dados de Acesso</p>
                                    <p class="mt-1">
                                        <span class="font-medium text-gray-700">Código para alunos: </span>
                                        <span class="font-mono bg-gray-100 px-2 py-1 rounded">
                                            {{ group.access_code }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
    </div>
</template>