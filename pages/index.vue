<script setup>
import { ref } from "vue"
import BaseButton from "~/components/ui/BaseButton.vue"
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseModal from '~/components/ui/BaseModal.vue'
import BaseInputField from "~/components/ui/BaseInputField.vue"



//for buttons
function handleClick(variant) {
  alert(`Clicked on ${variant}!`)
}

function handleActionClick(action) {
  alert(`Clicked on action ${action}!`)
}

const buttons =[
  {
    id:1,
    variant:"",
    size:"sm",
    disabled: null
  },
  {
    id:2,
    variant:"secondary",
    size:"",
    disabled: true
  },
  {
    id:3,
    variant:"danger",
    size:"lg",
    disabled: false
  },
]

//for modal
const isOpen = ref(false)

//for inputfield
const email = ref('')
const error = ref('')

function validate() {
  if (!email.value.includes('@')) {
    error.value = 'Please enter a valid email address'
  } else {
    error.value = ''
  }
}

</script>

<template>
  <div  class="min-h-screen bg-gray-900 text-white bg-[url(/public/hexagonTexture.png)]">
    <h1 class="pt-20 font-bold text-center text-2xl">FRONTEND CODING CHALLANGE <br> BY CARLO DETTORI</h1>
    <h1 class="pt-20 font-bold text-center">BUTTONS</h1>
    <div class="w-full p-10 flex flex-col sm:flex-row gap-5 justify-center ">
      <BaseButton v-for="button in buttons" :key="button.id" @click="handleClick(button.variant || 'primary')" :variant="button.variant || ''" :size="button.size || ''" :disabled="button.disabled">
        {{ button.variant ? button.variant.charAt(0).toUpperCase() + button.variant.slice(1) : 'Primary' }} Alert!
      </BaseButton>
  </div>
  <h1 class="mt-20 font-bold text-center">CARD</h1>
  
<div class="w-full p-10 flex flex-col sm:flex-row gap-5 justify-center">
      <BaseCard v-for="i in 3" :key="i" bordered class="sm:max-w-lg ">
  <template #header>
    <h2 class="text-xl font-semibold">
      Card Title n°{{ i }}
    </h2>
  </template>

  Card Content n°{{ i }}

  <template #footer>
    <BaseButton size="sm" @click="handleActionClick(i)">
      Action {{ i }}
    </BaseButton>
  </template>
</BaseCard>
    </div>
  
<h1 class="mt-20 font-bold text-center">MODAL</h1>
<div class="p-10">

    <BaseButton class="flex mx-auto" @click="isOpen = true">
      Open Modal
    </BaseButton>

    <BaseModal v-model="isOpen">
  <template #header>
    <h2 class="text-xl font-semibold">
      Advanced Modal
    </h2>
  </template>

  This modal now supports structured slots and animations.

  <template #footer>
    <div class="flex justify-end gap-2">
      <BaseButton variant="secondary" @click="isOpen = false">
        Cancel
      </BaseButton>
      <BaseButton @click="handleClick('confirm'),isOpen = false">
        Confirm
      </BaseButton>
    </div>
  </template>
</BaseModal>

  </div>
  <h1 class="mt-20 font-bold text-center">INPUT FIELD</h1>

<div class="p-10 max-w-md space-y-4">
    
    <BaseInputField
      v-model="email"
      label="Email"
      placeholder="Enter your email"
      :error="error"
    />

    <BaseButton @click="validate">
      Validate
    </BaseButton>

  </div>

</div>

</template>