<script setup>
    import Form from '../components/Form.vue';
    import { onMounted, ref } from 'vue';
    import { Button } from 'primevue';
    import { addInstitution, deleteInstitution, getInstitutions, updateInstitution } from '../services/InstitutionService';
    import Text from '../components/Input/Text.vue';
    import TextMask from '../components/Input/TextMask.vue';
    import Dropdown from '../components/Dropdown.vue';
    import { listActivityArea } from '../services/ActivityAreaService';
    import { listUsers } from '../services/UserService';

    const data = ref(null);

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
            field: 'activity_area_id',
        },
        {
            header: 'Usuário responsável',
            field: 'owner_user_id',
        },
    ]

    const object = {
        name: '',
        cnpj: '',
        activity_area_id: null,
        owner_user_id: null
    }

    onMounted(async () => {
        data.value = await getInstitutions();
    });

    const submitForm = (form, edit) => {
        if (edit) {
            updateInstitution(form);
        } else {
            addInstitution(form);
        }
    }

    const handleDelete = (row) => {
        deleteInstitution(row.id);
    }

</script>

<template>
    <Form :columns="columns" :data="data" :object="object" :handleDelete="handleDelete">
        <template #addContent="{ form, edit}">
            <form  @submit.prevent="submitForm(form, edit)">
                <Text label="Nome" v-model="form.name"/>
                <TextMask label="CNPJ" v-model="form.cnpj" mask="cnpj"/>
                <Dropdown v-model="form.activity_area" :getData='listActivityArea' placeholder="Área de atividade"/>
                <Dropdown v-model="form.owner_user" :getData='listUsers' placeholder="Usuário responsável"/>
                <Button label="Cadastrar" type="submit"/>
            </form>
        </template>
    </Form>
</template>

<style scoped>
</style>