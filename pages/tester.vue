<template>
    <div class="space-y-8">
      <!-- Create Vehicle -->
      <div>
        <h2 class="text-xl font-bold mb-2">Register a Vehicle</h2>
        <input v-model="licensePlate" placeholder="License Plate" class="border p-2 w-full mb-2" />
        <input v-model="name" placeholder="Vehicle Name" class="border p-2 w-full mb-2" />
        <input v-model="kilometers" type="number" placeholder="Kilometers" class="border p-2 w-full mb-2" />
        <button @click="createVehicle" class="bg-green-600 text-white p-2 rounded">Add Vehicle</button>
      </div>
  
      <!-- Create Appointment -->
      <div>
        <h2 class="text-xl font-bold mb-2">Create Appointment</h2>
  
        <select v-model="selectedVehicleId" class="border p-2 w-full mb-2">
          <option disabled value="">Select a Vehicle</option>
          <option v-for="vehicle in vehicleStore.vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.name }} ({{ vehicle.license_plate }})
          </option>
        </select>
  
        <input v-model="appointmentDate" type="datetime-local" class="border p-2 w-full mb-2" />
        <textarea v-model="note" placeholder="Appointment note" class="border p-2 w-full mb-2" />
        <button @click="createAppointment" class="bg-green-500 text-white px-3 py-1 rounded">Add Appointment</button>
      </div>
  
      <!-- Fetch Everything -->
    <!-- Fetch Controls -->
<div class="space-x-2">
  <button @click="vehicleStore.fetchVehicles()" class="bg-blue-400 text-white p-2 rounded">Fetch Vehicles</button>
  <button @click="fetchAppointmentsOnly()" class="bg-purple-500 text-white p-2 rounded">Fetch Appointments</button>
  <button @click="fetchEverything()" class="bg-gray-700 text-white p-2 rounded">Fetch All</button>
</div>


<!-- Vehicles List -->
<div v-if="vehicleStore.vehicles.length" class="border p-4 rounded shadow mb-6">
  <h3 class="font-semibold mb-2">Vehicles</h3>
  <ul class="space-y-2">
    <li v-for="vehicle in vehicleStore.vehicles" :key="vehicle.id" class="border p-2 rounded">
      {{ vehicle.name }} ({{ vehicle.license_plate }}) — {{ vehicle.kilometers }} km
    </li>
  </ul>
</div>
<p v-else class="text-gray-500">No vehicles fetched.</p>


  
      <!-- Appointments List Grouped by Vehicle -->
      <div v-for="(appointments, vehicleId) in appointmentsByVehicle" :key="vehicleId" class="border p-4 rounded shadow mb-6">
        <h3 class="font-semibold mb-2">
          {{ getVehicleName(vehicleId) }}
        </h3>
        <ul class="space-y-2">
          <li v-for="appt in appointments" :key="appt.id" class="flex justify-between items-center border p-2 rounded">
            <div>
              {{ appt.appointment_date }} — Status: {{ appt.status === 0 ? 'Active' : 'Finished' }}
              <div class="text-sm text-gray-600 italic" v-if="appt.note">Note: {{ appt.note }}</div>
            </div>
            <button @click="deleteAppointment(appt.id)" class="bg-red-400 text-white px-2 py-1 rounded">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  
  import { useVehicleStore } from '~/stores/vehicle'
  import { useAppointmentStore } from '~/stores/appointment'
  
  const vehicleStore = useVehicleStore()
  const appointmentStore = useAppointmentStore()
  
  // Vehicle creation
  const licensePlate = ref('')
  const name = ref('')
  const kilometers = ref('')
  const note = ref('')

  // Appointment creation
  const selectedVehicleId = ref('')
  const appointmentDate = ref('')
  
  // Grouped appointments
  const appointmentsByVehicle = ref({})
  
  // Create a vehicle
  const createVehicle = () => {
    if (!licensePlate.value || !name.value) {
      alert('License plate and name are required.')
      return
    }
  
    vehicleStore.createVehicle(licensePlate.value, name.value, kilometers.value)
      .then(fetchEverything)
  
    licensePlate.value = ''
    name.value = ''
    kilometers.value = ''
  }
  
  // Create a new appointment
  const createAppointment = () => {
    if (!selectedVehicleId.value || !appointmentDate.value) {
      alert('Vehicle and appointment date required.')
      return
    }
  
    appointmentStore.createAppointment(selectedVehicleId.value, appointmentDate.value, note.value)
  .then(() => {
    appointmentDate.value = ''
    selectedVehicleId.value = ''
    note.value = ''
    fetchEverything()
  })

  }


  const fetchVehiclesOnly = async () => {
  await vehicleStore.fetchVehicles()
}

  
  const fetchAppointmentsOnly = async () => {
  await appointmentStore.fetchAppointments()

  // Re-group appointments by vehicle_id
  appointmentsByVehicle.value = {}
  for (const appt of appointmentStore.appointments) {
    const vId = appt.vehicle_id
    if (!appointmentsByVehicle.value[vId]) {
      appointmentsByVehicle.value[vId] = []
    }
    appointmentsByVehicle.value[vId].push(appt)
  }
}

  
  // Fetch everything
  const fetchEverything = async () => {
    await vehicleStore.fetchVehicles()
    await appointmentStore.fetchAppointments()
  
    // Group appointments by vehicle_id
    appointmentsByVehicle.value = {}
    for (const appt of appointmentStore.appointments) {
      const vId = appt.vehicle_id
      if (!appointmentsByVehicle.value[vId]) {
        appointmentsByVehicle.value[vId] = []
      }
      appointmentsByVehicle.value[vId].push(appt)
    }
  }
  
  // Delete appointment
  const deleteAppointment = (id) => {
  if (confirm('Delete this appointment?')) {
    appointmentStore.deleteAppointment(id).then(fetchEverything)
  }
}

  
  // Helper to get vehicle name
  const getVehicleName = (id) => {
    const vehicle = vehicleStore.vehicles.find(v => v.id === parseInt(id))
    return vehicle ? `${vehicle.name} (${vehicle.license_plate})` : 'Unknown Vehicle'
  }
  </script>
  