(function () {
  async function loadPublications() {
    const listMount = document.getElementById("pub-list");
    const statMount = document.getElementById("pub-stats");
    if (!listMount) return;

    try {
      const res = await fetch("data/publications.json", { cache: "no-store" });
      if (!res.ok) throw new Error("publications.json not found");
      const data = await res.json();

      renderStats(statMount, data.stats);
      renderPublications(listMount, data.categories || []);
    } catch (err) {
      listMount.innerHTML = `<p class="pub-error">Couldn't load publication data (${err.message}). Check data/publications.json exists and is valid JSON.</p>`;
    }
  }

  function renderStats(mount, stats) {
    if (!mount) return;
    if (!stats || (stats.total_citations == null && stats.h_index == null)) {
      mount.style.display = "none";
      return;
    }
    mount.innerHTML = `
      ${stats.total_citations != null ? `<div class="stat"><span class="stat__value">${stats.total_citations}</span><span class="stat__label">citations</span></div>` : ""}
      ${stats.h_index != null ? `<div class="stat"><span class="stat__value">${stats.h_index}</span><span class="stat__label">h-index</span></div>` : ""}
    `;
  }

  function renderPublications(mount, categories) {
    const all = (categories || []).flatMap((c) => c.publications || []);
    if (!all.length) {
      mount.innerHTML = `<p class="pub-empty">No publications added yet — edit data/publications.json to add papers.</p>`;
      return;
    }
    all.sort((a, b) => (b.year || 0) - (a.year || 0));
    mount.innerHTML = `<div class="pub-year-group">${all.map(renderEntry).join("")}</div>`;
  }

  function renderEntry(p) {
    const meta = [p.venue, p.year].filter(Boolean).join(" · ");
    const award = p.award ? `<span class="pub-entry__award">&#9733; ${escapeHtml(p.award)}</span>` : "";
    const tags = (p.tags || [])
      .map((t) => `<span class="pub-entry__tag">${escapeHtml(t)}</span>`)
      .join("");
    const links = (p.links || [])
      .filter((l) => l.url)
      .map((l) => `<a class="pub-entry__quicklink" href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)} &#8599;</a>`)
      .join("");
    return `
      <div class="pub-entry">
        <div class="pub-entry__meta">${escapeHtml(meta)}${award}</div>
        ${tags ? `<div class="pub-entry__tags">${tags}</div>` : ""}
        ${links ? `<div class="pub-entry__quicklinks">${links}</div>` : ""}
        <div class="pub-entry__title">${escapeHtml(p.title)}</div>
        <div class="pub-entry__authors">${boldOwnName(p.authors || "")}</div>
        ${p.description ? `<div class="pub-entry__description">${escapeHtml(p.description)}</div>` : ""}
      </div>`;
  }

  function boldOwnName(str) {
    const escaped = escapeHtml(str);
    const ownName = window.SITE_CONFIG && window.SITE_CONFIG.name;
    if (!ownName) return escaped;
    const escapedName = escapeHtml(ownName);
    return escaped.split(escapedName).join(`<strong>${escapedName}</strong>`);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", loadPublications);
})();