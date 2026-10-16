<script setup lang="ts">
// Event list with dots: newest first; the newest is the "current" item (accent dot with glow).
defineProps<{ items: TimelineItem[] }>();
</script>

<template>
    <ol class="relative">
        <li v-for="(item, i) in items" :key="i" class="relative flex gap-4 pb-6 last:pb-0">
            <span
                v-if="i < items.length - 1"
                class="absolute top-4 bottom-0 left-[5px] w-0.5 bg-sage-deep/60"
                aria-hidden="true"
            />
            <span class="relative mt-1.5 flex size-3 shrink-0" aria-hidden="true">
                <template v-if="i === 0">
                    <span class="absolute -inset-1 animate-glow rounded-full bg-accent/50" />
                    <span class="relative size-3 rounded-full bg-accent ring-4 ring-white" />
                </template>
                <span v-else class="size-3 rounded-full bg-ink/30 ring-4 ring-white" />
            </span>
            <div class="min-w-0">
                <p class="font-medium" :class="i > 0 && 'text-ink-soft'">{{ item.title }}</p>
                <p class="text-sm text-ink-soft tabular-nums">
                    {{ item.at }}<template v-if="item.meta"> · {{ item.meta }}</template>
                </p>
            </div>
        </li>
    </ol>
</template>
