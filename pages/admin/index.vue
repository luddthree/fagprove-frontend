<template>
  <div class="container mx-auto p-6 m-10 bg-red-50 rounded-xl">
    <h1 class="text-xl font-bold mb-6">Administrator Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <!-- <dashboardInfo /> -->
      <adminCreate />
      <adminVehicles />
      <adminList />
      <!-- Add more admin widgets here -->
    </div>
  </div>
</template>

<script setup>
import dashboardInfo from '~/components/dashboardInfo.vue'
import adminCreate from '~/components/adminCreate.vue'
import adminList from '~/components/adminList.vue'
import adminVehicles from '~/components/adminVehicles.vue'

definePageMeta({
  middleware: 'admin', 
})
</script>
