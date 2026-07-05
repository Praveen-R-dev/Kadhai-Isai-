// ============================================================
// 1. PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
//    (See README.md > "Connect the form to Google Sheets" for
//    the exact steps to get this URL.)
// ============================================================
const GOOGLE_SHEET_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Hero waveform bars ----------
const bars = document.getElementById('bars');
for (let i = 0; i < 40; i++) {
  const s = document.createElement('span');
  s.style.animationDelay = (Math.random() * 1.6) + 's';
  s.style.height = (30 + Math.random() * 70) + '%';
  bars.appendChild(s);
}

// ---------- Portfolio mini waveform bars ----------
['mb1', 'mb2'].forEach(id => {
  const el = document.getElementById(id);
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('span');
    s.style.height = (10 + Math.random() * 90) + '%';
    el.appendChild(s);
  }
});

// ---------- Ambient "now composing" clock ----------
let secs = 0;
setInterval(() => {
  secs++;
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  document.getElementById('clock').textContent = m + ':' + s;
}, 1000);

// ---------- Scroll reveal animation ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// 2. BOOKING FORM -> GOOGLE SHEETS
// ============================================================
const form = document.getElementById('bookingForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (GOOGLE_SHEET_ENDPOINT.includes("PASTE_YOUR")) {
    statusEl.textContent = "Form isn't connected yet — see README.md to link it to Google Sheets.";
    statusEl.className = "form-status error";
    return;
  }

  const payload = {
    name: document.getElementById('name').value,
    occasion: document.getElementById('occasion').value,
    language: document.getElementById('language').value,
    story: document.getElementById('story').value,
    contactinfo: document.getElementById('contactinfo').value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusEl.textContent = "";
  statusEl.className = "form-status";

  // IMPORTANT: we deliberately do NOT set a "Content-Type: application/json"
  // header here. Apps Script Web Apps don't respond correctly to the
  // preflight (OPTIONS) request that browsers send with JSON headers.
  // Sending it as a plain string avoids that preflight entirely.
  fetch(GOOGLE_SHEET_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      statusEl.textContent = "Got it — I'll get back to you soon.";
      statusEl.className = "form-status success";
      form.reset();
    })
    .catch(err => {
      console.error(err);
      statusEl.textContent = "Something went wrong. Please try WhatsApp or email instead.";
      statusEl.className = "form-status error";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send my story";
    });
});
