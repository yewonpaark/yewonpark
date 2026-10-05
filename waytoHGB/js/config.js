/*
 * Route and length settings. Change numbers here only:
 * segment minutes set the scroll proportions, TOTAL_LENGTH sets the overall pace.
 */
window.CONFIG = {
  // Page height in viewport heights (desktop). Larger = longer presentation.
  // Rehearse with ?debug&autoscroll=150 and adjust.
  TOTAL_LENGTH: 60,

  // Extra length on mobile, because finger scrolling is faster.
  MOBILE_MULTIPLIER: 1.5,

  // Viewports up to this width (px) count as mobile: double blocks stack, multiplier applies.
  MOBILE_BREAKPOINT: 768,

  IMAGE_DIR: 'images/',

  // In travel order. minutes / (sum of minutes) = share of the page.
  // label is used for a block's label when the block has none of its own.
  SEGMENTS: [
    { id: 'walk1', minutes: 2,  label: 'Walk · 77 m' },
    { id: 'tram7', minutes: 3,  label: 'Tram 7 · Sommerfeld' },
    { id: 'wait',  minutes: 3,  label: 'Lindenauer Markt' },
    { id: 'tram8', minutes: 14, label: 'Tram 8' },
    { id: 'walk2', minutes: 5,  label: 'Walk · 334 m' }
  ],

  // Blocks with segment: 'after' come below the timed page. The counter
  // reaches 00:00 before them and stays there.
  AFTER: { id: 'after', label: 'HGB' }
};
