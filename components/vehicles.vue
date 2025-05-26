<template>
  <div class="bg-gray-200 rounded-2xl p-6 sm:p-8 w-full max-w-3xl space-y-6 shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <h2 class="text-2xl font-bold">Mine Kjøretøy</h2>
      <button
        @click="showModal = true"
        class="bg-orange-600 hover:bg-orange-700 font-bold shadow-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base flex items-center space-x-2"
      >
        <span>Legg til kjøretøy</span>
        <Plus class="w-5 h-5" />
      </button>
    </div>

    <!-- Vehicle List -->
    <div v-if="vehicleStore.vehicles.length" class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      <div
        v-for="vehicle in vehicleStore.vehicles"
        :key="vehicle.id"
        class="relative flex items-center bg-white rounded-xl p-4 sm:p-6 shadow-md border hover:border-slate-400 transition-all text-lg"
      >
        <Car class="w-7 h-7 sm:w-8 sm:h-8 text-gray-700 mr-4 sm:mr-6" />
        <div class="flex-1">
          <div class="font-semibold text-base sm:text-xl">{{ vehicle.name }}</div>
          <div class="text-sm sm:text-base mt-1">Reg: {{ vehicle.license_plate }}</div>
          <div class="text-sm sm:text-base mt-1">Km: {{ vehicle.kilometers?.toLocaleString() ?? 0 }}</div>
        </div>

        <!-- Options -->
        <div class="absolute top-4 right-1">
          <button @click="toggleMenu(vehicle.id)" class="text-2xl px-2 text-gray-600 hover:text-black">
            <EllipsisVertical />
          </button>
          <div
            v-if="showMenuId === vehicle.id"
            class="absolute right-0 top-full mt-2 bg-white border shadow-md rounded-md z-10 w-40"
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

    <p v-else class="text-gray-600 text-lg">Ingen registrerte kjøretøy.</p>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
        <h3 class="text-2xl font-bold">Legg til kjøretøy</h3>

        <input
          v-model="licensePlate"
          @input="licensePlate = licensePlate.toUpperCase()"
          placeholder="Skilt"
          class="border border-gray-300 p-3 sm:p-4 w-full rounded-lg text-base sm:text-lg"
        />

        <input
          v-model="kilometers"
          type="number"
          min="0"
          placeholder="Kilometerstand"
          class="border border-gray-300 p-3 sm:p-4 w-full rounded-lg text-base sm:text-lg"
        />

        <div class="flex justify-end space-x-4 pt-2">
          <button @click="showModal = false" class="text-gray-600 text-base px-4 py-2">Avbryt</button>
          <button @click="addVehicle" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-base">
            Lagre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useVehicleStore } from '~/stores/vehicle'
import { Car, Plus, EllipsisVertical } from 'lucide-vue-next'

const vehicleStore = useVehicleStore()

const licensePlate = ref('')
const kilometers = ref('')
const showModal = ref(false)
const showMenuId = ref(null)

onBeforeMount(() => {
  vehicleStore.fetchVehicles()
})

const toggleMenu = (id) => {
  showMenuId.value = showMenuId.value === id ? null : id
}

const deleteVehicle = async (id) => {
  const confirmDelete = confirm('Er du sikker på at du vil slette dette kjøretøyet?')
  if (!confirmDelete) return
  await vehicleStore.deleteVehicle(id)
  showMenuId.value = null
}

const addVehicle = async () => {
  const plate = licensePlate.value
  const km = parseInt(kilometers.value)

  if (!plate || isNaN(km) || km < 0) {
    alert('Du må skrive inn både et gyldig registreringsnummer og kilometerstand.')
    return
  }

  const name = await vehicleStore.fetchVehicleNameFromVegvesen(plate)
  if (!name) {
    alert('Kjøretøynavn kunne ikke hentes.')
    return
  }

  await vehicleStore.createVehicle(plate, name, km)
  await vehicleStore.fetchVehicles()

  licensePlate.value = ''
  kilometers.value = ''
  showModal.value = false
}
</script>
