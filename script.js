// Countdown timer for the urgency block. Adjust DEADLINE to the real bonus cutoff date.
(function () {
  var DEADLINE = new Date();
  DEADLINE.setDate(DEADLINE.getDate() + 3);

  var timerEl = document.getElementById('timer');
  if (!timerEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var diff = DEADLINE.getTime() - Date.now();
    if (diff <= 0) {
      timerEl.textContent = '00:00:00';
      return;
    }
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);
    timerEl.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();

// Social-proof style notification, bottom corner.
// IMPORTANT: no fabricated individual names or fake purchase timestamps.
// Messages reference real Sul/PR regions in aggregate, non-attributable phrasing.
// Swap MESSAGES for a real feed (e.g. a Cakto webhook) when purchase data exists.
(function () {
  var MESSAGES = [
    'Nova aquisição confirmada na região de Maringá/PR',
    'Produtor de Cascavel/PR garantiu o acesso recentemente',
    'Aquisição confirmada na região de Londrina/PR',
    'Novo acesso liberado na região de Ponta Grossa/PR',
    'Interesse crescente na região de Chapecó/SC',
    'Alta procura pelo guia no Sul do Brasil'
  ];

  var MIN_INTERVAL_MS = 28000;
  var MAX_INTERVAL_MS = 48000;
  var MIN_VISIBLE_MS = 4000;
  var MAX_VISIBLE_MS = 6000;

  function randomBetween(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  var toast = document.createElement('div');
  toast.className = 'purchase-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML =
    '<span class="purchase-toast-icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none">' +
        '<path d="M4 12.5l5 5L20 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
    '</span>' +
    '<span class="purchase-toast-text"></span>';
  document.body.appendChild(toast);

  var textEl = toast.querySelector('.purchase-toast-text');
  var hideTimeout = null;
  var nextTimeout = null;
  var lastIndex = -1;

  function randomMessage() {
    var index;
    do {
      index = Math.floor(Math.random() * MESSAGES.length);
    } while (index === lastIndex && MESSAGES.length > 1);
    lastIndex = index;
    return MESSAGES[index];
  }

  function showNext() {
    textEl.textContent = randomMessage();
    toast.classList.add('is-visible');

    var visibleMs = randomBetween(MIN_VISIBLE_MS, MAX_VISIBLE_MS);
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, visibleMs);

    scheduleNext();
  }

  function scheduleNext() {
    clearTimeout(nextTimeout);
    var delay = randomBetween(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
    nextTimeout = setTimeout(showNext, delay);
  }

  setTimeout(showNext, 5000);
})();
