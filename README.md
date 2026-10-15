# Warm Sorbet

The shared design system of [tomgrootjans.nl](https://tomgrootjans.nl) and Tom's other projects, as a
[Nuxt layer](https://nuxt.com/docs/getting-started/layers): Tailwind CSS v4 theme and base styles, UI components,
tone maps, toasts and a scroll-reveal directive.

The design rules are in [`docs/design-system.md`](docs/design-system.md).

## Use it in a Nuxt project

```bash
npm install github:hipertom/warm-sorbet#v0.1.0
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['warm-sorbet'],
})
```

That's all: Tailwind, the fonts and the theme come with the layer. Components are auto-imported as `<UiButton>`,
`<UiCard>`, `<UiPill>`, `<UiTile>`, `<UiStatTile>`, `<UiSegmented>`, `<UiTimeline>`, `<UiSkeleton>`, `<UiEmptyState>`,
`<UiErrorState>` and `<UiToaster>`, together with `useToast()`, the tone maps and `v-reveal`.

## Develop

```bash
npm install
npm run dev:prepare
npm run dev        # style guide in .playground
npm run typecheck
```
