<template>
    <div class="max-w-md mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full border rounded-md p-2"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full border rounded-md p-2"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="w-full bg-orange-600 text-white rounded-md p-2">Login</button>
      </form>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
      <div>
        <p></p><a href="/register" class="text-gray-800 mt-3">Don't have an account? Register here.</a>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const form = ref({
  email: '',
  password: '',
})

const error = ref(null)
const authStore = useAuthStore()

// Login function that posts form data to the login API endpoint
async function login() {
  try {
    const response = await $fetch('/api/login', {
      baseURL: useRuntimeConfig().public.apiBase, // Use API base URL
      method: 'POST',
      body: form.value,
    })

    if (response.token) {
      // Store the token in the authentication store
      authStore.setToken(response.token)
      // Fetch the user data after login
      await authStore.fetchUser()
      // Navigate to the dashboard after successful login
      navigateTo('/dashboard')
    }
  } catch (err) {
    error.value = err?.data?.error || 'An error occurred during login.'
    console.error(err)
  }
}
</script>

  
  
  <style scoped>
  </style>