<template>
  <div id="app">
    <FantasyPersistenceRatio></FantasyPersistenceRatio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FantasyPersistenceRatio from './components/FantasyPersistenceRatio.vue';

@Component({
  components: {
    FantasyPersistenceRatio,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
