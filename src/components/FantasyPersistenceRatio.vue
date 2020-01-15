<template>
  <div class="container">
    {{ name }}
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as cardsStore from '@/stores/cards';

@Component
export default class FantasyPersistenceRatio extends Vue {
  get name() {
    return cardsStore.getters.hands(2);
  }
}
</script>
<style scoped></style>
