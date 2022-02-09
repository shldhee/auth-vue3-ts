<template>
  <div class="reset-password">
    <template v-if="status === 'init'">
      <h1 class="reset-password__title">인증 코드 발급 요청</h1>
      <form class="reset-password__form">
        <div class="reset-password__box">
          <BasicInput v-model="email" name="email" />
        </div>
        <BasicButton type="submit" @click="handleRequestAuthCode"
          >다음</BasicButton
        >
      </form>
    </template>
    <template v-else-if="status === 'issued'">
      <h1 class="reset-password__title">인증 코드 검증</h1>
      <form class="reset-password__form">
        <div class="reset-password__box">
          <Counter :remainTime="remainTime" />
        </div>
        <div class="reset-password__box">
          <BasicInput v-model="authCode" name="authCode" />
        </div>
        <BasicButton type="submit" @click="handleVerifyAuthCode"
          >다음</BasicButton
        >
      </form>
    </template>
    <template v-else-if="status === 'verified'">
      <h1 class="reset-password__title">비밀번호 변경</h1>
      <form class="reset-password__form">
        <div class="reset-password__box">
          <BasicInput
            type="password"
            v-model="newPassword"
            name="newPassword"
          />
        </div>
        <div class="reset-password__box">
          <BasicInput
            type="password"
            v-model="newPasswordConfirm"
            name="newPasswordConfirm"
          />
        </div>
        <BasicButton type="submit" @click="handleChangePassword"
          >변경하기</BasicButton
        >
      </form>
    </template>
    <p class="reset-password__error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import BasicInput from '@/components/BasicInput.vue'
import BasicButton from '@/components/BasicButton.vue'
import { ref } from 'vue'
import { useAuth } from '@/store/auth'
import { storeToRefs } from 'pinia'
import Counter from '@/components/Counter.vue'
import router from '@/router'
type Status = 'init' | 'issued' | 'verified'
const auth = useAuth()
const { remainTime } = storeToRefs(auth)
const email = ref('')
const authCode = ref('')
const errorMessage = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')
const status = ref<Status>('init')

async function handleRequestAuthCode(e: Event) {
  e.preventDefault()
  const result = await auth.requestAuthCode(email.value)
  if (result === 'success') {
    status.value = 'issued'
    errorMessage.value = ''
  } else {
    errorMessage.value = result
  }
}

async function handleVerifyAuthCode(e: Event) {
  e.preventDefault()
  const result = await auth.verifyAuthCode(authCode.value)
  if (result === 'success') {
    status.value = 'verified'
    errorMessage.value = ''
  } else {
    errorMessage.value = result
  }
}

async function handleChangePassword(e: Event) {
  e.preventDefault()
  const result = await auth.requestChangePassword({
    newPassword: newPassword.value,
    newPasswordConfirm: newPasswordConfirm.value
  })
  if (result === 'success') {
    alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
    router.push('/signin')
  } else {
    errorMessage.value = result
  }
}
</script>

<style scoped lang="scss">
.reset-password {
  &__title {
    font-size: 18px;
    margin-bottom: 16px;
  }
  &__form {
    box-sizing: border-box;
    width: 100%;
    max-width: 480px;
  }
  &__box {
    margin-bottom: 20px;
  }
  &__error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
