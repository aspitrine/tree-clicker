<script setup lang="ts">
const { game, click, isClicked, dps, dpc, start } = useGame()

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<template>
  <div class="grid h-screen grid-cols-2">
    <section class="flex h-full items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold">
          Clique sur l'arbre
        </h1>
        <p class="text-lg">
          Clique sur l'arbre pour récupérer du bois
        </p>
        <p class="text-lg">
          Bois: {{ game.money }}
        </p>
        <p class="flex justify-center gap-2">
          Rendement par seconde:
          <span class="flex items-center text-blue-500">
            {{ dps }} <UIcon name="i-mdi-pine-tree" /> /s
          </span>
        </p>
        <p class="flex justify-center gap-2">
          Rendement par clic:
          <span class="text-blue-500">
            {{ dpc }} <UIcon name="i-mdi-pine-tree" />
          </span>
        </p>
        <UButton
          icon="i-mdi-pine-tree" variant="ghost" :class="{
            shake: isClicked,
          }" :ui="{
            icon: {
              base: 'h-64 w-64',
            },
          }" @click="click"
        />
      </div>
    </section>
    <section class="flex flex-col gap-2 bg-gray-700 p-2">
      <Item v-for="item of game.items" :key="item.name" :item="item" />
    </section>
  </div>
</template>

<style>
@keyframes tilt-shaking {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

.shake {
  animation: tilt-shaking 0.15s normal;
}
</style>
