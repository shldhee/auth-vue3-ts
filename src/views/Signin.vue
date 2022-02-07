<template>
  <div class="signin">
    <h1>signin</h1>
    <form class="signin__form" @submit="handleSubmit">
      <label for="id">
        <input
          type="text"
          v-model="id"
          name="id"
          placeholder="ID를 입력해주세요"
        />
      </label>
      <label for="password">
        <input
          type="text"
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
import { ref } from 'vue'
const id = ref<string | null>(null)
const password = ref<string | null>(null)

function handleSubmit(e: Event) {
  e.preventDefault()
  console.log(id.value, password.value)
}
</script>

<style scoped></style>
