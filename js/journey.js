/* ══════════════════════════════════════════
   Journey Logic
   ══════════════════════════════════════════ */

const IDEOLOGIES_LIST = [
  'Socialisme','Libéralisme','Conservatisme','Anarchisme','Communisme',
  'Social-démocratie','Écologie politique','Libertarianisme','Nationalisme',
  'Fascisme','Progressisme','Populisme','Féminisme','Républicanisme',
  'Monarchisme','Syndicalisme','Gaullisme','Maoïsme','Trotskyisme',
  'Islamisme','Bouddhisme politique','Démocratie chrétienne','Technocratie',
  'Décroissance','Transhumanisme','Altermondialisme','Euroscepticisme',
  'Fédéralisme européen','Souverainisme','Écosocialisme',
];

const SUGGESTIONS = [
  'Socialisme','Libéralisme','Écologie politique','Conservatisme',
  'Anarchisme','Social-démocratie','Libertarianisme','Nationalisme',
];

const MAX = 10;
const CW = 900, CH = 380;
const MARGIN_L = 40;
const LABEL_H = 28;
const MARGIN_TOP = 20;
const MARGIN_BOT = 30;
const ARROW_OVERSHOOT = 40;
let blocks = [];

// ── Datalist ──
function initDatalist() {
  const list = document.getElementById('ideo-list');
  IDEOLOGIES_LIST.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    list.appendChild(opt);
  });
}

// ── Suggestions ──
function buildSuggestions() {
  const wrap = document.getElementById('suggestions');
  SUGGESTIONS.forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = name;
    btn.onclick = () => {
      document.getElementById('search').value = name;
      addIdeology();
    };
    wrap.appendChild(btn);
  });
}

function updateSuggestionStates() {
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    const taken = blocks.some(b => b.name === btn.textContent || b.name === '⭐ ' + btn.textContent);
    btn.disabled = taken || blocks.length >= MAX;
  });
}

// ── Input char count ──
const searchInput = document.getElementById('search');
const charCount = document.getElementById('char-count');
searchInput.addEventListener('input', () => {
  const raw = searchInput.value;
  const cleaned = raw.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').slice(0, 40);
  if (raw !== cleaned) searchInput.value = cleaned;
  charCount.textContent = `${searchInput.value.length}/40`;
  charCount.className = `jrn-char-count${searchInput.value.length >= 40 ? ' warn' : ''}`;
});
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') addIdeology(); });

// ── Image fetch ──
function placeholderDataURL(name) {
  const palette = ['#cc0000','#1a1a2e','#2d6a4f','#1d3557','#6a0572','#b5451b','#0a3d62','#4a4e69','#7a3b1e','#2c5f2e'];
  const color = palette[Math.abs(name.split('').reduce((a,c) => a + c.charCodeAt(0), 0)) % palette.length];
  const c = document.createElement('canvas');
  c.width = 200; c.height = 200;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = 'rgba(255,255,255,.08)';
  ctx.fillRect(0, 150, 200, 50);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const words = name.replace('⭐ ', '').split(' ');
  words.forEach((w, i) => ctx.fillText(w, 100, 100 + (i - (words.length - 1) / 2) * 22));
  return c.toDataURL();
}

function isBadImage(url) {
  const blocked = ['hitler','nazi','mussolini','bundesarchiv','portrait_of','propaganda'];
  return blocked.some(t => url.toLowerCase().includes(t));
}

async function toBase64(url) {
  if (!url || url.startsWith('data:')) return url;
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth || 200;
        c.height = img.naturalHeight || 200;
        c.getContext('2d').drawImage(img, 0, 0);
        resolve(c.toDataURL());
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    setTimeout(() => resolve(url), 6000);
    img.src = url;
  });
}

async function fetchWikipediaImage(searchName) {
  // Try exact page first
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&pithumbsize=300&format=json&origin=*`);
    const data = await res.json();
    for (const p of Object.values(data.query?.pages || {})) {
      const src = p.thumbnail?.source;
      if (src && !isBadImage(src)) return await toBase64(src);
    }
  } catch {}

  // Search fallback
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchName)}&srlimit=3&format=json&origin=*`);
    const data = await res.json();
    for (const result of (data.query?.search || [])) {
      const r2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(result.title)}&prop=pageimages&pithumbsize=300&format=json&origin=*`);
      const d2 = await r2.json();
      for (const p of Object.values(d2.query?.pages || {})) {
        const src = p.thumbnail?.source;
        if (src && !isBadImage(src)) return await toBase64(src);
      }
    }
  } catch {}

  return null;
}

// ── Layout ──
function getPositions(n) {
  // Largeur dispo pour les blocs (sans la zone titre à droite)
  const availW = CW - MARGIN_L - ARROW_OVERSHOOT - 120; // 120 = marge titre JOURNEY
  const maxSizeByW = Math.floor(availW / n);

  // Hauteur dispo : le premier bloc est en bas, le dernier en haut
  // top[i] = BASE - size - LABEL_H - i*stepY >= MARGIN_TOP
  // → stepY*(n-1) <= BASE - size - LABEL_H - MARGIN_TOP
  // On veut ratio fixe stepY = size * ratio → résoudre en size
  // size*(1 + ratio*(n-1)) + LABEL_H <= CH - MARGIN_BOT - MARGIN_TOP
  const availV = CH - MARGIN_TOP - LABEL_H - MARGIN_BOT;
  const ratio = n <= 3 ? 0.65 : n <= 6 ? 0.5 : 0.38;
  const maxSizeByH = Math.floor(availV / (1 + ratio * (n - 1)));
  const maxAbs = n <= 2 ? 160 : n <= 4 ? 130 : n <= 7 ? 100 : 80;
  const size = Math.min(maxSizeByW, maxSizeByH, maxAbs);
  const stepY = Math.round(size * ratio);
  const BASE_BOTTOM = CH - MARGIN_BOT;

  return Array.from({ length: n }, (_, i) => ({
    x: MARGIN_L + i * size,
    top: BASE_BOTTOM - size - LABEL_H - i * stepY,
    size,
    stepY,
  }));
}

// ── Redraw ──
function redraw() {
  const container = document.getElementById('journey');
  container.querySelectorAll('.step').forEach(e => e.remove());
  const n = blocks.length;
  const stairLine = document.getElementById('stair-line');
  const emptyState = document.getElementById('empty-state');

  if (!n) {
    stairLine.setAttribute('points', '');
    emptyState.classList.remove('hidden');
    document.getElementById('info').textContent = '0 / 10 idéologies';
    updateSuggestionStates();
    return;
  }

  emptyState.classList.add('hidden');
  const pos = getPositions(n);
  const ARROW_OFFSET = 8, SIDE_OVERSHOOT = 14;
  let pts = [];
  pos.forEach((p, i) => {
    const y = p.top + LABEL_H + p.size + ARROW_OFFSET;
    if (i === 0) pts.push(`${p.x - SIDE_OVERSHOOT},${y}`);
    pts.push(`${p.x + p.size + SIDE_OVERSHOOT},${y}`);
    if (i < n - 1) pts.push(`${p.x + p.size + SIDE_OVERSHOOT},${pos[i+1].top + LABEL_H + pos[i+1].size + ARROW_OFFSET}`);
  });
  const last = pos[n - 1];
  const lastY = last.top + LABEL_H + last.size + ARROW_OFFSET;
  pts.push(`${Math.min(last.x + last.size + ARROW_OVERSHOOT + 30, CW - 10)},${lastY}`);
  stairLine.setAttribute('points', pts.join(' '));

  pos.forEach((p, i) => {
    const step = document.createElement('div');
    step.className = 'step';
    step.style.left = p.x + 'px';
    step.style.top = p.top + 'px';
    step.style.width = p.size + 'px';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'step-name';
    nameDiv.style.width = p.size + 'px';
    nameDiv.textContent = blocks[i].name;

    const img = document.createElement('img');
    img.className = 'step-img';
    img.style.width = p.size + 'px';
    img.style.height = p.size + 'px';
    img.src = blocks[i].imgUrl;
    img.alt = blocks[i].name;

    step.appendChild(nameDiv);
    step.appendChild(img);
    container.appendChild(step);
  });

  document.getElementById('info').textContent = `${n} / 10 idéologies`;
  updateSuggestionStates();
}

// ── Add ideology ──
async function addIdeology() {
  if (blocks.length >= MAX) {
    alert('Maximum 10 idéologies atteint.');
    return;
  }
  const raw = searchInput.value.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').trim();
  const name = raw.slice(0, 40);
  if (!name) return;

  // Check duplicate
  if (blocks.some(b => b.name === name || b.name === '⭐ ' + name)) {
    searchInput.value = '';
    charCount.textContent = '0/40';
    return;
  }

  const btn = document.getElementById('btn-add');
  const btnLabel = document.getElementById('btn-add-label');
  btnLabel.textContent = '…';
  btn.disabled = true;
  searchInput.disabled = true;

  // Try to find in known list
  const knownName = IDEOLOGIES_LIST.find(n => n.toLowerCase() === name.toLowerCase()) || name;
  const imgUrl = (await fetchWikipediaImage(knownName)) || placeholderDataURL(knownName);

  const displayName = IDEOLOGIES_LIST.find(n => n.toLowerCase() === name.toLowerCase())
    ? knownName
    : '⭐ ' + name;

  blocks.push({ name: displayName, imgUrl });
  redraw();

  searchInput.value = '';
  charCount.textContent = '0/40';
  charCount.className = 'jrn-char-count';
  btnLabel.textContent = 'Ajouter';
  btn.disabled = false;
  searchInput.disabled = false;
  searchInput.focus();
}

// ── Reset ──
function resetAll() {
  blocks = [];
  redraw();
}

// ── Export PNG ──
function exportPNG() {
  const SCALE = 2;
  const canvas = document.createElement('canvas');
  canvas.width = CW * SCALE;
  canvas.height = CH * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // Background
  ctx.fillStyle = '#f5f4ef';
  ctx.fillRect(0, 0, CW, CH);

  if (!blocks.length) {
    download(canvas);
    return;
  }

  const pos = getPositions(blocks.length);
  let pending = blocks.length;

  const checkDone = () => {
    if (--pending === 0) {
      drawArrowOverlay(ctx, pos);
      drawTitle(ctx);
      download(canvas);
    }
  };

  pos.forEach((p, i) => {
    // Label
    ctx.fillStyle = '#111';
    ctx.font = `bold 9px "DM Sans", Arial`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    let label = blocks[i].name;
    while (ctx.measureText(label).width > p.size - 4 && label.length > 1) label = label.slice(0, -1);
    ctx.fillText(label, p.x, p.top);

    // Image placeholder
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(p.x, p.top + LABEL_H, p.size, p.size);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, p.x, p.top + LABEL_H, p.size, p.size);
      checkDone();
    };
    img.onerror = checkDone;
    img.src = blocks[i].imgUrl;
  });
}

function drawArrowOverlay(ctx, pos) {
  const ARROW_OFFSET = 8, SIDE_OVERSHOOT = 14;
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  pos.forEach((p, i) => {
    const y = p.top + LABEL_H + p.size + ARROW_OFFSET;
    const xL = p.x - SIDE_OVERSHOOT;
    const xR = p.x + p.size + SIDE_OVERSHOOT;
    if (i === 0) ctx.moveTo(xL, y);
    ctx.lineTo(xR, y);
    if (i < pos.length - 1) ctx.lineTo(xR, pos[i+1].top + LABEL_H + pos[i+1].size + ARROW_OFFSET);
  });
  const last = pos[pos.length - 1];
  const lastY = last.top + LABEL_H + last.size + ARROW_OFFSET;
  const arrowEnd = Math.min(last.x + last.size + ARROW_OVERSHOOT + 30, CW - 10);
  ctx.lineTo(arrowEnd - 18, lastY);
  ctx.stroke();

  // Arrowhead
  const hl = 18;
  ctx.beginPath();
  ctx.moveTo(arrowEnd, lastY);
  ctx.lineTo(arrowEnd - hl, lastY - hl * 0.5);
  ctx.lineTo(arrowEnd - hl, lastY + hl * 0.5);
  ctx.closePath();
  ctx.fillStyle = '#111';
  ctx.fill();
}

function drawTitle(ctx) {
  ctx.fillStyle = '#7a0000';
  ctx.font = `800 30px "Syne", "Impact", Arial Black, sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('MY', CW - 24, CH - 20 - 62);
  ctx.fillText('POLITICAL', CW - 24, CH - 20 - 31);
  ctx.fillText('JOURNEY!', CW - 24, CH - 20);
}

function download(canvas) {
  const a = document.createElement('a');
  a.download = 'my-political-journey.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

// ── Init ──
initDatalist();
buildSuggestions();
redraw();
