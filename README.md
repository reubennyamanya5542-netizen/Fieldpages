# Fieldnotes — Make Better Moves

A responsive, pre-rendered editorial site for five evergreen content lanes: AI and software, personal finance and side hustles, developer and no-code tutorials, niche gear, and career, remote work, and study prep. It is static HTML, CSS, and vanilla JavaScript—no server, database, external font, or runtime API is required.

## Publish with GitHub Pages

1. Create the `Fieldpages` GitHub repository under `reubennyamanya5542-netizen` and add the project files to its `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The included workflow at `.github/workflows/pages.yml` builds the site and deploys `dist/` on every push to `main`. The first run can also be started from **Actions → Publish Fieldnotes to GitHub Pages → Run workflow**.
4. The workflow is preconfigured for `https://reubennyamanya5542-netizen.github.io/Fieldpages`. It uses this origin to create canonical URLs, Open Graph URLs, a sitemap, and the sitemap reference in `robots.txt`. You do not need to add a `SITE_URL` repository variable unless you later switch to a custom domain.

The public URL is `https://reubennyamanya5542-netizen.github.io/Fieldpages/`. A push to the GitHub repository's `main` branch starts the deployment workflow; the first deployment can also be started from **Actions → Publish Fieldnotes to GitHub Pages → Run workflow**.

GitHub Pages serves the generated files from `dist/`. The included `.nojekyll` file avoids Jekyll processing. Internal links are relative so the same output works both at a repository subpath and at a custom domain.

## Build and preview locally

Requires Node.js 20 or newer; the project has no npm dependencies.

```sh
node scripts/build.mjs
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. The GitHub Actions workflow supplies the configured public URL. To override it for a custom domain, set `SITE_URL`, for example:

```sh
SITE_URL="https://your-custom-domain.example" node scripts/build.mjs
```

The build generates the homepage, five topic hubs, ten guide pages, a real `404.html`, the route manifest, and `robots.txt`; when a public origin is configured it also generates `sitemap.xml`.

## Editorial and monetization setup

The current guide content is a useful launch framework, not a claim that a particular product was independently tested or that live prices, terms, and features were verified. Check those details with official providers before making specific product recommendations. Finance content is educational, not individualized financial, tax, or legal advice; wearable content is not medical advice.

Affiliate destinations are deliberately unconfigured. Replace each guide's empty `affiliateUrl` in `src/content.mjs` only after choosing a real, approved destination. The page then renders a `rel="sponsored nofollow"` partner link, while the affiliate disclosure stays next to the recommendation. Sponsored cards and display-ad slots are clearly labeled placeholders; they do not represent active advertisers or ad-network integrations. Connect an ad provider only after adding its approved script and slot identifiers. Keep sponsored placements visibly marked and distinct from editorial ratings.

## Project structure

- `src/content.mjs` — topic and guide copy, metadata, comparisons, related links, and optional partner destinations.
- `src/site.css`, `src/site.js` — responsive editorial design and optional browser-side search.
- `scripts/build.mjs` — zero-dependency static generator and route-manifest / SEO document writer.
- `public/` — favicon and social-cover vector artwork.
- `.github/workflows/pages.yml` — GitHub Pages build and deployment workflow.
