// Popups öffnen und schließen
function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

function showPopup(id) {
  document.getElementById(id).style.display = "block";
}

// Countdown alle 10 Minuten ab 16:00 Uhr
function updateCountdown() {
  const timerElement = document.getElementById("timer");
  const now = new Date();
  const start = new Date();
  start.setHours(16, 0, 0, 0);

  if (now < start) {
    timerElement.textContent = "⏳ Noch nicht gestartet";
    return;
  }

  const elapsed = Math.floor((now - start) / 1000);
  const remainder = 600 - (elapsed % 600);
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;

  timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Infizierten-Zähler ab 16:00 Uhr bis Mitternacht
function updateInfectedCount() {
  const countElement = document.getElementById("infected-count");
  const now = new Date();
  const start = new Date();
  start.setHours(16, 0, 0, 0);
  const end = new Date();
  end.setHours(24, 0, 0, 0);

  if (now < start) {
    countElement.textContent = "🧠 Infizierte in der Nähe: 0";
    return;
  }

  const elapsed = Math.floor((now - start) / 1000);
  const infected = Math.min(999, Math.floor(elapsed / 30));
  countElement.textContent = `🧠 Infizierte in der Nähe: ${infected}`;
}

// Interaktionen aktivieren
document.addEventListener("DOMContentLoaded", function () {
  // Hotline-Button
  document.getElementById("hotline-button").addEventListener("click", function () {
    document.getElementById("busy-sound").play();
    showPopup("popup-hotline");
  });

  // Infektionsanzeichen-Button
  document.getElementById("info-button").addEventListener("click", function () {
    document.getElementById("alert-sound").play();
    showPopup("popup-symptoms");
  });

  // Wiederholende Updates
  setInterval(updateCountdown, 1000);
  setInterval(updateInfectedCount, 1000);
  setInterval(function () {
    showPopup("popup-kohorte");
  }, 30000);
});
