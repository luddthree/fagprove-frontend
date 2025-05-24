<template>
  <div class="container mx-auto m-10 p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <!-- Horizontal layout for components -->
    <div class="flex flex-wrap gap-6">
      <vehicles class="flex-1 min-w-[350px]" />
      <appointments class="flex-1 min-w-[350px]" />
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  middleware: 'auth'
})
import dashboardInfo from '~/components/dashboardInfo.vue'
import vehicles from '~/components/vehicles.vue'
import appointments from '~/components/appointments.vue'


// import createdTask from '~/components/createdTask.vue'


</script>

<style scoped>
</style>
