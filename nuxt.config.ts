// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    defaultLocale: 'zh',
    locales: [
      { code: 'zh', name: '简体中文', file: 'zh.json' },
    ],
    lazy: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@formkit/auto-animate',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@unocss/nuxt',
    'nuxt-csurf',
    'nuxt-security',
    '@vee-validate/nuxt',
    '@nuxtjs/sitemap',
    'magic-regexp',
    '@vite-pwa/nuxt',
    '@primevue/nuxt-module',
  ],
});
