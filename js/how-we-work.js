/* ─────────────────────────────────────────────────────────────────────────
   How We Work — Exit Sign Co.
   Vanilla JS controller for the stepper. No dependencies.

   Behaviour:
     • Click a step pill to switch panels.
     • ←/→ arrow keys navigate between steps.
     • Auto-advance cycles through all 5 steps once on load (2.4s/step),
       then stops on Step 1. Any user interaction cancels auto-advance.
     • Hover any non-active pill to preview-expand it (pure CSS).
     • Progress bar fills with the active step's index; while auto-advance
       is running, it fills smoothly across the 2.4s dwell.
     • Marquee duplicates its content once so the loop is seamless.
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var DWELL_MS = 2400;

  var stepper = document.querySelector('[data-hww-stepper]');
  if (!stepper) return;

  var rail        = stepper.querySelector('.hww-stepper__rail');
  var progressBar = stepper.querySelector('.hww-stepper__progress');
  var progressFill = stepper.querySelector('[data-hww-progress]');
  var buttons     = Array.prototype.slice.call(rail.querySelectorAll('.hww-step-btn'));
  var panels      = Array.prototype.slice.call(document.querySelectorAll('.hww-step'));
  var total       = buttons.length;

  var active = 0;
  var autoTimer = null;
  var autoActive = true;
  var cycledOnce = false;

  function setActive(idx, opts) {
    opts = opts || {};
    active = ((idx % total) + total) % total;

    buttons.forEach(function (b, i) {
      var on = i === active;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    panels.forEach(function (p, i) {
      var on = i === active;
      p.classList.toggle('is-active', on);
      if (on) p.removeAttribute('hidden');
      else    p.setAttribute('hidden', '');
    });

    var pct = ((active + 1) / total) * 100;
    progressFill.style.width = pct + '%';
    progressBar.setAttribute('aria-valuenow', String(active + 1));

    // Auto-scroll active pill into view on mobile (overflowing rail)
    var btn = buttons[active];
    if (rail.scrollWidth > rail.clientWidth && btn) {
      var off = btn.offsetLeft - (rail.clientWidth / 2 - btn.clientWidth / 2);
      rail.scrollTo({ left: off, behavior: 'smooth' });
    }
  }

  function stopAuto() {
    if (!autoActive) return;
    autoActive = false;
    stepper.classList.remove('is-auto');
    if (autoTimer) clearTimeout(autoTimer);
  }

  function tickAuto() {
    if (!autoActive) return;
    autoTimer = setTimeout(function () {
      var next = active + 1;
      if (next >= total) {
        // Completed one cycle — stop and settle on Step 1.
        cycledOnce = true;
        stopAuto();
        setActive(0);
        return;
      }
      setActive(next);
      tickAuto();
    }, DWELL_MS);
  }

  // Wire up clicks
  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () {
      stopAuto();
      setActive(i);
    });
  });

  // Stop auto on any interaction inside the section
  var section = stepper.closest('.hww');
  if (section) {
    section.addEventListener('pointerdown', stopAuto, { passive: true });
  }

  // Keyboard nav (←/→)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    // Only when the section is in view, to avoid hijacking the page
    var rect = stepper.getBoundingClientRect();
    var inView = rect.bottom > 0 && rect.top < window.innerHeight;
    if (!inView) return;

    stopAuto();
    setActive(e.key === 'ArrowRight' ? active + 1 : active - 1);
  });

  // Pause auto-advance for users who prefer reduced motion
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) {
    stopAuto();
    setActive(0);
  } else {
    stepper.classList.add('is-auto');
    setActive(0);
    tickAuto();
  }

  // ──────────────────────────────────────────────────────────────
  // Marquee: duplicate items once for seamless infinite loop.
  // (CSS handles the actual animation.)
  // ──────────────────────────────────────────────────────────────
  var marquee = document.querySelector('[data-hww-marquee]');
  if (marquee && !marquee.dataset.cloned) {
    var clone = marquee.cloneNode(true);
    // Move children of the clone into the original track so the loop
    // works against a single -50% translation.
    while (clone.firstChild) {
      marquee.appendChild(clone.firstChild);
    }
    marquee.dataset.cloned = 'true';
  }
})();
