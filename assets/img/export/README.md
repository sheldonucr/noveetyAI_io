# Logo exports

Raster exports of `../logo.svg` and `../logo-lockup.svg`, for places that can't
take SVG (slide decks, Word, LinkedIn, conference programs, email signatures).

Regenerate with `./render.sh` after editing either source SVG.

## Icon mark

| File | Size | Use |
|---|---|---|
| `noveetyai-logo-1024.png` | 1024² | transparent — print, large placements |
| `noveetyai-logo-512.png`  | 512²  | transparent — general purpose |
| `noveetyai-logo-256.png`  | 256²  | transparent — avatars, favicons |
| `noveetyai-logo-on-white.jpg` | 1024² | flattened on white |
| `noveetyai-logo-on-dark.jpg`  | 1024² | flattened on `#070b14` |

## Horizontal lockup (icon + "NoveetyAI / AGENTIC EDA")

| File | Size | Use |
|---|---|---|
| `noveetyai-lockup-for-light-bg.png` | 2400×648 | transparent, **dark** wordmark |
| `noveetyai-lockup-for-dark-bg.png`  | 2400×648 | transparent, **light** wordmark |
| `noveetyai-lockup-on-white.jpg` | 2400×760 | flattened on white |
| `noveetyai-lockup-on-dark.jpg`  | 2400×760 | flattened on `#070b14` |

## Notes

- **Prefer the PNGs.** JPEG has no transparency and its compression softens the
  hard logo edges. The `.jpg` files exist only for tools that demand JPEG.
- The lockup wordmark is live text in Inter, pulled from Google Fonts at render
  time — Inter is not installed on the build machine, so `render.sh` needs
  network access to produce correct output.
- Exports crop the lockup to `viewBox="0 4 209.5 56.6"`. The authored viewBox
  (`0 0 280 64`) leaves ~27% empty gutter right of the wordmark, which is fine
  inline on the site but looks like a layout bug as a standalone image.
- The lockup's wordmark uses `fill="currentColor"`, so it has no colour of its
  own — that's why there are separate for-light-bg / for-dark-bg versions.
