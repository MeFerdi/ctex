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
    const comp = b.__component ? b.__component.split('.').pop().replace(/-/g, '_') : (b.component || b.type)
    const copy = { component: comp, ...b }
    delete copy.__component
    return copy
  })
}

async function loadStory(slug = 'about') {
  try {
    const base = config.public.strapi?.baseUrl || ((import.meta as any).env?.VITE_STRAPI_BASE_URL as string) || 'http://localhost:1337'
    const token = config.public.strapi?.token || ((import.meta as any).env?.VITE_STRAPI_TOKEN as string) || ''
    const url = `${base}/api/pages?filters[slug][$eq]=${slug}&populate=deep`
    const res: any = await $fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    if (res && res.data && res.data.length) {
      const attrs = res.data[0].attributes
      const content = attrs.content || []
      storyContent.value = transformStrapiBlocks(content)
      return
    }
  } catch (e) {
    // fallback
  }
  storyContent.value = [
    { component: 'hero', headline: '<strong>About</strong> our startup', subheadline: 'We make things.' },
    { component: 'cta_block', title: 'Still curious?', button_text: 'Contact us' }
  ]
}

onMounted(async () => {
  await loadStory()
})
</script>
