/* ============================================================
   NeXa Agency - Interactive JavaScript
   Custom Cursor, Theme Persistance, Scroll Reveal, Header
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const interactives = document.querySelectorAll('.interactive, a, button, input, textarea, select');

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    // Cursor hover expansion effect removed per user request
  }

  /* ---------- PREMIUM MOTION BACKGROUND ---------- */
  const bgContainer = document.createElement('div');
  bgContainer.className = 'premium-bg-container';
  
  for(let i=1; i<=3; i++) {
    const orb = document.createElement('div');
    orb.className = `bg-orb orb-${i}`;
    bgContainer.appendChild(orb);
  }
  
  const grid = document.createElement('div');
  grid.className = 'bg-grid';
  bgContainer.appendChild(grid);
  
  document.body.prepend(bgContainer);

  /* ---------- THEME TOGGLE (Persistence) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  // Default to dark unless light was explicitly saved
  const savedTheme = localStorage.getItem('nexa-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('nexa-theme', newTheme);
    });
  }

  /* ---------- MOBILE NAVIGATION ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('open');
    });
  }

  /* ---------- SCROLLED HEADER ---------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});
