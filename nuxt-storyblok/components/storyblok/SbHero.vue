<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-4xl font-bold mb-4" v-html="blok.headline"></h1>
      <p class="text-lg text-gray-600 mb-6">{{ blok.subheadline }}</p>
      <div>
        <Button v-if="blok.cta_text" @click="navigate(blok.cta_link)">{{ blok.cta_text }}</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps({ blok: { type: Object, required: true } })
const blok = props.blok
const router = useRouter()
function navigate(link: any) {
  if (!link) return
  if (link.link_type === 'story' && link.cached_url) {
    router.push(link.cached_url)
  } else if (link.url) {
    window.location.href = link.url
  }
}
</script>
