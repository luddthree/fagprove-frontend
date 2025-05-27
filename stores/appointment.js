import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: []
  }),
  actions: {
    async fetchAppointments() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/appointments', {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.appointments = response.appointments
      } catch (error) {
        console.error('Failed to fetch appointments:', error)
      }
    },

    async createAppointment(vehicleId, appointmentDate) {
      try {
        const authStore = useAuthStore()
        const newAppointment = await $fetch('/api/appointments', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { vehicle_id: vehicleId, appointment_date: appointmentDate }
        })
        this.appointments.push(newAppointment.appointment)
      } catch (error) {
        console.error('Failed to create appointment:', error)
      }
    },

    async createAppointment(vehicleId, appointmentDate, note = '') {
      try {
        const authStore = useAuthStore()
        const newAppointment = await $fetch('/api/appointments', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: { vehicle_id: vehicleId, appointment_date: appointmentDate, note }
        })
        this.appointments.push(newAppointment.appointment)
      } catch (error) {
        console.error('Failed to create appointment:', error)
      }
    },

    async deleteAppointment(id) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/appointments/${id}`, {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        this.appointments = this.appointments.filter(a => a.id !== id)
      } catch (error) {
        console.error('Failed to delete appointment:', error)
        throw error
      }
    },
    async fetchAllAppointmentsAdmin() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/admin/appointments', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'GET',
          headers: { Authorization: `Bearer ${authStore.token}` }
        })
        this.appointments = response.appointments
      } catch (error) {
        console.error('Failed to fetch admin appointments:', error)
      }
    },

    async completeAppointment(id) {
  try {
    const authStore = useAuthStore()
await $fetch(`/api/admin/appointments/${id}/complete`, {
  baseURL: useRuntimeConfig().public.apiBase,
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${authStore.token}`
  }
})


    const appointment = this.appointments.find(a => a.id === id)
    if (appointment) {
      appointment.status = 1
    }
  } catch (error) {
    console.error('Failed to complete appointment:', error)
    throw error
  }
}




  }
})
