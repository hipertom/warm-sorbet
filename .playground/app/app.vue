<script setup lang="ts">
// Style guide: every building block of the layer, with fake data. Run with `npm run dev`.
import { CalendarDays, Heart, Package, Plus, RefreshCw, Store, Truck } from '@lucide/vue'

const tones: Tone[] = ['white', 'cream', 'peach', 'sage', 'butter', 'ink']
const pillTones: PillTone[] = [...tones, 'accent', 'warning']

const toast = useToast()
const refreshing = ref<Record<'ok' | 'fail', boolean>>({ ok: false, fail: false })
const results = ref<Record<'ok' | 'fail', ActionResult | null>>({ ok: null, fail: null })
function fakeRefresh(kind: 'ok' | 'fail') {
  results.value[kind] = null
  refreshing.value[kind] = true
  setTimeout(() => {
    results.value[kind] = kind === 'ok' ? 'success' : 'error'
    refreshing.value[kind] = false
    if (kind === 'ok') toast.success('3 items updated')
    else toast.error('Refresh failed')
  }, 2000)
}

const period = ref<'month' | 'year'>('month')
const timeline: TimelineItem[] = [
  { at: 'Sat 10 Oct, 09:12', title: 'Ready for pickup', meta: 'Corner shop' },
  { at: 'Fri 9 Oct, 18:40', title: 'Out for delivery' },
  { at: 'Thu 8 Oct, 07:05', title: 'Received by the carrier' },
]
</script>

<template>
  <main class="page-container space-y-16 py-12 sm:py-16">
    <header v-reveal class="max-w-2xl">
      <UiPill tone="butter">Style guide</UiPill>
      <h1 class="mt-4 text-display font-semibold">Warm Sorbet<span class="text-accent">.</span></h1>
      <p class="mt-5 text-lg text-ink-soft">Every building block of the shared layer in one place.</p>
    </header>

    <section v-reveal class="space-y-4">
      <h2 class="text-heading font-semibold">Pills</h2>
      <div class="flex flex-wrap gap-2">
        <UiPill v-for="tone in pillTones" :key="tone" :tone="tone">{{ tone }}</UiPill>
      </div>
    </section>

    <section v-reveal class="space-y-4">
      <h2 class="text-heading font-semibold">Buttons</h2>
      <div class="flex flex-wrap items-center gap-3">
        <UiButton :icon="Plus">Primary</UiButton>
        <UiButton variant="accent">Accent</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton size="sm" variant="secondary" :icon="RefreshCw" :loading="refreshing.ok" :result="results.ok" @click="fakeRefresh('ok')">
          Refresh (works)
        </UiButton>
        <UiButton size="sm" variant="secondary" :icon="RefreshCw" :loading="refreshing.fail" :result="results.fail" @click="fakeRefresh('fail')">
          Refresh (fails)
        </UiButton>
      </div>
      <UiSegmented
        v-model="period"
        label="Period"
        :options="[
          { value: 'month', label: 'This month' },
          { value: 'year', label: 'This year' },
        ]"
      />
    </section>

    <section class="space-y-4">
      <h2 class="text-heading font-semibold">Tiles</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <UiTile v-for="(tone, i) in tones" :key="tone" v-reveal="i * 60" :tone="tone" :label="tone" :icon="Heart" class="aspect-square">
          <p class="font-display text-2xl font-semibold">Tone</p>
        </UiTile>
      </div>
      <div class="grid gap-4 sm:grid-cols-3">
        <UiTile v-reveal tone="peach" soft label="Soft" :icon="Heart">Soft tones for large areas.</UiTile>
        <UiTile v-reveal="80" tone="butter" spacious interactive label="Spacious, interactive" :icon="Heart">
          Page size with a hover lift.
        </UiTile>
        <UiTile v-reveal="160" tone="ink" spacious class="gap-6">
          <p class="font-display text-6xl font-semibold tracking-tight">32<span class="text-accent">.</span></p>
          <p class="text-sm font-medium text-cream/70">No label: the content sets the layout.</p>
        </UiTile>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-heading font-semibold">Stat tiles</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <UiStatTile v-reveal label="Running" value="42" unit="km" tone="peach" />
        <UiStatTile v-reveal="60" label="Time active" value="6.5" unit="hrs" tone="butter" />
        <UiStatTile v-reveal="120" label="Padel sessions" value="3" />
        <UiStatTile v-reveal="180" label="Gym sessions" value="8" tone="ink" />
      </div>
      <div class="grid gap-3 sm:grid-cols-4 sm:gap-4">
        <UiStatTile compact tone="ink" label="Pickup" :icon="Store" :value="1" />
        <UiStatTile compact tone="peach" label="Expected today" :icon="CalendarDays" :value="2" />
        <UiStatTile compact tone="butter" label="On the way" :icon="Truck" :value="4" />
        <UiStatTile compact tone="sage" label="Recently delivered" :icon="Package" :value="7" />
      </div>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      <UiCard v-reveal interactive as="article">
        <h3 class="text-2xl font-semibold">Card</h3>
        <p class="mt-2 text-ink-soft">White on cream, with a soft shadow and a hover lift when it links somewhere.</p>
      </UiCard>
      <UiCard v-reveal="80">
        <h3 class="mb-5 text-2xl font-semibold">Timeline</h3>
        <UiTimeline :items="timeline" />
      </UiCard>
    </section>

    <section class="grid gap-4 lg:grid-cols-3">
      <UiSkeleton />
      <UiEmptyState>Nothing here yet. As soon as something arrives, it shows up here.</UiEmptyState>
      <UiErrorState title="That did not work." retry-label="Try again">Everything is safe, only the latest data is missing.</UiErrorState>
    </section>
  </main>
  <UiToaster dismiss-label="Dismiss message" />
</template>
