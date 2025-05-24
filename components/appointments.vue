<template>
    <div class="bg-gray-200 rounded-2xl p-8 w-full max-w-3xl space-y-6 shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Mine Timebestillinger</h2>
        <button @click="showModal = true" class="bg-orange-600 hover:bg-orange-700 shadow-md font-bold text-white px-6 py-3 rounded-full text-base flex items-center space-x-2">
          <span>Bestill time</span>
          <CalendarPlus class="w-5 h-5"/> 
        </button>
      </div>
  
      <div v-if="appointments.length" class="space-y-4">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="bg-white p-6 rounded-xl shadow hover:border-blue border hover:border-slate-400  text-lg relative"
          
        >
          <!-- Vehicle Info -->
          <p class="text-base font-semibold text-gray-800">
            {{ getVehicleName(appointment.vehicle_id) }}
          </p>
  
          <!-- Appointment Info -->
          <p><strong>Dato:</strong> {{ formatDateOnly(appointment.appointment_date) }}</p>
          <p><strong>Klokkeslett:</strong> {{ formatTimeOnly(appointment.appointment_date) }}</p>
          <p class="mt-2 text-sm text-gray-700"><strong>Notat:</strong> {{ appointment.note || 'Ingen notat' }}</p>
  
          <!-- 3-dot delete menu -->
          <div class="absolute top-4 right-1">
            <button @click="toggleMenu(appointment.id)" class="text-2xl px-2 text-gray-600 hover:text-black"><EllipsisVertical /></button>
            <div
              v-if="showMenuId === appointment.id"
              class="absolute right-0 mt-2 bg-white border shadow-md rounded-md z-10 w-40"
            >
              <button
                @click="deleteAppointment(appointment.id)"
                class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800"
              >
                Slett avtale
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <p v-else class="text-gray-600 text-lg">Du har ingen timebestillinger.</p>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
          <h3 class="text-2xl font-bold">Bestill ny time</h3>
          <select v-model="selectedVehicleId" class="border border-gray-300 p-4 p w-full rounded-lg text-lg">
            <option disabled value="">Velg kjøretøy</option>
            <option v-for="v in vehicleStore.vehicles" :key="v.id" :value="v.id">
              {{ v.name }} ({{ v.license_plate }})
            </option>
          </select>
          <input v-model="appointmentDate" type="datetime-local" class="border border-gray-300 p-4 w-full rounded-lg text-lg" />
          <textarea v-model="note" placeholder="Notat" rows="4" class="border border-gray-300 p-4 w-full rounded-lg text-lg"></textarea>
  
          <div class="flex justify-end space-x-4 pt-2">
            <button @click="showModal = false" class="text-gray-600 text-lg px-4 py-2">Avbryt</button>
            <button @click="createAppointment" class="bg-orange-600 hover:bg-orange-700  text-white px-6 py-2 rounded-lg text-lg">Lagre</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useAppointmentStore } from '~/stores/appointment'
  import { useVehicleStore } from '~/stores/vehicle'
  import { CalendarPlus, EllipsisVertical } from 'lucide-vue-next'

  const appointmentStore = useAppointmentStore()
  const vehicleStore = useVehicleStore()
  
  const appointments = ref([])
  const showModal = ref(false)
  const selectedVehicleId = ref('')
  const appointmentDate = ref('')
  const note = ref('')
  const showMenuId = ref(null)
  
  onBeforeMount(async () => {
    await vehicleStore.fetchVehicles()
    await fetchAppointments()
  })
  
  const fetchAppointments = async () => {
    await appointmentStore.fetchAppointments()
appointments.value = appointmentStore.appointments.filter(a => a.status === 0)
  }
  
  const createAppointment = async () => {
    if (!selectedVehicleId.value || !appointmentDate.value) {
      alert('Kjøretøy og dato er påkrevd.')
      return
    }
  
    await appointmentStore.createAppointment(selectedVehicleId.value, appointmentDate.value, note.value)
    selectedVehicleId.value = ''
    appointmentDate.value = ''
    note.value = ''
    showModal.value = false
    await fetchAppointments()
  }
  
  const deleteAppointment = async (id) => {
    if (confirm('Vil du slette denne timebestillingen?')) {
      await appointmentStore.deleteAppointment(id)
      await fetchAppointments()
      showMenuId.value = null
    }
  }
  
  const toggleMenu = (id) => {
    showMenuId.value = showMenuId.value === id ? null : id
  }
  
  const getVehicleName = (vehicleId) => {
    const vehicle = vehicleStore.vehicles.find(v => v.id === vehicleId)
    return vehicle ? `${vehicle.name} (${vehicle.license_plate})` : 'Ukjent kjøretøy'
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
  </script>
  