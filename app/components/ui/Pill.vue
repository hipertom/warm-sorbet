<script setup lang="ts">
// Pill / eyebrow: one or two words in a tone, as a section eyebrow or a status.
// `accent` is reserved for the one thing that needs the user's action (picking up a parcel).
const { tone = 'cream' } = defineProps<{ tone?: PillTone }>();
</script>

<template>
    <span
        class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap"
        :class="PILL_TONE[tone]"
    >
        <slot />
    </span>
</template>
