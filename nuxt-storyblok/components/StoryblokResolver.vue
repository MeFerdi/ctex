<template>
  <div>
    <component
      v-for="(blok, i) in body"
      :is="resolve(blok.component)"
      :key="i"
      :blok="blok"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ body: { type: Array, default: () => [] } })
const body = props.body
function resolve(componentName: string) {
  // map Storyblok component names to local components
  if (componentName === 'hero') return () => import('./storyblok/SbHero.vue')
  if (componentName === 'feature_grid') return () => import('./storyblok/SbFeatureGrid.vue')
  if (componentName === 'cta_block') return () => import('./storyblok/SbCTA.vue')
  // fallback to a simple wrapper
  return {
    props: ['blok'],
    template: '<div v-if="$props.blok"><pre class="text-sm text-gray-500">{{ $props.blok }}</pre></div>'
  }
}
</script>
