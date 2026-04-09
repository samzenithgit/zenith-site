document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll behavior
  const nav = document.querySelector('.nav');
  if (nav) {
    const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Mobile menu toggle (with Escape dismissal and outside-click close)
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Escape key closes menu and returns focus to toggle
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
    // Click outside closes menu
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
    // Closing menu when a link is clicked (single-page-app feel on mobile)
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // Scroll reveal (respects prefers-reduced-motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.reveal');
  if (els.length && !prefersReduced) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    // If reduced motion, make everything visible immediately
    els.forEach(el => el.classList.add('visible'));
  }
});
