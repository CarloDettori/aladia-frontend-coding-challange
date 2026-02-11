<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  shadow: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  }
})

const baseClasses =
  "rounded-xl bg-white dark:bg-gray-800 transition"

const shadowClass = computed(() =>
  props.shadow ? "shadow-lg" : ""
)

const borderClass = computed(() =>
  props.bordered ? "border border-gray-200 dark:border-gray-700" : ""
)
</script>

<template>
  <div :class="[baseClasses, shadowClass, borderClass]">
    
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <slot name="header" />
    </div>

    <div class="px-6 py-4">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
      <slot name="footer" />
    </div>

  </div>
</template>