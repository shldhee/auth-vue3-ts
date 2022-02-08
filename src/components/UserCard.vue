<template>
  <div class="card">
    <img :src="profileImage" :alt="`thumbnail ${name}`" />
    <p>{{ name }}</p>
    <p>{{ email }}</p>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  name: string
  email: string
  profileImage: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'default name',
  email: 'default email',
  profileImage: 'https://loremflickr.com/400/400'
})

const { name, email, profileImage } = toRefs(props)
</script>

<style scoped></style>
