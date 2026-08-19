// Renders the shared nav bar and footer, and injects the signature
// brush-divider SVG wherever a <div data-brush-divider> placeholder exists.

(function () {
  const cfg = window.SITE_CONFIG;

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function renderNav() {
    const mount = document.getElementById("site-nav");
    if (!mount) return;
    const page = currentPage();
    const link = (href, label) => {
      const isCurrent = page === href || (page === "" && href === "index.html");
      return `<li><a href="${href}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a></li>`;
    };
    const cfg = window.SITE_CONFIG;
    const initial = (cfg.name || "?").trim().charAt(0).toUpperCase();
    const navName = (cfg.name || "").split(" ")[0];
    mount.innerHTML = `
      <div class="site-nav__inner">
        <a href="index.html" class="site-nav__mark">
          <svg class="site-nav__mark-glyph" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
            <rect x="4.5" y="4.5" width="23" height="23" rx="3" fill="none" stroke="var(--ochre)" stroke-width="1"/>
            <text x="16" y="21.5" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="15" fill="currentColor">${initial}</text>
          </svg>
          <span>${navName}</span>
        </a>
        <ul class="site-nav__links">
          ${link("index.html", "Home")}
          ${link("research.html", "Research")}
          ${link("portfolio.html", "CV")}
        </ul>
      </div>`;
  }

    function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    const year = new Date().getFullYear();
    mount.innerHTML = `
      <div class="shell">
        <p class="site-footer__name">${cfg.name} &middot; ${cfg.institution}</p>
          <p class="site-footer__links">
          <a class="site-footer__link swatch-blue" href="${cfg.links.scholar}">Google Scholar</a> &middot;
          <a class="site-footer__link swatch-orange" href="${cfg.links.email}">Email</a>
          ${cfg.links.github ? ` &middot; <a class="site-footer__link swatch-red" href="${cfg.links.github}">GitHub</a>` : ""}
          ${cfg.links.linkedin ? ` &middot; <a class="site-footer__link swatch-yellow" href="${cfg.links.linkedin}">LinkedIn</a>` : ""}
        </p>
        <p class="mono">&copy; ${year}${cfg.lastUpdated ? ` &middot; Last updated ${cfg.lastUpdated}` : ""}</p>
      </div>`;
  }

  function injectBrushDividers() {
    const svg = `
      <svg class="brush-divider" viewBox="0 0 220 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2,6 C 20,2 45,7 70,4 C 100,1 130,6 160,3 C 180,1 200,4 218,2
                 C 200,7 180,9 160,7 C 130,9 100,6 70,8 C 45,9 20,6 2,8 Z"/>
      </svg>`;
    document.querySelectorAll("[data-brush-divider]").forEach((el) => {
      el.innerHTML = svg;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderFooter();
    injectBrushDividers();
  });
})();
