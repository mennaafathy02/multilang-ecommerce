// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  app:{
    head:{
      title:'Exclusive'
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    locales: [
      { 
        code: 'en',
        name: 'English'
      },
      { 
        code: 'ar',
        name: 'العربية'
      }
    ], // used in URL path prefix
    defaultLocale: 'en', // default locale of your project for Nuxt pages and routings
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  vue: {
    compilerOptions: {
      parseMode: 'sfc', // Ensure you use known properties
    },
  }
})