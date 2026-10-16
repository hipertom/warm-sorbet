<script setup lang="ts">
// Icon of an action button (refresh). While loading it turns one bouncy lap at a time; once the lap is done
// it shows the result: a check (success) or "!" (error) rises in from below and leaves through the top,
// then the idle icon comes back from below.
import { Check } from '@lucide/vue';
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; loading?: boolean; result?: ActionResult | null }>();

type Phase = 'idle' | 'spinning' | 'result' | 'returning';
const phase = ref<Phase>(props.loading ? 'spinning' : 'idle');
const shown = ref<ActionResult>('success');
const RESULT_MS = 1200;
const RETURN_MS = 400;
let timer: ReturnType<typeof setTimeout> | undefined;

const reducedMotion = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function finish() {
    clearTimeout(timer);
    if (!props.result) return (phase.value = 'idle');
    shown.value = props.result;
    phase.value = 'result';
    timer = setTimeout(() => {
        phase.value = 'returning';
        timer = setTimeout(() => (phase.value = 'idle'), RETURN_MS);
    }, RESULT_MS);
}

watch(
    () => props.loading,
    (loading) => {
        if (loading) {
            clearTimeout(timer);
            phase.value = 'spinning';
        } else if (reducedMotion()) {
            finish(); // no animation, so no lap to wait for
        }
    },
);

// Called at the end of every lap: stop only when loading is over, so the icon never halts mid-turn.
function onLap() {
    if (!props.loading && phase.value === 'spinning') finish();
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <span class="relative inline-flex size-4 shrink-0 overflow-hidden" aria-hidden="true">
        <template v-if="phase === 'result'">
            <Check v-if="shown === 'success'" class="size-4 animate-pass" />
            <!-- Lucide has no bare "!", so drawn here in the same line style. -->
            <svg
                v-else
                class="size-4 animate-pass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
            >
                <path d="M12 4v10" />
                <path d="M12 20h.01" />
            </svg>
        </template>
        <component
            :is="icon"
            v-else
            class="size-4"
            :class="{ 'animate-turn': phase === 'spinning', 'animate-return': phase === 'returning' }"
            @animationiteration="onLap"
        />
    </span>
</template>
