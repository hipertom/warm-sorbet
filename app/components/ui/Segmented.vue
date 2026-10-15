<script setup lang="ts" generic="T extends string">
// Segmented control: the active option is an ink pill.
defineProps<{ options: { value: T; label: string }[]; label: string }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="inline-flex rounded-full bg-white/70 p-1 ring-1 ring-ink/5" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="rounded-full px-4 py-1.5 text-sm font-medium transition duration-300 ease-gentle focus-visible:rounded-full"
      :class="model === option.value ? 'bg-ink text-cream' : 'text-ink-soft hover:text-ink'"
      :aria-pressed="model === option.value"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>
