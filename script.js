/* ============================================================
   RENDER LOGIC — you shouldn't need to edit this file.
   Edit config.js (names/avatars/links) or data.js (zones/roles/partners) instead.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.title = SITE_CONFIG.siteName;
  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = SITE_CONFIG.siteName);
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = SITE_CONFIG.tagline);

  renderHexField();
  renderCtas();
  renderHomeStats();
  renderSectionCards();
  renderZones();
  renderPeople("staffGrid", STAFF);
  renderPeople("devGrid", DEVELOPERS);
  renderPartners();
  setupNav();
  setupScrollReveal();
  setupHoverPopup();
});

/* ---------------- hover popup (leaderboard / secret area images) ---------------- */
function setupHoverPopup(){
  const popup = document.createElement("div");
  popup.className = "hover-popup";
  popup.innerHTML = `<img alt="">`;
  document.body.appendChild(popup);
  const img = popup.querySelector("img");
  let current = null;

  const show = (el) => {
    const src = el.dataset.popup;
    if (!src) return;
    img.src = src;
    const rect = el.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - 12}px`;
    popup.classList.add("visible");
    current = el;
  };
  const hide = () => {
    popup.classList.remove("visible");
    current = null;
  };

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".has-popup");
    if (target) show(target);
  });
  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(".has-popup");
    if (target) hide();
  });
  // touch devices: tap to toggle, since there's no hover
  document.addEventListener("touchstart", (e) => {
    const target = e.target.closest(".has-popup");
    if (target) {
      current === target ? hide() : show(target);
    } else if (current) {
      hide();
    }
  }, { passive: true });
  // keep it glued to the element on scroll, in case the page moves mid-hover
  window.addEventListener("scroll", () => {
    if (popup.classList.contains("visible")){
      const hovered = document.querySelector(".has-popup:hover") || current;
      if (hovered) show(hovered); else hide();
    }
  }, { passive: true });
}

/* ---------------- floating hive background ---------------- */
function renderHexField(){
  const field = document.getElementById("hexField");
  const points = "50,3 93,26 93,74 50,97 7,74 7,26";
  const count = window.innerWidth < 760 ? 10 : 18;
  let html = "";
  for (let i = 0; i < count; i++){
    const size = 40 + Math.random() * 90;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const dur = 10 + Math.random() * 10;
    const delay = Math.random() * -20;
    const opacity = 0.05 + Math.random() * 0.10;
    html += `<svg style="top:${top}%; left:${left}%; --dur:${dur}s; --delay:${delay}s; --o:${opacity}"
              width="${size}" height="${size}" viewBox="0 0 100 100">
              <polygon points="${points}" fill="none" stroke="#A855F7" stroke-width="2.5"/>
            </svg>`;
  }
  field.innerHTML = html;
}

/* ---------------- icons ---------------- */
function discordIcon(){
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.07.07 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.07.07 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.891.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z"/></svg>`;
}
function robloxIcon(){
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4V4Zm9 9h7v7h-7v-7ZM4 13h7v7H4v-7ZM13 4h7v7h-7V4Z"/></svg>`;
}
function starIcon(){
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 21 12 17.77 5.8 21 7 14.14l-5-4.87 7.1-1.01L12 2z"/></svg>`;
}
function externalIcon(){
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M7 17L17 7M9 7h8v8"/></svg>`;
}
function partnerIcon(icon){
  if (icon === "rocket") {
    return `<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 2c2.5 2 4 5.5 4 9 0 1.5-.3 2.8-.8 4l2.6 2.6-1.4 1.4-2.6-2.6c-1.2.5-2.5.8-4 .8v-3c1.7 0 3-.3 4-1-1-3-2-6-2-11zM6 13.6C6 17 8 20 8 20l1.6-1.6C8.7 17.4 8 15.6 8 13.6c0-1 .2-2 .6-3L6 13.6z"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20 7h-2.2c.1-.3.2-.7.2-1a2.5 2.5 0 0 0-4.5-1.5L12 6.1l-1.5-1.6A2.5 2.5 0 0 0 6 6a2.5 2.5 0 0 0 .2 1H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM4 13v6a2 2 0 0 0 2 2h4v-8H4zm10 8h4a2 2 0 0 0 2-2v-6h-6v8z"/></svg>`;
}

/* ---------------- home CTAs ---------------- */
function renderCtas(){
  const el = document.getElementById("ctaRow");
  el.innerHTML = `
    <a class="cta primary" href="${LINKS.discord}" target="_blank" rel="noopener">
      ${discordIcon()}
      Join our Discord
    </a>
    <a class="cta secondary" href="${LINKS.roblox}" target="_blank" rel="noopener">
      ${robloxIcon()}
      Join the Roblox Group
    </a>
  `;
}

function renderHomeStats(){
  const totalHives = ZONES.reduce((sum, z) => sum + z.hives.length, 0);
  const rebirths = ZONES.filter(z => z.tags.some(t => t.type === "rebirth")).length;
  const stats = [
    { value: ZONES.length, label: "Zones" },
    { value: totalHives, label: "Hives" },
    { value: rebirths, label: "Rebirths" },
  ];
  document.getElementById("homeStats").innerHTML = stats.map(s => `
    <div><strong>${s.value}</strong><span>${s.label}</span></div>
  `).join("");
}

function renderSectionCards(){
  const cards = [
    { view: "viewZones", eyebrow: "Progression", title: "Zones & Hives", desc: "All 12 zones, every hive cost, both rebirths and the secret area." },
    { view: "viewStaff", eyebrow: "Credits", title: "Staff & Credits", desc: "Meet the management team behind 17Games." },
    { view: "viewDevs", eyebrow: "Credits", title: "Developers", desc: "The people who build and maintain the game." },
    { view: "viewPartners", eyebrow: "Community", title: "Partners", desc: "Trusted communities offering trading boosts, giveaways, and more." },
  ];
  const el = document.getElementById("sectionCards");
  el.innerHTML = cards.map(c => `
    <div class="section-card" data-view="${c.view}">
      <span class="tag-eyebrow">${c.eyebrow}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="arrow">View &rarr;</div>
    </div>
  `).join("");
  el.querySelectorAll(".section-card").forEach(card => {
    card.addEventListener("click", () => switchView(card.dataset.view));
  });
}

function initials(name){
  return name.replace(/[^a-zA-Z0-9]/g, " ").trim().split(/\s+/).slice(0,2).map(w => w[0]).join("").toUpperCase();
}

function renderZones(){
  const wrap = document.getElementById("zonePath");
  wrap.innerHTML = ZONES.map((z, i) => {
    const side = i % 2 === 0 ? "side-left" : "side-right";

    const tags = z.tags.map(t => t.popup
      ? `<span class="tag ${t.type} has-popup" data-popup="${t.popup}">${t.label}</span>`
      : `<span class="tag ${t.type}">${t.label}</span>`
    ).join("");

    const features = z.features.map(f => {
      if (typeof f === "string") return `<span class="feature-pill">${f}</span>`;
      if (f.popup) return `<span class="feature-pill has-popup" data-popup="${f.popup}">${f.label}</span>`;
      return `<span class="feature-pill">${f.label}</span>`;
    }).join("");

    const hives = z.hives.map(h => `
      <li><span class="hive-name">${h.name}</span><span class="hive-cost">${h.cost}</span></li>
    `).join("");

    const shot = z.image
      ? `<img src="${z.image}" alt="${z.name} screenshot" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('.zone-shot').innerHTML='<span>Screenshot unavailable</span>'">`
      : `<span>Screenshot coming soon</span>`;

    return `
      <div class="zone-node ${side}" style="--zone-accent:${z.accent}; --zone-glow:${z.accent}66">
        <div class="zone-marker" style="background:${z.accent}">${z.n}</div>
        <div class="zone-card">
          <h3>${z.name}</h3>
          <p class="zone-blurb">${z.blurb}</p>
          ${tags ? `<div class="tag-row">${tags}</div>` : ""}
          ${features ? `<div class="feature-list">${features}</div>` : ""}
          ${hives ? `<ul class="hive-list">${hives}</ul>` : ""}
          <div class="zone-shot">${shot}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderPeople(containerId, list){
  const el = document.getElementById(containerId);
  const tierColor = rank => {
    switch(rank){
      case 1: return "#FFD700";
      case 2: return "#A855F7";
      case 3: return "#D8B4FE";
      default: return "#5B21B6";
    }
  };
  el.innerHTML = list.map(p => {
    const link = AVATARS[p.user];
    const displayName = p.displayName || p.user;
    const color = tierColor(p.rank || 4);
    const avatarInner = link
      ? `<img src="${link}" alt="${displayName}" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'initials',textContent:'${initials(displayName)}'}))">`
      : `<span class="initials">${initials(displayName)}</span>`;
    return `
      <div class="person-card" style="--card-tier:${color}">
        <div class="avatar-circle">${avatarInner}</div>
        <h4>${displayName}</h4>
        <div class="role">${p.role}</div>
        ${p.sub ? `<div class="sub">${p.sub}</div>` : ""}
      </div>
    `;
  }).join("");
}

function renderPartners(){
  const el = document.getElementById("partnersGrid");
  if (!el) return;
  el.innerHTML = PARTNERS.map(p => {
    const logo = p.logo
      ? `<img src="${p.logo}" alt="${p.name}" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'partner-initials',textContent:'${initials(p.name)}'}))">`
      : `<span class="partner-initials">${initials(p.name)}</span>`;
    const tags = p.tags.map(t => `<span class="feature-pill partner-pill">${partnerIcon(t.icon)}${t.label}</span>`).join("");
    return `
      <div class="partner-card">
        <div class="partner-badge">${starIcon()}${p.badge}</div>
        <div class="partner-top">
          <div class="partner-logo">${logo}</div>
          <div>
            <h4>${p.name}</h4>
            <a class="partner-visit" href="${p.url}" target="_blank" rel="noopener">Visit ${externalIcon()}</a>
          </div>
        </div>
        <p class="partner-desc">${p.desc}</p>
        <div class="tag-row partner-tags">${tags}</div>
      </div>
    `;
  }).join("");
}

function switchView(viewId){
  document.querySelectorAll(".nav-links button").forEach(b => {
    b.classList.toggle("active", b.dataset.view === viewId);
  });
  document.querySelectorAll(".view").forEach(v => {
    v.classList.toggle("active", v.id === viewId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  reScan();
}

function setupNav(){
  document.querySelectorAll(".nav-links button").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });
}

let revealObserver;
function setupScrollReveal(){
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reScan();
}

function reScan(){
  document.querySelectorAll(".zone-node:not(.visible), .person-card:not(.visible), .partner-card:not(.visible)")
    .forEach(el => revealObserver.observe(el));
}
