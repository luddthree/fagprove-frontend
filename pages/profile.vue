<template>
  <div class="container mx-auto p-6 m-10 bg-red-50 rounded-xl">
    <h1 class="text-xl font-bold mb-6">Min profil</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <dashboardInfo />
      <updateProfile />
      <updatePassword />
      <appointmentHistory />

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

import appointmentHistory from '~/components/appointmentHistory.vue'
import dashboardInfo from '~/components/dashboardInfo.vue'
import updateProfile from '~/components/updateProfile.vue'
import updatePassword from '~/components/updatePassword.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>
