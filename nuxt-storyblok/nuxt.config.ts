import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Switched to Strapi as the headless CMS. Pages fetch from the Strapi REST API.
  runtimeConfig: {
    public: {
      // make Strapi config available to client plugins/pages
      strapi: {
        baseUrl: process.env.STRAPI_BASE_URL || 'http://localhost:1337',
        token: process.env.STRAPI_TOKEN || ''
      }
    }
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
