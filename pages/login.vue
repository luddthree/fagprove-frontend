<template>
  <div class="min-h-screen bg-gray-100 flex flex-col px-4">
    <div class="flex-1 flex justify-center mt-10 md:mt-20">
      <div class="w-full max-w-2xl">
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold mb-2">Logg inn</h1>
          <p class="text-gray-600 text-sm">
            Logg inn for å få tilgang til dashbordet hvor du kan bestille verkstedtime og administrere kjøretøy hos Autofix AS.
          </p>
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-bold mb-1">E-post</label>
            <input v-model="form.email" type="email" class="w-full border rounded-md p-2" placeholder="Skriv inn e-post" />
          </div>

          <div>
            <label class="block text-xs font-bold mb-1">Passord</label>
            <input v-model="form.password" type="password" class="w-full border rounded-md p-2" placeholder="Skriv inn passord" />
          </div>

          <button
            type="submit"
            class="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold p-3 rounded-md"
          >
            Logg inn
          </button>
        </form>

        <div v-if="error" class="text-red-500 mt-4 text-sm text-center">{{ error }}</div>

        <div class="mt-4 text-center">
          <a href="/register" class="text-sm text-gray-800 hover:underline">Har du ikke en konto? Registrer deg her.</a>
        </div>
      </div>
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