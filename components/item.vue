<script lang="ts" setup>
import type { GameItem } from '~/composables/game'

defineProps({
  item: {
    type: Object as PropType<GameItem>,
    required: true,
  },
})

const { game, buyItem, getItemPrice } = useGame()
</script>

<template>
  <div>
    <h3 class="text-xl font-bold">
      {{ item.name }}
    </h3>
    <p class="font-bold text-blue-500">
      Level: {{ item.level }}
    </p>
    <p>Dégât: {{ item.baseDamage * item.level }}</p>
    <p>Price: {{ getItemPrice(item) }}</p>
    <UButton
      :color="item.level === 0 ? 'green' : 'blue'"
      :disabled="game.money < getItemPrice(item)"
      @click="buyItem(item)"
    >
      {{ item.level === 0 ? 'Acheter' : 'Améliorer' }}
    </UButton>
  </div>
</template>
