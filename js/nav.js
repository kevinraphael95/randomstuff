/* ══════════════════════════════════════════
   POLITILAB — Navigation JS
   ══════════════════════════════════════════ */

(function() {
  'use strict';

  const NAV_ITEMS = [
    { href: 'politiscale.html',  icon: '🧭', label: 'PolitiScale' },
    { href: 'politimetre.html',  icon: '🗳️', label: 'Politimètre' },
    { href: 'journey.html',      icon: '📍', label: 'My Journey' },
  ];

  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    return file;
  }

  function buildNav() {
    const current = getCurrentPage();

    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navigation principale');

    // Logo
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    logo.innerHTML = `
      <div class="nav-logo-mark">🗺️</div>
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

    // Badge
    const right = document.createElement('div');
    right.className = 'nav-right';
    right.innerHTML = `<span class="nav-badge">v1.0 · FR</span>`;
    nav.appendChild(right);

    // Hamburger button
    const burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(burger);

    // Mobile drawer
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.setAttribute('id', 'nav-drawer');
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

    // Toggle burger
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Insert into DOM
    document.body.prepend(drawer);
    document.body.prepend(nav);
  }

  // Run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
