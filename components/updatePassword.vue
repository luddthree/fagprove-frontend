<template>
  <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-700">Endre Passord</h2>
    <div class="space-y-3">
      <input
        v-model="currentPassword"
        type="password"
        placeholder="Nåværende passord"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <input
        v-model="newPassword"
        type="password"
        placeholder="Nytt passord"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <input
        v-model="confirmNewPassword"
        type="password"
        placeholder="Bekreft nytt passord"
        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <button
        @click="updatePassword"
        class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Endre Passord
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const updatePassword = async () => {
  if (newPassword.value !== confirmNewPassword.value) {
    alert('Passordene samsvarer ikke!')
    return
  }
  await authStore.updatePassword(currentPassword.value, newPassword.value, confirmNewPassword.value)
}
</script>
