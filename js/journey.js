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
const CW = 900, CH = 480;
const MARGIN_L = 40;
const LABEL_H = 28;
const MARGIN_TOP = 20;
const MARGIN_BOT = 30;
const ARROW_OVERSHOOT = 40;

let blocks = [];

/* ─────────────────────────────
   INIT UI
───────────────────────────── */

function initDatalist() {
  const list = document.getElementById('ideo-list');
  IDEOLOGIES_LIST.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    list.appendChild(opt);
  });
}

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
    const taken = blocks.some(b =>
      b.name === btn.textContent || b.name === '⭐ ' + btn.textContent
    );
    btn.disabled = taken || blocks.length >= MAX;
  });
}

/* ─────────────────────────────
   INPUT
───────────────────────────── */

const searchInput = document.getElementById('search');
const charCount = document.getElementById('char-count');

searchInput.addEventListener('input', () => {
  const raw = searchInput.value;
  const cleaned = raw.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').slice(0, 40);

  if (raw !== cleaned) searchInput.value = cleaned;

  charCount.textContent = `${searchInput.value.length}/40`;
  charCount.className = `jrn-char-count${searchInput.value.length >= 40 ? ' warn' : ''}`;
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addIdeology();
});

/* ─────────────────────────────
   IMAGE HELPERS
───────────────────────────── */

function placeholderDataURL(name) {
  const palette = ['#cc0000','#1a1a2e','#2d6a4f','#1d3557','#6a0572'];
  const color = palette[Math.abs(name.split('').reduce((a,c) => a + c.charCodeAt(0), 0)) % palette.length];

  const c = document.createElement('canvas');
  c.width = 200;
  c.height = 200;

  const ctx = c.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 200);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const words = name.replace('⭐ ', '').split(' ');
  words.forEach((w, i) => {
    ctx.fillText(w, 100, 100 + (i - words.length / 2) * 18);
  });

  return c.toDataURL();
}

/* ─────────────────────────────
   LAYOUT
───────────────────────────── */

function getPositions(n) {
  const BASE_BOTTOM = CH - MARGIN_BOT;

  const scale = n <= 2 ? 1.6
              : n <= 4 ? 1.3
              : n <= 6 ? 1.1
              : n <= 8 ? 0.95
              : 0.85;

  const size = Math.floor(120 * scale);

  const finalSize = size;

  const stepY = Math.round(finalSize * (n <= 4 ? 0.55 : 0.35));

  return Array.from({ length: n }, (_, i) => ({
    x: MARGIN_L + i * finalSize,
    top: BASE_BOTTOM - finalSize - LABEL_H - i * stepY,
    size: finalSize,
    stepY,
  }));
}

/* ─────────────────────────────
   REDRAW
───────────────────────────── */

function redraw() {
  const container = document.getElementById('journey');
  container.querySelectorAll('.step').forEach(e => e.remove());

  const n = blocks.length;
  const emptyState = document.getElementById('empty-state');

  if (!n) {
    emptyState.classList.remove('hidden');
    document.getElementById('info').textContent = '0 / 10 idéologies';
    return;
  }

  emptyState.classList.add('hidden');

  const pos = getPositions(n);

  pos.forEach((p, i) => {
    const step = document.createElement('div');
    step.className = 'step';
    step.style.left = p.x + 'px';
    step.style.top = p.top + 'px';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'step-name';
    nameDiv.style.maxWidth = p.size + 'px';
    nameDiv.textContent = blocks[i].name;

    const img = document.createElement('img');
    img.className = 'step-img';
    img.style.width = img.style.height = p.size + 'px';
    img.src = blocks[i].imgUrl;

    step.appendChild(nameDiv);
    step.appendChild(img);
    container.appendChild(step);
  });

  document.getElementById('info').textContent = `${n} / 10 idéologies`;
}

/* ─────────────────────────────
   ADD IDEOLOGY
───────────────────────────── */

async function addIdeology() {
  if (blocks.length >= MAX) return alert('Max 10');

  const name = searchInput.value.trim();
  if (!name) return;

  if (blocks.some(b => b.name === name)) return;

  const imgUrl = placeholderDataURL(name);

  blocks.push({
    name: IDEOLOGIES_LIST.includes(name) ? name : '⭐ ' + name,
    imgUrl
  });

  searchInput.value = '';
  charCount.textContent = '0/40';

  redraw();
  updateSuggestionStates();
}

/* ─────────────────────────────
   PNG EXPORT (FIXED TEXT)
───────────────────────────── */

function wrapTextCanvas(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = test;
    }
  }

  lines.push(line);
  return lines;
}

function exportPNG() {
  const SCALE = 2;
  const canvas = document.createElement('canvas');

  canvas.width = CW * SCALE;
  canvas.height = CH * SCALE;

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  ctx.fillStyle = '#f5f4ef';
  ctx.fillRect(0, 0, CW, CH);

  const pos = getPositions(blocks.length);

  pos.forEach((p, i) => {
    const label = blocks[i].name;

    ctx.fillStyle = '#111';
    ctx.font = 'bold 9px DM Sans';
    ctx.textBaseline = 'top';

    const lines = wrapTextCanvas(ctx, label, p.size);

    lines.forEach((line, idx) => {
      ctx.fillText(line, p.x, p.top + idx * 10);
    });

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, p.x, p.top + LABEL_H, p.size, p.size);
    };
    img.src = blocks[i].imgUrl;
  });

  setTimeout(() => {
    const a = document.createElement('a');
    a.download = 'my-political-journey.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }, 500);
}

/* ─────────────────────────────
   INIT
───────────────────────────── */

initDatalist();
buildSuggestions();
redraw();
