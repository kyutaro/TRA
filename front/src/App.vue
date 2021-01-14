<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Top msg="Welcome to TRA"/>
  </div>
</template>

<script>
import Top from './components/Top.vue'

export default {
  name: 'App',
  components: {
    Top
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d8d8d8;
  margin-top: 60px;
}
</style>
