<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseModal from '~/components/ui/BaseModal.vue'
import BaseInputField from '~/components/ui/BaseInputField.vue'
import BaseTabs from '~/components/ui/BaseTabs.vue'

//functions for button click
function handleClick(variant: string) {
  alert(`Clicked on ${variant}!`)
}

function handleActionClick(action: number) {
  alert(`Clicked on action ${action}!`)
}

//number of clickable buttons
const buttons = [
  {
    id: 1,
    variant: '',
    size: 'sm',
    disabled: false
  },
  {
    id: 2,
    variant: 'secondary',
    size: '',
    disabled: true
  },
  {
    id: 3,
    variant: 'danger',
    size: 'lg',
    disabled: false
  }
]

//state for modal
const isOpen = ref(false)

//consts for inputfield
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

//mail validation
const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

//submit management
const onSubmit = async () => {
  error.value = ''
  success.value = false

  if (!email.value || !password.value) {
    error.value = 'All fields are required'
    return
  }

  if (!validateEmail(email.value)) {
    error.value = 'Invalid email format'
    return
  }

  loading.value = true

  // Simulazione chiamata API
  await new Promise((resolve) => setTimeout(resolve, 1500))

  loading.value = false
  success.value = true

  email.value = ''
  password.value = ''
}

//initial status for tabs
const activeTab = ref('login')

//number of clickable tabs
const tabs = [
  { label: 'Login', value: 'login' },
  { label: 'Register', value: 'register' },
  { label: 'Info', value: 'info' },
  { label: 'Contact', value: 'contact' }
]
</script>

<template>
  <div
    class="min-h-screen bg-gray-900 text-white bg-[url(/public/hexagonTexture.png)]"
  >
    <h1 class="pt-20 font-bold text-center text-2xl">
      FRONTEND CODING CHALLANGE <br />
      BY CARLO DETTORI
    </h1>
    <!-- buttons rendering -->
    <h1 class="pt-20 font-bold text-center">BUTTONS</h1>
    <div class="w-full p-10 flex flex-col sm:flex-row gap-5 justify-center">
      <BaseButton
        v-for="button in buttons"
        :key="button.id"
        @click="handleClick(button.variant || 'primary')"
        :variant="button.variant || ''"
        :size="button.size || ''"
        :disabled="button.disabled"
      >
        {{
          button.variant
            ? button.variant.charAt(0).toUpperCase() + button.variant.slice(1)
            : 'Primary'
        }}
        Alert!
      </BaseButton>
    </div>

    <!-- Cards rendering (3 cards from loop) -->
    <h1 class="mt-20 font-bold text-center">CARDS</h1>

    <div class="w-full p-10 flex flex-col sm:flex-row gap-5 justify-center">
      <BaseCard v-for="i in 3" :key="i" bordered class="sm:max-w-lg">
        <template #header>
          <h2 class="text-xl font-semibold">Card Title n°{{ i }}</h2>
        </template>

        Card Content n°{{ i }}

        <template #footer>
          <BaseButton size="sm" @click="handleActionClick(i)">
            Action {{ i }}
          </BaseButton>
        </template>
      </BaseCard>
    </div>

    <!-- modal rendering -->
    <h1 class="mt-20 font-bold text-center">MODAL</h1>
    <div class="p-10">
      <BaseButton class="flex mx-auto" @click="isOpen = true">
        Open Modal
      </BaseButton>

      <BaseModal v-model="isOpen">
        <template #header>
          <h2 class="text-xl font-semibold">MODAL</h2>
        </template>

        Hi, that's a nice modal! <br />
        Click on <strong>Confirm</strong> to go on <br />
        Click on <strong>Cancel</strong> to close the modal
        <template #footer>
          <div class="flex justify-end gap-2">
            <BaseButton variant="secondary" @click="isOpen = false">
              Cancel
            </BaseButton>
            <BaseButton @click="(handleClick('confirm'), (isOpen = false))">
              Confirm
            </BaseButton>
          </div>
        </template>
      </BaseModal>
    </div>

    <!--multiple input field rendered inside a card component -->
    <h1 class="mt-20 font-bold text-center">INPUT FIELD</h1>
    <div class="flex justify-center items-center p-6">
      <BaseCard>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <BaseInputField
            v-model="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <BaseInputField
            v-model="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />

          <p v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </p>

          <p v-if="success" class="text-green-600 text-sm">Login successful!</p>

          <BaseButton type="submit" :disabled="loading" class="w-full">
            {{ loading ? 'Loading...' : 'Login' }}
          </BaseButton>
        </form>
      </BaseCard>
    </div>

    <!-- tab with 4 section (minimal design) -->
    <h1 class="mt-20 font-bold text-center">TAB</h1>
    <div class="flex justify-center items-center p-6 pb-20">
      <BaseTabs v-model="activeTab" :tabs="tabs">
        <template #default="{ active }">
          <div v-if="active === 'login'">Login content</div>

          <div v-if="active === 'register'">Register content</div>
          <div v-if="active === 'info'">Info content</div>
          <div v-if="active === 'contact'">Contact information</div>
        </template>
      </BaseTabs>
    </div>
  </div>
</template>
