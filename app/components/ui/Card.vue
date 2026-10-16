<script setup lang="ts">
// White card on cream. `interactive` adds the hover lift (for cards that link somewhere).
const { as = 'div', interactive = false } = defineProps<{ as?: string; interactive?: boolean }>();
</script>

<template>
    <component
        :is="as"
        class="block rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-6"
        :class="interactive && 'transition duration-300 ease-bounce hover:-translate-y-1 hover:shadow-lift'"
    >
        <slot />
    </component>
</template>
