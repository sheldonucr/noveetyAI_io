#!/bin/bash
# Rasterize the NoveetyAI logo SVGs to PNG (transparent) and JPG (flattened).
#
# Uses headless Chrome rather than rsvg/ImageMagick so the lockup's wordmark
# renders in Inter pulled from Google Fonts, matching the live site. Needs
# network access; Inter is not installed locally.
#
# Run from anywhere:  ./render.sh
set -euo pipefail

OUT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMG="$(dirname "$OUT")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME" >&2; exit 1; }

FONTS='<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">'

# The lockup's authored viewBox (0 0 280 64) leaves ~27% dead gutter right of
# the wordmark. Measured content bbox is x6 y10 w197.4 h44.6 — crop to that
# plus a 6-unit margin so the standalone image reads as balanced.
TIGHT_LOCKUP='viewBox="0 4 209.5 56.6"'

DARKBG="#070b14"      # site --bg, dark theme
LIGHTTX="#e8eef8"     # site --text, dark theme
DARKTX="#0d1b2e"      # site --text, light theme

# render <svg> <out-name> <W> <H> <bg-css> <wordmark-color> <pad-%>
render () {
  local svg="$1" name="$2" w="$3" h="$4" bg="$5" fg="$6" pad="$7"
  local body; body=$(sed '1{/<?xml/d;}' "$svg" | sed "s|viewBox=\"0 0 280 64\"|$TIGHT_LOCKUP|")

  cat > "$TMP/$name.html" <<HTML
$FONTS
<style>
  html,body { margin:0; padding:0; }
  body { width:${w}px; height:${h}px; background:$bg; color:$fg;
         display:flex; align-items:center; justify-content:center; }
  svg  { width:$((100 - pad * 2))%; height:auto; display:block; }
</style>
$body
HTML

  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --virtual-time-budget=8000 \
    --default-background-color=00000000 \
    --window-size="$w,$h" --screenshot="$OUT/$name.png" \
    "file://$TMP/$name.html" >/dev/null 2>&1

  echo "  $name.png (${w}x${h})"
}

echo "Icon mark:"
for s in 1024 512 256; do
  render "$IMG/logo.svg" "noveetyai-logo-$s" "$s" "$s" "transparent" "$DARKTX" 0
done
render "$IMG/logo.svg" "noveetyai-logo-on-white" 1024 1024 "#ffffff" "$DARKTX"  8
render "$IMG/logo.svg" "noveetyai-logo-on-dark"  1024 1024 "$DARKBG"  "$LIGHTTX" 8

echo "Lockup:"
LK="$IMG/logo-lockup.svg"
render "$LK" "noveetyai-lockup-for-light-bg" 2400 648 "transparent" "$DARKTX"  0
render "$LK" "noveetyai-lockup-for-dark-bg"  2400 648 "transparent" "$LIGHTTX" 0
render "$LK" "noveetyai-lockup-on-white"     2400 760 "#ffffff"     "$DARKTX"  5
render "$LK" "noveetyai-lockup-on-dark"      2400 760 "$DARKBG"     "$LIGHTTX" 5

# Flattened renders become JPGs; drop the intermediate PNGs.
echo "Flattening to JPEG:"
for n in noveetyai-logo-on-white noveetyai-logo-on-dark \
         noveetyai-lockup-on-white noveetyai-lockup-on-dark; do
  sips -s format jpeg -s formatOptions 95 "$OUT/$n.png" --out "$OUT/$n.jpg" >/dev/null
  rm "$OUT/$n.png"
  echo "  $n.jpg"
done

echo "Done -> $OUT"
