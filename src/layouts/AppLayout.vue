<!-- layouts/AppLayout.vue -->
<script setup>
import SidebarMenu from '../components/SidebarMenu.vue';
import Header from '../components/Header.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div class="flex-1 flex overflow-hidden">
            <SidebarMenu />

            <main class="flex-1 overflow-y-auto">
                <div class="p-2">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>