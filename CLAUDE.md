# Warm Sorbet: afspraken voor Claude

Warm Sorbet is het gedeelde design system van Tom, als Nuxt layer. Projecten (het portfolio, de package tracker)
gebruiken het via `extends: ['warm-sorbet']` en krijgen zo het Tailwind-thema, de basisstijlen, de UI-componenten
(`<Ui…>`), de tones, `useToast` en `v-reveal`. Het ontwerp zelf staat in [`docs/design-system.md`](docs/design-system.md):
lees dat vóór elk UI-werk, in deze repo én in een project dat de layer gebruikt.

## Eén component voor alle consumers

- **Elke bouwsteen bestaat één keer, hier.** Projecten maken geen eigen kopie, variant of override van een
  layer-component (dus geen `components/ui/Pill.vue` in een project, ook al zou Nuxt die laten winnen).
- **Wijkt een project af?** Dan breid je de layer-component uit met een prop of variant die voor elk project werkt
  (zoals `spacious` op `UiTile` of `compact` op `UiStatTile`), en pas je het design-document aan.
- **Nieuwe tokens, keyframes of utilities** komen alleen in `app/assets/css/main.css`. Projecten hebben geen eigen thema.
- **Geen UI-tekst in layer-componenten.** Het portfolio is Engels, de tracker Nederlands: elke zichtbare of
  voorgelezen tekst is een prop (`retry-label`, `dismiss-label`, `label`).
- **Domeincomponenten horen niet hier** (een bestelkaart, een race-kaart). Een component komt pas naar de layer als
  een tweede project hem echt nodig heeft.
- Documentatie staat ook maar op één plek: hier. Projecten verwijzen ernaar en houden geen kopie bij.

## Werkwijze

- Codestijl: Spatie-stijl, net als de projecten: 4 spaties, puntkomma's, enkele quotes, regels tot 120 tekens
  (`.editorconfig`, `.prettierrc.json`, `npm run format`). Code en comments in het Engels.
- Draaien: `npm run dev` start de stijlgids in `.playground` (elke bouwsteen met nepdata). Een nieuwe component of
  variant krijgt daar ook een voorbeeld.
- Controleren: `npm run typecheck`, de stijlgids bekijken, en de wijziging in de projecten die de layer gebruiken.
- Paden in `nuxt.config.ts` altijd via `createResolver(import.meta.url)`, zodat ze vanuit de layer kloppen en niet
  vanuit het project. De `@source` in `main.css` is relatief aan dat CSS-bestand, om dezelfde reden.
- **Versies:** na een wijziging een nieuwe tag (`v0.2.0`, semver), en in elk project de dependency
  `github:hipertom/warm-sorbet#<tag>` ophogen. **Vraag per push toestemming.**
- Commits: Conventional Commits, logisch opgesplitst, korte body met bullets, geen Claude-vermelding.
