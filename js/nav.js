/* ══════════════════════════════════════════
   PolitiLab — Navigation + Theme
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  const NAV_ITEMS = [
    { href: 'politiscale.html',    icon: '🧭', label: 'PolitiScale' },
    { href: 'politimetre.html',    icon: '🗳️', label: 'Politimètre' },
    { href: 'journey.html',        icon: '📍',  label: 'My Journey' },
    { href: 'europe.html',         icon: '🗺️', label: 'Partis Européens' },
  ];

  /* ── Theme ── */
  const THEME_KEY = 'politilab-theme';

  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    // Update all toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply theme ASAP to avoid flash
  applyTheme(getTheme());

  /* ── Build Nav ── */
  function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function buildNav() {
    const current = getCurrentPage();

    /* NAV */
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navigation principale');

    // Logo
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    logo.innerHTML = `
      <div class="nav-logo-mark">🏠</div>
      <span class="nav-logo-text">Politi<span>Lab</span></span>
    `;
    nav.appendChild(logo);

    // Links
    const ul = document.createElement('ul');
    ul.className = 'nav-links';
    NAV_ITEMS.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
      if (item.href === current) a.classList.add('active');
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    // Right: badge + theme toggle
    const right = document.createElement('div');
    right.className = 'nav-right';
    right.innerHTML = `<span class="nav-badge mono">v1.0</span>`;
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.addEventListener('click', toggleTheme);
    right.appendChild(toggleBtn);
    nav.appendChild(right);

    // Burger
    const burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(burger);

    /* DRAWER */
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.id = 'nav-drawer';

    const drawerUl = document.createElement('ul');
    NAV_ITEMS.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
      if (item.href === current) a.classList.add('active');
      li.appendChild(a);
      drawerUl.appendChild(li);
    });
    drawer.appendChild(drawerUl);

    // Drawer footer with theme toggle
    const drawerFooter = document.createElement('div');
    drawerFooter.className = 'nav-drawer-footer';
    drawerFooter.innerHTML = `<span style="font-size:.8rem;color:var(--muted)">Apparence</span>`;
    const drawerToggle = document.createElement('button');
    drawerToggle.className = 'theme-toggle';
    drawerToggle.addEventListener('click', () => { toggleTheme(); closeDrawer(); });
    drawerFooter.appendChild(drawerToggle);
    drawer.appendChild(drawerFooter);

    /* Toggle drawer */
    function openDrawer() {
      drawer.classList.add('open');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
    });

    // Keyboard: Escape closes drawer
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    /* Insert into DOM */
    document.body.prepend(drawer);
    document.body.prepend(nav);

    // Refresh toggle icons after DOM insert
    applyTheme(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
