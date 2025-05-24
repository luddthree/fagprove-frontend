<template>
  <div class="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-sm">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Tidligere Timebestillinger</h2>

    <div
      v-if="appointments.length"
      class="space-y-4 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="border border-gray-200 p-4 rounded-lg hover:shadow transition"
      >
        <p class="font-semibold text-gray-800">
          {{ getVehicleName(appointment.vehicle_id) }}
        </p>
        <p><strong>Dato:</strong> {{ formatDateOnly(appointment.appointment_date) }}</p>
        <p><strong>Klokkeslett:</strong> {{ formatTimeOnly(appointment.appointment_date) }}</p>
        <p class="text-gray-600 text-sm mt-1">
          <strong>Notat:</strong> {{ appointment.note || 'Ingen notat' }}
        </p>
      </div>
    </div>

    <p v-else class="text-gray-500 text-sm">Du har ingen tidligere timebestillinger.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppointmentStore } from '~/stores/appointment'
import { useVehicleStore } from '~/stores/vehicle'

const appointmentStore = useAppointmentStore()
const vehicleStore = useVehicleStore()

const appointments = ref([])

onMounted(async () => {
  await vehicleStore.fetchVehicles()
  await appointmentStore.fetchAppointments()
  appointments.value = appointmentStore.appointments.filter(a => a.status === 1)
})

const getVehicleName = (vehicleId) => {
  const vehicle = vehicleStore.vehicles.find(v => v.id === vehicleId)
  return vehicle ? `${vehicle.name} (${vehicle.license_plate})` : 'Ukjent kjøretøy'
}

const formatDateOnly = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const formatTimeOnly = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', hour12: false })
}
</script>

<style scoped>
/* Optional: Tailwind scrollbar plugin support */
.scrollbar-thin {
  scrollbar-width: thin;
}
.scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
}
.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}
</style>
