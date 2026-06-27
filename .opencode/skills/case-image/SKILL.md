---
name: case-image
description: Use when adding or replacing images under img/case/ in the portfolio website. Generates a 1200px thumbnail via sips and updates index.html with src/data-full.
---

# Case Image

Use this skill when the user wants to add an image to a case study or replace an existing one. Only applies to paths under `img/case/`.

## Workflow

1. **Validate path** — confirm the image is inside `img/case/<case-name>/` and the filename does NOT end with `cover` (e.g. `*-cover.png`). If it does, skip and explain that covers are excluded from this workflow. If the path is wrong, ask the user to place it in the correct directory first.

2. **Generate thumbnail** using macOS `sips`:
   ```bash
   sips -Z 1200 "<image>" --out "<image-dir>/<name>-thumb.<ext>"
   ```

3. **Update `index.html`**:
   - For images inside `.case__block`: set `data-src="<thumbnail-path>"` (not `src` — lazy load) and add `data-full="<original-image-path>"`
   - For images in `.project-card__preview`: set `src="<thumbnail-path>"` only (no `data-full`, loads immediately)

4. **Verify** — check the thumbnail was created and the HTML is correctly updated.

## Naming convention

- Original: `img/case/inspector/Screenshot.png`
- Thumbnail: `img/case/inspector/Screenshot-thumb.png`

## Notes

- Uses `sips -Z 1200` — resizes the longest side to 1200px, preserves aspect ratio
- Only run `sips` on macOS (this project is macOS-only)
- Covers (filenames ending with `cover`, e.g. `inspector-cover.png`) are excluded — they have no `border-radius` and don't need `data-full`
- Commit both original and thumbnail when the user asks to commit
