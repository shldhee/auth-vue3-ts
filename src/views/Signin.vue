<template>
  <div class="signin">
    <h1>signin</h1>
    <form class="signin__form" @submit="handleSubmit">
      <BasicInput v-model="email" name="email" />
      <BasicInput v-model="password" name="password" type="password" />
      <BasicButton type="submit" @click="handleSubmit">로그인</BasicButton>
      <router-link to="/reset-password">비밀번호 재설정</router-link>
      {{ auth.token }}
      <p>{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/store/auth'
import router from '@/router'
import BasicButton from '@/components/BasicButton.vue'
import BasicInput from '@/components/BasicInput.vue'
const email = ref<string | null>(null)
const password = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const auth = useAuth()

async function handleSubmit(e: Event) {
  e.preventDefault()
  const result = await auth.login({
    email: email.value!,
    password: password.value!
  })

  if (typeof result === 'string') {
    // 로그인 성공
    router.push('/user')
  } else {
    // 로그인 실패
    errorMessage.value = result.data.error.message
  }
}
</script>

<style scoped></style>
