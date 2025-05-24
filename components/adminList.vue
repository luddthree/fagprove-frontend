<template>
  <div class="bg-white rounded-xl p-6 w-full shadow-md space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Alle Timebestillinger</h2>
      <button @click="fetchAll" class="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow">
        Oppdater
      </button>
    </div>

    <div v-if="appointments.length" class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="bg-gray-50 p-4 rounded-lg shadow border hover:border-gray-400 relative space-y-2"
      >
        <!-- User Info -->
        <p class="text-sm text-gray-500">
          <strong>Bruker:</strong> {{ appointment.user?.name || 'Ukjent' }} ({{ appointment.user?.email || 'Ukjent e-post' }})
        </p>

        <!-- Vehicle Info -->
        <p class="text-base font-semibold text-gray-800">
          {{ getVehicleLabel(appointment.vehicle) }}
        </p>

        <!-- Appointment Info -->
        <p class="text-sm text-gray-700"><strong>Dato:</strong> {{ formatDateOnly(appointment.appointment_date) }}</p>
        <p class="text-sm text-gray-700"><strong>Klokkeslett:</strong> {{ formatTimeOnly(appointment.appointment_date) }}</p>
        <p class="text-sm text-gray-700"><strong>Notat:</strong> {{ appointment.note || 'Ingen notat' }}</p>

        <!-- Dropdown Menu -->
        <div class="absolute top-3 right-3">
          <button @click="toggleMenu(appointment.id)" class="text-gray-600 hover:text-black">
            <EllipsisVertical class="w-5 h-5" />
          </button>
          <div
            v-if="showMenuId === appointment.id"
            class="absolute right-0 mt-2 bg-white border shadow-md rounded-md z-10 w-40"
          >
            <button
              @click="deleteAppt(appointment.id)"
              class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800"
            >
              Slett avtale
            </button>
            <button
              @click="completeAppt(appointment.id)"
              class="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 hover:text-green-800"
            >
              Fullfør avtale
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600 text-sm">Ingen avtaler funnet.</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAppointmentStore } from '~/stores/appointment'
import { EllipsisVertical } from 'lucide-vue-next'

const appointmentStore = useAppointmentStore()
const showMenuId = ref(null)
const appointments = ref([])

const fetchAll = async () => {
  await appointmentStore.fetchAllAppointmentsAdmin()
  appointments.value = appointmentStore.appointments.filter(a => a.status === 0)
}

const deleteAppt = async (id) => {
  if (confirm('Er du sikker på at du vil slette denne avtalen?')) {
    await appointmentStore.deleteAppointment(id)
    appointments.value = appointments.value.filter(a => a.id !== id)
    showMenuId.value = null
  }
}

const completeAppt = async (id) => {
  if (confirm('Er du sikker på at du vil fullføre denne avtalen?')) {
    await appointmentStore.completeAppointment(id)
    appointments.value = appointments.value.filter(a => a.id !== id)
    showMenuId.value = null
  }
}


const toggleMenu = (id) => {
  showMenuId.value = showMenuId.value === id ? null : id
}

const getVehicleLabel = (vehicle) => {
  if (!vehicle) return 'Ukjent kjøretøy'
  return `${vehicle.name} (${vehicle.license_plate})`
}

const formatDateOnly = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTimeOnly = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleTimeString('no-NO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

onBeforeMount(fetchAll)
</script>
