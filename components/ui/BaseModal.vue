<script setup lang="ts">
import { watch, onUnmounted, nextTick, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref<HTMLElement | null>(null)

function close() {
  emit('update:modelValue', false)
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}

watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal) {
      document.addEventListener('keydown', handleEsc)

      await nextTick()
      modalRef.value?.focus()
    } else {
      document.removeEventListener('keydown', handleEsc)
    }
  }
)

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="close"
      ></div>

      <!-- Modal content -->
      <div
        ref="modalRef"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 z-10 outline-none"
      >
        <!-- Header -->
        <div
          v-if="$slots.header"
          class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
        >
          <slot name="header" />
        </div>

        <!-- Body -->
        <div class="px-6 py-4">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>