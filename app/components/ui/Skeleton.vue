<script setup lang="ts">
// Loading placeholder shaped like a card: white surface with pulsing bars, same grid as the real content.
const { lines = 2 } = defineProps<{ lines?: number }>()
</script>

<template>
  <div class="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-6" aria-hidden="true">
    <div class="flex animate-pulse items-center gap-4">
      <span class="size-12 shrink-0 rounded-2xl bg-cream-deep" />
      <div class="flex-1 space-y-2">
        <span class="block h-4 w-2/5 rounded-full bg-cream-deep" />
        <span class="block h-3 w-3/5 rounded-full bg-cream-deep" />
      </div>
    </div>
    <div class="mt-5 animate-pulse space-y-2">
      <span v-for="i in lines" :key="i" class="block h-3 rounded-full bg-cream-deep" :class="i === lines ? 'w-1/2' : 'w-full'" />
    </div>
  </div>
</template>
