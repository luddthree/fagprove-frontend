export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore()
    authStore.initialize() // Ensures the token is loaded into the store
  })
  