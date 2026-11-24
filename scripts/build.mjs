import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guides, guideBySlug, topics, topicBySlug } from "../src/content.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const siteName = "Fieldnotes";
const siteTagline = "Make better moves.";
const siteUrlValue = process.env.SITE_URL?.trim() || "";

let siteUrl = "";
if (siteUrlValue) {
  const parsed = new URL(siteUrlValue);
  if (parsed.protocol !== "https:" || parsed.search || parsed.hash) {
    throw new Error("SITE_URL must be a public HTTPS site root without a query string or fragment.");
  }
  siteUrl = parsed.href.replace(/\/+$/, "");
}

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const jsonForHtml = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const absUrl = (relativePath) => siteUrl ? `${siteUrl}/${relativePath.replace(/^\//, "")}` : "";
const topicRoute = (topic) => `topics/${topic.slug}.html`;
const guideRoute = (guide) => `guides/${guide.slug}.html`;

for (const topic of topics) {
  if (!guides.some((guide) => guide.topic === topic.slug)) throw new Error(`Topic has no guides: ${topic.slug}`);
}
for (const guide of guides) {
  if (!topicBySlug[guide.topic]) throw new Error(`Unknown topic on guide: ${guide.slug}`);
  for (const related of guide.related ?? []) {
    if (!guideBySlug[related]) throw new Error(`Unknown related guide ${related} on ${guide.slug}`);
  }
}
if (new Set(guides.map((guide) => guide.slug)).size !== guides.length) throw new Error("Guide slugs must be unique.");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(path.join(outputRoot, "topics"), { recursive: true });
await mkdir(path.join(outputRoot, "guides"), { recursive: true });
await mkdir(path.join(outputRoot, "assets"), { recursive: true });

const searchIndexFor = (root) => [
  ...guides.map((guide) => ({
    title: guide.title,
    description: guide.excerpt,
    topic: topicBySlug[guide.topic].name,
    type: guide.kind,
    href: `${root}${guideRoute(guide)}`
  })),
  ...topics.map((topic) => ({
    title: topic.name,
    description: topic.description,
    topic: "Topic hub",
    type: "Browse",
    href: `${root}${topicRoute(topic)}`
  }))
];

function head({ title, description, keywords, route, type = "website", noindex = false }) {
  const canonical = noindex ? "" : absUrl(route);
  const ogImage = absUrl("assets/og-cover.svg");
  const assetPrefix = /^(topics|guides)\//.test(route) ? "../" : "";
  const imageTags = ogImage
    ? `<meta property="og:image" content="${esc(ogImage)}">\n  <meta property="og:image:alt" content="Fieldnotes — practical guides for better decisions">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="${esc(ogImage)}">`
    : `<meta name="twitter:card" content="summary">`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#153f35">
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}">
  <title>${esc(title)}</title>
  <meta property="og:type" content="${esc(type)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:site_name" content="${siteName}">
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}">\n  <meta property="og:url" content="${esc(canonical)}">` : "<!-- Set SITE_URL at build time to add canonical and absolute social URLs. -->"}
  ${imageTags}
  <link rel="icon" href="${assetPrefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${assetPrefix}assets/site.css">
</head>`;
}

function header(root, activeTopic = "") {
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${root}index.html" aria-label="Fieldnotes home">
      <span class="brand-mark" aria-hidden="true">✳</span><span>fieldnotes<small>${siteTagline}</small></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      ${topics.map((topic) => `<a href="${root}${topicRoute(topic)}"${activeTopic === topic.slug ? ' aria-current="page"' : ""}>${esc(topic.nav)}</a>`).join("\n      ")}
    </nav>
    <div class="header-actions">
      <details class="menu-disclosure">
        <summary class="menu-summary">Explore</summary>
        <nav class="mobile-menu-panel" aria-label="Explore topics">
          ${topics.map((topic) => `<a href="${root}${topicRoute(topic)}">${esc(topic.name)}</a>`).join("\n          ")}
        </nav>
      </details>
      <button class="search-open" type="button" data-search-open aria-haspopup="dialog">Search <span aria-hidden="true">⌕</span></button>
    </div>
  </div>
</header>`;
}

function footer(root) {
  return `<footer class="site-footer">
  <div class="wrap footer-inner">
    <div>
      <a class="brand footer-brand" href="${root}index.html"><span class="brand-mark" aria-hidden="true">✳</span><span>fieldnotes<small>${siteTagline}</small></span></a>
      <p class="footer-about">Practical guides for choosing tools, managing money, building skills, buying useful gear, and moving your career forward.</p>
    </div>
    <nav class="footer-links" aria-label="Footer navigation">
      ${topics.map((topic) => `<a href="${root}${topicRoute(topic)}">${esc(topic.nav)}</a>`).join("\n      ")}
      <a href="${root}index.html#about">About & disclosures</a>
    </nav>
  </div>
  <div class="wrap footer-note">© ${new Date().getFullYear()} Fieldnotes. Independent editorial guides. Any commercial relationship will be labeled near the relevant recommendation.</div>
</footer>`;
}

function searchDialog(root) {
  const index = searchIndexFor(root);
  return `<dialog class="search-dialog" data-search-dialog aria-labelledby="search-heading">
  <div class="search-panel">
    <div class="search-top"><h2 id="search-heading">Search the fieldnotes</h2><button class="search-close" type="button" data-search-close aria-label="Close search">×</button></div>
    <label class="eyebrow" for="site-search">Find a guide or topic</label>
    <input class="search-input" id="site-search" type="search" autocomplete="off" placeholder="Try “AI review” or “budgeting”" data-search-input>
    <p class="search-hint">Search runs in your browser; no query is sent to a server.</p>
    <div class="search-results" data-search-results aria-live="polite"></div>
  </div>
</dialog>
<script type="application/json" data-search-index>${jsonForHtml(index)}</script>
<script src="${root}assets/site.js" defer></script>`;
}

function adSlot(name) {
  return `<aside class="ad-slot" data-ad-slot="${esc(name)}" aria-label="Advertisement placement">
  <span class="ad-label">Advertisement</span><p>Reserved display placement · connect an ad provider here</p>
</aside>`;
}

function sponsorSlot(topic) {
  return `<aside class="sponsor-card" data-sponsored-slot="${esc(topic.slug)}">
  <span class="sponsor-label">Sponsored placement</span>
  <h3>A relevant partner can appear here</h3>
  <p>Paid listings stay visibly labeled and separate from editorial scores and recommendations.</p>
  <div class="sponsor-placeholder">Unclaimed sample slot · no advertiser is represented</div>
</aside>`;
}

function topicCard(topic) {
  return `<a class="topic-card ${esc(topic.color)}" href="topics/${topic.slug}.html">
  <div class="topic-top"><span>${esc(topic.kicker)}</span><span class="topic-icon" aria-hidden="true">${esc(topic.icon)}</span></div>
  <div><h3>${esc(topic.name)}</h3><p>${esc(topic.description)}</p><div class="topic-arrow" aria-hidden="true">Explore fieldnotes →</div></div>
</a>`;
}

function guideCard(guide, root) {
  const topic = topicBySlug[guide.topic];
  return `<article class="guide-card">
  <p class="eyebrow">${esc(topic.nav)} · ${esc(guide.kind)}</p>
  <h3><a href="${root}${guideRoute(guide)}">${esc(guide.shortTitle)}</a></h3>
  <p>${esc(guide.excerpt)}</p>
  <div class="card-meta"><span class="kind">${esc(guide.kind)}</span><span>${esc(guide.readTime)}</span></div>
</article>`;
}

function affiliateSlot(guide) {
  const safeUrl = guide.affiliateUrl && /^https:\/\//i.test(guide.affiliateUrl) ? guide.affiliateUrl : "";
  if (safeUrl) {
    return `<a class="affiliate-slot" href="${esc(safeUrl)}" rel="sponsored nofollow noopener" target="_blank">${esc(guide.affiliateLabel)} · visit partner <span aria-hidden="true">↗</span></a>`;
  }
  return `<span class="affiliate-slot" data-affiliate-slot="${esc(guide.slug)}" aria-label="Affiliate destination not connected">Affiliate link slot · connect a verified destination</span>`;
}

function renderSection(section, index, guide) {
  let markup = `<section aria-labelledby="section-${index}"><h2 id="section-${index}">${esc(section.heading)}</h2>`;
  for (const paragraph of section.paragraphs ?? []) markup += `<p>${esc(paragraph)}</p>`;
  if (section.bullets?.length) {
    markup += `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
  }
  if (section.table) {
    markup += `<div class="comparison-wrap" role="region" aria-label="Comparison table: ${esc(section.heading)}" tabindex="0"><table class="comparison"><thead><tr>${section.table.headers.map((header) => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead><tbody>${section.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  markup += `</section>`;
  if (index === 0) markup += adSlot(`article-${guide.slug}-mid`);
  return markup;
}

function topicPage(topic) {
  const route = topicRoute(topic);
  const root = "../";
  const topicGuides = guides.filter((guide) => guide.topic === topic.slug);
  const relatedKeywords = topic.keywords;
  const title = `${topic.name} — practical guides | ${siteName}`;
  const description = topic.description;
  const body = `${header(root, topic.slug)}
<main id="main">
  <section class="wrap page-hero">
    <div class="breadcrumbs"><a href="../index.html">Home</a> / ${esc(topic.name)}</div>
    <p class="eyebrow">Field guide ${esc(topic.icon)} · ${esc(topic.kicker)}</p>
    <h1>${esc(topic.name)}<br><em>without the noise.</em></h1>
    <p class="lead">${esc(topic.description)}</p>
    <nav class="topic-index" aria-label="Browse all topics">${topics.map((item) => `<a href="${root}${topicRoute(item)}"${item.slug === topic.slug ? ' aria-current="page"' : ""}>${esc(item.nav)}</a>`).join("")}</nav>
  </section>
  <section class="wrap topic-layout" aria-label="${esc(topic.name)} guides">
    <div class="topic-content">
      <div class="section-head"><h2>Start with a useful question</h2><p>Evergreen fieldnotes for clearer decisions and practical next steps.</p></div>
      <div class="guide-grid">${topicGuides.map((guide) => guideCard(guide, "../")).join("\n")}</div>
    </div>
    <aside class="topic-side" aria-label="Partner and advertising information">
      ${sponsorSlot(topic)}
      ${adSlot(`topic-${topic.slug}-rail`)}
      <div class="side-note"><p class="eyebrow">Our approach</p><h3>Useful first. Commercially clear.</h3><p>Paid placements are labeled. Affiliate links, when connected, are disclosed beside the relevant recommendation.</p></div>
    </aside>
  </section>
</main>
${footer(root)}
${searchDialog(root)}`;
  return `${head({ title, description, keywords: relatedKeywords, route, type: "website" })}\n<body>\n${body}\n</body>\n</html>`;
}

function guidePage(guide) {
  const topic = topicBySlug[guide.topic];
  const route = guideRoute(guide);
  const root = "../";
  const title = `${guide.shortTitle} | ${siteName}`;
  const disclosure = `<div class="disclosure"><strong>Affiliate disclosure:</strong> We may earn a commission if you use a partner link. A commission does not determine our editorial conclusions. Sponsored placements are labeled separately.</div>`;
  const financeNote = guide.financialDisclaimer ? `<p class="finance-note">Educational information only—not individualized financial, tax, or legal advice. Consider your circumstances and qualified local advice where appropriate.</p>` : "";
  const recommendation = `<aside class="recommendation"><p class="eyebrow">The practical takeaway</p><p>${esc(guide.recommendation)}</p>${affiliateSlot(guide)}</aside>`;
  const relatedGuides = (guide.related ?? []).map((slug) => guideBySlug[slug]).filter(Boolean);
  const sections = guide.sections.map((section, index) => renderSection(section, index + 1, guide)).join("\n");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: { "@type": "Organization", name: "Fieldnotes Editorial Desk" },
    publisher: { "@type": "Organization", name: siteName },
    ...(siteUrl ? { mainEntityOfPage: absUrl(route) } : {})
  };
  const body = `${header(root, topic.slug)}
<main id="main" class="article-wrap">
  <header class="article-head">
    <div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="${root}${topicRoute(topic)}">${esc(topic.nav)}</a> / ${esc(guide.kind)}</div>
    <p class="eyebrow">${esc(topic.name)} · ${esc(guide.kind)}</p>
    <h1>${esc(guide.title)}</h1>
    <p class="article-summary">${esc(guide.description)}</p>
    <div class="article-meta"><span>Fieldnotes editorial desk</span><span>${esc(guide.readTime)}</span><span>${esc(guide.updated)}</span></div>
    ${disclosure}${financeNote}
  </header>
  <div class="article-layout">
    <article class="article-body" aria-label="${esc(guide.title)}">
      ${recommendation}
      ${sections}
      <aside class="recommendation"><p class="eyebrow">Before you choose</p><p>Verify current features, pricing, terms, and compatibility with the provider or retailer. This guide is a decision framework, not a claim that a specific product has been tested.</p>${affiliateSlot(guide)}</aside>
      <section class="related" aria-labelledby="related-heading"><h2 id="related-heading">Keep exploring</h2><div class="related-links">${relatedGuides.map((relatedGuide) => `<a href="${root}${guideRoute(relatedGuide)}"><span>${esc(topicBySlug[relatedGuide.topic].nav)}</span>${esc(relatedGuide.shortTitle)}</a>`).join("")}</div></section>
    </article>
    <aside class="article-aside" aria-label="Editorial and advertising notes">
      <div class="aside-box"><p class="eyebrow">A note on recommendations</p><h2>Evidence before enthusiasm.</h2><p>We aim to explain the decision, the trade-offs, and what a reader should verify next.</p></div>
      ${adSlot(`guide-${guide.slug}-rail`)}
      ${sponsorSlot(topic)}
    </aside>
  </div>
</main>
${footer(root)}
${searchDialog(root)}
<script type="application/ld+json">${jsonForHtml(articleJsonLd)}</script>`;
  return `${head({ title, description: guide.description, keywords: `${topic.keywords}, ${guide.kind.toLowerCase()}`, route, type: "article" })}\n<body>\n${body}\n</body>\n</html>`;
}

const root = "";
const homeDescription = "Practical guides for choosing AI and software, managing money, building tech skills, buying useful gear, and moving your career forward.";
const heroGuide = guides.find((guide) => guide.featured) ?? guides[0];
const homeCards = guides.filter((guide) => guide.featured).slice(0, 6);
const homeBody = `${header(root)}
<main id="main">
  <section class="wrap hero" aria-labelledby="hero-title">
    <div>
      <p class="eyebrow">A field guide for your next move</p>
      <h1 id="hero-title">Make better moves <em>online.</em></h1>
      <p class="hero-copy">Clear-eyed guides to the tools you use, the money choices you make, the skills you build, the gear you buy, and the work you want next.</p>
      <a class="button-link" href="guides/${heroGuide.slug}.html">Read the latest fieldnote <span class="arrow" aria-hidden="true">→</span></a>
    </div>
    <div class="hero-art" aria-label="A fieldnote card representing practical decision-making" role="img">
      <span class="hero-orbit" aria-hidden="true"></span>
      <div class="hero-note"><div class="hero-note-label"><span>Fieldnote 01</span><span>✳</span></div><h2>Less guesswork.<br>More useful work.</h2><div class="note-line"></div><div class="note-line short"></div><p>Useful decisions start with the right question.</p><span class="note-chip">Make the next move clearer</span></div>
    </div>
  </section>

  <section class="wrap section" aria-labelledby="topics-heading">
    <div class="section-head"><div><p class="eyebrow">Choose your lane</p><h2 id="topics-heading">Good questions,<br>better answers.</h2></div><p>Five practical desks. Each one starts with the decision you need to make—not a wall of features or a pile of hype.</p></div>
    <div class="topic-grid">${topics.map(topicCard).join("\n")}</div>
  </section>

  <section class="wrap feature-band" aria-labelledby="feature-heading">
    <div><p class="eyebrow">How we work</p><h2 id="feature-heading">Useful first.<br>Commercially clear.</h2><p>We explain trade-offs, show what to verify, and keep paid placements visibly separate from editorial recommendations.</p></div>
    <div class="feature-side"><strong>Fieldnotes promise</strong><p>“A clear next step beats another list of things to buy.”</p><a href="index.html#about">See how disclosures work →</a></div>
  </section>

  <section class="wrap section" aria-labelledby="latest-heading">
    <div class="section-head"><div><p class="eyebrow">The latest fieldnotes</p><h2 id="latest-heading">Start where you are.</h2></div><p>Evergreen explainers and decision frameworks to help you make a confident, informed next move.</p></div>
    <div class="guide-grid">${homeCards.map((guide) => guideCard(guide, "")).join("\n")}</div>
  </section>

  <section class="wrap section" id="about" aria-labelledby="about-heading">
    <div class="section-head"><div><p class="eyebrow">The fine print, in plain English</p><h2 id="about-heading">Know who pays.</h2></div><p>We reserve space for ads, sponsored listings, and affiliate links—but a placeholder is not an endorsement or a live advertiser.</p></div>
    <div class="topic-layout" style="padding-top:0;padding-bottom:0">
      <div class="side-note"><h3>Affiliate links</h3><p>When a recommendation contains an affiliate link, we may earn a commission if you choose to use it. The disclosure appears beside relevant recommendations. We never invent a destination: unconfigured links are clearly marked for the publisher to replace.</p></div>
      <div>${sponsorSlot(topics[0])}</div>
    </div>
  </section>
  <section class="wrap section" aria-label="Advertising placement">${adSlot("home-lower")}</section>
</main>
${footer(root)}
${searchDialog(root)}`;

await writeFile(path.join(outputRoot, "index.html"), `${head({ title: `${siteName} — ${siteTagline}`, description: homeDescription, keywords: "AI tools, personal finance, developer tutorials, gear guides, remote work, career advice", route: "", type: "website" })}\n<body>\n${homeBody}\n</body>\n</html>`);
for (const topic of topics) await writeFile(path.join(outputRoot, topicRoute(topic)), topicPage(topic));
for (const guide of guides) await writeFile(path.join(outputRoot, guideRoute(guide)), guidePage(guide));

const routeEntries = [
  { path: "/", title: `${siteName} — ${siteTagline}` },
  ...topics.map((topic) => ({ path: `/${topicRoute(topic)}`, title: `${topic.name} — practical guides | ${siteName}` })),
  ...guides.map((guide) => ({ path: `/${guideRoute(guide)}`, title: `${guide.shortTitle} | ${siteName}` }))
];
await writeFile(path.join(outputRoot, "manus-routes.json"), `${JSON.stringify({ routes: routeEntries }, null, 2)}\n`);

const routePaths = ["", ...topics.map(topicRoute), ...guides.map(guideRoute)];
if (siteUrl) {
  const urls = routePaths.map((route) => `  <url><loc>${esc(absUrl(route))}</loc></url>`).join("\n");
  await writeFile(path.join(outputRoot, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
await writeFile(path.join(outputRoot, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`);
await writeFile(path.join(outputRoot, "404.html"), `${head({ title: `Not found | ${siteName}`, description: "This page is not here. Browse the Fieldnotes guides and topic hubs instead.", keywords: "", route: "404.html", noindex: true })}\n<body>\n${header("")}\n<main id="main" class="wrap not-found"><p class="eyebrow">404 · Wrong turn</p><h1>That page isn't in this field guide.</h1><p>Try a topic or head back to the Fieldnotes home page.</p><a class="button-link" href="index.html">Back to Fieldnotes <span class="arrow" aria-hidden="true">→</span></a></main>\n${footer("")}\n${searchDialog("")}\n</body>\n</html>`);
await writeFile(path.join(outputRoot, ".nojekyll"), "");
await cp(path.join(projectRoot, "src", "site.css"), path.join(outputRoot, "assets", "site.css"));
await cp(path.join(projectRoot, "src", "site.js"), path.join(outputRoot, "assets", "site.js"));
await cp(path.join(projectRoot, "public", "favicon.svg"), path.join(outputRoot, "assets", "favicon.svg"));
await cp(path.join(projectRoot, "public", "og-cover.svg"), path.join(outputRoot, "assets", "og-cover.svg"));

console.log(`Built ${1 + topics.length + guides.length} static pages in dist/ (${topics.length} topic hubs, ${guides.length} guides).`);
console.log(`Public origin: ${siteUrl || "not configured (absolute canonical/social URLs and sitemap omitted)"}`);
