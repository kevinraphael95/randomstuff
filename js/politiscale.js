/* ══════════════════════════════════════════
   PolitiScale Logic
   ══════════════════════════════════════════ */

const AXES = [
  { id:'eco',  left:'Collectiviste', right:'Libéral éco.',     colorL:'#e05a5a', colorR:'#5ab4e0', icon:'💰' },
  { id:'soc',  left:'Progressiste',  right:'Conservateur',     colorL:'#a0d080', colorR:'#e09040', icon:'🌈' },
  { id:'auth', left:'Libertaire',    right:'Autoritaire',      colorL:'#60c8a0', colorR:'#e05060', icon:'⚖️' },
  { id:'nat',  left:'Internationaliste', right:'Nationaliste', colorL:'#6090e0', colorR:'#e08040', icon:'🌍' },
  { id:'env',  left:'Techno-croissanciste', right:'Écologiste',colorL:'#c060e0', colorR:'#60d090', icon:'🌿' },
  { id:'reli', left:'Laïcard',       right:'Traditionaliste',  colorL:'#60b0e0', colorR:'#e0b060', icon:'✝️' },
  { id:'dem',  left:'Démocratie directe', right:'Élitisme techno.', colorL:'#80c0e0', colorR:'#d080a0', icon:'🗳️' },
  { id:'geo',  left:'Décentralisation', right:'Centralisation',colorL:'#90e0b0', colorR:'#e07060', icon:'🏛️' },
  { id:'tech', left:'Tech-sceptique', right:'Technophile',     colorL:'#b0a0d0', colorR:'#d0c060', icon:'🤖' },
  { id:'sec',  left:'Pacifiste',     right:'Sécuritaire',      colorL:'#80d0d0', colorR:'#d06060', icon:'🛡️' },
];

const scores = {}, maxScores = {};
AXES.forEach(a => { scores[a.id] = 0; maxScores[a.id] = 0; });

const QUESTIONS = [
  { d:'💰 Économie', t:'L\'État devrait posséder les secteurs stratégiques : énergie, eau, transport.', detail:'Nationalisation, services publics essentiels.', w:{eco:-1} },
  { d:'💰 Économie', t:'La réduction des impôts stimule mieux l\'économie que la dépense publique.', detail:'Théorie du ruissellement vs relance keynésienne.', w:{eco:1} },
  { d:'💰 Économie', t:'Un revenu universel de base doit être instauré pour toute personne.', detail:'RSA universel, allocation automatique.', w:{eco:-1} },
  { d:'💰 Économie', t:'La libre concurrence produit les meilleurs résultats pour les consommateurs.', detail:'Marché vs régulation étatique.', w:{eco:1} },
  { d:'💰 Économie', t:'Les grandes fortunes devraient être plafonnées par la loi.', detail:'Impôt confiscatoire, plafond de richesse.', w:{eco:-1} },
  { d:'💰 Économie', t:'La privatisation des services publics améliore leur efficacité.', detail:'Eau, hôpitaux, transports privatisés.', w:{eco:1} },
  { d:'💰 Économie', t:'Le droit de grève ne devrait pas être limité, même dans les services essentiels.', detail:'Droit de grève absolu vs service minimum.', w:{eco:-1, auth:0.5} },
  { d:'💰 Économie', t:'L\'entrepreneuriat individuel est la meilleure voie pour créer de la prospérité.', detail:'Start-ups, indépendants, PME comme moteur.', w:{eco:1} },
  { d:'💰 Économie', t:'Les travailleurs devraient avoir une représentation majoritaire dans les conseils d\'administration.', detail:'Co-gestion, démocratie en entreprise.', w:{eco:-1} },
  { d:'💰 Économie', t:'Les traités de libre-échange bénéficient à l\'économie nationale.', detail:'CETA, accords commerciaux internationaux.', w:{eco:0.8, nat:-0.5} },
  { d:'💰 Économie', t:'Les syndicats ont trop de pouvoir dans l\'économie actuelle.', detail:'Contrepoids syndicats vs patronat.', w:{eco:1} },
  { d:'💰 Économie', t:'Un impôt progressif fort est la base d\'une société juste.', detail:'Tranche marginale élevée pour les hauts revenus.', w:{eco:-1} },
  { d:'💰 Économie', t:'La dette publique est un outil légitime pour financer des investissements d\'avenir.', detail:'Déficit keynésien vs orthodoxie budgétaire.', w:{eco:-0.7} },
  { d:'💰 Économie', t:'La flexibilité du marché du travail crée plus d\'emplois qu\'elle n\'en détruit.', detail:'CDI, CDD, précarité vs sécurité.', w:{eco:1} },
  { d:'💰 Économie', t:'Les profits des entreprises devraient être partagés obligatoirement avec tous les salariés.', detail:'Participation, intéressement obligatoire.', w:{eco:-0.8} },
  { d:'💰 Économie', t:'L\'innovation technologique doit être laissée aux forces du marché plutôt que pilotée par l\'État.', detail:'Recherche publique vs investissement privé.', w:{eco:0.8, tech:0.3} },
  { d:'🌈 Société', t:'Le mariage et l\'adoption doivent être ouverts à toutes les configurations familiales.', detail:'Homoparentalité, familles recomposées.', w:{soc:-1} },
  { d:'🌈 Société', t:'La tradition et les valeurs familiales classiques sont des piliers essentiels de la cohésion sociale.', detail:'Rôle du mariage, famille nucléaire.', w:{soc:1} },
  { d:'🌈 Société', t:'La légalisation du cannabis récréatif est une mesure raisonnable.', detail:'Dépénalisation, régulation, libertés individuelles.', w:{soc:-0.7, auth:-0.5} },
  { d:'🌈 Société', t:'Les quotas de genre dans les entreprises et institutions sont nécessaires pour l\'égalité.', detail:'Parité imposée vs promotion naturelle.', w:{soc:-1} },
  { d:'🌈 Société', t:'L\'identité nationale doit être valorisée à l\'école et dans les institutions.', detail:'Roman national, fierté d\'appartenance.', w:{soc:1, nat:0.5} },
  { d:'🌈 Société', t:'Les personnes trans doivent pouvoir changer d\'état civil librement sans condition médicale.', detail:'Droit à l\'auto-détermination du genre.', w:{soc:-1, auth:-0.3} },
  { d:'🌈 Société', t:'La pornographie devrait être davantage régulée ou restreinte.', detail:'Accès en ligne, impact social, protection des mineurs.', w:{soc:0.7, auth:0.3} },
  { d:'🌈 Société', t:'Le féminisme contemporain va trop loin dans ses revendications.', detail:'Écriture inclusive, cancel culture, études de genre.', w:{soc:1} },
  { d:'🌈 Société', t:'L\'euthanasie et le suicide assisté devraient être légaux en France.', detail:'Fin de vie, autonomie, dignité.', w:{soc:-0.8, auth:-0.5} },
  { d:'🌈 Société', t:'La société doit activement combattre les stéréotypes de genre dès l\'enfance.', detail:'Jouets neutres, éducation déconstruite.', w:{soc:-1} },
  { d:'🌈 Société', t:'La GPA (gestation pour autrui) devrait être légalisée en France.', detail:'Droit à l\'enfant, exploitation ou solidarité.', w:{soc:-0.5} },
  { d:'🌈 Société', t:'Le "wokisme" est une menace pour la liberté d\'expression et la cohésion nationale.', detail:'Politiquement correct, sensibilité culturelle.', w:{soc:1, nat:0.3} },
  { d:'🌈 Société', t:'La prostitution devrait être entièrement dépénalisée et régulée comme un travail.', detail:'Travail du sexe, abolitionnisme vs régulation.', w:{soc:-0.6, auth:-0.4} },
  { d:'🌈 Société', t:'La diversité culturelle enrichit la société française.', detail:'Multiculturalisme, intégration vs assimilation.', w:{soc:-0.8, nat:-0.7} },
  { d:'🌈 Société', t:'Les arts et la culture méritent un financement public important.', detail:'Subventions culturelles, exception culturelle.', w:{soc:-0.5, eco:-0.3} },
  { d:'🌈 Société', t:'La liberté de conscience religieuse prime sur certains droits collectifs.', detail:'Dérogations religieuses, exemptions de conscience.', w:{soc:0.5, reli:0.8} },
  { d:'⚖️ Libertés', t:'La surveillance de masse est un outil légitime pour garantir la sécurité nationale.', detail:'CCTV, écoutes, fichage numérique.', w:{auth:1, sec:0.7} },
  { d:'⚖️ Libertés', t:'Les individus ont le droit de porter des armes pour se défendre.', detail:'Port d\'arme, légitime défense élargie.', w:{auth:-0.5, sec:-0.3} },
  { d:'⚖️ Libertés', t:'Le gouvernement devrait avoir le droit de censurer des contenus "dangereux" en ligne.', detail:'Modération légale, discours de haine, désinformation.', w:{auth:0.8} },
  { d:'⚖️ Libertés', t:'Les peines de prison sont trop légères pour les criminels violents.', detail:'Répression vs réhabilitation.', w:{auth:0.8, sec:0.6} },
  { d:'⚖️ Libertés', t:'L\'obéissance à l\'autorité est une valeur fondamentale à transmettre aux enfants.', detail:'Respect de l\'ordre, discipline.', w:{auth:1} },
  { d:'⚖️ Libertés', t:'Les citoyens devraient avoir le droit de désobéir à des lois injustes.', detail:'Désobéissance civile, résistance à l\'oppression.', w:{auth:-1} },
  { d:'⚖️ Libertés', t:'La rétention administrative des étrangers sans jugement est acceptable.', detail:'CRA, expulsions, droits des migrants.', w:{auth:0.8, nat:0.5} },
  { d:'⚖️ Libertés', t:'L\'anonymat sur internet devrait être interdit pour lutter contre les abus.', detail:'Identité réelle obligatoire en ligne.', w:{auth:0.7} },
  { d:'⚖️ Libertés', t:'Les personnes condamnées ayant purgé leur peine doivent retrouver tous leurs droits civiques.', detail:'Droit de vote des détenus libérés, réinsertion.', w:{auth:-0.6} },
  { d:'⚖️ Libertés', t:'L\'état d\'urgence ne devrait jamais durer plus de quelques semaines.', detail:'Pouvoirs exceptionnels vs libertés fondamentales.', w:{auth:-0.8} },
  { d:'🌍 Géopolitique', t:'La France devrait sortir de l\'OTAN pour affirmer son indépendance stratégique.', detail:'Souveraineté militaire, atlantisme.', w:{nat:0.7, eco:-0.3} },
  { d:'🌍 Géopolitique', t:'L\'Union européenne devrait devenir un véritable État fédéral.', detail:'Fédéralisme européen vs souveraineté nationale.', w:{nat:-1} },
  { d:'🌍 Géopolitique', t:'La France doit accueillir davantage de réfugiés climatiques et de guerre.', detail:'Droit d\'asile, politique migratoire.', w:{nat:-0.8, soc:-0.5} },
  { d:'🌍 Géopolitique', t:'La protection des frontières nationales est une priorité absolue.', detail:'Contrôle migratoire, Schengen, identité nationale.', w:{nat:1} },
  { d:'🌍 Géopolitique', t:'Les organismes internationaux (ONU, FMI, OMC) ont trop de pouvoir sur les États.', detail:'Souverainisme vs multilatéralisme.', w:{nat:0.8} },
  { d:'🌍 Géopolitique', t:'La mondialisation a globalement amélioré les conditions de vie dans le monde.', detail:'Commerce global, développement, inégalités.', w:{nat:-0.7, eco:0.5} },
  { d:'🌍 Géopolitique', t:'La France doit augmenter significativement son aide publique au développement.', detail:'Solidarité internationale, 0.7 % du PIB.', w:{nat:-0.6} },
  { d:'🌍 Géopolitique', t:'L\'immigration est principalement une menace pour la culture nationale.', detail:'Identité, intégration, choc des cultures.', w:{nat:1, soc:0.5} },
  { d:'🌿 Écologie', t:'La France devrait sortir du nucléaire civil le plus rapidement possible.', detail:'Transition énergétique, risque nucléaire vs bas carbone.', w:{env:0.5} },
  { d:'🌿 Écologie', t:'La croissance économique et la protection de l\'environnement sont incompatibles.', detail:'Décroissance vs croissance verte.', w:{env:1} },
  { d:'🌿 Écologie', t:'La viande devrait être taxée davantage pour réduire les émissions de CO2.', detail:'Taxe carbone alimentaire, transition végétale.', w:{env:0.8, auth:0.2} },
  { d:'🌿 Écologie', t:'L\'innovation technologique résoudra les problèmes environnementaux sans changement de mode de vie.', detail:'Techno-optimisme vs sobriété.', w:{env:-1, tech:0.8} },
  { d:'🌿 Écologie', t:'La biodiversité doit primer sur les intérêts économiques locaux (agriculture, industrie).', detail:'Zones protégées, espèces menacées vs emplois.', w:{env:0.9} },
  { d:'🌿 Écologie', t:'L\'aviation et le transport maritime devraient être fortement taxés pour leur empreinte carbone.', detail:'Taxe kérosène, bilan carbone des transports.', w:{env:0.7, auth:0.2} },
  { d:'🌿 Écologie', t:'L\'agriculture intensive est nécessaire pour nourrir la population mondiale.', detail:'Rendement vs agroécologie.', w:{env:-0.7} },
  { d:'🌿 Écologie', t:'Les mouvements de désobéissance écologique (Extinction Rebellion, etc.) sont légitimes.', detail:'Action directe, trouble à l\'ordre public vs urgence climatique.', w:{env:0.6, auth:-0.5} },
  { d:'✝️ Religion & Laïcité', t:'Le voile islamique devrait être interdit dans tous les espaces publics.', detail:'Laïcité, signes religieux ostentatoires.', w:{reli:-0.7, auth:0.4} },
  { d:'✝️ Religion & Laïcité', t:'Les valeurs chrétiennes sont au fondement de la civilisation française.', detail:'Héritage culturel, identité chrétienne.', w:{reli:1, nat:0.4} },
  { d:'✝️ Religion & Laïcité', t:'L\'enseignement religieux n\'a pas sa place à l\'école publique.', detail:'Séparation Église-État, laïcité scolaire.', w:{reli:-1} },
  { d:'✝️ Religion & Laïcité', t:'Les convictions religieuses peuvent légitimement guider des décisions politiques.', detail:'Politique et foi, valeurs religieuses dans le droit.', w:{reli:0.9} },
  { d:'✝️ Religion & Laïcité', t:'Le financement public des associations cultuelles doit être aboli.', detail:'Loi 1905, concordat alsacien-mosellan.', w:{reli:-0.8} },
  { d:'✝️ Religion & Laïcité', t:'La religion est globalement une force positive dans la société.', detail:'Cohésion sociale, sens, morale.', w:{reli:0.8} },
  { d:'🗳️ Démocratie', t:'Le référendum d\'initiative citoyenne (RIC) devrait être introduit en France.', detail:'Démocratie directe, mandat impératif.', w:{dem:-1} },
  { d:'🗳️ Démocratie', t:'Les experts et technocrates devraient avoir plus de pouvoir de décision que les élus.', detail:'Technocratie vs démocratie représentative.', w:{dem:1} },
  { d:'🗳️ Démocratie', t:'Le vote devrait être obligatoire.', detail:'Obligation civique, absentéisme.', w:{dem:-0.3, auth:0.4} },
  { d:'🗳️ Démocratie', t:'Le Sénat et le Conseil constitutionnel freinent inutilement les réformes démocratiques.', detail:'Contre-pouvoirs, chambres hautes.', w:{dem:-0.7, auth:-0.3} },
  { d:'🗳️ Démocratie', t:'Une assemblée citoyenne tirée au sort devrait participer à la rédaction des lois.', detail:'Tirage au sort, conventions citoyennes.', w:{dem:-1} },
  { d:'🗳️ Démocratie', t:'La Ve République a besoin d\'une profonde réforme institutionnelle.', detail:'Proportionnelle, 6e République, pouvoirs du Parlement.', w:{dem:-0.6} },
  { d:'🏛️ Territoires', t:'Les régions françaises devraient avoir beaucoup plus d\'autonomie législative.', detail:'Fédéralisme, décentralisation, pouvoirs locaux.', w:{geo:-1} },
  { d:'🏛️ Territoires', t:'Un État centralisé fort est la meilleure garantie de l\'égalité républicaine.', detail:'Uniformité vs territoires, services publics uniformes.', w:{geo:1} },
  { d:'🏛️ Territoires', t:'Certaines régions devraient pouvoir disposer d\'un statut particulier (Corse, Bretagne, etc.).', detail:'Autonomie régionale, identités locales.', w:{geo:-0.8, nat:-0.3} },
  { d:'🏛️ Territoires', t:'Paris concentre trop de pouvoir et de richesses au détriment des autres territoires.', detail:'Métropolisation, désert médical, ruralité.', w:{geo:-0.6, eco:-0.3} },
  { d:'🤖 Technologie & IA', t:'Le développement de l\'intelligence artificielle représente globalement un progrès pour l\'humanité.', detail:'Automatisation, IA générative, productivité.', w:{tech:1} },
  { d:'🤖 Technologie & IA', t:'Les grandes entreprises technologiques (GAFAM) doivent être démembrées ou nationalisées.', detail:'Monopoles numériques, régulation.', w:{tech:-0.5, eco:-0.5} },
  { d:'🤖 Technologie & IA', t:'La reconnaissance faciale dans les lieux publics devrait être totalement interdite.', detail:'Biométrie, vie privée, sécurité.', w:{tech:-0.4, auth:-0.8} },
  { d:'🤖 Technologie & IA', t:'Le transhumanisme — augmentation des capacités humaines par la technologie — est une voie souhaitable.', detail:'Implants, modifications génétiques, post-humain.', w:{tech:1, soc:-0.4} },
  { d:'🛡️ Sécurité', t:'La France devrait augmenter significativement son budget militaire.', detail:'Défense nationale, réarmement.', w:{sec:1, eco:0.3} },
  { d:'🛡️ Sécurité', t:'La politique de prévention est plus efficace que la répression pour lutter contre la délinquance.', detail:'Éducation, action sociale vs police, prison.', w:{sec:-0.8, eco:-0.3} },
];

let currentQ = 0;
let answers = new Array(QUESTIONS.length).fill(null);

const ANSWER_OPTIONS = [
  { key:'sd', label:'Tout à fait d\'accord', val: 2 },
  { key:'d',  label:'Plutôt d\'accord',     val: 1 },
  { key:'n',  label:'Neutre / Sans avis',   val: 0 },
  { key:'c',  label:'Plutôt pas d\'accord', val:-1 },
  { key:'sc', label:'Pas du tout d\'accord',val:-2 },
];

const DOMAIN_COLORS = {
  '💰 Économie':        '#e05a5a',
  '🌈 Société':         '#a0d080',
  '⚖️ Libertés':        '#60c8a0',
  '🌍 Géopolitique':    '#6090e0',
  '🌿 Écologie':        '#60d090',
  '✝️ Religion & Laïcité': '#e0b060',
  '🗳️ Démocratie':      '#80c0e0',
  '🏛️ Territoires':     '#90e0b0',
  '🤖 Technologie & IA':'#c060e0',
  '🛡️ Sécurité':        '#d06060',
};

function showScreen(id) {
  document.querySelectorAll('.ps-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function buildIntro() {
  const wrap = document.getElementById('axes-preview');
  const labels = ['Économie','Société','Libertés','Géopolitique','Écologie','Religion','Démocratie','Territoires','Technologie','Sécurité'];
  const colors = ['#e05a5a','#a0d080','#60c8a0','#6090e0','#60d090','#e0b060','#80c0e0','#90e0b0','#c060e0','#d06060'];
  labels.forEach((l, i) => {
    const tag = document.createElement('div');
    tag.className = 'axe-tag';
    tag.textContent = l;
    tag.style.color = colors[i];
    tag.style.borderColor = colors[i] + '55';
    wrap.appendChild(tag);
  });
}

function startQuiz() {
  showScreen('screen-quiz');
  renderQ();
}

function renderQ() {
  const q = QUESTIONS[currentQ];
  const color = DOMAIN_COLORS[q.d] || '#888';
  const chip = document.getElementById('q-domaine');
  chip.textContent = q.d;
  chip.style.color = color;
  chip.style.borderColor = color + '55';
  document.getElementById('q-text').textContent = q.t;
  document.getElementById('q-detail').textContent = q.detail || '';

  const pct = (currentQ / QUESTIONS.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${currentQ + 1} / ${QUESTIONS.length}`;
  document.getElementById('btn-prev').disabled = currentQ === 0;

  const container = document.getElementById('q-answers');
  container.innerHTML = '';
  ANSWER_OPTIONS.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = `answer-btn ${opt.key}`;
    if (answers[currentQ] === opt.key) btn.classList.add('selected');
    btn.innerHTML = `<span class="answer-letter">${opt.key.toUpperCase()}</span>${opt.label}`;
    btn.onclick = () => selectAnswer(opt.key);
    container.appendChild(btn);
  });

  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = currentQ === QUESTIONS.length - 1 ? 'Voir mes résultats →' : 'Suivant →';
}

function selectAnswer(key) {
  answers[currentQ] = key;
  document.querySelectorAll('.answer-btn').forEach(b => {
    b.classList.toggle('selected', b.classList.contains(key));
  });
}

function nextQ() {
  if (currentQ === QUESTIONS.length - 1) showResults();
  else { currentQ++; renderQ(); }
}
function prevQ() { if (currentQ > 0) { currentQ--; renderQ(); } }
function skipQ() { answers[currentQ] = 'n'; nextQ(); }

function computeScores() {
  AXES.forEach(a => { scores[a.id] = 0; maxScores[a.id] = 0; });
  QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (!ans) return;
    const val = ANSWER_OPTIONS.find(o => o.key === ans).val;
    Object.entries(q.w).forEach(([axe, weight]) => {
      scores[axe] += val * weight;
      maxScores[axe] += 2 * Math.abs(weight);
    });
  });
  const norm = {};
  AXES.forEach(a => {
    norm[a.id] = (scores[a.id] / (maxScores[a.id] || 1)) * 100;
  });
  return norm;
}

const PARTIS = [
  { name:'La France Insoumise',     color:'#e03030', scores:{eco:-90,soc:-80,auth:20,nat:40,env:50,reli:-60,dem:-80,geo:-30,tech:0,sec:-60} },
  { name:'Parti Socialiste',         color:'#e07070', scores:{eco:-60,soc:-70,auth:-20,nat:-30,env:40,reli:-50,dem:-40,geo:-30,tech:10,sec:-20} },
  { name:'Europe Écologie - Les Verts', color:'#60c060', scores:{eco:-50,soc:-90,auth:-70,nat:-80,env:95,reli:-60,dem:-80,geo:-60,tech:-20,sec:-70} },
  { name:'Parti Communiste',         color:'#c01010', scores:{eco:-95,soc:-50,auth:40,nat:20,env:30,reli:-70,dem:-50,geo:-40,tech:-20,sec:-40} },
  { name:'Renaissance (Macron)',     color:'#ff9900', scores:{eco:50,soc:-40,auth:20,nat:-50,env:30,reli:-30,dem:20,geo:20,tech:60,sec:30} },
  { name:'Les Républicains',         color:'#2060c0', scores:{eco:50,soc:50,auth:50,nat:30,env:-20,reli:50,dem:20,geo:20,tech:20,sec:60} },
  { name:'Rassemblement National',   color:'#1a3a7c', scores:{eco:-20,soc:70,auth:70,nat:95,env:-30,reli:60,dem:-40,geo:40,tech:-10,sec:80} },
  { name:'Reconquête',               color:'#0a1a5c', scores:{eco:30,soc:90,auth:80,nat:100,env:-50,reli:80,dem:-20,geo:50,tech:10,sec:90} },
  { name:'Debout la France',         color:'#003080', scores:{eco:-30,soc:40,auth:50,nat:90,env:0,reli:40,dem:-40,geo:30,tech:0,sec:70} },
  { name:'Nouveau Centre / UDI',     color:'#70a0e0', scores:{eco:30,soc:-20,auth:10,nat:-20,env:20,reli:20,dem:10,geo:10,tech:30,sec:20} },
  { name:'NPA / Révolutionnaires',   color:'#ff4040', scores:{eco:-100,soc:-100,auth:-80,nat:-70,env:60,reli:-80,dem:-100,geo:-70,tech:-20,sec:-90} },
  { name:'Parti Animaliste',         color:'#80e080', scores:{eco:-40,soc:-80,auth:-40,nat:-40,env:80,reli:-50,dem:-50,geo:-30,tech:0,sec:-60} },
];

const PENSEURS = [
  { name:'Karl Marx',          emoji:'📖', desc:'Marxisme, lutte des classes',               match:{eco:-90,soc:-70,auth:30} },
  { name:'Simone de Beauvoir', emoji:'✊', desc:'Féminisme, existentialisme',               match:{soc:-90,auth:-60,eco:-40} },
  { name:'Noam Chomsky',       emoji:'🎙️', desc:'Libertaire de gauche, antiimpérialisme',   match:{eco:-80,auth:-80,nat:-80} },
  { name:'John Maynard Keynes',emoji:'📈', desc:'Relance, État régulateur',                 match:{eco:-60,auth:10} },
  { name:'Friedrich Hayek',    emoji:'🏦', desc:'Libéralisme classique, anti-étatisme',      match:{eco:90,auth:-70} },
  { name:'Ayn Rand',           emoji:'🗽', desc:'Objectivisme, capitalisme radical',          match:{eco:100,auth:-80,soc:30} },
  { name:'Edmund Burke',       emoji:'🏰', desc:'Conservatisme traditionnel',                match:{soc:80,reli:70,auth:40} },
  { name:'Pierre Bourdieu',    emoji:'🔬', desc:'Sociologie critique, reproduction sociale', match:{eco:-70,soc:-80,dem:-60} },
  { name:'Murray Bookchin',    emoji:'🌿', desc:'Écologie sociale, anarchisme',              match:{eco:-80,auth:-90,env:80} },
  { name:'Hannah Arendt',      emoji:'💭', desc:'Totalitarisme, espace public',             match:{auth:-60,dem:-70} },
  { name:'Jean-Paul Sartre',   emoji:'☕', desc:'Existentialisme, engagement',               match:{eco:-60,soc:-80,auth:-50} },
  { name:'Greta Thunberg',     emoji:'🌍', desc:'Activisme climatique',                     match:{env:95,auth:-40,eco:-40} },
  { name:'Jacques Delors',     emoji:'🇪🇺', desc:'Social-démocratie, Europe',               match:{nat:-70,eco:-40,dem:20} },
  { name:'Jean Jaurès',        emoji:'🌹', desc:'Socialisme humaniste, paix',                match:{eco:-80,soc:-60,nat:-30,auth:-20} },
  { name:'Marine Le Pen',      emoji:'🔵', desc:'Souverainisme, populisme de droite',        match:{nat:90,soc:70,auth:70} },
];

function buildProfile(n) {
  const ecoL=n.eco<-15, ecoR=n.eco>15;
  const socL=n.soc<-15, socR=n.soc>15;
  const authH=n.auth>15, libH=n.auth<-15;
  const natH=n.nat>15, intH=n.nat<-15;
  const envH=n.env>20;

  if (ecoL&&socL&&libH&&intH) return { label:'🔴 Libertaire socialiste', title:'Libertaire de gauche', desc:'Tu combines une vision économique collectiviste avec un profond attachement aux libertés individuelles et à la coopération internationale. Proches de toi : Jean Jaurès, Simone Weil, Noam Chomsky.', color:'#e05a5a' };
  if (ecoL&&socL&&authH) return { label:'🔴 Socialiste autoritaire', title:'Gauche étatiste', desc:'Tu défends une société solidaire fortement organisée par l\'État, avec un rôle central du pouvoir public dans l\'économie et les mœurs. Proches : Marx, Lénine, Jean-Luc Mélenchon.', color:'#c03030' };
  if (ecoL&&socL&&natH) return { label:'🔴🟤 Gauche nationaliste', title:'Gauche souverainiste', desc:'Tu allies une économie protégée et solidaire à un fort attachement à la nation et aux frontières. Un positionnement rare mais cohérent.', color:'#c06030' };
  if (ecoR&&socR&&authH&&natH) return { label:'🔵 Droite nationaliste autoritaire', title:'Conservateur nationaliste', desc:'Tu défends le marché libre, les valeurs traditionnelles, une identité nationale forte et un État capable de les imposer. Proche du souverainisme de droite.', color:'#3050c0' };
  if (ecoR&&socR&&libH) return { label:'🔵 Libéral-conservateur libertaire', title:'Libéral classique', desc:'Marché libre, valeurs traditionnelles mais respect des libertés individuelles. Un libéralisme à l\'anglaise.', color:'#5080d0' };
  if (ecoR&&socL&&libH) return { label:'🟣 Libéral progressiste', title:'Libéral progressiste', desc:'Tu crois au marché libre et aux libertés individuelles, y compris sociétales. Proches : Emmanuel Macron, Justin Trudeau, courant centriste européen.', color:'#9060d0' };
  if (ecoL&&envH) return { label:'🟢 Écosocialiste', title:'Gauche écologiste', desc:'L\'urgence écologique et la justice sociale sont pour toi les deux faces d\'un même combat. Proches : Yannick Jadot, Sandrine Rousseau, courant vert européen.', color:'#50b060' };
  if (ecoR&&envH) return { label:'🟢 Écolo-libéral', title:'Capitalisme vert', desc:'Tu crois que le marché et l\'innovation peuvent résoudre la crise écologique. Un positionnement de droite verte.', color:'#70d080' };
  if (Math.abs(n.eco)<20&&Math.abs(n.soc)<20&&Math.abs(n.auth)<20) return { label:'⚪ Centriste pragmatique', title:'Au centre du spectre', desc:'Tu refuses les extrêmes et cherches des solutions pragmatiques cas par cas. Un positionnement majoritaire mais souvent insatisfaisant pour les militants.', color:'#aaaaaa' };
  if (natH&&socR) return { label:'🟤 Nationaliste conservateur', title:'Droite identitaire', desc:'La nation, la tradition et la protection des frontières sont tes priorités. Proche du courant patriote-conservateur.', color:'#c07030' };
  const dominant = Object.entries(n).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]))[0];
  const ax = AXES.find(a=>a.id===dominant[0]);
  const side = dominant[1]>0 ? ax.right : ax.left;
  return { label:`📍 ${side}`, title:`Profil — ${side}`, desc:`Ton axe dominant est ${ax.icon} ${ax.left} / ${ax.right}. Ton positionnement résiste à une catégorie simple — c\'est souvent signe d\'une pensée nuancée.`, color:'#c8b4ff' };
}

function drawCompass(n) {
  const svg = document.getElementById('compass-svg');
  const cx=150, cy=150, r=110;
  svg.innerHTML = `
    <defs>
      <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1a1a26"/>
        <stop offset="100%" stop-color="#0a0a0f"/>
      </radialGradient>
      <clipPath id="circle-clip2">
        <circle cx="${cx}" cy="${cy}" r="${r}"/>
      </clipPath>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#bg-grad)" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
    <line x1="${cx}" y1="${cy-r}" x2="${cx}" y2="${cy+r}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
    <line x1="${cx-r}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="${r*.5}" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="1" stroke-dasharray="4,4"/>
  `;
  [
    {x:cx-r,y:cy-r,c:'#e05060'},{x:cx,y:cy-r,c:'#3050c0'},
    {x:cx-r,y:cy,c:'#e05a5a'},{x:cx,y:cy,c:'#5ab4e0'},
  ].forEach(q=>{
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',q.x);rect.setAttribute('y',q.y);
    rect.setAttribute('width',r);rect.setAttribute('height',r);
    rect.setAttribute('fill',q.c);rect.setAttribute('fill-opacity','0.07');
    rect.setAttribute('clip-path','url(#circle-clip2)');
    svg.appendChild(rect);
  });
  const x=cx+(n.eco/100)*r, y=cy-(n.auth/100)*r;
  const halo=document.createElementNS('http://www.w3.org/2000/svg','circle');
  halo.setAttribute('cx',x);halo.setAttribute('cy',y);halo.setAttribute('r',18);
  halo.setAttribute('fill','#c8b4ff');halo.setAttribute('fill-opacity','0.15');
  svg.appendChild(halo);
  const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r',8);
  dot.setAttribute('fill','#c8b4ff');dot.setAttribute('stroke','#fff');dot.setAttribute('stroke-width','2');
  svg.appendChild(dot);
}

function buildAxesBars(n) {
  const container=document.getElementById('axes-grid');
  container.innerHTML='';
  AXES.forEach(ax=>{
    const val=n[ax.id];
    const pct=(val+100)/2;
    const color=val<0?ax.colorL:ax.colorR;
    const intensity=Math.abs(val);
    const label=intensity<15?'Neutre / Équilibré':val<0?ax.left:ax.right;
    const row=document.createElement('div');
    row.className='axe-row';
    row.innerHTML=`
      <div class="axe-header">
        <span>${ax.icon} ${ax.left}</span>
        <span style="color:${color};font-size:.82rem">${label} (${Math.round(Math.abs(val))} %)</span>
        <span>${ax.right}</span>
      </div>
      <div class="axe-bar-wrap">
        <div class="axe-bar-fill" style="left:50%;width:0%;background:${color}" id="bar-${ax.id}"></div>
        <div class="axe-cursor" style="left:50%;background:${color}" id="cur-${ax.id}"></div>
      </div>
      <div class="axe-labels"><span style="color:${ax.colorL}">◀ ${ax.left}</span><span style="color:${ax.colorR}">${ax.right} ▶</span></div>
    `;
    container.appendChild(row);
    setTimeout(()=>{
      const half=(Math.abs(val)/100)*50;
      const barEl=document.getElementById(`bar-${ax.id}`);
      const curEl=document.getElementById(`cur-${ax.id}`);
      if(val>=0){barEl.style.left='50%';barEl.style.width=half+'%';}
      else{barEl.style.left=(50-half)+'%';barEl.style.width=half+'%';}
      curEl.style.left=pct+'%';
    },120);
  });
}

function buildPartis(n) {
  const container=document.getElementById('partis-grid');
  container.innerHTML='';
  const scored=PARTIS.map(p=>{
    let dist=0;
    AXES.forEach(a=>{const diff=(n[a.id]||0)-(p.scores[a.id]||0);dist+=diff*diff;});
    return {...p,compat:Math.max(0,Math.round(100-Math.sqrt(dist/AXES.length)))};
  }).sort((a,b)=>b.compat-a.compat);
  scored.forEach(p=>{
    const card=document.createElement('div');
    card.className='parti-card';
    card.innerHTML=`
      <div class="parti-name"><div class="parti-dot" style="background:${p.color}"></div>${p.name}</div>
      <div class="compat-bar-wrap"><div class="compat-bar" style="width:${p.compat}%;background:${p.color}"></div></div>
      <div class="compat-pct">${p.compat} % de compatibilité</div>
    `;
    container.appendChild(card);
  });
}

function buildPenseurs(n) {
  const container=document.getElementById('penseurs-grid');
  container.innerHTML='';
  const scored=PENSEURS.map(p=>{
    let dist=0,count=0;
    Object.entries(p.match).forEach(([axe,val])=>{const diff=(n[axe]||0)-val;dist+=diff*diff;count++;});
    return {...p,compat:count>0?Math.max(0,Math.round(100-Math.sqrt(dist/count))):0};
  }).sort((a,b)=>b.compat-a.compat).slice(0,6);
  scored.forEach(p=>{
    const card=document.createElement('div');
    card.className='penseur-card';
    card.innerHTML=`
      <div class="penseur-emoji">${p.emoji}</div>
      <div class="penseur-name">${p.name}</div>
      <div class="penseur-desc">${p.desc}</div>
      <div class="compat-pct" style="margin-top:8px;font-size:.7rem;color:var(--muted)">${p.compat} % d'affinité</div>
    `;
    container.appendChild(card);
  });
}

function showResults() {
  showScreen('screen-result');
  const n=computeScores();
  const profile=buildProfile(n);
  const label=document.getElementById('r-label');
  label.textContent=profile.label;
  label.style.background=profile.color+'22';
  label.style.borderColor=profile.color+'66';
  label.style.color=profile.color;
  document.getElementById('r-title').textContent=profile.title;
  document.getElementById('r-desc').textContent=profile.desc;
  drawCompass(n);
  buildAxesBars(n);
  buildPartis(n);
  buildPenseurs(n);
  window.scrollTo(0,0);
}

function restart() {
  answers.fill(null);
  currentQ=0;
  showScreen('screen-intro');
  window.scrollTo(0,0);
}

// Init
buildIntro();
