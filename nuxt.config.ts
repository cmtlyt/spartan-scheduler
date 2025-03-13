import preset from './themes/preset';

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
  primevue: {
    options: {
      theme: {
        preset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
  unocss: {
    nuxtLayers: true,
    attributify: {
      prefix: 'un-',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    teleportTag: 'section',
    rootTag: 'section',
    rootAttrs: {
      id: 'root',
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  security: {
    csrf: {
      enabled: false,
      methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'],
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
    'nuxt-security',
    '@vee-validate/nuxt',
    '@nuxtjs/sitemap',
    'magic-regexp',
    '@vite-pwa/nuxt',
    '@primevue/nuxt-module',
    '@prisma/nuxt',
    // 'nuxt-prisma',
  ],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
});
