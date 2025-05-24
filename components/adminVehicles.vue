<template>
  <div class="bg-white rounded-xl p-6 w-full shadow-md space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Alle Kjøretøy</h2>
      <button
        @click="fetchAll"
        class="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow"
      >
        Oppdater
      </button>
    </div>

<div v-if="vehicles && vehicles.length" class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
      <div
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="relative flex items-start gap-4 bg-gray-50 rounded-lg p-4 shadow border hover:border-gray-400"
      >
        <Car class="w-7 h-7 text-gray-600 mt-1" />
        <div class="flex-1">
          <h3 class="font-semibold text-lg text-gray-800">{{ vehicle.name }}</h3>
          <p class="text-sm text-gray-700">Reg: {{ vehicle.license_plate }}</p>
          <p class="text-sm text-gray-700">Km: {{ vehicle.kilometers?.toLocaleString() ?? 0 }}</p>
          <p class="text-sm text-gray-600 mt-1">
            Eier: <span class="font-medium">{{ vehicle.user?.name ?? 'Ukjent' }}</span>
            ({{ vehicle.user?.email ?? 'ukjent@epost.no' }})
          </p>
        </div>

        <div class="absolute top-3 right-3">
          <button @click="toggleMenu(vehicle.id)" class="text-gray-600 hover:text-black">
            <EllipsisVertical class="w-5 h-5" />
          </button>
          <div
            v-if="showMenuId === vehicle.id"
            class="absolute right-0 mt-2 bg-white border shadow-md rounded-md z-10 w-40"
          >
            <button
              @click="deleteVehicle(vehicle.id)"
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800"
            >
              Slett kjøretøy
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600 text-sm">Ingen kjøretøy funnet.</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { Car, EllipsisVertical } from 'lucide-vue-next'

const vehicles = ref([])
const showMenuId = ref(null)
const authStore = useAuthStore()

const fetchAll = async () => {
  try {
    const data = await $fetch('/api/admin/vehicles', {
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    vehicles.value = data.vehicles
  } catch (error) {
    console.error('Feil ved henting av kjøretøy:', error)
    alert('Kunne ikke hente kjøretøy.')
  }
}

const deleteVehicle = async (id) => {
  if (!confirm('Er du sikker på at du vil slette dette kjøretøyet?')) return

  try {
    await $fetch(`/api/vehicles/${id}`, {
      method: 'DELETE',
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    vehicles.value = vehicles.value.filter(v => v.id !== id)
    showMenuId.value = null
  } catch (error) {
    console.error('Feil ved sletting:', error)
    alert('Kunne ikke slette kjøretøy.')
  }
}

const toggleMenu = (id) => {
  showMenuId.value = showMenuId.value === id ? null : id
}

onBeforeMount(fetchAll)
</script>