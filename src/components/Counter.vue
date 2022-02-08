<template>
  <div>
    <p>{{ convertTimeFormat(remainTimeData) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import convertTimeFormat from '@/utils/convertTimeFormat'

interface Props {
  remainTime: number
}
const props = defineProps<Props>()
const { remainTime } = toRefs(props)
const interval = 1000 // 1 second
const remainTimeData = ref(remainTime.value / interval)

onMounted(() => {
  const repeat = () => {
    remainTimeData.value--
    if (remainTimeData.value > 0) {
      setTimeout(repeat, 1000)
    } else {
      alert('시간이 초과되었습니다. 다시 시도해주세요.')
      location.reload()
    }
  }
  repeat()
})
</script>
ㅐ

<style scoped></style>
