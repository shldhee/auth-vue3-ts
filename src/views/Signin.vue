<template>
  <div class="signin">
    <h1 class="signin__title">로그인</h1>
    <form class="signin__form">
      <div class="signin__box">
        <BasicInput v-model="email" name="email" />
      </div>
      <div class="signin__box">
        <BasicInput v-model="password" name="password" type="password" />
      </div>
      <BasicButton type="submit" @click="handleSubmit">로그인</BasicButton>
      <router-link class="signin__link" to="/reset-password">
        <BasicButton>비밀번호 재설정</BasicButton>
      </router-link>
      <p class="signin__error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/store/auth'
import router from '@/router'
import BasicButton from '@/components/BasicButton.vue'
import BasicInput from '@/components/BasicInput.vue'
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const auth = useAuth()

async function handleSubmit(e: Event) {
  e.preventDefault()
  const result = await auth.login({
    email: email.value!,
    password: password.value!
  })

  if (result === 'success') {
    // 로그인 성공
    router.push('/user')
  } else {
    // 로그인 실패
    errorMessage.value = result
  }
}
</script>

<style scoped lang="scss">
.signin {
  &__title {
    margin-bottom: 16px;
    font-size: 18px;
  }
  &__form {
    box-sizing: border-box;
    width: 100%;
    max-width: 480px;
  }
  &__box {
    margin-bottom: 20px;
  }
  &__link {
    margin-left: 20px;
  }
  &__error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
