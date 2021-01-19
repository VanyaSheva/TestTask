<template>
  <div id="app">
     <ResultsPage/>
     <Footer/>
  </div>
</template>

<script>
import ResultsPage from './views/ResultsPage.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    ResultsPage, Footer
  }
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>
