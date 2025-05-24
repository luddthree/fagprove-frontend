import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    // setter auth token
    setToken(token) {
      console.log('Setting token:', token) 
      this.token = token
      if (process.client) {
        localStorage.setItem('auth_token', token)
      }
    },
    // fjerner auth token
    clearToken() {
      console.log('Clearing token') 
      this.token = null
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
    },
    // oppdaterer brukerprofil
    async updateProfile(name, email) {
      try {
        const response = await $fetch('/api/user/profile', {
          baseURL: useRuntimeConfig().public.apiBase, // Use API base URL
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { name, email }
        })
        this.user = response.user
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    },
    
    // oppdaterer passord
    async updatePassword(currentPassword, newPassword, confirmNewPassword) {
      try {
        await $fetch('/api/user/password', {
          baseURL: useRuntimeConfig().public.apiBase, // Use API base URL
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: { current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmNewPassword }
        })
        alert('Password updated successfully!')
      } catch (error) {
        console.error('Failed to update password:', error)
      }
    },
    // henter bruker
    async fetchUser() {
      if (this.token) {
        try {
          const response = await $fetch('/api/user', {
            baseURL: useRuntimeConfig().public.apiBase, // Use API base URL
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          this.user = response.user
          console.log('Fetched user:', this.user) 
          console.log('role ' + this.user?.role)

        } catch (error) {
          console.error('Failed to fetch user:', error)
          this.clearToken()
          throw error
        }
      } else {
        console.error('No token found. User is not authenticated.')
        throw new Error('No token found')
      }
    }
    ,

    // henter bruker
    async initialize() {
      console.log('Initializing auth store') 
    
      if (process.client) {
        const storedToken = localStorage.getItem('auth_token')
        console.log('Token found in localStorage:', storedToken) 
    
        // Always set the token if available (even on public routes)
        if (storedToken) {
          this.token = storedToken
          await this.fetchUser().catch(() => {
            console.error('Invalid token. Clearing auth state.')
            this.clearToken()
            navigateTo('/login') 
          })
          return
        }
    
        // If no token, only redirect when visiting a protected route
        const publicRoutes = ['/', '/register', '/login']
        const currentRoute = window.location.pathname
    
        if (!publicRoutes.includes(currentRoute)) {
          console.log('No token found. Redirecting to login...')
          navigateTo('/login')
        }
      }
    },
    
// sjekker om bruker er admin
    isAdmin() {
      console.log('admin func role ' + this.user?.role)
      return this.user?.role === 'admin' 
    },
    
    
  },
})