<template>
  <div>
    <h1>User</h1>
    {{ auth.token }}
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'

const auth = useAuth()
</script>

<style scoped></style>
