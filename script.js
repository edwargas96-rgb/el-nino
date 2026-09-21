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

// Rotating urgency toast. Generic, no fabricated names/locations/purchases.
(function () {
  var MESSAGES = [
    'Alta procura pelo guia nas últimas horas',
    'Produtores orgânicos de várias regiões estão conferindo o material agora',
    'Os bônus com condição especial estão saindo aos poucos',
    'Página com bastante movimento hoje'
  ];
  var INTERVAL_MS = 35000;
  var VISIBLE_MS = 6000;

  var toast = document.createElement('div');
  toast.className = 'social-toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);

  var index = 0;

  function showNext() {
    toast.textContent = MESSAGES[index % MESSAGES.length];
    index++;
    toast.classList.add('is-visible');
    setTimeout(function () {
      toast.classList.remove('is-visible');
    }, VISIBLE_MS);
  }

  setTimeout(showNext, 4000);
  setInterval(showNext, INTERVAL_MS);
})();
