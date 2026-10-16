// The tone system from docs/design-system.md §3: map tones here, never scatter colour classes.
export type Tone = 'white' | 'cream' | 'peach' | 'sage' | 'butter' | 'ink';

/** Strong tone: small tiles and pills. */
export const TONE_SURFACE: Record<Tone, string> = {
    white: 'bg-white text-ink',
    cream: 'bg-cream-deep text-ink',
    peach: 'bg-peach text-ink',
    sage: 'bg-sage text-ink',
    butter: 'bg-butter text-ink',
    ink: 'bg-ink text-cream',
};

/** Soft tone: large tinted areas. */
export const TONE_SOFT: Record<Tone, string> = {
    white: 'bg-white text-ink',
    cream: 'bg-cream-deep text-ink',
    peach: 'bg-peach-soft text-ink',
    sage: 'bg-sage-soft text-ink',
    butter: 'bg-butter-soft text-ink',
    ink: 'bg-ink text-cream',
};

/** Pills also have `accent` (needs action) and `warning` (something went wrong, outlined). */
export type PillTone = Tone | 'accent' | 'warning';

export const PILL_TONE: Record<PillTone, string> = {
    ...TONE_SURFACE,
    accent: 'bg-accent text-ink',
    warning: 'bg-white text-accent-ink ring-1 ring-accent-ink/40',
};
