<template>
  <div class="card">
    <div class="card__header">
      <img :src="profileImage" :alt="`thumbnail ${name}`" class="card__img" />
    </div>
    <div class="card__body">
      <p class="card__name">{{ name }}</p>
      <p class="card__email">{{ email }}</p>
    </div>
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

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 400px;
  border: 1px solid #f0f0f0;

  &__header {
    position: relative;
    padding-top: 100%;
    height: 0;
    width: 100%;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__body {
    padding: 18px;
  }
  &__name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__email {
    font-size: 14px;
  }
}
</style>
