<script setup lang="ts">
// Stat tile: label at the top, big display-font number at the bottom, optional unit after the number.
// `compact` (dashboards): on a phone a slim row with the label left and the number right; a tall tile from tablet up.
import type { Component } from 'vue';

const { tone = 'white', compact = false } = defineProps<{
    label: string;
    value: string | number;
    unit?: string;
    icon?: Component;
    tone?: Tone;
    compact?: boolean;
}>();
</script>

<template>
    <div
        class="flex rounded-3xl"
        :class="[
            TONE_SURFACE[tone],
            compact
                ? 'items-center justify-between gap-3 px-4 py-3 sm:flex-col sm:items-stretch sm:gap-6 sm:p-6'
                : 'flex-col justify-between gap-6 p-5 sm:p-6',
        ]"
    >
        <div
            class="flex items-center gap-2 font-medium opacity-70"
            :class="compact ? 'text-xs leading-tight sm:text-sm' : 'text-sm'"
        >
            <component :is="icon" v-if="icon" class="size-4 shrink-0" aria-hidden="true" />
            {{ label }}
        </div>
        <p
            class="font-display font-semibold tabular-nums sm:text-5xl"
            :class="compact ? 'text-3xl' : 'text-4xl tracking-tight'"
        >
            {{ value }}<span v-if="unit" class="ml-1 text-lg font-medium opacity-60">{{ unit }}</span>
        </p>
    </div>
</template>
