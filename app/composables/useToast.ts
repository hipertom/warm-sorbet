// Toasts: short messages that float over the page (UiToaster in app.vue), so nothing shifts when they appear.
// Each one stays 5 seconds by default; several stack on top of each other.
export interface Toast {
    id: number;
    text: string;
    error?: boolean;
}

const DEFAULT_DURATION_MS = 5000;
/** More than this and the oldest makes room. */
const MAX_VISIBLE = 4;
let nextId = 1;

export function useToast() {
    const toasts = useState<Toast[]>('toasts', () => []);

    function dismiss(id: number) {
        toasts.value = toasts.value.filter((t) => t.id !== id);
    }

    function show(text: string, options: { error?: boolean; durationMs?: number } = {}) {
        const toast: Toast = { id: nextId++, text, error: options.error };
        toasts.value = [...toasts.value, toast].slice(-MAX_VISIBLE);
        setTimeout(() => dismiss(toast.id), options.durationMs ?? DEFAULT_DURATION_MS);
    }

    return {
        toasts,
        dismiss,
        success: (text: string, options?: { durationMs?: number }) => show(text, options),
        error: (text: string, options?: { durationMs?: number }) => show(text, { ...options, error: true }),
    };
}
