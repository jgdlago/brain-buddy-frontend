<script setup>
    import Form from '../components/Form.vue';
    import { onMounted, ref } from 'vue';
    import { Button, Toast, useToast } from 'primevue';
    import { addActivityArea, deleteActivityArea, getActivityArea, updateActivityArea } from '../services/ActivityAreaService';
    import Text from '../components/Input/Text.vue';
    import Textarea from '../components/Input/Textarea.vue';
import { toastError } from '../utils/utils';

    const data = ref(null);
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

    onMounted(async () => {
        data.value = await getActivityArea();
    });

    const submitForm = async (form, edit) => {
        if (edit) {
            try {
                updateActivityArea(form);
                toastSuccess(toast, 'Área de atividade atualizada com sucesso');
                close();  
            } catch (error) {
                toastError(toast, error.response.data.message); 
            }
        } else {
            try {
                addActivityArea(form);
                toastSuccess(toast, 'Área de atividade cadastrada com sucesso');
                close();  
            } catch (error) {
                toastError(toast, error.response.data.message); 
            }
        }
    }

    const handleDelete = async (row) => {
        try {
            await deleteActivityArea(row.id);
            toastSuccess(toast, 'Área de atividade excluída com sucesso');
        } catch (error) {
            toastError(toast, error.response.data.message);
        }
    }

</script>

<template>
    <Toast/>
    <Form title="Áreas de atividade" :columns="columns" :data="data" :object="object" :handleDelete="handleDelete">
        <template #addContent="{ form, edit}">
            <form  @submit.prevent="submitForm(form, edit)">
                <Text label="Nome" v-model="form.name" :max="255"/>
                <Textarea label="Descrição" v-model="form.description" type="textArea"/>
                <Button :label="edit ? 'Editar' : 'Cadastrar'" type="submit"/>
            </form>
        </template>
    </Form>
</template>

<style scoped>
</style>