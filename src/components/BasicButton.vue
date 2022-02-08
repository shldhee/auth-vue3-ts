<template>
  <button :type="type" class="button">
    <slot>default</slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes, toRefs } from 'vue'

interface Props {
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
})

const { type } = toRefs(props)
</script>

<style scoped lang="scss">
.button {
  color: #ffffff;
  background-color: #ff5160;
  border: 0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
}
</style>
