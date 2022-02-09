<template>
  <div class="user">
    <h1 class="user__title">회원 정보 조회</h1>
    <UserCard
      :name="userInfo.name"
      :email="userInfo.email"
      :profile-image="userInfo.profileImage"
    />
    <div class="user__box">
      <BasicButton @click="logout">로그아웃</BasicButton>
    </div>
    <p class="user__error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'
import UserCard from '@/components/UserCard.vue'
import BasicButton from '@/components/BasicButton.vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ref } from 'vue'

const auth = useAuth()
const { userInfo } = storeToRefs(auth)
const errorMessage = ref('')

async function logout() {
  const result = await auth.logout()
  if (result === 'success') {
    router.push('/signin')
  } else {
    errorMessage.value = result
  }
}
</script>

<style scoped lang="scss">
.user {
  &__title {
    margin-bottom: 16px;
    font-size: 18px;
  }
  &__box {
    margin-top: 20px;
  }
  &__error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
