<script setup>
    import { Button, Column, DataTable, Dialog, IconField, InputIcon, InputText, Popover } from 'primevue';
    import { ref } from 'vue';

    const props = defineProps({
        columns: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        object: {
            type: Object,
            default: {}
        },
        handleDelete: {
            type: Function,
            default: () => {}
        }
    });

    const modalVisible = ref(false);
    const edit = ref(false);
    const obj = ref({ ...props.object.value });

    const handleAdd = () => {
        obj.value = { ...props.object.value };
        edit.value = false;
        modalVisible.value = true;
    }

    const handleEdit = (row) => {
        obj.value = { ...row };
        edit.value = true;
        modalVisible.value = true;
    }

</script>

<template>
    <div class="container">
        <div class="box">
            <Button label="Adicionar" class="button" @click="handleAdd"/>
            <DataTable class="size-full" scrollable scrollHeight="100vh" :value="props.data" showGridlines strippedRows paginator :rows="15" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
            currentPageReportTemplate="{first} até {last} de {totalRecords}" removableSort>
                <template #empty> Nenhum dado encontrado. </template> 
                <template #loading> Carregando dados, por favor aguarde. </template>
                <Column v-for="col of props.columns" :key="col.field" :field="col.field" :header="col.header" sortable>
                    <template #editor="{data, field}">
                        <InputText v-model="data[field]"/>
                    </template>
                </Column>
                <Column>
                    <template #body="{ data: row }">
                        <div class="flex gap-[0.5rem]">
                            <Button icon="pi pi-pencil" link @click="() => handleEdit(row)"/>
                            <Button icon="pi pi-trash" link style="color: var(--p-primary-danger)" @click="() => props.handleDelete(row)"/>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog :header="edit ? 'Editar' : 'Inserir'" v-model:visible="modalVisible" modal dismissableMask>
        <slot name="addContent" :form="obj" :edit="edit"/>
    </Dialog>
</template>

<style scoped>

</style>