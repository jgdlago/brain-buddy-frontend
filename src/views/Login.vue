<script setup>
  import { ref } from 'vue';
  import { login, recover } from '../services/AuthService';
  import { useRouter } from 'vue-router';
  import { Button, Dialog } from 'primevue';
import Text from '../components/Input/Text.vue';
import Password from '../components/Input/Password.vue';

  const object = ref({
    email: '',
    senha: ''  
  })
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const data = await login(object.value);
      router.push('/player');
    } catch (error) {
      // TODO implementar alerta decente
      alert('Erro no login: ' + error.message);
    }
  } 

  const emailRecover = ref('');

  const handleRecover = async () => {
    try {
      const data = await recover(emailRecover.value);
    } catch (error) {
      // TODO implementar alerta decente
      alert('Erro no login: ' + error.message);
    }
  }

  const handleRegister = () => {
    router.push('/register');
  }

  const modalVisible = ref(false);

</script>

<template>
  <div class="container">
    <h1 class="text-2xl font-bold">Painel Brain Buddy</h1>

    <form @submit.prevent="handleLogin">
      <Text v-model="object.email" label="E-mail" id="email" type="text" />
      <Password v-model="object.senha" label="Senha" id="senha" type="password" showForgot v-model:forgotRef="modalVisible"/>

      <Button label="Entrar" @click="handleLogin" type="submit"/>
      <Button variant="link" label="Crie uma conta" size="small" @click="handleRegister"/>
    </form>
  </div>
  <Dialog v-model:visible="modalVisible" modal header="Recuperar senha">
    <div>
      <p>Insira um email para receber as instruções para recuperar o acesso a sua conta.</p>
      <Text v-model="emailRecover" label="E-mail" id="emailRecover" type="text"/>
      <Button label="Recuperar" @click="handleRecover"/>
    </div>
  </Dialog>
</template>

<style scoped>
</style>
