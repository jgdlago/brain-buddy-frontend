<script setup>
import { ref } from 'vue';
import NotificationDrawer from './NotificationDrawer.vue';
import Sidebar from './Sidebar.vue';
import { Toolbar } from 'primevue';
import { useUserStore } from '../stores/userStore';
const notificationDrawerVisible = ref(false);
const sidebarVisible = ref(false);

const userStore = useUserStore();
</script>

<template>
    <Toolbar class="toolbar"> 
        <template #start>
            <i class="pi pi-bars" style="margin-right: 1rem;" @click="sidebarVisible = true"/>
            Olá, {{userStore.name}} 
            <!-- todo -->
        </template>
        <template #end>
            <i class="pi pi-bell" @click="notificationDrawerVisible = true"/>
        </template>
    </ToolBar>
    <NotificationDrawer v-model:visible="notificationDrawerVisible"/>
    <Sidebar v-model:visible="sidebarVisible"/>
</template>

<style scoped>
    .toolbar {
        border: 0px;
        border-radius: 0;
        background-color: var(--p-primary-header);
        color: var(--p-primary-inverse-color);
        box-shadow: var(--shadow-heavy);
    }
</style>