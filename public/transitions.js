/* ═══════════════════════════════════════════════════════════════
   APEX ARENA — Smooth Page Transitions
   Overlay is created inline in <body> — this script controls it
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function getOverlay() {
    return document.getElementById('apex-overlay') || window._apexOverlay;
  }

  /* ── Fade out overlay to reveal page ── */
  function revealPage() {
    var overlay = getOverlay();
    if (!overlay) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '0';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealPage);
  } else {
    revealPage();
  }

  /* ── Fade in overlay then navigate on link click ── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('http')       ||
      href.startsWith('#')          ||
      href.startsWith('mailto')     ||
      href.startsWith('tel')        ||
      href.startsWith('javascript') ||
      link.target === '_blank'
    ) return;

    e.preventDefault();

    var overlay = getOverlay();
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'all';
    }

    setTimeout(function () {
      window.location.href = href;
    }, 370);
  });

})();