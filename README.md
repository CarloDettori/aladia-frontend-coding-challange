# Nuxt UI Component Library

This project is a small UI component library built with Nuxt 3/4 and Vue 3 Composition API as part of a frontend coding challenge.

the objective is to show modular component design, and clean progect structure


#PROJECT TECNOLOGIES
- Nuxt 3/4
- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Tailwind CSS
- ESLint + Prettier


##COMPONENTS

inside the folder component


─ BaseButton.vue
─ BaseCard.vue
─ BaseInputField.vue
─ BaseModal.vue
─ BaseTabs.vue

Reusable button component with variants and sizes.

**Props**
- `variant`: `'primary' | 'secondary' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`: `boolean`

**Slots**
- default slot for button content

**Events**
- `click`

---

### BaseInputField

Accessible input field with label and error handling.

**Props**
- `modelValue`
- `label`
- `type`
- `placeholder`
- `required`
- `error`

**Events**
- `update:modelValue`

---

### BaseCard

Simple layout component used as a container.

**Slots**
- default slot

---

### BaseModal

Modal dialog with overlay and focus trapping.

**Props**
- `open`

**Events**
- `close`

---

### BaseTabs

Accessible tabs component following WAI-ARIA guidelines.

**Props**
- `tabs`: `{ label, value }[]`
- `modelValue`

**Events**
- `update:modelValue`

**Accessibility**
- Keyboard navigation (Arrow keys, Home, End)
- Proper ARIA roles (`tablist`, `tab`, `tabpanel`)
- Focus management

---


#EACH COMPONENT RENDERED IN index.vue file
