/* ═══════════════════════════════════════
   PolitiLab — Mon Vote Européen
═══════════════════════════════════════ */

/* ── STATE ── */
let votes = {};
let currentCode = null;

/* ── ELEMENTS ── */
const tip          = document.getElementById("eu-tip");
const modalBg      = document.getElementById("modal-bg");
const modalCountry = document.getElementById("modal-country");
const modalGrid    = document.getElementById("modal-grid");
const logoLayer    = document.getElementById("logo-layer");
const strip        = document.getElementById("eu-strip-list");
const count        = document.getElementById("eu-count");
const empty        = document.getElementById("empty-hint");

/* ── CHARGE LE SVG ── */
fetch('europe-map.svg')
  .then(r => r.text())
  .then(svgText => {
    const container = document.getElementById('europe-svg-container');
    container.innerHTML = svgText;

    const svgEl = container.querySelector('svg');
    svgEl.id = 'europe-svg';
    svgEl.style.width   = '100%';
    svgEl.style.height  = 'auto';
    svgEl.style.display = 'block';

    svgEl.querySelectorAll('path[id], g[id]').forEach(el => {
      const code = el.id.toUpperCase();
      if (!PARTIES[code]) return;
      el.classList.add('eu-country');
      el.addEventListener('click',      ()  => openModal(code));
      el.addEventListener('mouseenter', e   => showTip(e, COUNTRY_NAMES[code]));
      el.addEventListener('mousemove',  e   => moveTip(e));
      el.addEventListener('mouseleave', ()  => hideTip());
    });

    renderAll();
  });

/* ── TOOLTIP ── */
function showTip(e, t) {
  tip.textContent   = t;
  tip.style.opacity = 1;
  moveTip(e);
}
function moveTip(e) {
  tip.style.left = e.clientX + 14 + 'px';
  tip.style.top  = e.clientY - 10 + 'px';
}
function hideTip() {
  tip.style.opacity = 0;
}

/* ── MODAL ── */
function openModal(code) {
  if (!PARTIES[code]) return;
  currentCode = code;
  modalCountry.textContent = COUNTRY_NAMES[code] || code;
  renderParties(code);
  modalBg.classList.add('active');
}

function closeModal() {
  modalBg.classList.remove('active');
}

modalBg.addEventListener('click', e => {
  if (e.target === modalBg) closeModal();
});

/* ── PARTIES ── */
function renderParties(code) {
  const list = PARTIES[code] || [];
  modalGrid.innerHTML = '';

  list.forEach((p, i) => {
    const chosen = votes[code]?.name === p.name;
    const col    = ORIENT_COLOR[p.orient] || '#888';

    const btn = document.createElement('button');
    btn.className = 'eu-party-btn';
    if (chosen) btn.classList.add('chosen');
    btn.addEventListener('click', () => vote(code, i));

    btn.innerHTML = `
      ${p.logo
        ? `<img src="${p.logo}" onerror="this.style.display='none'">`
        : `<div class="eu-party-orient">🏛</div>`
      }
      <div class="eu-pname">${p.name}</div>
      <div class="eu-party-orient" style="background:${col}">${p.orient}</div>
    `;

    modalGrid.appendChild(btn);
  });
}

/* ── HELPER: trouve un path par code ── */
function getEl(code) {
  return document.querySelector(`#europe-svg-container svg [id="${code.toLowerCase()}"]`);
}

/* ── VOTE ── */
function vote(code, i) {
  const p = PARTIES?.[code]?.[i];
  if (!p) return;

  if (votes[code]?.name === p.name) {
    delete votes[code];
    getEl(code)?.classList.remove('has-vote');
  } else {
    votes[code] = p;
    getEl(code)?.classList.add('has-vote');
  }

  renderAll();
  closeModal();
}

/* ── LOGOS SUR LA CARTE ── */
function updateLogoOverlays() {
  logoLayer.innerHTML = '';

  const svgEl = document.querySelector('#europe-svg-container svg');
  if (!svgEl) return;

  const vb = svgEl.viewBox?.baseVal;
  if (!vb || vb.width === 0) return;

  const rect   = svgEl.getBoundingClientRect();
  const scaleX = rect.width  / vb.width;
  const scaleY = rect.height / vb.height;

  for (const [code, p] of Object.entries(votes)) {
    const path = getEl(code);
    if (!path) continue;

    const bbox = path.getBBox();
    const x = (bbox.x + bbox.width  / 2) * scaleX;
    const y = (bbox.y + bbox.height / 2) * scaleY;

    const div = document.createElement('div');
    div.className  = 'eu-logo';
    div.style.left = x + 'px';
    div.style.top  = y + 'px';
    div.innerHTML  = p.logo
      ? `<img src="${p.logo}" onerror="this.style.display='none'"><div class="eu-logo-name">${p.name}</div>`
      : `<div class="eu-logo-name">${p.name}</div>`;

    logoLayer.appendChild(div);
  }
}

window.addEventListener('resize', updateLogoOverlays);

/* ── STRIP ── */
function updateStrip() {
  const entries = Object.entries(votes);
  empty.classList.toggle('hidden', entries.length > 0);

  strip.innerHTML = entries.length
    ? ''
    : `<span class="eu-strip-empty">Aucun pays sélectionné</span>`;

  entries.forEach(([c, p]) => {
    const el = document.createElement('div');
    el.className = 'eu-strip-item';
    el.innerHTML = `${COUNTRY_NAMES[c] || c} — ${p.name} <span class="eu-strip-x">✕</span>`;
    el.onclick = () => removeVote(c);
    strip.appendChild(el);
  });
}

/* ── REMOVE ── */
function removeVote(code) {
  delete votes[code];
  getEl(code)?.classList.remove('has-vote');
  renderAll();
}

/* ── COUNT ── */
function updateCount() {
  count.textContent = `${Object.keys(votes).length} pays sélectionnés`;
}

/* ── RESET ── */
function resetMap() {
  votes = {};
  document.querySelectorAll('#europe-svg-container svg .eu-country').forEach(e => {
    e.classList.remove('has-vote');
  });
  renderAll();
}

/* ── RENDER ALL ── */
function renderAll() {
  updateLogoOverlays();
  updateStrip();
  updateCount();
}

/* ── EXPORT PNG ── */
async function exportPNG() {
  const imgs = [...document.querySelectorAll('img')];
  await Promise.all(imgs.map(img => img.complete
    ? Promise.resolve()
    : new Promise(r => { img.onload = img.onerror = r; })
  ));

  html2canvas(document.getElementById('eu-canvas'), {
    backgroundColor: '#1b2a4a',
    useCORS: true,
    scale: 2
  }).then(canvas => {
    const a = document.createElement('a');
    a.download = 'vote-europe.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
}

/* ── INIT ── */
renderAll();
