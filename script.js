/* ============================================================
   RENDER LOGIC — you shouldn't need to edit this file.
   Edit config.js (names/avatars/links) or data.js (zones/roles) instead.
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

  const show = (el) => {
    const src = el.dataset.popup;
    if (!src) return;
    img.src = src;
    const rect = el.getBoundingClientRect();
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - 12}px`;
    popup.classList.add("visible");
  };
  const hide = () => popup.classList.remove("visible");

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".has-popup");
    if (target) show(target);
  });
  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(".has-popup");
    if (target) hide();
  });
  // keep it glued to the element on scroll, in case the page moves mid-hover
  window.addEventListener("scroll", () => {
    if (popup.classList.contains("visible")){
      const hovered = document.querySelector(".has-popup:hover");
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

/* ---------------- home CTAs ---------------- */
function renderCtas(){
  const el = document.getElementById("ctaRow");
  el.innerHTML = `
    <a class="cta primary" href="${LINKS.discord}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.6 13.6c-.2.3-.5.6-.9.6-1 0-2.2-.7-3.1-1.2-1.1.5-2.2.9-3.4.9-.4 0-.7-.1-.9-.4-.2-.3-.1-.7.2-.9.6-.5 1.1-1.1 1.4-1.8-1-.4-1.9-1-2.6-1.9-.2-.3-.1-.7.2-.9.3-.2.7-.1.9.2.9 1.1 2.2 1.8 3.7 1.8s2.8-.7 3.7-1.8c.2-.3.6-.4.9-.2.3.2.4.6.2.9-.7.9-1.6 1.5-2.6 1.9.3.7.8 1.3 1.4 1.8.3.2.4.6.2.9Z"/></svg>
      Join our Discord
    </a>
    <a class="cta secondary" href="${LINKS.roblox}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4V4Zm9 9h7v7h-7v-7ZM4 13h7v7H4v-7ZM13 4h7v7h-7V4Z"/></svg>
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
      ? `<img src="${z.image}" alt="${z.name} screenshot" loading="lazy" onerror="this.closest('.zone-shot').innerHTML='<span>Screenshot unavailable</span>'">`
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
      ? `<img src="${link}" alt="${displayName}">`
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
  document.querySelectorAll(".zone-node:not(.visible), .person-card:not(.visible)")
    .forEach(el => revealObserver.observe(el));
}
