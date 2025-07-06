<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
console.log(userStore)
const notifications = ref([
    {
        id: 1,
        title: 'Teste concluído - João Silva',
        message: 'O paciente completou o teste de habilidades cognitivas. Resultados disponíveis para análise.',
        time: '10 min atrás',
        read: false,
        icon: 'pi pi-check-circle',
        priority: 'high'
    },
    {
        id: 2,
        title: 'Novo paciente cadastrado',
        message: 'Maria Oliveira (8 anos) foi registrada no sistema pelo responsável.',
        time: '1 hora atrás',
        read: false,
        icon: 'pi pi-user-plus',
        priority: 'medium'
    },
    {
        id: 3,
        title: 'Padrão detectado - Turma A',
        message: '3 pacientes apresentaram padrão similar no teste de atenção. Sugerimos análise comparativa.',
        time: '2 dias atrás',
        read: true,
        icon: 'pi pi-chart-line',
        priority: 'high'
    },
    {
        id: 4,
        title: 'Lembrete: Reunião mensal',
        message: 'Reunião de equipe agendada para amanhã às 14h para discutir casos.',
        time: '3 dias atrás',
        read: true,
        icon: 'pi pi-calendar',
        priority: 'medium'
    }
]);

const showNotifications = ref(false);
const unreadCount = ref(notifications.value.filter(n => !n.read).length);

const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    if (showNotifications.value) {
        notifications.value.forEach(n => n.read = true);
        unreadCount.value = 0;
    }
};
</script>

<template>
    <header class="bg-white shadow-sm z-10 sticky top-0 left-0 right-0">
        <div class="flex items-center h-16 px-4 sm:px-6 lg:px-8">
            <!-- Espaço vazio à esquerda para balancear com o ícone de notificações -->
            <div class="flex-1"></div>

            <!-- Nome do usuário centralizado -->
            <div class="flex-1 flex justify-center">
                <div class="text-center">
                    <span class="text-lg font-semibold text-indigo-700">Olá, {{ userStore.name }}</span>
                </div>
            </div>

            <!-- Ícone de notificações -->
            <div class="flex-1 flex justify-end">
                <div class="ml-auto relative">
                    <button @click="toggleNotifications"
                        class="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 focus:outline-none transition-colors">
                        <span class="sr-only">Notificações</span>
                        <i class="pi pi-bell text-xl"></i>
                        <span v-if="unreadCount > 0"
                            class="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
                    </button>

                    <Transition name="fade">
                        <div v-if="showNotifications"
                            class="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg py-1 bg-white ring-1 ring-indigo-100 focus:outline-none">
                            <div
                                class="px-4 py-2 border-b border-indigo-100 flex justify-between items-center bg-indigo-50 rounded-t-xl">
                                <h3 class="text-lg font-bold text-indigo-700">Seus Avisos</h3>
                                <span v-if="unreadCount > 0" class="text-sm font-medium text-indigo-600">
                                    {{ unreadCount }} nov{{ unreadCount > 1 ? 'inhas' : 'inha' }}
                                </span>
                            </div>
                            <div class="max-h-96 overflow-y-auto">
                                <div v-for="notification in notifications" :key="notification.id"
                                    class="px-4 py-3 hover:bg-indigo-50 border-b border-indigo-100 last:border-0 transition-colors">
                                    <div class="flex items-start gap-3">
                                        <div class="flex-shrink-0 p-2 bg-indigo-100 rounded-full">
                                            <i :class="notification.icon" class="text-indigo-600"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm font-bold text-indigo-800">{{ notification.title }}</p>
                                            <p class="text-sm text-indigo-600">{{ notification.message }}</p>
                                            <p class="mt-1 text-xs text-indigo-400">{{ notification.time }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-2 border-t border-indigo-100 text-center bg-indigo-50 rounded-b-xl">
                                <a href="#" class="text-sm font-bold text-indigo-600 hover:text-indigo-800">
                                    Ver todas as mensagens
                                </a>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

@media (min-width: 1024px) {
    header div.w-16 {
        width: 16rem;
    }

    header div.w-64 {
        width: 16rem;
    }
}
</style>