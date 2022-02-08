<template>
  <div>
    <h1>reset-password page</h1>
    <div v-if="status === 'init'">
      <form>
        <BasicInput v-model="email" name="email" />
        <BasicButton @click="handleRequestAuthCode">Next</BasicButton>
        <p>{{ errorMessage }}</p>
      </form>
    </div>
    <div v-else-if="status === 'issued'">
      <p>인증 코드 검증 페이지</p>
      <Counter :remainTime="remainTime" />
      <p>{{ remainTime }}</p>
      <p>{{ issueToken }}</p>
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
type Status = 'init' | 'issued' | 'verified'
const auth = useAuth()
const { remainTime, issueToken } = storeToRefs(auth)
const email = ref('')
const errorMessage = ref('')
const status = ref<Status>('init')

async function handleRequestAuthCode() {
  const result = await auth.requestAuthCode(email.value)
  if (typeof result === 'object') {
    status.value = 'issued'
  } else {
    errorMessage.value = result
  }
}
</script>

<style scoped></style>
