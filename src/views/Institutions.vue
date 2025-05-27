<script setup>
    import Form from '../components/Form.vue';
    import { ref } from 'vue';
    import Input from '../components/Input.vue';
    import { Button } from 'primevue';

    const modalVisible = ref(false);

    const handleAddInstitution = () => {
        // service etc
    }

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

    const data = [
        {
            name: 'instituição',
            cnpj: '12345678901234',
            activity_area_id: 1,
            owner_user_id: 2
        },
    ]

    const object = {
        name: '',
        cnpj: '',
        activity_area_id: null,
        owner_user_id: null
    }

    const submitForm = (form, edit) => {
        if (edit) {
            //edit service
        } else {
            //add service
        }
    }

    const handleDelete = (row) => {
        console.log(row);
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