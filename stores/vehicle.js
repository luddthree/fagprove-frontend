import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: []
  }),

  actions: {
    async fetchVehicles() {
      try {
        const authStore = useAuthStore()
        const response = await $fetch('/api/vehicles', {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        this.vehicles = response.vehicles
      } catch (error) {
        console.error('Failed to fetch vehicles:', error)
      }
    },

    async createVehicle(licensePlate, name, kilometers) {
      try {
        const authStore = useAuthStore()
        const newVehicle = await $fetch('/api/vehicles', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: {
            license_plate: licensePlate,
            name,
            kilometers: parseInt(kilometers) || 0
          }
        })
        this.vehicles.push(newVehicle.vehicle)
      } catch (error) {
        console.error('Failed to create vehicle:', error)
      }
    },

    async deleteVehicle(vehicleId) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/vehicles/${vehicleId}`, {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId)
      } catch (error) {
        console.error('Failed to delete vehicle:', error)
      }
    },

async fetchVehicleNameFromVegvesen(licensePlate) {
  try {
    const authStore = useAuthStore()
    const result = await $fetch(`/api/vehiclez/${licensePlate}`, {
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    const data = result.kjoretoydataListe?.[0]

    const merke =
      data?.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt?.merke?.[0]?.merke
    const modell =
      data?.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt?.handelsbetegnelse?.[0]

    if (!merke || !modell) return null

    return `${merke} ${modell}`.trim()
  } catch (error) {
    console.error('Feil ved oppslag hos Vegvesen:', error)
    return null
  }
}

  }
})
