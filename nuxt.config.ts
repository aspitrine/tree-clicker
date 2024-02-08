import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  ui: {
    icons: ['mdi'],
  },
  app: {
    baseURL: process.env.BASE_URL || '',
    buildAssetsDir: `${process.env.BASE_URL || ''}/_nuxt/`,
  },
})
