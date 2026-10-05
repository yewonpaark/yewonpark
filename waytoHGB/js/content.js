/*
 * All blocks, in travel order. One entry = one block on the page.
 *
 *   segment   walk1 / tram7 / wait / tram8 / walk2, or 'after' (below 00:00, untimed)
 *   type      single / double / text / sequence / title
 *             title = one full screen with the caption as one huge word
 *             sequence = several images in one pinned frame; scrolling or a
 *             click moves on to the next, and the counter keeps running
 *   images    file names inside images/  (single: 1, double: 2, sequence: any number, text: none)
 *   label     small label (empty falls back to "<segment label> · <n> min")
 *   caption   one line; empty shows a grey placeholder
 *             Write label and caption between the double quotes: "don't forget".
 *             Apostrophes are fine; only a double quote inside needs a backslash: \"
 *   fullWidth optional, true = photo fills the whole screen on desktop (cropped to fit)
 *   hideLabel optional, true = no label, caption only
 *   hideText  optional, true = photo only, no label and no caption
 *   position  optional, 0–1 inside the segment: 0 = at the segment start,
 *             1 = at the segment end. Without it, blocks are spread evenly.
 */
window.CONTENT = [
  // walk1 — 2 min
  { segment: 'walk1', type: 'single', images: ['image1.jpg'], hideLabel: true, caption: "don't forget your keys", position: 0 },
  { segment: 'walk1', type: 'single', images: ['image2.jpg'], label: "", caption: "The tram stop is right in front of Buchhandlung Grallert.", position: 0 },

  // tram7 — 3 min
  { segment: 'tram7', type: 'single', images: ['image3.jpg'], hideText: true, position: 0.1 },
  { segment: 'tram7', type: 'single', images: ['image4.jpg'], hideText: true, position: 0.1 },
  { segment: 'tram7', type: 'single', images: ['image5.jpg'], hideText: true, position: 0.1 },
  { segment: 'tram7', type: 'single', images: ['image6.jpg'], hideText: true, position: 0.1 },
  { segment: 'tram7', type: 'single', images: ['image7.jpg'], label: "", caption: "Lindenauer Markt, 1 station", position: 0.3 },
  { segment: 'tram7', type: 'single', images: ['image8.jpg'], hideLabel: true, hideText: true, position: 0.2 },

  // wait — 3 min
  { segment: 'wait', type: 'double', images: ['image9.jpg', 'image9-1.jpg'], label: "", caption: "transfer time", position: 0.1 },

  // tram8 — 14 min
  { segment: 'tram8', type: 'single', images: ['image10.jpg'], label: "", caption: "Paunsdorf-Nord direction", position: 0.04 },
  { segment: 'tram8', type: 'single', images: ['image11.jpg'], label: "", caption: "", position: 0.13 },
  { segment: 'tram8', type: 'single', images: ['image12.jpg'], label: "", caption: "", position: 0.21 },
  { segment: 'tram8', type: 'single', images: ['image12_sv_angerbrucke.jpg'], fullWidth: true, label: "", caption: "", position: 0.29 },
  { segment: 'tram8', type: 'single', images: ['image13.jpg'], label: "", caption: "", position: 0.38 },
  { segment: 'tram8', type: 'sequence', images: ['image13_sv_felsenkeller1.jpg', 'image13_sv_felsenkeller2.jpg', 'image13_sv_felsenkeller3.jpg', 'image13_sv_felsenkeller4.jpg', 'image13_sv_felsenkeller5.jpg'], fullWidth: true, label: "", caption: "", position: 0.46 },
  { segment: 'tram8', type: 'single', images: ['image14.jpg'], label: "", caption: "", position: 0.54 },
  { segment: 'tram8', type: 'single', images: ['image15_sv_altestr.jpg'], fullWidth: true, label: "", caption: "", position: 0.71 },
  { segment: 'tram8', type: 'single', images: ['image15_sv2_nonnenstr.jpg'], fullWidth: true, label: "", caption: "", position: 0.79 },
  { segment: 'tram8', type: 'single', images: ['image15_sv3_marschnerstr.jpg'], fullWidth: true, label: "", caption: "", position: 0.88 },
  { segment: 'tram8', type: 'sequence', images: ['image15_sv4_westplatz1.jpg', 'image15_sv4_westplatz2.jpg', 'image15_sv4_westplatz3.jpg', 'image15_sv4_westplatz4.jpg'], fullWidth: true, label: "", caption: "", position: 0.96 },

  // walk2 — 5 min
  { segment: 'walk2', type: 'double', images: ['image16-1.jpg', 'image16-2.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image17.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image18.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image19.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image20.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image21.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'single', images: ['image22.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'double', images: ['image23-1.jpg', 'image23-2.jpg'], label: "", caption: "" },
  { segment: 'walk2', type: 'title', caption: "HGB", position: 1 },

  // after — after 00:00
  { segment: 'after', type: 'single', images: ['image24.jpg'], label: "", caption: "" },
  { segment: 'after', type: 'single', images: ['image25.jpg'], label: "", caption: "" },
  { segment: 'after', type: 'single', images: ['image26.jpg'], label: "", caption: "" },
  { segment: 'after', type: 'single', images: ['image27.jpg'], label: "", caption: "" }
];
