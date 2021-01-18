<template>
  <div id="app">
     <ResultsPage/>
  </div>
</template>

<script>
import ResultsPage from './views/ResultsPage.vue'

export default {
  name: 'App',
  components: {
    ResultsPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
