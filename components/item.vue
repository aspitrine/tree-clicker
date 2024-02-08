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
const disabled = computed(() => game.value.money < itemPrice.value)
const color = computed(() => props.item.level === 0 ? 'green' : 'blue')
</script>

<template>
  <div class="mb-2 flex justify-center">
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-xl font-bold">
        {{ item.name }}
      </h3>
      <p>
        Level: <span class="font-bold">{{ item.level }}</span>
      </p>
      <p class="flex gap-1">
        <span>Dégât: </span><span class="flex items-center">{{ item.baseDamage * item.level }} <UIcon name="i-mdi-pine-tree" /> <span v-if="item.auto">/s</span></span>
      </p>
      <p>Price: {{ itemPrice }}</p>
      <UButton
        class="w-full justify-center"
        :color="color"
        :disabled="disabled"
        @click="buyItem(item)"
      >
        {{ item.level === 0 ? 'Acheter' : 'Améliorer' }}
      </UButton>
    </div>
  </div>
</template>
