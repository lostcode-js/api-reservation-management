// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: [
    //'@nuxtjs/stylelint-module',
    //'@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-snackbar',
    'nuxt-mail'
  ],
  mail: {
    message: {
      to: 'dripbrbarbearia@gmail.com',
    },
    smtp: {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: '0a76285ac64525',
        pass: '34d692164befe8',
    },
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    compilation: {
      jit: false,
    },
  },
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
    }
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  snackbar: {
    top: true,
    right: true,
    duration: 5000
  },
  image: {
    provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
  }
})