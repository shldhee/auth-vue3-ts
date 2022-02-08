<template>
  <h1>User</h1>
  <UserCard
    :name="userInfo.name"
    :email="userInfo.email"
    :profile-image="userInfo.profileImage"
  />
  <BasicButton @click="logout">로그아웃</BasicButton>
  <p>{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'
import UserCard from '@/components/UserCard.vue'
import BasicButton from '@/components/BasicButton.vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ref } from 'vue'
import { AxiosResponse } from 'axios'

const auth = useAuth()
const { userInfo } = storeToRefs(auth)
const errorMessage = ref('')

async function logout() {
  const result = await auth.logout()
  if (result === true) {
    router.push('/signin')
  } else {
    const response = result as AxiosResponse
    errorMessage.value = response.data.error.message
  }
}
</script>

<style scoped></style>
