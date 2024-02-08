const isClicked = ref(false)
type Interval = ReturnType<typeof setInterval>

const initialData = {
  money: 0,
  items: [{
    name: 'Hache',
    baseDamage: 1,
    basePrice: 50,
    level: 1,
    auto: false,
  }, {
    name: 'Bucheron',
    baseDamage: 1,
    basePrice: 100,
    level: 0,
    auto: true,
  }, {
    name: 'Scierie',
    baseDamage: 10,
    basePrice: 1100,
    level: 0,
    auto: true,
  }, {
    name: 'Mine',
    baseDamage: 100,
    basePrice: 12000,
    level: 0,
    auto: true,
  }, {
    name: 'Usine',
    baseDamage: 1000,
    basePrice: 130000,
    level: 0,
    auto: true,
  }],
}

export type GameItem = Readonly<typeof initialData.items[number]>

export function useGame() {
  const interval = ref<Interval>()
  const game = useCookie('game', {
    default() {
      return initialData
    },
  })

  const getItemPrice = (item: GameItem) => {
    return Math.round(item.basePrice * 1.15 ** item.level)
  }

  const buyItem = (item: GameItem) => {
    const price = getItemPrice(item)
    if (game.value.money < price)
      return

    game.value.money -= price
    game.value.items.find(i => i.name === item.name)!.level += 1
  }

  const getCurrentDammageAmount = (auto: boolean) => {
    const items = game.value.items.filter(item => item.auto === auto)
    return items.reduce((acc, item) => acc + item.level * item.baseDamage, 0)
  }

  onMounted(() => {
    interval.value = setInterval(() => {
      game.value.money += getCurrentDammageAmount(true)
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval.value)
  })

  return {
    game: readonly(game),
    isClicked: readonly(isClicked),
    buyItem,
    getItemPrice,
    click() {
      isClicked.value = true
      game.value.money += getCurrentDammageAmount(false)
      setTimeout(() => {
        isClicked.value = false
      }, 100)
    },
  }
}
