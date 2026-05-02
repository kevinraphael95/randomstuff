
const IDEOLOGIES_LIST = [
  'Socialisme','Libéralisme','Conservatisme','Anarchisme','Communisme',
  'Social-démocratie','Écologie politique','Libertarianisme','Nationalisme',
  'Fascisme','Progressisme','Populisme','Féminisme','Républicanisme',
  'Monarchisme','Syndicalisme','Gaullisme','Maoïsme','Trotskyisme',
  'Islamisme','Bouddhisme politique','Démocratie chrétienne','Technocratie',
  'Décroissance','Transhumanisme','Altermondialisme','Euroscepticisme',
  'Fédéralisme européen','Souverainisme','Écosocialisme'
];

const SUGGESTIONS = [
  'Socialisme','Libéralisme','Écologie politique','Conservatisme',
  'Anarchisme','Social-démocratie','Libertarianisme','Nationalisme'
];

const MAX = 10;

let blocks = [];

/* ─────────────────────────────
   UI INIT
───────────────────────────── */
function initDatalist() {
  const list = document.getElementById('ideo-list');
  if (!list) return;

  IDEOLOGIES_LIST.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    list.appendChild(opt);
  });
}

/* ─────────────────────────────
   SUGGESTIONS
───────────────────────────── */
function buildSuggestions() {
  const wrap = document.getElementById('suggestions');
  if (!wrap) return;

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
    const taken = blocks.some(b => b.name.replace('⭐ ','') === btn.textContent);
    btn.disabled = taken || blocks.length >= MAX;
  });
}

/* ─────────────────────────────
   CHAR COUNT
───────────────────────────── */
const searchInput = document.getElementById('search');
const charCount = document.getElementById('char-count');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const cleaned = searchInput.value.slice(0, 40);
    searchInput.value = cleaned;
    charCount.textContent = `${cleaned.length}/40`;
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addIdeology();
  });
}

/* ─────────────────────────────
   CANVAS SIZE (IMPORTANT FIX)
───────────────────────────── */
function getCanvasSize() {
  const el = document.getElementById('journey');
  return {
    CW: el?.clientWidth || 900,
    CH: el?.clientHeight || 380
  };
}

/* ─────────────────────────────
   PLACEHMENT INTELLIGENT
   (NO OVERLAP + RESPONSIVE)
───────────────────────────── */
function getPositions(n) {
  const { CW, CH } = getCanvasSize();

  const paddingX = 40;
  const paddingY = 30;

  const usableW = CW - paddingX * 2;
  const usableH = CH - paddingY * 2;

  const size = Math.min(130, usableW / (n + 1));

  const stepX = size * 0.9;
  const stepY = size * 0.55;

  const baseX = paddingX;
  const baseY = usableH - 60;

  return Array.from({ length: n }, (_, i) => ({
    x: baseX + i * stepX,
    y: baseY - i * stepY,
    size
  }));
}

/* ─────────────────────────────
   IMAGE HELPERS
───────────────────────────── */
function placeholderDataURL(name) {
  const c = document.createElement('canvas');
  c.width = 200;
  c.height = 200;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, 200, 200);

  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';

  ctx.fillText(name.slice(0, 10), 100, 100);

  return c.toDataURL();
}

function isBadImage(url) {
  const bad = ['nazi','hitler','propaganda'];
  return bad.some(w => url.toLowerCase().includes(w));
}

async function toBase64(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      c.getContext('2d').drawImage(img, 0, 0);
      resolve(c.toDataURL());
    };

    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/* ─────────────────────────────
   WIKIPEDIA IMAGE
───────────────────────────── */
async function fetchWikipediaImage(name) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&pithumbsize=300&format=json&origin=*`
    );

    const data = await res.json();

    for (const page of Object.values(data.query?.pages || {})) {
      const src = page.thumbnail?.source;
      if (src && !isBadImage(src)) return await toBase64(src);
    }
  } catch {}

  return null;
}

/* ─────────────────────────────
   REDRAW (CORE FIX)
───────────────────────────── */
function redraw() {
  const container = document.getElementById('journey');
  const empty = document.getElementById('empty-state');

  container.querySelectorAll('.step').forEach(e => e.remove());

  if (!blocks.length) {
    if (empty) empty.style.display = 'flex';
    return;
  }

  if (empty) empty.style.display = 'none';

  const pos = getPositions(blocks.length);

  pos.forEach((p, i) => {
    const step = document.createElement('div');
    step.className = 'step';
    step.style.left = p.x + 'px';
    step.style.top = p.y + 'px';

    const label = document.createElement('div');
    label.className = 'step-name';
    label.textContent = blocks[i].name;

    const img = document.createElement('img');
    img.className = 'step-img';
    img.style.width = p.size + 'px';
    img.style.height = p.size + 'px';
    img.src = blocks[i].img;

    step.appendChild(label);
    step.appendChild(img);

    container.appendChild(step);
  });

  const info = document.getElementById('info');
  if (info) info.textContent = `${blocks.length} / ${MAX}`;

  updateSuggestionStates();
}

/* ─────────────────────────────
   ADD IDEOLOGY
───────────────────────────── */
async function addIdeology() {
  if (blocks.length >= MAX) return;

  const raw = searchInput.value.trim();
  if (!raw) return;

  const name = raw.slice(0, 40);

  if (blocks.some(b => b.name === name)) return;

  const img = await fetchWikipediaImage(name) || placeholderDataURL(name);

  blocks.push({
    name,
    img
  });

  searchInput.value = '';
  charCount.textContent = '0/40';

  redraw();
}

/* ─────────────────────────────
   RESET
───────────────────────────── */
function resetAll() {
  blocks = [];
  redraw();
}

/* ─────────────────────────────
   EXPORT PNG
───────────────────────────── */
function exportPNG() {
  const { CW, CH } = getCanvasSize();

  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f5f4ef';
  ctx.fillRect(0, 0, CW, CH);

  const pos = getPositions(blocks.length);

  let loaded = 0;

  blocks.forEach((b, i) => {
    const img = new Image();

    img.onload = () => {
      const p = pos[i];

      ctx.drawImage(img, p.x, p.y, p.size, p.size);

      ctx.fillStyle = '#111';
      ctx.font = '12px Arial';
      ctx.fillText(b.name, p.x, p.y - 5);

      loaded++;

      if (loaded === blocks.length) {
        const a = document.createElement('a');
        a.download = 'journey.png';
        a.href = canvas.toDataURL();
        a.click();
      }
    };

    img.src = b.img;
  });
}

/* ─────────────────────────────
   MOBILE ZOOM FIX
───────────────────────────── */
function applyMobileZoom() {
  const el = document.getElementById('journey');
  if (!el) return;

  if (window.innerWidth < 768) {
    const scale = Math.min(window.innerWidth / 900, 1);
    el.style.transform = `scale(${scale})`;
    el.style.transformOrigin = 'top left';
  } else {
    el.style.transform = '';
  }
}

/* ─────────────────────────────
   INIT
───────────────────────────── */
initDatalist();
buildSuggestions();
redraw();
applyMobileZoom();

window.addEventListener('resize', () => {
  applyMobileZoom();
  redraw();
});
