# NoveetyAI — company website

**Live site: <https://noveety-ai.com>**
(GitHub Pages origin: <https://sheldonucr.github.io/noveetyAI_io/> — redirects to the custom domain)

Static site for **NoveetyAI** — agentic EDA design flows with advanced modeling and simulation
for chiplet-based system-on-package design.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, the four tools, agentic flow, services teaser |
| `products.html` | Deep dive on Raptor, NovaEM, ChipletTherm, WarpStack (with benchmark tables) |
| `services.html` | Agentic design services on a major commercial EDA design flow and OpenROAD |
| `about.html` | Mission, founder (Prof. Sheldon X.-D. Tan), research origins |
| `contact.html` | Access / demo / engagement request form |
| `assets/css/style.css` | Single stylesheet; dark + light themes via `[data-theme]` |
| `assets/js/main.js` | Theme toggle (persisted), mobile nav, scroll reveal |
| `assets/img/*.svg` | Company mark + one mark per tool |

No build step, no dependencies. Fonts load from Google Fonts; everything else is local.

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

The form on `contact.html` uses a **mailto fallback** by default — submitting opens the visitor's
mail client with the message pre-filled to `noveetyai@noveetymanagement.com`.

To collect submissions properly (recommended), create a form at
[formspree.io](https://formspree.io) and edit `contact.html`:

```html
<form class="form" id="contactForm"
      action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

…and remove the `data-mailto="noveetyai@noveetymanagement.com"` attribute. The inline mailto script then
deactivates automatically.

## Things to update before launch

- **Tool detail pages** — the existing per-tool sites
  ([Raptor](https://sheldonucr.github.io/raptor_io/),
  [NovaEM](https://sheldonucr.github.io/novaEM_io/),
  [ChipletTherm](https://sheldonucr.github.io/chipletTherm_io/),
  [WarpStack](https://sheldonucr.github.io/warpstack_io/))
  can be linked from `products.html` or folded in as subdirectories.
- **Result figures** — the tool pages have benchmark plots and thermal/warpage maps worth copying
  into `assets/img/` and embedding in `products.html`.
- **Legal** — a privacy notice and terms page. The footer and `about.html` state that the engines are
  independent implementations of methods published in the peer-reviewed literature from UC Riverside
  research, and that no UCR license is involved. Have counsel confirm that characterization — in
  particular whether any relevant UC patents are in force, and that the implementations were written
  clear of university resources — before launch.

## Theme

Dark is the default; the toggle in the header switches to light and persists the choice in
`localStorage`. First-time visitors get whichever matches their OS preference.
