<script setup lang="ts" generic="T extends string">
// Segmented control: the active option is an ink pill that slides to the chosen option.
// Until the options are measured (server render, first paint) the active button carries the pill itself.
const { options, label } = defineProps<{ options: { value: T; label: string }[]; label: string }>();
const model = defineModel<T>({ required: true });

const container = useTemplateRef<HTMLDivElement>('container');
const optionButtons = useTemplateRef<HTMLButtonElement[]>('optionButtons');
const indicator = ref<{ left: number; width: number } | null>(null);

function measureIndicator() {
    const activeIndex = options.findIndex(({ value }) => value === model.value);
    const activeButton = optionButtons.value?.[activeIndex];

    if (!activeButton) {
        indicator.value = null;

        return;
    }

    indicator.value = { left: activeButton.offsetLeft, width: activeButton.offsetWidth };
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
    measureIndicator();
    resizeObserver = new ResizeObserver(measureIndicator);

    if (container.value) {
        resizeObserver.observe(container.value);
    }
});

onBeforeUnmount(() => resizeObserver?.disconnect());

watch(model, measureIndicator, { flush: 'post' });
</script>

<template>
    <div
        ref="container"
        class="relative inline-flex rounded-full bg-white/70 p-1 ring-1 ring-ink/5"
        role="group"
        :aria-label="label"
    >
        <span
            v-if="indicator"
            class="absolute inset-y-1 left-0 rounded-full bg-ink transition-[translate,width] duration-500 ease-gentle"
            :style="{ width: `${indicator.width}px`, translate: `${indicator.left}px 0` }"
            aria-hidden="true"
        />
        <button
            v-for="option in options"
            ref="optionButtons"
            :key="option.value"
            type="button"
            class="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ease-gentle focus-visible:rounded-full"
            :class="[
                model === option.value ? 'text-cream' : 'text-ink-soft hover:text-ink',
                model === option.value && !indicator && 'bg-ink',
            ]"
            :aria-pressed="model === option.value"
            @click="model = option.value"
        >
            {{ option.label }}
        </button>
    </div>
</template>
