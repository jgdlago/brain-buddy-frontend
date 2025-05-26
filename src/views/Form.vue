<script setup>
    import { Column, DataTable, IconField, InputIcon } from 'primevue';
    import { onMounted, ref } from 'vue';

    const columns = [
        {
            header: 'Nome',
            field: 'nome',
        },
        {
            header: 'CNPJ',
            field: 'cnpj',
        },
        {
            header: 'Área de atividade',
            field: 'activityAreaId',
        },
    ]

    const data = [
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
        {
            nome: "IFSUL",
            cnpj: "07858433000121",
            activityAreaId: 1
        },
        {
            nome: "Atitus",
            cnpj: "12345678901234",
            activityAreaId: 2
        },
    ]

</script>

<template>
    <div class="container">
        <DataTable class="table" :value="data" showGridlines strippedRows paginator :rows="10" paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
        currentPageReportTemplate="{first} até {last} de {totalRecords}" removableSort>
            <template #empty> No customers found. </template> 
            <template #loading> Loading customers data. Please wait. </template>
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable/>
        </DataTable>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
    }
    .table {
        width: 80%;
    }
</style>