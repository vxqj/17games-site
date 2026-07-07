/* ============================================================
   RENDER LOGIC — you shouldn't need to edit this file.
   Edit config.js (names/avatars) or data.js (zones/roles) instead.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.title = SITE_CONFIG.siteName;
  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = SITE_CONFIG.siteName);
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = SITE_CONFIG.tagline);

  renderHeroStats();
  renderZones();
  renderPeople("staffGrid", STAFF);
  renderPeople("devGrid", DEVELOPERS);
  setupNav();
  setupScrollReveal();
});

function renderHeroStats(){
  const totalHives = ZONES.reduce((sum, z) => sum + z.hives.length, 0);
  const rebirths = ZONES.filter(z => z.tags.some(t => t.type === "rebirth")).length;
  const stats = [
    { value: ZONES.length, label: "Zones" },
    { value: totalHives, label: "Hives" },
    { value: rebirths, label: "Rebirths" },
  ];
  const el = document.getElementById("heroStats");
  el.innerHTML = stats.map(s => `
    <div><strong>${s.value}</strong><span>${s.label}</span></div>
  `).join("");
}

function initials(name){
  return name.replace(/[^a-zA-Z0-9]/g, " ").trim().split(/\s+/).slice(0,2).map(w => w[0]).join("").toUpperCase();
}

function renderZones(){
  const wrap = document.getElementById("zonePath");
  wrap.innerHTML = ZONES.map((z, i) => {
    const side = i % 2 === 0 ? "side-left" : "side-right";
    const tags = z.tags.map(t => `<span class="tag ${t.type}">${t.label}</span>`).join("");
    const features = z.features.map(f => `<span class="feature-pill">${f}</span>`).join("");
    const hives = z.hives.map(h => `
      <li><span class="hive-name">${h.name}</span><span class="hive-cost">${h.cost}</span></li>
    `).join("");

    return `
      <div class="zone-node ${side}" style="--zone-accent:${z.accent}; --zone-glow:${z.accent}66">
        <div class="zone-marker" style="background:${z.accent}">${z.n}</div>
        <div class="zone-card">
          <h3>${z.name}</h3>
          <p class="zone-blurb">${z.blurb}</p>
          ${tags ? `<div class="tag-row">${tags}</div>` : ""}
          ${features ? `<div class="feature-list">${features}</div>` : ""}
          ${hives ? `<ul class="hive-list">${hives}</ul>` : ""}
          <div class="zone-shot" data-zone="${z.key}">
            <span>Screenshot coming soon</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // try to load a screenshot per zone from /images/<key>.png — falls back silently
  wrap.querySelectorAll(".zone-shot").forEach(shot => {
    const key = shot.dataset.zone;
    const img = new Image();
    img.src = `images/${key}.png`;
    img.alt = `${key} screenshot`;
    img.onload = () => { shot.innerHTML = ""; shot.appendChild(img); };
    img.onerror = () => {}; // keep placeholder text
  });
}

function renderPeople(containerId, list){
  const el = document.getElementById(containerId);
  const tierColor = rank => {
    switch(rank){
      case 1: return "#FFD700";  // owner
      case 2: return "#FF9F45";  // exec
      case 3: return "#FFB627";  // head of staff
      default: return "#C9A6F5"; // everyone else / devs
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
        <div class="avatar-hex">${avatarInner}</div>
        <h4>${displayName}</h4>
        <div class="role">${p.role}</div>
        ${p.sub ? `<div class="sub">${p.sub}</div>` : ""}
      </div>
    `;
  }).join("");
}

function setupNav(){
  const buttons = document.querySelectorAll(".nav-links button");
  const views = document.querySelectorAll(".view");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      views.forEach(v => v.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.view).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function setupScrollReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const watch = () => {
    document.querySelectorAll(".zone-node:not(.visible), .person-card:not(.visible)")
      .forEach(el => observer.observe(el));
  };
  watch();
  // re-scan whenever a view becomes active (elements may not have existed yet)
  document.querySelectorAll(".nav-links button").forEach(btn => btn.addEventListener("click", watch));
}
