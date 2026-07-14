# NoveetyAI LLC — company website

Static site for **NoveetyAI LLC** — agentic EDA design flows with advanced modeling and simulation
for chiplet-based system-on-package design.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, the four tools, agentic flow, services teaser |
| `products.html` | Deep dive on Raptor, EMSpice 3, ChipletTherm, WarpStack (with benchmark tables) |
| `services.html` | Agentic design services on Synopsys Fusion Compiler II and OpenROAD |
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
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `(root)` → Save**.

The site goes live at `https://<org>.github.io/<repo>/` in a minute or two.

`.nojekyll` is included so GitHub serves the files as-is (no Jekyll processing).

### Custom domain (e.g. noveetyai.com)

1. Add a file named `CNAME` at the repo root containing just `noveetyai.com`.
2. At your DNS registrar, point the apex `A` records at GitHub's IPs
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   and add a `CNAME` record for `www` → `<org>.github.io`.
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.

## Contact form

The form on `contact.html` uses a **mailto fallback** by default — submitting opens the visitor's
mail client with the message pre-filled to `info@noveetyai.com`.

To collect submissions properly (recommended), create a form at
[formspree.io](https://formspree.io) and edit `contact.html`:

```html
<form class="form" id="contactForm"
      action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

…and remove the `data-mailto="info@noveetyai.com"` attribute. The inline mailto script then
deactivates automatically.

## Things to update before launch

- **Email addresses** — `info@noveetyai.com` appears in the footers and contact page. Swap in the
  real inbox.
- **Tool detail pages** — the existing per-tool sites
  ([Raptor](https://sheldonucr.github.io/raptor_io/),
  [EMSpice 3](https://sheldonucr.github.io/emspice_io/),
  [ChipletTherm](https://sheldonucr.github.io/chipletTherm_io/),
  [WarpStack](https://sheldonucr.github.io/warpstack_io/))
  can be linked from `products.html` or folded in as subdirectories.
- **Result figures** — the tool pages have benchmark plots and thermal/warpage maps worth copying
  into `assets/img/` and embedding in `products.html`.
- **Legal** — a privacy notice and terms page, plus confirmation of the UCR licensing language in
  the footer.

## Theme

Dark is the default; the toggle in the header switches to light and persists the choice in
`localStorage`. First-time visitors get whichever matches their OS preference.
