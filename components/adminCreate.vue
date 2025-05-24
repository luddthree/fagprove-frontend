<template>
  <div class="bg-white rounded-xl p-6 w-full shadow-md space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Ny Timebestilling</h2>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- User Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Brukerens e-post</label>
        <input
          v-model="userEmail"
          type="email"
          required
          placeholder="bruker@epost.no"
          class="border border-gray-300 p-3 w-full rounded-md text-base"
        />
      </div>

      <!-- Vehicle Dropdown -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Velg kjøretøy</label>
        <select
          v-model="vehicleId"
          required
          class="border border-gray-300 p-3 w-full rounded-md text-base"
        >
          <option disabled value="">Velg kjøretøy</option>
          <option
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :value="vehicle.id"
          >
            {{ vehicle.name }} ({{ vehicle.license_plate }})
          </option>
        </select>
      </div>

      <!-- Date and Time -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Dato og klokkeslett</label>
        <input
          v-model="appointmentDate"
          type="datetime-local"
          required
          class="border border-gray-300 p-3 w-full rounded-md text-base"
        />
      </div>

      <!-- Note -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Notat (valgfritt)</label>
        <textarea
          v-model="note"
          rows="3"
          class="border border-gray-300 p-5 w-full rounded-md text-base"
          placeholder="Notat til avtalen"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 mt-12 rounded-lg text-base shadow-sm"
        >
          Lagre avtale
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '~/stores/auth'

const userEmail = ref('')
const vehicleId = ref('')
const appointmentDate = ref('')
const note = ref('')
const vehicles = ref([])

const authStore = useAuthStore()

const fetchAllVehicles = async () => {
  try {
    const data = await $fetch('/api/admin/vehicles', {
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    vehicles.value = data.vehicles
  } catch (error) {
    console.error('Failed to fetch vehicles:', error)
    alert('Kunne ikke hente kjøretøy.')
  }
}

onBeforeMount(() => {
  fetchAllVehicles()
})

const submitForm = async () => {
  try {
    await $fetch('/api/admin/appointments', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: {
        email: userEmail.value,
        vehicle_id: vehicleId.value,
        appointment_date: appointmentDate.value,
        note: note.value
      }
    })

    alert('Timebestilling opprettet!')
    userEmail.value = ''
    vehicleId.value = ''
    appointmentDate.value = ''
    note.value = ''
  } catch (error) {
    console.error('Feil ved opprettelse av time:', error)
    alert('Kunne ikke opprette time.')
  }
}
</script>