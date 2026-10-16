// Types shared by the UI components; auto-imported in every project that extends the layer.

/** Outcome of an action button (UiButton / UiActionIcon): a check for success, "!" for an error. */
export type ActionResult = 'success' | 'error';

/** One event in a UiTimeline. */
export interface TimelineItem {
    at: string;
    title: string;
    meta?: string;
    /** Marks the current item; defaults to the first item. */
    current?: boolean;
    /** How this item continues from the one below it, shown as a note on a solid line. */
    transition?: string;
}
