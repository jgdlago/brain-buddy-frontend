<script setup>
    import Form from '../components/Form.vue';
    import { ref } from 'vue';
    import Input from '../components/Input.vue';
    import { Button } from 'primevue';

    const modalVisible = ref(false);

    const handleAddActicityArea = () => {
        //addActicityArea service etc
    }

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

    const data = [
        {
            name: 'área de atividade',
            description: 'exemplo'
        },
    ]

    const object = {
        name: '',
        description: ''
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
                <Input label="Descrição" v-model="form.description"/>
                <Button label="Cadastrar" type="submit"/>
            </form>
        </template>
    </Form>
</template>

<style scoped>
</style>