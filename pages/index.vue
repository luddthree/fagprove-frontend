<script setup>
definePageMeta({
  layout: 'default'
});
</script>
<template>
  <div class="relative min-h-screen bg-black text-gray-200">
    <!-- Gråtonet bakgrunnsbilde -->
    <div class="absolute inset-0 z-0">
      <img
        src="/public/lokalet.png"
        alt="Autofix AS"
        class="w-full h-full object-cover opacity-30"
      />
    </div>

    <!-- Innhold -->
    <div class="relative z-[999] flex flex-col items-center justify-center text-center p-6 min-h-screen">
      <h1 class="text-5xl font-bold text-white mb-4">Velkommen til Autofix AS</h1>
      <p class="text-lg text-gray-300 max-w-xl mb-6">
        Hos oss kan du enkelt bestille time gjennom dashbordet etter innlogging. Hold oversikt over dine avtaler, kjøretøy og mer.
      </p>

      <!-- Lenker til login og register -->
      <div class="flex gap-4 mb-10">
        <NuxtLink to="/login" class="bg-orange-600 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-700 transition">
          Logg inn
        </NuxtLink>
        <NuxtLink to="/register" class="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-700 transition">
          Registrer deg
        </NuxtLink>
      </div>

      <!-- Dashboard preview info -->

    </div>


  </div>
     <!-- <div class="p-36">
      <div class="bg-gray-200 rounded-xl p-6 shadow-lg max-w-md backdrop-blur-md border border-gray-700">
        <h2 class="text-2xl font-semibold text-white mb-2">Dashbordfunksjoner</h2>
        <ul class="text-left text-gray-300 list-disc pl-5">
          <li>Bestill verkstedtime</li>
          <li>Se kommende avtaler</li>
          <li>Administrer dine kjøretøy</li>
        </ul>
      </div>
    </div> -->
    

     

</template>
