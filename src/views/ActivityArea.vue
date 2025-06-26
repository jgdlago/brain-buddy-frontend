<script setup>
import Form from '../components/Form.vue';
import { onMounted, ref } from 'vue';
import { Button, Toast, useToast } from 'primevue';
import { addActivityArea, deleteActivityArea, getActivityArea, updateActivityArea } from '../services/ActivityAreaService';
import Text from '../components/Input/Text.vue';
import Textarea from '../components/Input/Textarea.vue';
import { toastError, toastSuccess } from '../utils/utils';

const data = ref(null);
const loading = ref(false);
const toast = useToast();

const columns = [
    {
        header: 'Nome',
        field: 'name',
    },
    {
        header: 'Descrição',
        field: 'description',
    },
]

const object = {
    id: null,
    name: '',
    description: ''
}

const getData = async () => {
    loading.value = true;
    try {
        data.value = await getActivityArea();
    } catch (error) {
        toastError(toast, error.response?.data?.message || 'Erro ao carregar áreas de atividade');
    } finally {
        loading.value = false;
    }
}

onMounted(getData);

const submitForm = async (form, edit, close) => {
    try {
        if (edit) {
            await updateActivityArea(form);
            toastSuccess(toast, 'Área de atividade atualizada com sucesso');
        } else {
            await addActivityArea(form);
            toastSuccess(toast, 'Área de atividade cadastrada com sucesso');
        }
        await getData();
        close();
    } catch (error) {
        toastError(toast, error.response?.data?.message || 'Erro ao processar requisição');
    }
}

const handleDelete = async (row, close) => {
    try {
        await deleteActivityArea(row.id);
        toastSuccess(toast, 'Área de atividade excluída com sucesso');
        await getData();
        close();
    } catch (error) {
        toastError(toast, error.response?.data?.message || 'Erro ao excluir área de atividade');
    }
}
</script>

<template>
    <div class="min-h-full bg-gray-50 py-2 px-4">
        <div class="max-w-full mx-auto">
            <!-- Cabeçalho -->
            <div class="text-center mb-4">
                <h1 class="text-3xl font-bold text-gray-800">Áreas de Atividade</h1>
                <p class="text-gray-600 mt-2">Gerencie as áreas de atividade disponíveis</p>
            </div>

            <!-- Container principal -->
            <div class="overflow-hidden">
                <Toast position="top-right" />

                <Form title="Áreas de atividade" :columns="columns" :data="data" :object="object"
                    :handleDelete="handleDelete" :loading="loading">
                    <template #addContent="{ form, edit, close }">
                        <form @submit.prevent="submitForm(form, edit, close)" class="p-6 space-y-6">
                            <Text label="Nome" v-model="form.name" :max="255" class="w-full" />
                            <Textarea label="Descrição" v-model="form.description" class="w-full" rows="5" />
                            <div class="flex justify-end gap-3 pt-2">
                                <Button label="Cancelar" type="button" class="p-button-outlined p-button-secondary"
                                    @click="close" />
                                <Button :label="edit ? 'Atualizar' : 'Cadastrar'" type="submit"
                                    class="p-button-primary" />
                            </div>
                        </form>
                    </template>

                    <template #loading>
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px] z-20">
                            <div class="flex flex-col items-center justify-center gap-2">
                                <i class="pi pi-spinner pi-spin text-3xl text-primary"></i>
                                <p class="text-gray-600">Carregando áreas de atividade...</p>
                            </div>
                        </div>
                    </template>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos para os inputs */
:deep(.p-inputtext) {
    border-radius: 0.5rem !important;
    border: 1px solid #e2e8f0 !important;
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.2) !important;
    border-color: #6366f1 !important;
}

/* Estilos para o textarea */
:deep(.p-inputtextarea) {
    width: 100% !important;
    border-radius: 0.5rem !important;
    border: 1px solid #e2e8f0 !important;
    min-height: 120px !important;
}

/* Estilos para os botões */
:deep(.p-button) {
    border-radius: 0.5rem !important;
    padding: 0.5rem 1.25rem !important;
    font-weight: 500 !important;
}

:deep(.p-button-primary) {
    background: #4f46e5 !important;
    border-color: #4f46e5 !important;
}

:deep(.p-button-primary:hover) {
    background: #4338ca !important;
    border-color: #4338ca !important;
}

/* Estilos para a tabela */
:deep(.p-datatable) {
    font-size: 0.9rem;
}


/* Loading overlay */
:deep(.p-datatable-loading-overlay) {
    background: none !important;
    backdrop-filter: none !important;
}
</style>