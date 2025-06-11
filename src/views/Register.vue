<script setup>
  import { ref } from 'vue';
  import { register } from '../services/AuthService';
  import { useRouter } from 'vue-router';
import { Button, Toast, useToast } from 'primevue';
import Text from '../components/Input/Text.vue';
import Password from '../components/Input/Password.vue';
import { toastError } from '../utils/utils';

  const object = ref({
    nome: '',
    email: '',
    senha: '',
    senhaConf: ''
  })

  const router = useRouter();
  const toast = useToast();
  
  const handleCadastrar = async () => {
    try {
      await register(object.value);
      router.push('/player');
    } catch (error) {
      toastError(toast, error.response.data.message);
    }
  } 

  const handleEntrar = () => {
    router.push('/');
  }

</script>

<template>
  <Toast/>
  <div class="container authContainer">
    <div class="auth">
      <div class="authTitle">
        <img src="../assets/images/logo.ico" alt="Logo" />
        <h1>Painel Brain Buddy</h1>
        <h2>Cadastrar</h2>
      </div>

      <!-- TODO feedback na senha aqui -->
      <!-- TODO precognition https://laravel.com/docs/11.x/precognition#main-content -->
      <form @submit.prevent="handleCadastrar">
        <Text v-model="object.nome" label="Nome" id="nome" type="text" />
        <Text v-model="object.email" label="E-mail" id="email" type="text" />
        <Password v-model="object.senha" label="Senha" id="senha" type="password" feedback/>
        <Password v-model="object.senhaConf" label="Confirme a senha" id="senhaConf" type="password"/>

        <Button label="Cadastrar" type="submit" class="btn"/>
        <Button variant="link" label="Já tenho uma conta" size="small" @click="handleEntrar"/>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
