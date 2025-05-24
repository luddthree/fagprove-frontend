import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (process.client) {
    console.log('Running middleware on the client')

    if (!authStore.token) {
      const storedToken = localStorage.getItem('auth_token')
      console.log('Stored token:', storedToken)

      if (storedToken) {
        authStore.token = storedToken
        try {
          await authStore.fetchUser()
          console.log('ææææææærole ' + this.user?.role)
        } catch (error) {
          console.error('Invalid token, redirecting to login')
          authStore.clearToken()
          return navigateTo('/login')
        }
      }
    }

    if (!authStore.token) {
      console.error('No token found, redirecting to login')
      return navigateTo('/login')
    }
  }
})
