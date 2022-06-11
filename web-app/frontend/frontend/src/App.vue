<template>
  <div>
    <header-web />
    <router-view />
  </div>
</template>

<script>
import HeaderWeb from "./components/HeaderWeb.vue";

export default {
  name: "app", // No hace poner falta esta cosa
  components: {
    HeaderWeb,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
