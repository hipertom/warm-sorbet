<script setup lang="ts">
// primary = ink, accent = one per screen, secondary = quiet, inverted = quiet on a dark (ink) surface. Renders a NuxtLink when `to` is given; an in-page
// anchor (`#section`) stays a plain link so the browser scrolls to it, also in apps without pages.
// `loading` and `result` drive the icon (UiActionIcon): bouncy laps while busy, then a check or "!".
import type { Component } from 'vue';

const {
    variant = 'primary',
    size = 'md',
    to,
    icon,
    type = 'button',
    loading = false,
    result = null,
} = defineProps<{
    variant?: 'primary' | 'accent' | 'secondary' | 'inverted';
    size?: 'md' | 'sm';
    to?: string;
    icon?: Component;
    type?: 'button' | 'submit';
    loading?: boolean;
    result?: ActionResult | null;
}>();

// Resolved in setup: resolveComponent() inside the template renders a literal <nuxtlink> element.
const NuxtLink = resolveComponent('NuxtLink');

const VARIANTS = {
    primary: 'bg-ink text-cream font-medium shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
    accent: 'bg-accent text-ink font-semibold shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
    secondary: 'bg-white/70 text-ink font-medium ring-1 ring-ink/10 hover:bg-ink hover:text-cream',
    inverted: 'text-cream font-medium ring-1 ring-cream/20 hover:bg-cream hover:text-ink',
};
</script>

<template>
    <component
        :is="to ? NuxtLink : 'button'"
        :to="to"
        :external="to?.startsWith('#') || undefined"
        :type="to ? undefined : type"
        :disabled="to ? undefined : loading"
        :aria-busy="loading || undefined"
        class="inline-flex items-center justify-center gap-2 rounded-full transition duration-300 ease-bounce focus-visible:rounded-full disabled:pointer-events-none"
        :class="[
            VARIANTS[variant],
            size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3',
            !loading && 'disabled:opacity-50',
        ]"
    >
        <UiActionIcon v-if="icon" :icon="icon" :loading="loading" :result="result" />
        <slot />
    </component>
</template>
