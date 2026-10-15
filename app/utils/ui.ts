// Types shared by the UI components; auto-imported in every project that extends the layer.

/** Outcome of an action button (UiButton / UiActionIcon): a check for success, "!" for an error. */
export type ActionResult = 'success' | 'error'

/** One event in a UiTimeline. */
export interface TimelineItem {
  at: string
  title: string
  meta?: string
}
