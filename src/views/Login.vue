<script setup>
  import { onMounted, ref } from 'vue';
  import { login, recover } from '../services/AuthService';
  import { useRouter } from 'vue-router';
  import { Button, Dialog, Toast, useToast } from 'primevue';
  import Text from '../components/Input/Text.vue';
  import Password from '../components/Input/Password.vue';
  import { toastError } from '../utils/utils';

  const object = ref({
    email: '',
    senha: ''  
  })
  
  const router = useRouter();

  const toast = useToast();
  
  const handleLogin = async () => {
    try {
      await login(object.value);
      router.push('/player');
    } catch (error) {
      toastError(toast, error.response.data.message);
    }
  } 

  const emailRecover = ref('');

  const handleRecover = async () => {
    try {
      await recover(emailRecover.value);
    } catch (error) {
      toastError(toast, error.response.data.message);
    }
  }

  const handleRegister = () => {
    router.push('/register');
  }

  const modalVisible = ref(false);

  onMounted(() => {
    document.documentElement.classList.remove('p-dark');
  });

</script>

<template>
  <Toast/>
  <div class="container authContainer">
    <div class="auth">
      <div class="authTitle">
        <img src="../assets/images/logo.ico" alt="Logo" />
        <h1>Painel Brain Buddy</h1>
        <h2>Entrar</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <Text v-model="object.email" label="E-mail" id="email" type="text"/>
        <Password v-model="object.senha" label="Senha" id="senha" type="password" showForgot v-model:forgotRef="modalVisible"/>

        <Button label="Entrar" type="submit" class="btn"/>
        <Button variant="link" label="Crie uma conta" size="small" @click="handleRegister"/>
      </form>
    </div>
  </div>
  <Dialog v-model:visible="modalVisible" modal header="Recuperar senha">
    <form @submit.prevent="handleRecover">
      <p>Insira um email para receber as instruções para recuperar o acesso a sua conta.</p>
      <Text v-model="emailRecover" label="E-mail" id="emailRecover" type="text"/>
      <Button label="Recuperar" type="submit"/>
    </form>
  </Dialog>
</template>

<style scoped>
</style>
