<template>
  <Card>
    <h3 class="text-xl font-semibold">{{ blok.title }}</h3>
    <p class="text-gray-600 mt-2">{{ blok.description }}</p>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps({ blok: { type: Object, required: true } })
const blok = props.blok
</script>
