// v-reveal: fade + slide up when an element scrolls into view (design system §8). An optional value staggers
// siblings: `v-reveal="index * 80"` (milliseconds). The styles live in assets/css/main.css ([data-reveal]).
import type { Directive } from 'vue';

let revealObserver: IntersectionObserver | undefined;

// Created on first use, so the module stays safe to import during server-side rendering.
function getRevealObserver() {
    revealObserver ??= new IntersectionObserver(
        (entries, observer) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                (entry.target as HTMLElement).dataset.reveal = 'visible';
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    return revealObserver;
}

const vReveal: Directive<HTMLElement, number | undefined> = {
    mounted(element, { value: delayInMilliseconds = 0 }) {
        element.dataset.reveal = 'hidden';
        element.style.setProperty('--reveal-delay', `${delayInMilliseconds}ms`);
        getRevealObserver().observe(element);
    },
    unmounted(element) {
        revealObserver?.unobserve(element);
    },
    // Server-rendered in the hidden state so content does not flash before hydration.
    // Without JavaScript the <noscript> style from this plugin shows it straight away.
    getSSRProps: ({ value: delayInMilliseconds = 0 }) => ({
        'data-reveal': 'hidden',
        style: { '--reveal-delay': `${delayInMilliseconds}ms` },
    }),
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('reveal', vReveal);
    useHead({
        noscript: [{ innerHTML: "<style>[data-reveal='hidden'] { opacity: 1; translate: none; }</style>" }],
    });
});
