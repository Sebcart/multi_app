<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
})
</script>

<style lang="scss">
body {
  margin: 0 auto;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
