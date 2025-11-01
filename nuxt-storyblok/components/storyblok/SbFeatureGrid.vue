<template>
  <section class="py-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <component
          v-for="(item, i) in blok.features"
          :is="resolveComponent(item.component)"
          :key="i"
          :blok="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({ blok: { type: Object, required: true } })
const blok = props.blok
function resolveComponent(name: string) {
  // Map Storyblok sub-blok name to local component
  if (name === 'feature_item') return () => import('./SbFeatureItem.vue')
  return null
}
</script>
