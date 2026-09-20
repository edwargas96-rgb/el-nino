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
