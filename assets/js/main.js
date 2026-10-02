/* NoveetyAI — site scripts: mobile nav, active nav link, white-paper contents */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
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
    // individual papers light up the White Papers nav item
    if (page.indexOf('whitepaper-') === 0) page = 'whitepapers.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href && href === page) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });

    /* ---------- White-paper contents: highlight the section in view ---------- */
    var toc = document.querySelectorAll('.contents a[href^="#"]');
    if (!toc.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    toc.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        toc.forEach(function (a) { a.classList.remove('on'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('on');
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  });
})();
