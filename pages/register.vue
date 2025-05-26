<template>
  <div class="min-h-screen bg-gray-100 flex flex-col px-4">
    <div class="flex-1 flex justify-center mt-10 md:mt-20">
      <div class="w-full max-w-2xl">
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold mb-2">Registrer bruker</h1>
          <p class="text-gray-600 text-sm">
            Registrer bruker for å få tilgang til dashboardet hvor du kan bestille verkstedtime og registrere kjøretøy hos Autofix AS.
          </p>
        </div>

        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label class="block text-xs font-bold mb-1">Navn</label>
            <input v-model="form.name" type="text" class="w-full border rounded-md p-2" placeholder="Navn" />
          </div>

          <div>
            <label class="block text-xs font-bold mb-1">E-post</label>
            <input v-model="form.email" type="email" class="w-full border rounded-md p-2" placeholder="E-post" />
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-xs font-bold mb-1">Passord</label>
              <input v-model="form.password" type="password" class="w-full border rounded-md p-2" placeholder="Passord" />
            </div>
            <div class="flex-1">
              <label class="block text-xs font-bold mb-1">Gjenta passord</label>
              <input v-model="form.password_confirmation" type="password" class="w-full border rounded-md p-2" placeholder="Gjenta passord" />
            </div>
          </div>

          <div class="flex items-start gap-2">
            <input type="checkbox" id="terms" v-model="agreed" class="mt-1 accent-orange-600" />
            <label for="terms" class="text-sm text-gray-700">
              Trykk her for å godkjenne våre <a href="#" class="text-orange-600 underline">Medlemsvilkår</a>
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold p-3 rounded-md"
            :disabled="!agreed"
          >
            Registrer
          </button>
        </form>

        <div v-if="error" class="text-red-500 mt-4 text-sm text-center">{{ error }}</div>

        <div class="mt-4 text-center">
          <a href="/login" class="text-sm text-gray-800 hover:underline">Har du allerede en konto? Logg inn her.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const agreed = ref(false)
const error = ref(null)

const router = useRouter()

async function register() {
  try {
    const response = await $fetch('/api/register', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      body: form.value,
    })

    alert('Bruker registrert!')
    console.log(response)

    // ✅ Redirect to login page
    router.push('/login')
  } catch (err) {
    error.value = err?.data?.message || 'En feil oppstod.'
    console.error(err)
  }
}
</script>


<style scoped>
</style>
