/*
 * Builds the page from CONFIG + CONTENT, sizes the spacers so every segment
 * keeps its share of the page, and drives the countdown from scroll progress.
 * Also: ?debug panel and ?autoscroll=<seconds> rehearsal mode.
 */
(function () {
  'use strict';

  const CONFIG = window.CONFIG;
  const CONTENT = window.CONTENT || [];

  const params = new URLSearchParams(window.location.search);
  const DEBUG = params.has('debug');
  const AUTOSCROLL = parseFloat(params.get('autoscroll'));

  const root = document.documentElement;
  const track = document.getElementById('track');
  const after = document.getElementById('after');
  const counterEl = document.getElementById('counter');
  const probe = document.getElementById('vh-probe');
  const mobileQuery = window.matchMedia('(max-width: ' + CONFIG.MOBILE_BREAKPOINT + 'px)');

  const totalMinutes = CONFIG.SEGMENTS.reduce(function (sum, s) { return sum + s.minutes; }, 0);
  const totalSeconds = totalMinutes * 60;
  const SEQUENCE_MS = 550;   // keep in sync with --sequence-duration in style.css

  // Filled by build() / layout()
  const segments = [];   // { def, el, fixed: [el], blocks: [{ el, position }], spacers: [el], top }
  const titles = [];     // full-screen words, see fitTitles()
  const sequences = [];  // click-through blocks, see buildSequence()
  let docHeight = 0;
  let warnings = [];
  let lastLayoutKey = '';
  let debugPanel = null;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- Build ---------- */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildFrame(file) {
    const frame = el('div', 'frame');
    frame.dataset.file = file;
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.addEventListener('load', function () {
      // Real ratio replaces the placeholder ratio; the image is never cropped.
      frame.style.aspectRatio = img.naturalWidth + ' / ' + img.naturalHeight;
      frame.classList.add('is-loaded');
      scheduleLayout();
    });
    img.addEventListener('error', function () {
      img.remove();
      frame.classList.add('is-missing');
    });
    img.src = CONFIG.IMAGE_DIR + file;
    frame.appendChild(img);
    return frame;
  }

  // Several images in one frame. The frame stays pinned while the page scrolls
  // one step per image, so moving through the images uses up time like any
  // other scrolling. A click scrolls one step for you (Street View style:
  // the current image zooms away, the next one is underneath).
  function buildSequence(files) {
    const track = el('div', 'sequence');
    const frame = el('div', 'frame frame--sequence');
    const run = el('div', 'sequence__run');
    track.style.setProperty('--sequence-count', files.length);
    frame.dataset.file = files[0] || '';
    const imgs = files.map(function (file, i) {
      const img = new Image();
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      if (i === 0) {
        img.classList.add('is-current');
        img.addEventListener('load', function () {
          frame.style.aspectRatio = img.naturalWidth + ' / ' + img.naturalHeight;
          frame.classList.add('is-loaded');
          scheduleLayout();
        });
        img.addEventListener('error', function () { frame.classList.add('is-missing'); });
      }
      img.src = CONFIG.IMAGE_DIR + file;
      frame.appendChild(img);
      return img;
    });
    track.appendChild(frame);
    track.appendChild(run);

    const seq = { track: track, frame: frame, run: run, imgs: imgs, index: 0, start: 0, step: 1, lockUntil: 0, timer: null };
    sequences.push(seq);

    frame.addEventListener('click', function () {
      if (imgs.length < 2) return;
      const target = seq.index + 1;
      if (target < imgs.length) {
        showSequenceImage(seq, target);
        seq.lockUntil = performance.now() + SEQUENCE_MS + 150;
        scrollToY(seq.start + target * seq.step, SEQUENCE_MS);
      } else {
        // Past the last image: carry on down the page.
        scrollToY(window.scrollY + seq.step, SEQUENCE_MS);
      }
    });
    return track;
  }

  function settleSequence(seq) {
    clearTimeout(seq.timer);
    seq.timer = null;
    seq.imgs.forEach(function (img, i) {
      img.classList.remove('is-leaving', 'is-next', 'is-entering');
      img.classList.toggle('is-current', i === seq.index);
    });
  }

  function showSequenceImage(seq, target) {
    if (target === seq.index) return;
    settleSequence(seq);
    const from = seq.imgs[seq.index];
    const to = seq.imgs[target];
    if (target > seq.index) {
      to.classList.add('is-next');          // waits underneath
      from.classList.add('is-leaving');     // zooms away
    } else {
      to.classList.add('is-entering');      // going back: zooms in from the front
    }
    seq.index = target;
    seq.timer = setTimeout(function () { settleSequence(seq); }, SEQUENCE_MS);
  }

  // Where each sequence starts pinning and how much scroll one image takes.
  function measureSequences() {
    sequences.forEach(function (seq) {
      const pinTop = parseFloat(getComputedStyle(seq.frame).top) || 0;
      seq.start = seq.track.getBoundingClientRect().top + window.scrollY - pinTop;
      seq.step = Math.max(1, seq.run.offsetHeight / Math.max(1, seq.imgs.length - 1));
    });
  }

  function updateSequences() {
    const now = performance.now();
    const y = window.scrollY;
    sequences.forEach(function (seq) {
      if (now < seq.lockUntil) return;
      const i = Math.round((y - seq.start) / seq.step);
      showSequenceImage(seq, Math.min(seq.imgs.length - 1, Math.max(0, i)));
    });
  }

  let scrollTween = 0;
  function scrollToY(target, ms) {
    const id = ++scrollTween;
    const from = window.scrollY;
    const to = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
    let start = null;
    function stop() { if (scrollTween === id) scrollTween++; }
    window.addEventListener('wheel', stop, { passive: true, once: true });
    window.addEventListener('touchstart', stop, { passive: true, once: true });
    function step(now) {
      if (scrollTween !== id) return;
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / ms);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      window.scrollTo(0, from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function buildBlock(item, def) {
    const type = item.type || 'single';
    const block = el('article', 'block block--' + type);

    // One screen with a single huge word, sized by fitTitles().
    if (type === 'title') {
      const word = el('span', 'title__word', item.caption || '');
      block.appendChild(word);
      titles.push({ block: block, word: word });
      return block;
    }
    if (item.fullWidth) block.classList.add('block--full');

    if (type !== 'text') {
      const media = el('div', 'block__media');
      if (type === 'sequence') {
        media.appendChild(buildSequence(item.images || []));
      } else {
        const count = type === 'double' ? 2 : 1;
        (item.images || []).slice(0, count).forEach(function (file) {
          media.appendChild(buildFrame(file));
        });
      }
      block.appendChild(media);
    }

    // Photo only: no label, no caption.
    if (item.hideText && type !== 'text') {
      block.classList.add('block--bare');
      return block;
    }

    const label = item.label || (def.minutes ? def.label + ' · ' + def.minutes + ' min' : def.label);
    if (!item.hideLabel) block.appendChild(el('p', 'block__label', label));

    const caption = el('p', 'block__caption', item.caption || 'Caption');
    if (!item.caption) caption.classList.add('is-empty');
    block.appendChild(caption);

    return block;
  }

  function build() {
    const known = CONFIG.SEGMENTS.map(function (s) { return s.id; }).concat(CONFIG.AFTER.id);
    CONTENT.forEach(function (item, i) {
      if (known.indexOf(item.segment) === -1) {
        console.warn('content.js: block ' + i + ' has unknown segment "' + item.segment + '"');
      }
    });

    CONFIG.SEGMENTS.forEach(function (def, index) {
      const seg = { def: def, el: el('section', 'segment'), fixed: [], blocks: [], spacers: [], top: 0 };
      seg.el.dataset.id = def.id;

      // Room for the fixed counter above the very first block; counted inside the first segment.
      if (index === 0) {
        const lead = el('div', 'lead');
        seg.el.appendChild(lead);
        seg.fixed.push(lead);
      }

      CONTENT.filter(function (item) { return item.segment === def.id; }).forEach(function (item) {
        const spacer = el('div', 'spacer');
        const block = buildBlock(item, def);
        seg.el.appendChild(spacer);
        seg.el.appendChild(block);
        seg.spacers.push(spacer);
        seg.blocks.push({ el: block, position: item.position });
      });

      const tail = el('div', 'spacer');
      seg.el.appendChild(tail);
      seg.spacers.push(tail);

      track.appendChild(seg.el);
      segments.push(seg);
    });

    // Untimed blocks below the track: plain flow, no spacers.
    CONTENT.filter(function (item) { return item.segment === CONFIG.AFTER.id; }).forEach(function (item) {
      after.appendChild(buildBlock(item, CONFIG.AFTER));
    });
  }

  /* ---------- Layout ---------- */

  // Position = share of the segment's free space that lies above the block.
  function resolvePositions(blocks) {
    const n = blocks.length;
    let prev = 0;
    return blocks.map(function (b, i) {
      let p = typeof b.position === 'number' ? b.position : (i + 0.5) / n;
      p = Math.min(1, Math.max(prev, p));
      prev = p;
      return p;
    });
  }

  // Scales each title word to the largest size that fits the screen
  // without reaching up into the counter.
  function fitTitles() {
    titles.forEach(function (t) {
      const style = getComputedStyle(t.block);
      const availW = t.block.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const availH = t.block.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      t.word.style.fontSize = '100px';
      const box = t.word.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const scale = Math.min(availW / box.width, availH / box.height);
      t.word.style.fontSize = Math.floor(100 * scale) + 'px';
    });
  }

  function viewportUnit() {
    return probe.offsetHeight || window.innerHeight;
  }

  function layout() {
    const before = progress();
    const oldMax = maxScroll();

    const mobile = mobileQuery.matches;
    root.classList.toggle('is-mobile', mobile);

    fitTitles();

    const vh = viewportUnit();
    const total = CONFIG.TOTAL_LENGTH * vh * (mobile ? CONFIG.MOBILE_MULTIPLIER : 1);
    warnings = [];

    // Read all heights first, then write all spacers.
    const plans = segments.map(function (seg) {
      const length = total * seg.def.minutes / totalMinutes;
      let used = 0;
      seg.fixed.forEach(function (node) { used += node.getBoundingClientRect().height; });
      seg.blocks.forEach(function (b) { used += b.el.getBoundingClientRect().height; });
      let free = length - used;
      if (free < 0) {
        warnings.push(seg.def.id + ': blocks are ' + Math.round(-free) + 'px taller than the segment (' + Math.round(length) + 'px)');
        free = 0;
      }
      return { length: length, free: free, positions: resolvePositions(seg.blocks) };
    });

    segments.forEach(function (seg, i) {
      const plan = plans[i];
      let prev = 0;
      plan.positions.forEach(function (p, j) {
        seg.spacers[j].style.height = ((p - prev) * plan.free) + 'px';
        prev = p;
      });
      seg.spacers[seg.spacers.length - 1].style.height = ((1 - prev) * plan.free) + 'px';
      if (DEBUG) seg.el.dataset.debug = seg.def.id + ' · ' + seg.def.minutes + ' min · ' + Math.round(plan.length) + 'px';
    });

    docHeight = track.offsetHeight;
    measureSequences();
    segments.forEach(function (seg) { seg.top = seg.el.offsetTop; });
    lastLayoutKey = layoutKey();

    // Keep the same moment on screen when the page length changed (rotation, resize).
    const newMax = maxScroll();
    if (Math.abs(newMax - oldMax) > 1 && before > 0) window.scrollTo(0, before * newMax);

    update();
  }

  function layoutKey() {
    return window.innerWidth + 'x' + viewportUnit() + (mobileQuery.matches ? 'm' : 'd');
  }

  let layoutQueued = false;
  function scheduleLayout() {
    if (layoutQueued) return;
    layoutQueued = true;
    requestAnimationFrame(function () {
      layoutQueued = false;
      layout();
    });
  }

  /* ---------- Countdown ---------- */

  function maxScroll() {
    return Math.max(1, docHeight - window.innerHeight);
  }

  function progress() {
    if (!docHeight) return 0;
    const max = maxScroll();
    const y = window.scrollY;
    if (y > max - 1) return 1;
    return Math.min(1, Math.max(0, y / max));
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function currentSegment(p) {
    if (window.scrollY > maxScroll() + 1) return { def: CONFIG.AFTER };
    // The page point that matches the current progress slides from the top
    // of the viewport (start) to its bottom (end).
    const y = window.scrollY + p * window.innerHeight;
    let current = segments[0];
    segments.forEach(function (seg) { if (seg.top <= y) current = seg; });
    return current;
  }

  let shownTime = '';
  function update() {
    updateSequences();
    const p = progress();
    const remaining = Math.max(0, Math.ceil((1 - p) * totalSeconds - 1e-6));
    const text = formatTime(remaining);
    if (text !== shownTime) {
      counterEl.textContent = text;
      shownTime = text;
    }
    if (DEBUG) updateDebug(p, text);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      update();
    });
  }

  /* ---------- Rehearsal tools ---------- */

  // Stopwatch: starts on the first scroll away from the top, stops at 00:00, resets back at the top.
  let watchStart = null;
  let watchEnd = null;

  function updateDebug(p, timeText) {
    const now = performance.now();
    if (p === 0) { watchStart = null; watchEnd = null; }
    else if (watchStart === null) watchStart = now;
    if (p === 1 && watchEnd === null) watchEnd = now;
    if (p < 1) watchEnd = null;
    const elapsed = watchStart === null ? 0 : ((watchEnd || now) - watchStart) / 1000;

    const seg = currentSegment(p);
    const mobile = mobileQuery.matches;
    const lines = [
      'progress   ' + (p * 100).toFixed(1) + '%',
      'segment    ' + seg.def.id + (seg.def.minutes ? ' (' + seg.def.minutes + ' min)' : ''),
      'remaining  ' + timeText,
      'scroll     ' + Math.round(maxScroll()) + 'px  (page ' + Math.round(docHeight) + 'px)',
      'viewport   ' + (mobile ? 'mobile ×' + CONFIG.MOBILE_MULTIPLIER : 'desktop') + ', ' + window.innerWidth + '×' + viewportUnit(),
      'stopwatch  ' + elapsed.toFixed(1) + 's' + (watchEnd ? ' (done)' : '')
    ];
    debugPanel.textContent = lines.join('\n');
    warnings.forEach(function (w) {
      debugPanel.appendChild(el('div', 'warn', '⚠ ' + w));
    });
  }

  function initDebug() {
    root.classList.add('debug');
    debugPanel = el('pre', 'debug-panel');
    document.body.appendChild(debugPanel);
    setInterval(update, 100);   // keeps the stopwatch running between scroll events
  }

  function startAutoscroll(seconds) {
    const duration = seconds * 1000;
    let start = null;
    let cancelled = false;

    function cancel() { cancelled = true; }
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (type) {
      window.addEventListener(type, cancel, { passive: true, once: true });
    });

    function step(now) {
      if (cancelled) return;
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, t * maxScroll());
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Init ---------- */

  build();
  if (DEBUG) initDebug();
  layout();

  window.addEventListener('scroll', onScroll, { passive: true });

  // The mobile address bar fires resize while scrolling; only re-layout when
  // the width, the stable viewport height or the mobile/desktop mode changed.
  function onResize() {
    if (layoutKey() !== lastLayoutKey) scheduleLayout();
    else update();
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // Any block that changes height (image loaded, font swapped, columns stacked) triggers a re-layout.
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleLayout);
    segments.forEach(function (seg) {
      seg.fixed.forEach(function (node) { observer.observe(node); });
      seg.blocks.forEach(function (b) { observer.observe(b.el); });
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleLayout);

  window.addEventListener('load', function () {
    layout();
    if (AUTOSCROLL > 0) setTimeout(function () { startAutoscroll(AUTOSCROLL); }, 500);
  });
})();
