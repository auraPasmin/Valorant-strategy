<template>
  <nav class="nav-principal">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/Create">Crear perfil</router-link>
  </nav>
  <div class="titulo-valorant">
    <h2>Valorant strategy</h2>
  </div>
  <router-view />
  <footer class="bg-light text-center text-lg-start">
    <div class="text-center p-3 footerRed">switset 2023</div>
  </footer>
</template>
<script></script>
<style>
#app {
  font-family: "Bebas Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --background-color: #ece8e1;
}
body {
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
}
.nav-principal {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #121b26;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f2f0eb;
}

nav a.router-link-exact-active {
  color: #ff4655;
}
.footerRed {
  background-color: #ff4655;
  color: #ece8e1;
}
.titulo-valorant {
  display: flex;
  justify-content: flex-start;
}
.titulo-valorant h2 {
  margin-left: 12rem;
}
</style>
