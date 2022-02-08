<template>
  <div class="input-wrapper">
    <label class="input-wrapper__label" :for="name">
      {{ name }}
    </label>
    <input
      v-bind="$attrs"
      class="input-wrapper__input"
      :type="type"
      :value="modelValue"
      :name="name"
      :placeholder="name"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
interface Props {
  name: string
  type?: string
  modelValue: string | null
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const { type } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
.input-wrapper {
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  &__label {
  }
  &__input {
    display: block;
    font-size: 14px;
    outline: none;
    padding: 4px 8px;
    border: 1px solid #ababab;
    border-radius: 4px;
    color: #ababab;
    width: 100%;
    height: 100%;
  }
}
</style>
