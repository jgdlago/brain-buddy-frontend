<script>
  import Login from './components/Login.vue';
  import Panel from './components/Panel.vue';
  import Toolbar from './components/Toolbar.vue';

  export default {
    name: 'App',
    components: {
      Login,
      Panel,
      Toolbar
    }
  }
</script>

<template>
  <div class="main"> 
      <!-- TODO rever esse main -->
      <RouterView/>
  </div>
</template>

<style scoped>

</style>
