<template>
  <div>
    <h1>reset-password page</h1>
    <div v-if="status === 'init'">
      <form>
        <BasicInput v-model="email" name="email" />
        <BasicButton @click="handleRequestAuthCode">다음</BasicButton>
        <p>{{ errorMessage }}</p>
      </form>
    </div>
    <div v-else-if="status === 'issued'">
      <form>
        <p>인증 코드 검증 페이지</p>
        <Counter :remainTime="remainTime" />
        <BasicInput v-model="authCode" name="authCode" />
        <BasicButton @click="handleVerifyAuthCode">다음</BasicButton>
        <p>{{ errorMessage }}</p>
      </form>
    </div>
    <div v-else-if="status === 'verified'">
      <form>
        <p>비밀번호 변경 페이지</p>
        {{ email }}
        {{ confirmToken }}
        <BasicInput v-model="newPassword" name="newPassword" />
        <BasicInput v-model="newPasswordConfirm" name="newPasswordConfirm" />
        <BasicButton @click="handleChangePassword">변경하기</BasicButton>
        <p>{{ errorMessage }}</p>
      </form>
    </div>
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
const { remainTime, confirmToken } = storeToRefs(auth)
const email = ref('')
const authCode = ref('')
const errorMessage = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')
const status = ref<Status>('init')

async function handleRequestAuthCode() {
  const result = await auth.requestAuthCode(email.value)
  if (typeof result === 'object') {
    status.value = 'issued'
  } else {
    errorMessage.value = result
  }
}

async function handleVerifyAuthCode() {
  const result = await auth.verifyAuthCode(authCode.value)
  console.log('result : ', result)
  if (result === 'success') {
    status.value = 'verified'
  } else {
    errorMessage.value = result
  }
}

async function handleChangePassword() {
  const result = await auth.requestChangePassword({
    newPassword: newPassword.value,
    newPasswordConfirm: newPasswordConfirm.value
  })
  console.log('result : ', result)
  if (result === 'success') {
    alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
    router.push('/signin')
  } else {
    errorMessage.value = result
  }
}
</script>

<style scoped></style>
