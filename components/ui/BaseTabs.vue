<script setup lang="ts">
import { computed } from 'vue'

//tab properties
interface TabItem {
  label: string
  value: string
}

//tab props
const props = defineProps<{
  tabs: TabItem[]
  modelValue: string
}>()

//update value function
const emit = defineEmits<{
  (_e: 'update:modelValue', _value: string): void
}>()

//active tab focus
const activeTab = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})

const selectTab = async (value: string) => {
  activeTab.value = value
}

//tabs scroll by arrow keys
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.tabs.length) return

  const currentIndex = props.tabs.findIndex((t) => t.value === activeTab.value)

  if (currentIndex === -1) return

  if (event.key === 'ArrowRight') {
    const nextIndex = (currentIndex + 1) % props.tabs.length
    const nextTab = props.tabs[nextIndex]
    if (nextTab) activeTab.value = nextTab.value
  }

  if (event.key === 'ArrowLeft') {
    const prevIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length
    const prevTab = props.tabs[prevIndex]
    if (prevTab) activeTab.value = prevTab.value
  }
}
</script>

<template>
  <div>
    <!-- tabs -->
    <div role="tablist" aria-label="Tabs" class="flex border-b">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        role="tab"
        :id="`tab-${tab.value}`"
        :aria-selected="activeTab === tab.value"
        :aria-controls="`panel-${tab.value}`"
        :tabindex="activeTab === tab.value ? 0 : -1"
        class="px-4 py-2 -mb-px border-b-2 transition focus:outline-none"
        :class="
          activeTab === tab.value
            ? 'border-blue-600 text-blue-600 font-semibold'
            : 'border-transparent text-white hover:text-gray-700'
        "
        @click="selectTab(tab.value)"
        @keydown="handleKeydown"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- panels -->
    <div
      v-for="tab in tabs"
      :key="tab.value"
      role="tabpanel"
      :id="`panel-${tab.value}`"
      :aria-labelledby="`tab-${tab.value}`"
      v-show="activeTab === tab.value"
      class="mt-4 p-4 rounded-lg border bg-white shadow-sm text-black"
    >
      <slot :active="activeTab" />
    </div>
  </div>
</template>
