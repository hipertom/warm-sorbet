<script setup lang="ts">
// Place once in app.vue; show messages with useToast(). `dismissLabel` is the close button's screen reader text.
import { Check, X } from '@lucide/vue'

defineProps<{ dismissLabel: string }>()

const { toasts, dismiss } = useToast()
</script>

<template>
  <!-- Bottom centre, above the phone's home indicator; newest at the bottom. aria-live: read out by screen readers. -->
  <div class="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]" aria-live="polite">
    <TransitionGroup
      tag="ol"
      class="relative flex flex-col items-center gap-2"
      move-class="transition duration-300 ease-gentle"
      enter-from-class="opacity-0 translate-y-4"
      enter-active-class="transition duration-500 ease-bounce"
      leave-to-class="opacity-0 scale-95"
      leave-active-class="transition duration-200 ease-gentle absolute left-1/2 -translate-x-1/2"
    >
      <li
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex max-w-md items-center gap-2.5 rounded-full py-2 pr-2 pl-3.5 text-sm font-medium shadow-lift"
        :class="toast.error ? 'bg-white text-accent-ink ring-1 ring-accent-ink/30' : 'bg-ink text-cream'"
        :role="toast.error ? 'alert' : 'status'"
      >
        <span class="grid size-5 shrink-0 place-items-center rounded-full" :class="toast.error ? 'bg-accent-ink text-white' : 'bg-cream/15'">
          <Check v-if="!toast.error" class="size-3.5" aria-hidden="true" />
          <span v-else class="text-xs leading-none font-bold" aria-hidden="true">!</span>
        </span>
        <span>{{ toast.text }}</span>
        <button type="button" class="grid size-7 shrink-0 place-items-center rounded-full opacity-60 transition hover:opacity-100" :aria-label="dismissLabel" @click="dismiss(toast.id)">
          <X class="size-4" aria-hidden="true" />
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>
