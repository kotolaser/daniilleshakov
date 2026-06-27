---
name: case-image
description: Use when adding images under img/case/ in the portfolio website. Updates index.html with data-src/src pointing to the original file.
---

# Case Image

Use this skill when the user wants to add an image to a case study or replace an existing one. Only applies to paths under `img/case/`.

No thumbnails are generated — originals are used directly.

## Workflow

1. **Validate path** — confirm the image is inside `img/case/<case-name>/` and the filename does NOT end with `cover` (e.g. `*-cover.png`). If it does, skip and explain that covers are excluded from this workflow. If the path is wrong, ask the user to place it in the correct directory first.

2. **Update `index.html`**:
   - For images inside `.case__block`: set `data-src="<image-path>"` (lazy load — loads only when the case is opened)
   - For images in `.project-card__preview`: set `src="<image-path>"` (loads immediately)
   - No `data-full` attribute is needed — the full image is already the source

3. **Verify** — check the HTML is correctly updated.

## Notes

- No thumbnail generation — originals are used as-is
- Covers (filenames ending with `cover`, e.g. `inspector-cover.png`) are excluded — they are handled by a separate workflow (no border-radius, no lazy load)
- Commit both the image and the HTML when the user asks to commit
