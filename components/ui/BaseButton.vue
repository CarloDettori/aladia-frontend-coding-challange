<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const baseClasses =
  "rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2"

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-black hover:bg-gray-300'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-sm'
    case 'lg':
      return 'px-6 py-3 text-lg'
    default:
      return 'px-4 py-2'
  }
})
</script>

<template>
  <button
    :class="[baseClasses, variantClasses, sizeClasses]"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>