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

  // Industries dropdown
  document.querySelectorAll('.nav__has-dropdown').forEach(dd => {
    const btn = dd.querySelector('.nav__dropdown-btn');
    const panel = dd.querySelector('.nav__dropdown-panel');
    if (!btn || !panel) return;
    const close = () => { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    const open = () => { dd.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dd.classList.contains('open')) close(); else open();
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) close();
    });
    // Escape key closes and returns focus to button
    dd.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dd.classList.contains('open')) { close(); btn.focus(); }
    });
  });

  // Contact form inline validation + aria-live status
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('form-status');
    const setError = (field, message) => {
      const errorEl = document.getElementById(field.id + '-error');
      if (!errorEl) return;
      errorEl.textContent = message || '';
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    };
    const validateField = (field) => {
      if (!field.hasAttribute('required') && !field.value) return true;
      if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        setError(field, 'Please enter a valid email address.');
        return false;
      }
      if (field.hasAttribute('required') && !field.value.trim()) {
        setError(field, 'This field is required.');
        return false;
      }
      setError(field, '');
      return true;
    };
    // Validate on blur
    ['name', 'email', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validateField(el));
    });
    // Validate on submit
    contactForm.addEventListener('submit', (e) => {
      let valid = true;
      ['name', 'email', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el && !validateField(el)) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        if (status) {
          status.className = 'form-status form-status--error';
          status.textContent = 'Please fix the errors above before submitting.';
        }
        return false;
      }
      if (status) {
        status.className = 'form-status form-status--success';
        status.textContent = 'Sending your proposal request...';
      }
    });
  }

  // Swap nav logo on scroll for hero pages
  (function(){
    var heroNav = document.querySelector('.nav--hero');
    if (!heroNav) return;
    var heroLogo = heroNav.querySelector('.nav__logo img');
    if (!heroLogo) return;
    function updateLogo() {
      heroLogo.src = window.scrollY > 50 ? 'images/logo-green.svg' : 'images/logo-white.svg';
    }
    window.addEventListener('scroll', updateLogo, { passive: true });
    updateLogo();
  })();

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
