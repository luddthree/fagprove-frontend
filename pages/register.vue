<template>
    <div class="max-w-md mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-4">Register</h1>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full border rounded-md p-2"
            placeholder="Enter your name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full border rounded-md p-2"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full border rounded-md p-2"
            placeholder="Enter your password"
          />
        </div>
        <div class="mb-4">
          <label for="password_confirmation" class="block text-sm font-medium">Confirm Password</label>
          <input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            class="w-full border rounded-md p-2"
            placeholder="Confirm your password"
          />
        </div>
        <!-- <div class="mb-4">
          <label for="role" class="block text-sm font-medium">Role</label>
          <select id="role" v-model="form.role" class="w-full border rounded-md p-2">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div> -->
        <button type="submit" class="w-full bg-orange-600 text-white rounded-md p-2">Register</button>
      </form>
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
      <div>
        <p></p><a href="/login" class="text-gray-800 mt-3">Already a user? Log in here.</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Definerer skjema-data som brukeren fyller ut
  const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user' // Standard rolle som "user"
  })
  
  // Brukes for å vise feilmeldinger
  const error = ref(null)
  
  // Funksjon for å registrere bruker via Laravel API
  async function register() {
    try {
      const response = await $fetch('/api/register', {
        baseURL: useRuntimeConfig().public.apiBase, 
        method: 'POST', 
        body: form.value, 
      })
      alert('User registered successfully!') 
      console.log(response) 
    } catch (err) {
      error.value = err?.data?.message || 'An error occurred.' 
      console.error(err) 
      console.log(form.value) 
    }
  }
  </script>
  
  
  <style scoped>
  </style>
  