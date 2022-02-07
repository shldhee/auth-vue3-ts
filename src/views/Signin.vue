<template>
  <div class="signin">
    <h1>signin</h1>
    <form class="signin__form" @submit="handleSubmit">
      <label for="email">
        <input
          autocomplete="username"
          type="text"
          v-model="email"
          name="email"
          placeholder="EMAIL를 입력해주세요"
        />
      </label>
      <label for="password">
        <input
          autocomplete="current-password"
          type="password"
          v-model="password"
          name="password"
          placeholder="PASSWORD를 입력해주세요"
        />
      </label>
      <button>로그인</button>
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

  if (result.status === 200) {
    // 로그인 성공
    router.push('/user')
  } else {
    // 로그인 실패
    errorMessage.value = result.message
  }
}
</script>

<style scoped></style>
