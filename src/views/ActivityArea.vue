<script setup>
    import Form from '../components/Form.vue';
    import { onMounted, ref } from 'vue';
    import Input from '../components/Input.vue';
    import { Button } from 'primevue';
    import { addActivityArea, deleteActivityArea, getActivityArea, updateActivityArea } from '../services/ActivityAreaService';

    const data = ref(null);

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
        name: '',
        description: ''
    }

    onMounted(async () => {
        data.value = await getActivityArea();
    });

    const submitForm = (form, edit) => {
        if (edit) {
            updateActivityArea(form);
        } else {
            addActivityArea(form);
        }
    }

    const handleDelete = (row) => {
        deleteActivityArea(row.id);
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