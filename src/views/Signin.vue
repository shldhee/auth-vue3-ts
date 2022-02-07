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
    </form>
  </div>
</template>

<script setup lang="ts">
import UserService from '@/services/UserService'
import { ref } from 'vue'
const email = ref<string | null>(null)
const password = ref<string | null>(null)

function handleSubmit(e: Event) {
  e.preventDefault()
  UserService.login({
    email: email.value!,
    password: password.value!
  })
}
</script>

<style scoped></style>
