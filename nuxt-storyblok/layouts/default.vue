<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <div class="font-bold">Ctex Technologies</div>
        <nav class="space-x-4">
          <NuxtLink to="/" class="text-gray-700">Home</NuxtLink>
          <NuxtLink to="/about" class="text-gray-700">About</NuxtLink>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-gray-100 mt-8">
      <div class="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 class="font-semibold mb-2">Product</h4>
          <ul class="text-sm text-gray-600">
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Company</h4>
          <ul class="text-sm text-gray-600">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Resources</h4>
          <ul class="text-sm text-gray-600">
            <li>Docs</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/ui/Button.vue'
</script>
