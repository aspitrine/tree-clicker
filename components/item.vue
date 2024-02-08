<script lang="ts" setup>
import type { GameItem } from '~/composables/game'

const props = defineProps({
  item: {
    type: Object as PropType<GameItem>,
    required: true,
  },
})

const { game, buyItem, getItemPrice } = useGame()

const itemPrice = computed(() => getItemPrice(props.item))
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
    <p>Price: {{ itemPrice }}</p>
    <UButton
      :color="item.level === 0 ? 'green' : 'blue'"
      :disabled="game.money < itemPrice"
      @click="buyItem(item)"
    >
      {{ item.level === 0 ? 'Acheter' : 'Améliorer' }}
    </UButton>
  </div>
</template>
