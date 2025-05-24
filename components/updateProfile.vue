<template>
  <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-700">Oppdater Profil</h2>
    <div class="space-y-3">
      <input
        v-model="updatedName"
        placeholder="Nytt navn"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        v-model="updatedEmail"
        placeholder="Ny e-post"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        @click="updateProfile"
        class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Oppdater
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const updatedName = ref(authStore.user?.name || '')
const updatedEmail = ref(authStore.user?.email || '')

const updateProfile = async () => {
  await authStore.updateProfile(updatedName.value, updatedEmail.value)
}
</script>
