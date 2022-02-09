<template>
  <div>
    <p>{{ convertTimeFormat(remainTimeData) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs, onUnmounted } from 'vue'
import convertTimeFormat from '@/utils/convertTimeFormat'

interface Props {
  remainTime: number
}
const props = defineProps<Props>()
const { remainTime } = toRefs(props)
const interval = 1000 // 1 second
const remainTimeData = ref(remainTime.value / interval)
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setTimeout(function tick() {
    remainTimeData.value--
    if (remainTimeData.value > 0) {
      timer = setTimeout(tick, 1000)
    } else {
      alert('시간이 초과되었습니다. 다시 시도해주세요.')
      location.reload()
    }
  }, 1000)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>
ㅐ

<style scoped></style>
