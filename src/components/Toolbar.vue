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
    <Toolbar> 
        <template #start>
            <i class="pi pi-user" style="margin-right: 1rem;" @click="sidebarVisible = true"/>
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
</style>