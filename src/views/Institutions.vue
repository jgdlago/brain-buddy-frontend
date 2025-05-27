<script setup>
    import Form from '../components/Form.vue';
    import { onMounted, ref } from 'vue';
    import Input from '../components/Input.vue';
    import { Button } from 'primevue';
    import { addInstitution, deleteInstitution, getInstitutions, updateInstitution } from '../services/InstitutionService';

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
                <Input label="Nome" v-model="form.name"/>
                <Input label="CNPJ" v-model="form.cnpj"/>
                <Input label="Área de atividade" v-model="form.activity_area_id"/>
                <Input label="Usuário responsável" v-model="form.owner_user_id"/>
                <Button label="Cadastrar" type="submit"/>
            </form>
        </template>
    </Form>
</template>

<style scoped>
</style>