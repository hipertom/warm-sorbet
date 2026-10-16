<script setup lang="ts">
// Bento tile: one tone, optional label row at the top, content pushed to the bottom.
// Without a label the tile is a plain flex column, so the content sets its own layout (e.g. `justify-between`).
// `spacious` is the roomy page size (32px radius, 24–28px padding); the default is the denser dashboard size.
// `interactive` adds the hover lift. A white tile gets the card treatment: `shadow-soft` and a hairline ring.
import type { Component } from 'vue';

const {
    tone = 'peach',
    soft = false,
    spacious = false,
    interactive = false,
} = defineProps<{
    tone?: Tone;
    soft?: boolean;
    label?: string;
    icon?: Component;
    spacious?: boolean;
    interactive?: boolean;
}>();
</script>

<template>
    <div
        class="flex flex-col justify-between gap-4"
        :class="[
            (soft ? TONE_SOFT : TONE_SURFACE)[tone],
            spacious ? 'rounded-[2rem] p-6 sm:p-7' : 'rounded-3xl p-5 sm:p-6',
            tone === 'white' && 'shadow-soft ring-1 ring-ink/5',
            interactive && 'transition duration-300 ease-bounce hover:-translate-y-1',
            interactive && tone === 'white' && 'hover:shadow-lift',
        ]"
    >
        <template v-if="label">
            <div class="flex items-center gap-2 text-sm font-medium opacity-70">
                <component :is="icon" v-if="icon" class="size-4 shrink-0" aria-hidden="true" />
                {{ label }}
            </div>
            <div><slot /></div>
        </template>
        <slot v-else />
    </div>
</template>
