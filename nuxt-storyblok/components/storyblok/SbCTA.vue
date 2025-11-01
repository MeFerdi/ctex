<template>
  <section class="py-12 bg-sky-500 text-white">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-2xl font-bold mb-4">{{ blok.title }}</h2>
      <Button v-if="blok.button_text" @click="navigate(blok.button_link)">{{ blok.button_text }}</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({ blok: { type: Object, required: true } })
const blok = props.blok
function navigate(link: any) {
  if (!link) return
  if (link.link_type === 'story' && link.cached_url) {
    window.location.href = link.cached_url
  } else if (link.url) {
    window.location.href = link.url
  }
}
</script>
