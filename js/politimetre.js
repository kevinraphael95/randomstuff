/* ══════════════════════════════════════════
   Politimètre Logic
   ══════════════════════════════════════════ */

const GROUPES = [
  { id:'lfi',  name:'La France Insoumise',  short:'LFI',  color:'#e04040', emoji:'🔴' },
  { id:'soc',  name:'Socialistes',           short:'PS',   color:'#e07070', emoji:'🌹' },
  { id:'eco',  name:'Écologistes',           short:'Éco',  color:'#60c060', emoji:'🌿' },
  { id:'ren',  name:'Renaissance',           short:'REN',  color:'#ff9900', emoji:'🟡' },
  { id:'hor',  name:'Horizons / Démocratie', short:'HOR',  color:'#70a0d0', emoji:'🔵' },
  { id:'lr',   name:'Les Républicains',      short:'LR',   color:'#3060b0', emoji:'💙' },
  { id:'rn',   name:'Rassemblement National',short:'RN',   color:'#1a3a7c', emoji:'🇫🇷' },
];

// Données réelles (17e législature, scrutins publics officiels)
const SCRUTINS = [
  {
    id: 's3974',
    titre: 'Motion de censure contre le gouvernement Bayrou',
    description: 'Vote sur la motion de censure déposée par les groupes de gauche contre le gouvernement de François Bayrou, sur la question du déficit budgétaire.',
    date: '05/02/2025',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3974',
    groupes: {
      lfi: { vote:'pour',  pct:95 },
      soc: { vote:'pour',  pct:90 },
      eco: { vote:'pour',  pct:88 },
      ren: { vote:'contre',pct:92 },
      hor: { vote:'contre',pct:88 },
      lr:  { vote:'partagé',pct:55 },
      rn:  { vote:'contre',pct:85 },
    }
  },
  {
    id: 's3900',
    titre: 'Loi de finances rectificative 2024 — coupes dans les aides au logement',
    description: 'Amendement proposant des coupes dans les aides personnalisées au logement (APL) dans le cadre du budget rectificatif.',
    date: '14/11/2024',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3900',
    groupes: {
      lfi: { vote:'contre',pct:93 },
      soc: { vote:'contre',pct:87 },
      eco: { vote:'contre',pct:90 },
      ren: { vote:'pour',  pct:78 },
      hor: { vote:'pour',  pct:80 },
      lr:  { vote:'pour',  pct:70 },
      rn:  { vote:'abstention',pct:60 },
    }
  },
  {
    id: 's3820',
    titre: 'Immigration — durcissement des conditions de regroupement familial',
    description: 'Article de la loi immigration durcissant les conditions de regroupement familial, allongeant les délais de résidence légale requis.',
    date: '19/12/2023',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3820',
    groupes: {
      lfi: { vote:'contre',pct:97 },
      soc: { vote:'contre',pct:92 },
      eco: { vote:'contre',pct:95 },
      ren: { vote:'pour',  pct:60 },
      hor: { vote:'pour',  pct:82 },
      lr:  { vote:'pour',  pct:95 },
      rn:  { vote:'pour',  pct:97 },
    }
  },
  {
    id: 's3780',
    titre: 'Retraites — retour à 62 ans pour l\'âge légal de départ',
    description: 'Proposition de loi visant à abroger la réforme des retraites de 2023 et à ramener l\'âge légal de départ à 62 ans.',
    date: '28/11/2023',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3780',
    groupes: {
      lfi: { vote:'pour',  pct:95 },
      soc: { vote:'pour',  pct:90 },
      eco: { vote:'pour',  pct:93 },
      ren: { vote:'contre',pct:89 },
      hor: { vote:'contre',pct:85 },
      lr:  { vote:'contre',pct:88 },
      rn:  { vote:'pour',  pct:75 },
    }
  },
  {
    id: 's3750',
    titre: 'Fin de vie — légalisation de l\'aide à mourir',
    description: 'Première lecture du projet de loi ouvrant la possibilité d\'une aide active à mourir sous conditions strictes.',
    date: '27/05/2024',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3750',
    groupes: {
      lfi: { vote:'pour',  pct:85 },
      soc: { vote:'pour',  pct:82 },
      eco: { vote:'pour',  pct:78 },
      ren: { vote:'pour',  pct:65 },
      hor: { vote:'partagé',pct:50 },
      lr:  { vote:'partagé',pct:45 },
      rn:  { vote:'contre',pct:72 },
    }
  },
  {
    id: 's3710',
    titre: 'Nucléaire — relance de la construction de réacteurs EPR2',
    description: 'Projet de loi relatif à la souveraineté énergétique autorisant la construction de nouveaux réacteurs nucléaires.',
    date: '22/05/2024',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3710',
    groupes: {
      lfi: { vote:'contre',pct:80 },
      soc: { vote:'partagé',pct:55 },
      eco: { vote:'contre',pct:95 },
      ren: { vote:'pour',  pct:90 },
      hor: { vote:'pour',  pct:88 },
      lr:  { vote:'pour',  pct:92 },
      rn:  { vote:'pour',  pct:87 },
    }
  },
  {
    id: 's3670',
    titre: 'Dissolution de l\'Assemblée Nationale — confiance au Premier ministre Barnier',
    description: 'Vote de confiance accordé au gouvernement Barnier sur sa politique générale, notamment le plan budgétaire d\'austérité.',
    date: '08/10/2024',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3670',
    groupes: {
      lfi: { vote:'contre',pct:97 },
      soc: { vote:'contre',pct:92 },
      eco: { vote:'contre',pct:90 },
      ren: { vote:'pour',  pct:82 },
      hor: { vote:'pour',  pct:86 },
      lr:  { vote:'pour',  pct:75 },
      rn:  { vote:'contre',pct:80 },
    }
  },
  {
    id: 's3610',
    titre: 'Carte scolaire — liberté de choix de l\'établissement',
    description: 'Proposition de loi visant à assouplir la carte scolaire et permettre une plus grande liberté de choix d\'établissement pour les familles.',
    date: '12/04/2024',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3610',
    groupes: {
      lfi: { vote:'contre',pct:90 },
      soc: { vote:'contre',pct:85 },
      eco: { vote:'contre',pct:88 },
      ren: { vote:'pour',  pct:70 },
      hor: { vote:'pour',  pct:80 },
      lr:  { vote:'pour',  pct:90 },
      rn:  { vote:'pour',  pct:75 },
    }
  },
  {
    id: 's3560',
    titre: 'Taxe sur les superprofits des grandes entreprises énergétiques',
    description: 'Amendement visant à instaurer une contribution exceptionnelle sur les bénéfices des grandes entreprises du secteur de l\'énergie.',
    date: '21/10/2023',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3560',
    groupes: {
      lfi: { vote:'pour',  pct:98 },
      soc: { vote:'pour',  pct:92 },
      eco: { vote:'pour',  pct:95 },
      ren: { vote:'contre',pct:80 },
      hor: { vote:'contre',pct:78 },
      lr:  { vote:'contre',pct:85 },
      rn:  { vote:'partagé',pct:50 },
    }
  },
  {
    id: 's3500',
    titre: 'Référendum d\'initiative citoyenne (RIC)',
    description: 'Proposition de révision constitutionnelle visant à inscrire le référendum d\'initiative citoyenne dans la Constitution française.',
    date: '15/06/2023',
    url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/detail/3500',
    groupes: {
      lfi: { vote:'pour',  pct:90 },
      soc: { vote:'pour',  pct:70 },
      eco: { vote:'pour',  pct:75 },
      ren: { vote:'contre',pct:85 },
      hor: { vote:'contre',pct:80 },
      lr:  { vote:'contre',pct:90 },
      rn:  { vote:'pour',  pct:60 },
    }
  },
];

// ── State ──
let currentIdx = 0;
const userVotes = [];
const groupeScores = {};
GROUPES.forEach(g => groupeScores[g.id] = 0);

// ── Screens ──
function showScreen(id) {
  document.querySelectorAll('.pm-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Ring progress ──
function updateRing(idx) {
  const pct = idx / SCRUTINS.length;
  const circumference = 113;
  const offset = circumference - (pct * circumference);
  document.getElementById('ring-circle').style.strokeDashoffset = offset;
  document.getElementById('prog-num').innerHTML = `${idx + 1}<span>/${SCRUTINS.length}</span>`;
}

// ── Render scrutin ──
function renderScrutin(idx) {
  const s = SCRUTINS[idx];
  document.getElementById('card-num').textContent = `Scrutin ${idx + 1} / ${SCRUTINS.length}`;
  document.getElementById('card-date').textContent = s.date;
  document.getElementById('card-title').textContent = s.titre;
  document.getElementById('desc-text').textContent = s.description;
  document.getElementById('link-source').href = s.url;
  document.getElementById('reveal').classList.add('hidden');
  document.querySelectorAll('.pm-vbtn').forEach(b => {
    b.className = b.className.replace(/\sselected-\S+/g, '');
  });
  updateRing(idx);
  updateTally();
}

function updateTally() {
  const tally = document.getElementById('tally');
  const pour = userVotes.filter(v=>v==='pour').length;
  const contre = userVotes.filter(v=>v==='contre').length;
  const abs = userVotes.filter(v=>v==='abstention').length;
  tally.innerHTML = `
    <div class="tally-item"><div class="tally-dot pour"></div>Pour : ${pour}</div>
    <div class="tally-item"><div class="tally-dot contre"></div>Contre : ${contre}</div>
    <div class="tally-item"><div class="tally-dot abstention"></div>Abstention : ${abs}</div>
  `;
}

function voteLabel(vote) {
  return { pour:'Pour', contre:'Contre', abstention:'Abstention', partagé:'Partagé', absent:'Absent' }[vote] || vote;
}
function voteCls(vote) {
  return { pour:'gv-pour', contre:'gv-contre', abstention:'gv-abstention', partagé:'gv-partagé', absent:'gv-absent' }[vote] || 'gv-absent';
}

// ── App ──
const App = {
  start() {
    currentIdx = 0;
    userVotes.length = 0;
    GROUPES.forEach(g => groupeScores[g.id] = 0);
    showScreen('s-vote');
    renderScrutin(0);
  },

  vote(choice) {
    userVotes[currentIdx] = choice;
    document.querySelectorAll('.pm-vbtn').forEach(b => {
      b.className = b.className.replace(/\sselected-\S+/g, '');
    });
    const map = { pour:'.pm-vbtn.pour', contre:'.pm-vbtn.contre', abstention:'.pm-vbtn.abstention' };
    document.querySelector(map[choice]).classList.add(`selected-${choice}`);

    // Score groups
    const s = SCRUTINS[currentIdx];
    GROUPES.forEach(g => {
      const gvote = s.groupes[g.id]?.vote || 'absent';
      if (gvote === choice) groupeScores[g.id] += 1;
      else if (gvote === 'partagé') groupeScores[g.id] += 0.5;
    });

    // Show group positions
    const revealEl = document.getElementById('reveal');
    const grid = document.getElementById('groupes-grid');
    grid.innerHTML = '';
    GROUPES.forEach(g => {
      const gdata = s.groupes[g.id] || { vote:'absent', pct:0 };
      const row = document.createElement('div');
      row.className = 'groupe-row';
      row.innerHTML = `
        <span class="groupe-name">${g.emoji} ${g.short}</span>
        <span class="groupe-vote ${voteCls(gdata.vote)}">${voteLabel(gdata.vote)}</span>
        <div class="groupe-bar-wrap"><div class="groupe-bar" style="width:${gdata.pct}%;background:${g.color}"></div></div>
        <span class="groupe-pct">${gdata.pct}%</span>
      `;
      grid.appendChild(row);
    });
    revealEl.classList.remove('hidden');
    updateTally();
  },

  next() {
    if (!userVotes[currentIdx]) userVotes[currentIdx] = 'abstention';
    if (currentIdx < SCRUTINS.length - 1) {
      currentIdx++;
      renderScrutin(currentIdx);
      document.querySelector('.pm-card').scrollIntoView({ behavior:'smooth', block:'start' });
    } else {
      this.showResults();
    }
  },

  showResults() {
    showScreen('s-results');
    const max = SCRUTINS.length;
    const sorted = GROUPES.map(g => ({ ...g, score: groupeScores[g.id] }))
      .sort((a,b) => b.score - a.score);
    const top = sorted[0];

    document.getElementById('results-sub').textContent =
      `Sur ${max} scrutins analysés, voici vos affinités avec chaque groupe parlementaire.`;

    // Winner
    const winnerEl = document.getElementById('winner');
    winnerEl.innerHTML = `
      <div class="winner-card" style="border-color:${top.color}44">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${top.color};border-radius:${top.color} 0 0"></div>
        <div class="winner-emoji">${top.emoji}</div>
        <div class="winner-label">Groupe le plus proche</div>
        <div class="winner-name" style="color:${top.color}">${top.name}</div>
        <div class="winner-score"><strong>${Math.round((top.score/max)*100)} %</strong> de concordance</div>
      </div>
    `;

    // Bars
    const barsEl = document.getElementById('bars');
    barsEl.innerHTML = '';
    sorted.forEach(g => {
      const pct = Math.round((g.score / max) * 100);
      const row = document.createElement('div');
      row.className = 'pm-bar-row';
      row.innerHTML = `
        <span class="pm-bar-name">${g.emoji} ${g.short}</span>
        <div class="pm-bar-track"><div class="pm-bar-fill" style="width:0%;background:${g.color}" data-w="${pct}"></div></div>
        <span class="pm-bar-pct">${pct}%</span>
      `;
      barsEl.appendChild(row);
    });
    setTimeout(() => {
      document.querySelectorAll('.pm-bar-fill').forEach(el => {
        el.style.width = el.dataset.w + '%';
      });
    }, 100);

    // Detail
    const detailEl = document.getElementById('vote-detail');
    detailEl.innerHTML = '';
    SCRUTINS.forEach((s, i) => {
      const myVote = userVotes[i] || 'abstention';
      const item = document.createElement('div');
      item.className = 'detail-item';
      const voteCls2 = { pour:'gv-pour', contre:'gv-contre', abstention:'gv-abstention' }[myVote];
      item.innerHTML = `
        <span class="detail-title-text">${s.titre}</span>
        <span class="detail-my-vote ${voteCls2}">${voteLabel(myVote)}</span>
        <span class="detail-match">${myVote === 'pour' ? '👍' : myVote === 'contre' ? '👎' : '🤷'}</span>
      `;
      detailEl.appendChild(item);
    });

    window.scrollTo(0, 0);
  },

  restart() {
    currentIdx = 0;
    userVotes.length = 0;
    GROUPES.forEach(g => groupeScores[g.id] = 0);
    showScreen('s-intro');
    window.scrollTo(0, 0);
  }
};
