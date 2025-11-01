<template>
  <button :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }
})
const classes = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-sky-500 hover:bg-sky-600'
</script>
