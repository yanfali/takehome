<script lang="ts">
import { defineComponent } from 'vue'
import Main from './components/Main.vue'

export default defineComponent({
  components: { Main },
  setup() {},
})
</script>


<template>
  <Main />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
