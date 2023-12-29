<template>
  <div id="app">
    <div v-if="!loggedIn">
      <h1>Login</h1>

      <form @submit.prevent="authenticate">
        <div>
          <label for="username">Usuário:</label>
          <input type="text" id="username" v-model="data.usuarionome" required />
        </div>

        <div>
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="data.senha" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>

    <div v-if="loggedIn">
      <h1>Bem-vindo, {{ data.usuarionome }}!</h1>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginService from '@/Services/LoginServices';

let _loginService = new LoginService();
let loggedIn = ref(false);
let data = ref({
  usuarionome: "",
  senha: "",
});

async function authenticate(){
  await _loginService.Login(data.value).then((response) => {
    alert(response.token);
    loggedIn.value  = true;
  }).catch(() => {
    alert("Falha");
  });
}


function logout() {
  loggedIn.value = false;
  data.value = {
    usuarionome: "",
    senha: "",
  };
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  display: grid;
  grid-gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
