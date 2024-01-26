// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-lucide-icons'
  ],
  runtimeConfig: {
    apiUri: '', // can be overridden by NUXT_API_URI environment variable
    public: {
      apiUri: '', // can be overridden by NUXT_PUBLIC_API_URI environment variable
    }
  },
})
