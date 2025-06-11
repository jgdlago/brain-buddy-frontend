<script setup>
    import Form from '../components/Form.vue';
    import { onMounted, ref } from 'vue';
    import { Button, Toast, useToast } from 'primevue';
    import { addInstitution, deleteInstitution, getInstitutions, updateInstitution } from '../services/InstitutionService';
    import Text from '../components/Input/Text.vue';
    import TextMask from '../components/Input/TextMask.vue';
    import Dropdown from '../components/Dropdown.vue';
    import { listActivityArea } from '../services/ActivityAreaService';
    import { listUsers } from '../services/UserService';
import { toastError, toastSuccess } from '../utils/utils';

    const data = ref(null);
    const toast = useToast();

    const columns = [
        {
            header: 'Nome',
            field: 'name',
        },
        {
            header: 'CNPJ',
            field: 'cnpj',
        },
        {
            header: 'Área de atividade',
            field: 'activity_area.name',
        },
        {
            header: 'Usuário responsável',
            field: 'owner_user.name',
        },
    ]

    const object = {
        name: '',
        cnpj: '',
        activity_area: null,
        owner_user: null
    }

    const getData = async () => {
        data.value = await getInstitutions();
    }

    onMounted(getData);

    const submitForm = async (form, edit, close) => {
        if (edit) {
            try {
                await updateInstitution(form);    
                toastSuccess(toast, 'Instituição atualizada com sucesso');
                await getData();
                close();  
            } catch (error) {
                toastError(toast, error.response.data.message); 
            }
        } else {
            try {
                await addInstitution(form);  
                toastSuccess(toast, 'Instituição cadastrada com sucesso');
                await getData();
                close();  
            } catch (error) {
                toastError(toast, error.response.data.message); 
            }
        }
    }

    const handleDelete = async (row, close) => {
        try {
            await deleteInstitution(row.id);
            toastSuccess(toast, 'Instituição excluída com sucesso');
            await getData();
            close();
        } catch (error) {
            toastError(toast, error.response.data.message);
        }
    }

</script>

<template>
    <Toast/>
    <Form title="Instituições" :columns="columns" :data="data" :object="object" :handleDelete="handleDelete">
        <template #addContent="{ form, edit, close}">
            <form  @submit.prevent="submitForm(form, edit, close)">
                <Text label="Nome" v-model="form.name"/>
                <TextMask label="CNPJ" v-model="form.cnpj" mask="cnpj"/>
                <Dropdown v-model="form.activity_area" :getData='listActivityArea' placeholder="Área de atividade" class="input"/>
                <Dropdown v-model="form.owner_user" :getData='listUsers' placeholder="Usuário responsável" class="input"/>
                <Button label="Cadastrar" type="submit"/>
            </form>
        </template>
    </Form>
</template>

<style scoped>
</style>