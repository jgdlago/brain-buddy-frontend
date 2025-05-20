<script setup>
  import { ref } from 'vue';
  import { login } from '../services/LoginService';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const senha = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const data = await login(email.value, senha.value);
      router.push('/players');
    } catch (error) {
      // TODO implementar alerta decente
      alert('Erro no login: ' + error.message);
    }
  } 
</script>

<template>
  <div class="login">
    <h1 class="title">Dashboards</h1>
    <IftaLabel>
      <InputText v-model="email" id="email" size="large" />
      <label for="email">E-mail</label>
    </IftaLabel>

    <IftaLabel>
      <Password v-model="senha" id="senha" size="large" :feedback="false"/>
      <label for="senha">Senha</label>
    </IftaLabel>

    <Button label="Entrar" @click="handleLogin"/>
    <Button variant="link" label="Esqueci minha senha" size="small"/>
  </div>
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
