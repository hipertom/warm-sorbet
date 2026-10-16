// Warm Sorbet as a Nuxt layer: projects add `extends: ['warm-sorbet']` and get the theme, base styles,
// UI components (`Ui*`), tones, `useToast` and `v-reveal`.
import tailwindcss from '@tailwindcss/vite';
import { createResolver } from '@nuxt/kit';

// Paths relative to this file, not to the project that extends the layer.
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
    $meta: { name: 'warm-sorbet' },
    css: [resolve('./app/assets/css/main.css')],
    vite: {
        plugins: [tailwindcss()],
    },
});
