<script setup lang="ts">
import { RefreshCw } from '@lucide/vue'

// Error: white card, plain-language title, one sentence (slot) and a retry button. Texts come from the project.
defineProps<{ title: string; retryLabel: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <UiCard>
    <h3 class="text-2xl font-semibold">{{ title }}</h3>
    <p class="mt-2 text-ink-soft"><slot /></p>
    <UiButton class="mt-5" :icon="RefreshCw" @click="$emit('retry')">{{ retryLabel }}</UiButton>
  </UiCard>
</template>
