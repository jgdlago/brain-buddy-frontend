<script setup>
    import { FilterMatchMode } from '@primevue/core';
import { Button, Column, DataTable, Dialog, IconField, InputIcon, InputText, Popover, Toast, Toolbar } from 'primevue';
    import { ref } from 'vue';

    const props = defineProps({
        title: String,
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
        },
        loading: {
            type: Boolean, //TODO conferir
            default: false
        }
    });

    const modalVisible = ref(false);
    const modalDeleteVisible = ref(false);
    const edit = ref(false);
    const obj = ref({ ...props.object.value });

    const handleAdd = () => {
        obj.value = { ...props.object.value };
        edit.value = false;
        modalVisible.value = true;
    }

    const handleEdit = (row) => {
        const normalize = (item) => item ? { ...item, key: item.key ?? item.id } : null;

        obj.value = {
            ...row,
            activity_area: normalize(row.activity_area),
            owner_user: normalize(row.owner_user)
        };
        
        edit.value = true;
        modalVisible.value = true;
    }

    const confirmDelete = (row) => {
        obj.value = { ...row };
        modalDeleteVisible.value = true;
    }

    const handleDelete = () => {
        props.handleDelete(obj.value, () => {
            modalDeleteVisible.value = false;
        });
    }

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

</script>

<template>
    <div class="container">
        <div class="box">
            <Toolbar class="w-full toolbar">
                <template #start>
                    <div class="flex items-center gap-4">
                        <IconField iconPosition="left" class="w-64">
                            <InputIcon class="flex items-center justify-center pl-3">
                                <i class="pi pi-search text-gray-400" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar..."
                                class="pl-10 w-full h-full border border-gray-300 rounded-lg" />
                        </IconField>
                    </div>
                </template>
                <template #center>
                    <h3>{{props.title}}</h3>
                </template>
                <template #end>
                    <Button label="Adicionar" class="button" @click="handleAdd"/>
                </template>
            </Toolbar>
            <DataTable v-model:filters="filters" :globalFilterFields="['name']" class="size-full" scrollable scrollHeight="100vh" :value="props.data" showGridlines strippedRows paginator :rows="15" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
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
                        <div class="flex gap-[0.5rem] justify-center">
                            <Button icon="pi pi-pencil" link @click="() => handleEdit(row)"/>
                            <Button icon="pi pi-trash" link style="color: var(--p-primary-danger)" @click="() => confirmDelete(row)"/>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog :header="edit ? 'Editar' : 'Inserir'" v-model:visible="modalVisible" modal dismissableMask>
        <slot name="addContent" :form="obj" :edit="edit" :close="() => modalVisible = false"/>
    </Dialog>
    <Dialog header="Confirmar exclusão" v-model:visible="modalDeleteVisible" modal dismissableMask>
        <div class="flex flex-col">
            Tem certeza que deseja excluir o item "{{obj.name }}"?   
            <div class="flex justify-center gap-[1rem] mt-[1rem]">
                <Button label="Excluir" severity="danger" @click="() => handleDelete()"/>
                <Button label="Cancelar" severity="primary" @click="modalDeleteVisible = false"/>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
</style>