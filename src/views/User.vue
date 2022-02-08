<template>
  <h1>User</h1>
  <UserCard
    :name="userInfo.name"
    :email="userInfo.email"
    :profile-image="userInfo.profileImage"
  />
  <BasicButton>로그아웃</BasicButton>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'
import UserCard from '@/components/UserCard.vue'
import BasicButton from '@/components/BasicButton.vue'
import { storeToRefs } from 'pinia'

const auth = useAuth()
const { userInfo } = storeToRefs(auth)
</script>

<style scoped></style>
