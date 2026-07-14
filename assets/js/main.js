/* NoveetyAI LLC — site scripts: theme toggle, mobile nav, scroll reveal */
(function () {
  'use strict';

  /* ---------- Theme (persisted, respects OS preference) ---------- */
  var STORE = 'noveety-theme';
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORE, theme); } catch (e) {}
  }

  function initial() {
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light' : 'dark';
  }

  apply(initial());

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
      });
    }

    /* ---------- Mobile nav ---------- */
    var navBtn = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (navBtn && links) {
      navBtn.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        navBtn.setAttribute('aria-expanded', String(open));
      });
      links.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') links.classList.remove('open');
      });
    }

    /* ---------- Active nav link ---------- */
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href && href === page) a.classList.add('active');
    });

    /* ---------- Scroll reveal ---------- */
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  });
})();
