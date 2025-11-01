import { defineNuxtPlugin } from '#app'

// Storyblok is removed in this project (migrated to Strapi).
// Keep a harmless plugin that does nothing so dev server won't fail if the file remains.
export default defineNuxtPlugin(() => {
  // intentionally no-op
})
