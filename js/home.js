(function () {
  const RECENT_COUNT = 3;

  async function loadRecent() {
    const mount = document.getElementById("recent-pubs-list");
    if (!mount) return;

    try {
      const res = await fetch("data/publications.json", { cache: "no-store" });
      if (!res.ok) throw new Error("publications.json not found");
      const data = await res.json();

      const all = (data.categories || []).flatMap((c) => c.publications || []);
      all.sort((a, b) => (b.year || 0) - (a.year || 0));
      const recent = all.slice(0, RECENT_COUNT);

      if (!recent.length) {
        mount.innerHTML = `<p class="pub-empty">No publications added yet — edit data/publications.json.</p>`;
        return;
      }

      mount.innerHTML = `<div class="pub-year-group">${recent.map(renderEntry).join("")}</div>`;
    } catch (err) {
      mount.innerHTML = `<p class="pub-error">Couldn't load publication data (${err.message}).</p>`;
    }
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

  document.addEventListener("DOMContentLoaded", loadRecent);
})();