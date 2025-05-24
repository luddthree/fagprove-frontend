<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup>
import Header from '~/components/header.vue'
import { useAuthStore } from '~/stores/auth'
import { onBeforeMount } from 'vue'

const authStore = useAuthStore()

onBeforeMount(() => {
  console.log('Running auth store initialize() in onMounted')
  authStore.initialize()
  // Check if the user is authenticated         
})


</script>
