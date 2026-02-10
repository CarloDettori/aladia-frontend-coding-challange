<script setup>
import BaseButton from "~/components/ui/BaseButton.vue"
function handleClick() {
  alert('Clicked!')
}
</script>

<template>
  <div class="p-10 space-x-4">
    <BaseButton @click="handleClick">
      Primary
    </BaseButton>

    <BaseButton variant="secondary">
      Secondary
    </BaseButton>

    <BaseButton variant="danger" size="lg">
      Danger
    </BaseButton>
  </div>
</template>