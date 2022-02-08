<template>
  <div>
    <h1>User</h1>
    <UserCard v-bind="userInfo" />
    <BasicButton>로그아웃</BasicButton>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'
import { onMounted, ref } from 'vue'
import UserCard from '@/components/UserCard.vue'
import BasicButton from '@/components/BasicButton.vue'
import { storeToRefs } from 'pinia'

const auth = useAuth()
const { userInfo } = storeToRefs(auth)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const result = await auth.fetchUserInfo()
  if (typeof result !== 'boolean') {
    errorMessage.value = result.data.error.message
  }
})
</script>

<style scoped></style>
