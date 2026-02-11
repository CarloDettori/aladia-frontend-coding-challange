<script setup lang="ts">
import { computed } from 'vue'
import { useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClasses = computed(() => [
  "w-full rounded-lg border px-4 py-2 transition outline-none",
  props.error
    ? "border-red-500 focus:ring-2 focus:ring-red-400"
    : "border-gray-300 focus:ring-2 focus:ring-blue-400",
  props.disabled
    ? "bg-gray-100 cursor-not-allowed opacity-70"
    : "bg-white dark:bg-gray-800"
])
</script>

<template>
  <div class="w-full">
    
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      
      <!-- Slot left -->
      <div
        v-if="$slots.left"
        class="absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="left" />
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          inputClasses,
          $slots.left ? 'pl-10' : '',
          $slots.right ? 'pr-10' : ''
        ]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        @input="updateValue"
      />

      <!-- Slot right -->
      <div
        v-if="$slots.right"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <slot name="right" />
      </div>
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>

  </div>
</template>