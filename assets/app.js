// Artbook only: spotlight cursor + static EN/ES/FR switch. No business logic.
(function () {
  var root = document.documentElement;
  window.addEventListener('pointermove', function (e) {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  });

  var D = window.I18N || {};
  function get() { try { return localStorage.getItem('rms-lang') || 'en'; } catch (e) { return 'en'; } }
  function apply(lang) {
    document.querySelectorAll('[data-i]').forEach(function (el) {
      if (!el.dataset.en) el.dataset.en = el.innerHTML;
      var k = el.getAttribute('data-i');
      el.innerHTML = lang === 'en' ? el.dataset.en : ((D[lang] && D[lang][k]) || el.dataset.en);
    });
    document.querySelectorAll('[data-ph]').forEach(function (el) {
      if (!el.dataset.phen) el.dataset.phen = el.placeholder;
      var k = el.getAttribute('data-ph');
      el.placeholder = lang === 'en' ? el.dataset.phen : ((D[lang] && D[lang][k]) || el.dataset.phen);
    });
    document.querySelectorAll('[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === lang); });
    root.lang = lang;
  }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (err) {} }
  function marks() {
    document.querySelectorAll('[data-d]').forEach(function (b) { b.classList.toggle('on', b.dataset.d === root.dataset.device); });
    document.querySelectorAll('[data-t]').forEach(function (b) { b.classList.toggle('on', b.dataset.t === root.dataset.theme); });
  }
  // MacBook: render the screen at 1280x800 and scale it to fit the frame
  function fit() {
    var scr = document.querySelector('.screen'), inner = document.querySelector('.screen-inner');
    if (!scr || !inner) return;
    if (root.dataset.device === 'desktop') {
      var s = scr.clientWidth / 1280;
      inner.style.transform = 'scale(' + s + ')';
      scr.style.height = Math.round(800 * s) + 'px';
    } else {
      inner.style.transform = ''; scr.style.height = '';
    }
  }
  window.addEventListener('resize', fit);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang button');
    if (!b) return;
    if (b.dataset.l) { save('rms-lang', b.dataset.l); apply(b.dataset.l); }
    if (b.dataset.d) { root.dataset.device = b.dataset.d; save('rms-device', b.dataset.d); fit(); }
    if (b.dataset.t) { root.dataset.theme = b.dataset.t; save('rms-theme', b.dataset.t); }
    marks();
  });
  document.addEventListener('DOMContentLoaded', function () { apply(get()); marks(); fit(); });
})();
