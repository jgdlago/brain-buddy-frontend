<template>
    <footer class="bg-white border-t border-gray-200 py-4">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-4 md:grid-cols-4 gap-6 mb-4">
                <div class="md:col-span-2 flex flex-col justify-center">
                    <div class="flex items-center mb-2 justify-center">
                        <img src="../../assets/images/logo.ico" alt="Logo" class="w-6 h-6 mr-2">
                        <span class="text-lg font-semibold text-indigo-700">Brain Buddy</span>
                    </div>
                    <p class="text-gray-500 text-xs leading-tight">
                        Plataforma de acompanhamento cognitivo para profissionais da saúde e educação.
                    </p>
                </div>
                
                <div class="text-center">
                    <h3 class="text-md font-semibold text-gray-800 mb-2">Contato</h3>
                    <ul class="space-y-1">
                        <li class="flex items-center">
                            <i class="pi pi-envelope text-indigo-500 text-sm mr-1"></i>
                            <span class="text-gray-500 text-xs">contato@brainbuddy.com</span>
                        </li>
                        <li class="flex items-center">
                            <i class="pi pi-phone text-indigo-500 text-sm mr-1"></i>
                            <span class="text-gray-500 text-xs">(54) 3333-3333</span>
                        </li>
                        <li class="flex items-center">
                            <i class="pi pi-map-marker text-indigo-500 text-sm mr-1"></i>
                            <span class="text-gray-500 text-xs">Passo Fundo, RS</span>
                        </li>
                    </ul>
                </div>

                <div class="text-center">
                    <h3 class="text-md font-semibold text-gray-800 mb-2">Redes Sociais</h3>
                    <div class="flex space-x-3 justify-center">
                        <a href="#" class="text-indigo-500 hover:text-indigo-700 transition-colors"
                            aria-label="Facebook">
                            <i class="pi pi-facebook text-lg"></i>
                        </a>
                        <a href="#" class="text-indigo-500 hover:text-indigo-700 transition-colors"
                            aria-label="Instagram">
                            <i class="pi pi-instagram text-lg"></i>
                        </a>
                        <a href="#" class="text-indigo-500 hover:text-indigo-700 transition-colors"
                            aria-label="LinkedIn">
                            <i class="pi pi-linkedin text-lg"></i>
                        </a>
                        <a href="#" class="text-indigo-500 hover:text-indigo-700 transition-colors"
                            aria-label="YouTube">
                            <i class="pi pi-youtube text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-100 text-center">
                <p class="text-gray-400 text-xs">
                    &copy; {{ new Date().getFullYear() }} Brain Buddy. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Lógica do componente (se necessário)
</script>
