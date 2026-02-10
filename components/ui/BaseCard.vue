<script>
const props = defineProps({
  title: {
    type: String,
    default: 'cardTitle'
  },
  description: {
    type: String,
    default: 'cardDex'
  },
  img: {
    type: String,
    default: '/public/placeholder'
  },
  
})
</script>

<template>
  <div
    :class="[baseClasses, variantClasses, sizeClasses]"
  >
    <slot />
  </div>
</template>