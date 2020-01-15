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
    const hands = cardsStore.getters.hands(16);
    const hasQuads = cardsStore.getters.possibleHand(hands);
    return { hands, hasQuads };
  }
}
</script>
<style scoped></style>
