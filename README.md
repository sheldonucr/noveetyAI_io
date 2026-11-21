# NoveetyAI — company website

**Live site: <https://noveety-ai.com>**
(GitHub Pages origin: <https://sheldonucr.github.io/noveetyAI_io/> — redirects to the custom domain)

Static site for **NoveetyAI** — agentic EDA design flows with advanced modeling and simulation
for chiplet-based system-on-package design.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — mission, three pillars (coupled physics · exploration speed · your flow), problem, agentic-loop diagram, engine cards, headline results, white-paper teaser, advisors, CTA. Keep it lean: technical depth belongs in the white papers. |
| `products.html` | Tools overview — coupled-effects → engine map, a summary block per engine (ThermStack/WarpStack link to their white papers; MetalStack/GridStack keep full detail until their papers exist) |
| `whitepapers.html` | White Papers index — one card per paper, then one card per tool series (all five tools) |
| `whitepaper-thermstack.html` | ThermStack white paper (methods, validation on 8 IEEE 3Dblox packages, ThermStack-AI) |
| `whitepaper-warpstack.html` | WarpStack white paper (3D / MOR-model / WarpStack-AI on a 2nm CoWoS package) |
| `whitepaper-thermstack-resolution.html` | ThermStack WP-104: resolution on demand, 20 µm on a full accelerator package |
| `whitepaper-thermstack-module.html` | ThermStack WP-105: chip, package and board in one model |
| `whitepaper-thermstack-layout.html` | ThermStack WP-106: layout-level resolution, 50 nm on a processor die |
| `whitepaper-thermstack-joule.html` | ThermStack WP-107: power-grid Joule heating on the WP-106 processor core |
| `whitepaper-thermstack-air-cooling.html` | ThermStack WP-108: air cooling with ThermStack-Flow (JEDEC package, CFD) |
| `whitepaper-thermstack-cold-plate.html` | ThermStack WP-109: liquid cold plate on a 950 W package, ThermStack-Flow + APR |
| `whitepaper-warpstack-resolution.html` | WarpStack No. 04: resolution on demand, 10 µm at critical corners |
| `sistack.html` | SIStack tool page, hosted on this site (no separate tool site): capabilities, exploration positioning, white papers, contact. Lights up *Tools* in the nav |
| `whitepaper-sistack-3d-stack.html` | SIStack WP-201: SI across a face-to-face 3D stack (data bit + package-fed reset, eyes 0.2–8 Gb/s). Customer facing: results only, no tool or library names |
| `services.html` | Thermal, warpage and Power Integrity/IR/EM analysis and validation services. ChipletStack AI Agent (the agentic design platform) is a product, on `products.html#platform`, not a service |
| `about.html` | Mission, "The shift" (industry citations, physics-is-the-gate), founder (Prof. Sheldon X.-D. Tan), research origins, roadmap (`#roadmap`), and the contact form and details (`#contact`, demo links at `#demo`) |
| `team.html` | Team — executive team (founder, photo in `assets/img/team/sheldon-tan.jpg`) and the three strategic advisors (initials only; no advisor photos for now) |
| `advisors.html` | Redirect to `team.html`, kept so old links work |
| `contact.html` | Redirect stub to `about.html#contact`, kept so old links and bookmarks still work |
| `assets/css/style.css` | Single stylesheet — light, product-style look (bold type, rounded cards, one green accent) |
| `assets/js/main.js` | Mobile nav, active nav link (paper pages light up *White Papers*), contents highlighting on white papers |
| `assets/img/*.svg` | Company mark + one mark per tool |
| `assets/img/wp/<engine>/*.png` | White-paper figures (copied from the per-tool project sites) |

No build step, no dependencies. Fonts load from Google Fonts; everything else is local.

## White papers

Each paper is a plain HTML page at the repo root (`whitepaper-<engine>.html`) using the `.paper`
styles in `style.css`. The **Download PDF** button calls `window.print()`; the print stylesheet hides the
site chrome and keeps figures and tables unbroken, so *Save as PDF* produces a clean document. To add a
paper: copy an existing one, swap the body, add a card to `whitepapers.html`, and link it from the
engine's block on `products.html`. Figures render on a white frame in both themes.

## Deploy to GitHub Pages

```bash
cd /path/to/this/folder
git init
git add -A
git commit -m "NoveetyAI website"
git branch -M main
git remote add origin https://github.com/sheldonucr/noveetyAI_io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)` → Save**.

The site publishes to <https://sheldonucr.github.io/noveetyAI_io/>, which serves the custom domain
below.

`.nojekyll` is included so GitHub serves the files as-is (no Jekyll processing).

## Custom domain — noveety-ai.com

The site is served at **<https://noveety-ai.com>**. Two things make that work, and both must stay in
place:

**1. The `CNAME` file** (repo root, already committed) contains exactly:

```
noveety-ai.com
```

Do not delete it — GitHub Pages reads this file on every deploy, and losing it reverts the site to
the `github.io` URL.

**2. DNS records** at the registrar for `noveety-ai.com`:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `sheldonucr.github.io.` |

Then in the repo: **Settings → Pages → Custom domain** → enter `noveety-ai.com` → Save, and tick
**Enforce HTTPS** once the certificate is issued (can take up to ~24 h on first setup).

Verify with:

```bash
dig +short noveety-ai.com          # should return the four 185.199.x.x addresses
curl -sI https://noveety-ai.com | head -1   # should return HTTP/2 200
```

## Contact form

The form in the Contact section of `about.html` uses a **mailto fallback** by default — submitting opens the visitor's
mail client with the message pre-filled to `noveetyai@noveetymanagement.com`.

To collect submissions properly (recommended), create a form at
[formspree.io](https://formspree.io) and edit `about.html`:

```html
<form class="form" id="contactForm"
      action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

…and remove the `data-mailto="noveetyai@noveetymanagement.com"` attribute. The inline mailto script then
deactivates automatically.

## Things to update before launch

- **Tool detail pages** — the existing per-tool sites
  ([GridStack](https://sheldonucr.github.io/raptor_io/),
  [MetalStack](https://sheldonucr.github.io/novaEM_io/),
  [ThermStack](https://sheldonucr.github.io/chipletTherm_io/),
  [WarpStack](https://sheldonucr.github.io/warpstack_io/))
  can be linked from `products.html` or folded in as subdirectories.
- **Result figures** — the tool pages have benchmark plots and thermal/warpage maps worth copying
  into `assets/img/` and embedding in `products.html`.
- **Legal** — a privacy notice and terms page. The footer and `about.html` state that the engines are
  independent implementations of methods published in the peer-reviewed literature from UC Riverside
  research, and that no UCR license is involved. Have counsel confirm that characterization — in
  particular whether any relevant UC patents are in force, and that the implementations were written
  clear of university resources — before launch.

## Style

Light, product-style look: white and soft-grey (`--wash`) surfaces, bold near-black type (Inter 800 for
headings), rounded cards with a light shadow on hover, and a single green accent (`--green` in
`style.css`) used for small highlights only. Primary buttons are near-black pills. Heroes carry a faint
background grid (`.grid-bg`). There is no dark mode.

## Messaging

- **Brand term:** *adaptive physical reasoning* (matches the SBIR proposal). Not "adaptive physics
  reasoning", which sits too close to Vinci's "Continuous Physics Reasoning".
- **Method name:** *resolution on demand*: resolution is concentrated around hotspots, stress peaks and
  droop and stays coarse elsewhere; model fidelity escalates from AI to reduced-order to the full
  numerical reference only as a candidate nears its limit.
- **Line:** "Not just always-on physics: physics that knows where it matters." Don't name competitors on
  the site.
- **Positioning:** lead with design exploration, optimization and fast early-stage evaluation, where
  commercial tools are weak; they already have complete sign-off offerings. Resolution on demand is sold
  as choosing the resolution, compute and memory each question needs while keeping accuracy sufficient
  for the design decision. The engines can also sign off at high resolution: mention it as a supported
  capability (here or in the customer's existing flow), never as the headline.
- **Differentiators:** electrical, thermal and mechanical coupled; exploration speed with accuracy
  checked against full-resolution solves; plugs
  into existing flows (IEEE 3Dblox, OpenROAD, commercial flows, Ergodex AI).
- **Evidence:** the resolution-on-demand numbers come from ThermStack WP-104/WP-105/WP-106 and WarpStack No. 04,
  hosted here as `whitepaper-thermstack-resolution.html`, `whitepaper-thermstack-module.html`,
  `whitepaper-thermstack-layout.html` and `whitepaper-warpstack-resolution.html`. Keep their caveats with the numbers: synthetic data, uniform-grid
  figures are estimates or projections, and the AMD trademark notice wherever MI350 is named.
- **Names:** ChipletStack AI Agent (the agentic flow/platform), SIStack (signal integrity; tool page `sistack.html`; never name the internal extractors or simulators, describe them by method: full-wave, quasi-static, PEEC, AI geometry-to-RLC extraction, fast circuit simulation), ThermStack APR, ThermStack-Flow (CFD), ThermStack-GNN, WarpStack-GNN, WarpStack-MOR.
- **Disclosure:** describe resolution on demand by outcome only (where fidelity goes, what it saves,
  how it is validated). No refinement criteria, data structures or algorithms on the site.
