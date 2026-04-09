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

  // Industries mega menu
  (function(){
    const navEl = document.querySelector('.nav');
    const trigger = document.querySelector('[data-industries-trigger]');
    const mega = document.querySelector('.nav__mega');
    if (!navEl || !trigger || !mega) return;

    let closeTimer;
    const open = () => {
      clearTimeout(closeTimer);
      navEl.classList.add('mega-open');
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      navEl.classList.remove('mega-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const closeSoon = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, 160);
    };

    // Skip megamenu behavior on narrow viewports (mobile hamburger)
    const isDesktop = () => window.innerWidth > 768;

    // Hover: open when entering trigger or mega, close when leaving both
    trigger.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
    trigger.addEventListener('mouseleave', () => { if (isDesktop()) closeSoon(); });
    mega.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
    mega.addEventListener('mouseleave', () => { if (isDesktop()) closeSoon(); });

    // Focus: open when the trigger receives focus (keyboard nav)
    trigger.addEventListener('focus', () => { if (isDesktop()) open(); });
    // Close when focus leaves both the trigger and the mega area
    document.addEventListener('focusin', (e) => {
      if (!isDesktop()) return;
      if (!trigger.contains(e.target) && !mega.contains(e.target)) close();
    });

    // Escape key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navEl.classList.contains('mega-open')) {
        close();
        trigger.focus();
      }
    });

    // Outside click closes (for touch/click users on desktop)
    document.addEventListener('click', (e) => {
      if (!isDesktop()) return;
      if (!trigger.contains(e.target) && !mega.contains(e.target)) close();
    });
  })();

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
