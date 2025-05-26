<template>
<header class="sticky top-0 z-[1000] bg-gray-200 text-white p-4 shadow-md">
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="text-lg text-black font-bold">Autofix AS</NuxtLink>

      <div class="relative">
        <button @click="toggleDropdown" class="bg-gray-300 font-semibold text-black p-2 rounded-lg hover:bg-gray-400 focus:outline-none">
          {{ authStore.user?.name || 'Menu' }}
        </button>

        <!-- DROPDOWN FIXED: add z-[1001] -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-[1001]"
        >
          <ul>
            <li v-if="!authStore.token">
              <a href="/login" class="flex items-center px-4 py-3 pt-3 hover:bg-gray-100">
                <LucideLogIn class="w-5 h-5 mr-2" /> Log in
              </a>
            </li>
            <li v-if="!authStore.token">
              <a href="/register" class="flex items-center px-4 py-2 pb-3 hover:bg-gray-100">
                <LucideUserPlus class="w-5 h-5 mr-2" /> Register
              </a>
            </li>
            <li v-if="authStore.token">
              <a href="/dashboard" class="flex items-center px-4 py-2 pt-3 hover:bg-gray-100">
                <LucideLayoutDashboard class="w-5 h-5 mr-2" /> Dashboard
              </a>
            </li>
            <li v-if="authStore.token && authStore.isAdmin()">
              <a href="/admin" class="flex items-center px-4 py-2 hover:bg-gray-100">
                <LucideShield class="w-5 h-5 mr-2" /> Admin
              </a>
            </li>
            <li v-if="authStore.token">
              <a href="/profile" class="flex items-center px-4 py-2 hover:bg-gray-100">
                <LucideUser class="w-5 h-5 mr-2" /> Profile
              </a>
            </li>
            <li v-if="authStore.token">
              <a @click="logout" href="/login" class="flex items-center px-4 py-2 pb-3 text-red-600 hover:bg-gray-100">
                <LucideLogOut class="w-5 h-5 mr-2" /> Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { 
  LucideLayoutDashboard, 
  LucideUser, 
  LucideShield, 
  LucideLogOut, 
  LucideLogIn, 
  LucideUserPlus 
} from 'lucide-vue-next'

const isDropdownOpen = ref(false)
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) {
    authStore.fetchUser()
  }
})

// dropdown toggle 
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

function logout() {
  authStore.clearToken()
  navigateTo('/login')
}
</script>
