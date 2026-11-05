/**
 * HOME 2 — DEDICATED INTERACTION & ANIMATION SCRIPT (assets/js/home-2.js)
 * Works alongside assets/js/main.js for ZIPPACK — School Bag & Backpack Store.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Staggered reveal for Signature Backpack Collection & Back-to-School Picks cards
  const staggerGroups = document.querySelectorAll('[data-h2-stagger]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const groupObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.h2-quick-card, .h2-signature-card, .h2-why-card, .h2-experience-card');
          children.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 85);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    staggerGroups.forEach(group => groupObserver.observe(group));
  }
});
