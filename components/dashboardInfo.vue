<template>
  <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-700">Brukerinformasjon</h2>
    <ul class="space-y-2 text-sm text-gray-600">
      <li><strong>Navn:</strong> {{ authStore.user?.name }}</li>
      <li><strong>E-post:</strong> {{ authStore.user?.email }}</li>
      <li><strong>Bruker ID:</strong> {{ authStore.user?.id }}</li>
      <li><strong>Rolle:</strong> {{ authStore.user?.role }}</li>

    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
</script>
