<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado responsivo
const sidebarOpen = ref(window.innerWidth >= 1024)
const isMobile = ref(window.innerWidth < 1024)

// Itens do menu
const menuItems = [
    { name: 'Análise de desempenho', icon: 'pi pi-users', route: '/group' },
    { name: 'Jogadores', icon: 'pi pi-user-plus', route: '/player' },
    { name: 'Áreas de atividade', icon: 'pi pi-briefcase', route: '/activity-area' },
    { name: 'Instituições', icon: 'pi pi-building', route: '/institutions' },
    { name: 'Minhas turmas', icon: 'pi pi-bookmark-fill', route: '/my-group' }
]

// Controles
const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value
const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 1024
    sidebarOpen.value = !isMobile.value
}

const navigate = (route) => {
    router.push(route)
    if (isMobile.value) sidebarOpen.value = false
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

const logoff = () => {
    sessionStorage.clear();
    router.push('/login');
}
</script>

<template>
    <!-- Overlay simples sem efeitos -->
    <div v-if="isMobile && sidebarOpen" class="fixed inset-0 bg-black/30 z-40 cursor-pointer"
        @click="sidebarOpen = false" />

    <!-- Sidebar principal -->
    <aside class="fixed top-0 left-0 h-screen bg-secondary shadow-xl z-50 flex flex-col transition-all duration-200"
        :class="{
            'w-64': sidebarOpen,
            'w-16': !sidebarOpen,
            '-translate-x-full': isMobile && !sidebarOpen,
            'translate-x-0': !isMobile || sidebarOpen
        }">
        <!-- Cabeçalho com logo -->
        <div class="p-4 border-b border-white/10">
            <template v-if="sidebarOpen">
                <!-- Layout aberto -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 min-w-0">
                        <img src="../../assets/images/logo.ico" alt="Logo" class="w-8 h-8 object-contain" />
                        <span class="text-white font-medium text-lg truncate">
                            Brain Buddy
                        </span>
                    </div>
                    <button @click="toggleSidebar" class="p-1 rounded text-white hover:bg-white/10 transition-colors">
                        <i class="pi pi-chevron-left text-sm" />
                    </button>
                </div>
            </template>
            <template v-else>
                <!-- Layout fechado -->
                <div class="flex flex-col items-center gap-3">
                    <img src="../../assets/images/logo.ico" alt="Logo" class="w-8 h-8 object-contain" />
                    <button @click="toggleSidebar" class="p-1 rounded text-white hover:bg-white/10 transition-colors">
                        <i class="pi pi-chevron-right text-sm" />
                    </button>
                </div>
            </template>
        </div>

        <!-- Itens do menu -->
        <nav class="flex-1 overflow-y-auto py-2 px-2">
            <ul class="space-y-1">
                <li v-for="item in menuItems" :key="item.route">
                    <button @click="navigate(item.route)"
                        class="w-full flex items-center p-3 rounded-lg text-white/90 transition-colors" :class="{
                            'bg-primary': router.currentRoute.value.path === item.route,
                            'hover:bg-white/5': router.currentRoute.value.path !== item.route,
                            'justify-center': !sidebarOpen
                        }">
                        <i :class="item.icon" class="text-lg" />
                        <span v-if="sidebarOpen" class="ml-3 text-sm truncate">
                            {{ item.name }}
                        </span>
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Rodapé -->
        <div class="p-3 border-t border-white/10">
            <button @click="logoff()"
                class=" w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                :class="{ 'justify-center': !sidebarOpen }">
                <i class="pi pi-sign-out" />
                <span v-if="sidebarOpen" class="ml-3 text-sm">
                    Sair
                </span>
            </button>
        </div>
    </aside>

    <!-- Espaçador do conteúdo -->
    <div class="transition-all duration-200" :class="{
        'ml-64': sidebarOpen && !isMobile,
        'ml-16': !sidebarOpen && !isMobile
    }" />
</template>

<style scoped>
/* Scrollbar personalizada */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

button {
    -webkit-tap-highlight-color: transparent;
}
</style>