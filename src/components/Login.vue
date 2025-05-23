<script setup>
  import { ref } from 'vue';
  import { login, recover } from '../services/AuthService';
  import { useRouter } from 'vue-router';
  import Input from './Input.vue';

  const object = ref({
    email: '',
    senha: ''  
  })
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const data = await login(object.value);
      router.push('/players');
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

  const handleCadastro = () => {
    router.push('/cadastro');
  }

  const modalVisible = ref(false);

</script>

<template>
  <div class="login">
    <h1 class="title">Dashboards</h1>

    <Input v-model="object.email" label="E-mail" id="email" type="text" />
    <Input v-model="object.senha" label="Senha" id="senha" type="password" showForgot v-model:forgotRef="modalVisible"/>

    <Button label="Entrar" @click="handleLogin"/>
    <Button variant="link" label="Crie uma conta" size="small" @click="handleCadastro"/>
  </div>
  <Dialog v-model:visible="modalVisible" modal header="Recuperar senha">
    <div>
      <p>Insira um email para receber as instruções para recuperar o acesso a sua conta.</p>
      <Input v-model="emailRecover" label="E-mail" id="emailRecover" type="text"/>
      <Button label="Recuperar" @click="handleRecover"/>
    </div>
  </Dialog>
</template>

<style scoped>
  .title {
    position: absolute;
    visibility: visible;
    top: 5rem;
    left: 0;
    width: 100%;
    text-align: center;
    color: var(--p-primary-900);
  }
  .login {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }
</style>
