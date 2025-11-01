<template>
  <div>
    <StoryblokResolver :body="storyContent" />
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import StoryblokResolver from '../components/StoryblokResolver.vue'
import { ref, onMounted } from 'vue'
const storyContent = ref<any[]>([])
const config = useRuntimeConfig() as any

function transformStrapiBlocks(blocks: any[]) {
  if (!Array.isArray(blocks)) return []
  return blocks.map((b: any) => {
// Strapi stores dynamic zone components with __component 'namespace.component-name'
    const comp = b.__component ? b.__component.split('.').pop().replace(/-/g, '_') : (b.component || b.type)
    const copy = { component: comp, ...b }
    delete copy.__component
    return copy
  })
}

async function loadStory(slug = 'home') {
  try {
    // prefer runtime config (public or private) instead of referencing process.env directly
    const base = config.public.strapi?.baseUrl || config.strapi?.baseUrl || 'http://localhost:1337'
    const token = config.public.strapi?.token || config.strapi?.token || ''
    const url = `${base}/api/pages?filters[slug][$eq]=${slug}&populate=deep`
    const res: any = await $fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    if (res && res.data && res.data.length) {
      const attrs = res.data[0].attributes
      const content = attrs.content || []
      storyContent.value = transformStrapiBlocks(content)
      return
    }
  } catch (e) {
    // fallthrough to demo content
  }
  // fallback demo content when Strapi is not configured
  storyContent.value = [
    { component: 'hero', headline: '<em>Welcome</em> to the demo', subheadline: 'Edit this in Strapi', cta_text: 'Learn more' },
    { component: 'feature_grid', features: [ { component: 'feature_item', title: 'Fast', description: 'Lightning fast' }, { component: 'feature_item', title: 'Secure', description: 'Built secure' }, { component: 'feature_item', title: 'Visual', description: 'Visual editor' } ] },
    { component: 'cta_block', title: 'Ready to start?', button_text: 'Sign up' }
  ]
}

onMounted(async () => {
  await loadStory()
})
</script>
