<script setup lang="ts">
// Empty: one friendly, human sentence (slot) in a soft tile.
const { tone = 'sage' } = defineProps<{ tone?: Tone }>()
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl p-6 sm:p-7" :class="TONE_SOFT[tone]">
    <span class="absolute -top-8 -right-6 size-28 rounded-full bg-white/50" aria-hidden="true" />
    <span class="absolute -right-10 bottom-[-3rem] size-24 rounded-full bg-white/40" aria-hidden="true" />
    <p class="relative max-w-md text-ink-soft"><slot /></p>
  </div>
</template>
