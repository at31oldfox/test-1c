// Полифилл для globalThis
if (typeof globalThis === 'undefined') {
  window.globalThis = window;
}
