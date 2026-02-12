# Nuxt UI Component Library

This project is a small UI component library built with **Nuxt** and **Vue 3 Composition API** as part of a frontend coding challenge.

The objective is to demonstrate:

- modular component design
- reusable UI architecture
- accessibility awareness
- clean and scalable project structure

---

## Tech Stack

- Nuxt (Vue 3 + `<script setup>`)
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

---

## Components

All reusable components are located inside:

### BaseButton

Reusable button component with variants and sizes.

**Props**

- `variant`: `'primary' | 'secondary' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`: `boolean`

**Slots**

- default slot (button content)

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

**Accessibility**

- label linked to input
- aria attributes for error state

---

### BaseCard

Container component used to structure content blocks.

**Slots**

- default

---

### BaseModal

Modal dialog component.

**Props**

- `modelValue` (used via `v-model`)

**Events**

- `update:modelValue`

**Accessibility**

- Escape key closes modal
- Overlay click closes modal
- ARIA dialog roles

---

### BaseTabs

Accessible tabs component following WAI-ARIA guidelines.

**Props**

- `tabs`: `{ label, value }[]`
- `modelValue`

**Events**

- `update:modelValue`

**Accessibility**

- Keyboard navigation (Arrow keys)
- ARIA roles (`tablist`, `tab`, `tabpanel`)

---

The index.vue page show how each component can be composed together.

---

## Code Quality

The project includes:

- ESLint for code linting
- Prettier for formatting

Available scripts:

```bash
npm run lint
npm run lint:fix
npm run format
```

## To run locally

```bash
npm install
npm run dev
```
