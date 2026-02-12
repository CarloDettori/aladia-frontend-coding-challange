<script setup lang="ts">
import { watch, onUnmounted, nextTick, ref, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const titleId = useId()

const emit = defineEmits(['update:modelValue'])

const modalRef = ref<HTMLElement | null>(null)

//close modal by clicking out the modal
function close() {
  emit('update:modelValue', false)
}

//close modal by escape key
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
      <!-- darker overlay -->
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <!-- modal content -->
      <div
        ref="modalRef"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 z-10 outline-none"
        :aria-labelledby="$slots.header ? titleId : undefined"
      >
        <!-- title -->
        <div
          v-if="$slots.header"
          id="titleId"
          class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
        >
          <slot name="header" />
        </div>

        <!-- content -->
        <div class="px-6 py-4">
          <slot />
        </div>

        <!-- footer -->
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

<!-- some animation for closing and opening transition -->
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
