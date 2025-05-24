<template>
        <button @click="sendEmail" class="bg-blue-500 text-white p-2 rounded">Send email</button>
</template>

<script setup>
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()


const sendEmail = () => {
    taskStore.sendEmail() 
}

</script>
