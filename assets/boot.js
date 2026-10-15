// Runs in <head> to apply saved theme/device before paint. ?device= and ?theme= override (handy for sharing a view).
(function () {
  var d = document.documentElement, q = new URLSearchParams(location.search), t = 'light', v = 'mobile';
  try { t = localStorage.getItem('rms-theme') || t; v = localStorage.getItem('rms-device') || v; } catch (e) {}
  d.dataset.theme = q.get('theme') || t;
  d.dataset.device = q.get('device') || v;
})();
