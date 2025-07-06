<script setup>
import SidebarMenu from '../components/layout/SidebarMenu.vue';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <SidebarMenu />

            <!-- Conteúdo principal -->
            <div class="flex-1 flex flex-col min-w-0">
                <Header />

                <main class="flex-1 overflow-y-auto">
                    <div class="p-6">
                        <RouterView />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    </div>
</template>