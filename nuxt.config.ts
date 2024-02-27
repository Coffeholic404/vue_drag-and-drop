// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/eslint-module'],
  // eslint: {
  //   // Enable Prettier integration
  //   formatter: 'prettier'
  //   // Optionally, you can specify the Prettier options
  //   // prettier: {
  //   //   semi: false,
  //   //   singleQuote: true,
  //   //   tabWidth: 2,
  //   //   useTabs: false
  //   // }
  // },
  ssr: false,
  css: ['~/public/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
