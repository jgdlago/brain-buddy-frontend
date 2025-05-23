<script setup>
  import { ref } from 'vue';
  import { register } from '../services/AuthService';
  import { useRouter } from 'vue-router';
  import Input from './Input.vue';

  const object = ref({
    nome: '',
    email: '',
    senha: '',
    senhaConf: ''
  })

  const router = useRouter();
  
  const handleCadastrar = async () => {
    try {
      const data = await register(object.value);
      router.push('/players');
    } catch (error) {
      // TODO implementar alerta decente
      alert('Erro no login: ' + error.message);
    }
  } 

  const handleEntrar = () => {
    router.push('/');
  }

</script>

<template>
  <div class="login">
    <h1 class="title">Cadastro</h1>

    <!-- TODO feedback na senha aqui -->
     <!-- TODO precognition https://laravel.com/docs/11.x/precognition#main-content -->
    <Input v-model="object.nome" label="Nome" id="nome" type="text" />
    <Input v-model="object.email" label="E-mail" id="email" type="text" />
    <Input v-model="object.senha" label="Senha" id="senha" type="password"/>
    <Input v-model="object.senhaConf" label="Confirme a senha" id="senhaConf" type="password"/>

    <Button label="Cadastrar" @click="handleCadastrar"/>
    <Button variant="link" label="Já tenho uma conta" size="small" @click="handleEntrar"/>
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
