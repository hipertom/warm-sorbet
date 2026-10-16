// Runs the layer on its own: `npm run dev` shows the style guide.
export default defineNuxtConfig({
    extends: ['..'],
    compatibilityDate: '2026-10-01',
    devtools: { enabled: false },
    app: { head: { htmlAttrs: { lang: 'en' }, title: 'Warm Sorbet' } },
});
