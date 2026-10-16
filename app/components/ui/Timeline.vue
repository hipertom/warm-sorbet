<script setup lang="ts" generic="T extends TimelineItem">
// Event list with dots, newest first. The current item (by default the first) gets an accent dot with a slow glow.
// An item with a `transition` continues from the item below it: a solid sage line, sage dots and a short note.
// `spacious` aligns the dots with card content passed through the default slot.
import { ArrowUp } from '@lucide/vue';

const {
    items,
    spacious = false,
    surface = 'white',
    lineStyle = 'solid',
} = defineProps<{
    items: T[];
    spacious?: boolean;
    surface?: 'white' | 'cream';
    lineStyle?: 'solid' | 'dashed';
}>();

defineSlots<{
    default?(props: { item: T; index: number; current: boolean }): unknown;
}>();

const layout = computed(() =>
    spacious
        ? {
              markerSize: 'size-6',
              markerOffset: 'mt-7',
              halo: 'inset-0',
              markerCenter: '2.5rem',
              lineLeft: 'left-3',
              gap: 'gap-4 sm:gap-6',
          }
        : {
              markerSize: 'size-3',
              markerOffset: 'mt-1.5',
              halo: '-inset-1',
              markerCenter: '0.75rem',
              lineLeft: 'left-1.5',
              gap: 'gap-4',
          },
);

const ringClass = computed(() => (surface === 'cream' ? 'ring-cream' : 'ring-white'));

function isCurrent(item: T, index: number): boolean {
    return item.current ?? index === 0;
}

function isPartOfContinuation(index: number): boolean {
    return Boolean(items[index]?.transition || items[index - 1]?.transition);
}

function dotClass(item: T, index: number): string {
    if (isCurrent(item, index)) {
        return 'bg-accent';
    }

    return isPartOfContinuation(index) ? 'bg-sage-deep' : 'bg-ink/30';
}

function connectorClass(item: T): string {
    if (item.transition) {
        return 'w-[3px] rounded-full bg-sage-deep';
    }

    return lineStyle === 'dashed' ? 'border-l-2 border-dashed border-ink/15' : 'w-0.5 bg-sage-deep/60';
}
</script>

<template>
    <ol class="relative">
        <li
            v-for="(item, index) in items"
            :key="`${item.at}-${item.title}`"
            class="relative last:pb-0"
            :class="spacious ? 'pb-4' : 'pb-6'"
            :style="{ '--marker-center': layout.markerCenter }"
        >
            <span
                v-if="index < items.length - 1"
                class="absolute top-(--marker-center) -bottom-(--marker-center) -translate-x-1/2"
                :class="[layout.lineLeft, connectorClass(item)]"
                aria-hidden="true"
            />

            <div class="flex" :class="layout.gap">
                <span
                    class="relative z-10 grid shrink-0 place-items-center"
                    :class="[layout.markerSize, layout.markerOffset]"
                    aria-hidden="true"
                >
                    <span
                        v-if="isCurrent(item, index)"
                        class="absolute animate-glow rounded-full bg-accent/50"
                        :class="layout.halo"
                    />
                    <span class="relative size-3 rounded-full ring-4" :class="[dotClass(item, index), ringClass]" />
                </span>

                <div class="min-w-0 flex-1">
                    <slot :item="item" :index="index" :current="isCurrent(item, index)">
                        <p class="font-medium" :class="!isCurrent(item, index) && 'text-ink-soft'">{{ item.title }}</p>
                        <p class="text-sm text-ink-soft tabular-nums">
                            {{ item.at }}<template v-if="item.meta"> · {{ item.meta }}</template>
                        </p>
                    </slot>
                </div>
            </div>

            <div v-if="item.transition" class="mt-3 flex items-center" :class="layout.gap">
                <span class="relative z-10 flex shrink-0 justify-center" :class="layout.markerSize" aria-hidden="true">
                    <span
                        class="grid size-6 shrink-0 place-items-center rounded-full bg-sage-soft text-ink ring-4"
                        :class="ringClass"
                    >
                        <ArrowUp class="size-3.5" />
                    </span>
                </span>
                <p class="text-sm leading-relaxed text-ink-soft" :class="spacious && 'px-6 sm:px-7'">
                    {{ item.transition }}
                </p>
            </div>
        </li>
    </ol>
</template>
