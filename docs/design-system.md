# Design system foundation

This document records the reusable visual baseline introduced with PR 03. Figma remains the visual authority; this file explains how its values map into the application.

## Color tokens

- Brand red `#E31221`: primary calls to action.
- Brand gold `#DDCCAA`: public brand and hero emphasis.
- Brand night `#11101A`: public-page background.
- Brand ink `#0D0D0D`: darkest footer and surface.
- White: quote text, navigation, borders, and controls on dark imagery.

The tokens live in `resources/css/app.css` and are exposed through Tailwind names such as `bg-brand-red` and `text-brand-gold`.

## Typography

- `font-sans` uses the supplied Helvetica Neue LT GEO Roman, Medium, and Bold files. Those files cover Latin and Georgian glyphs, so both locales keep a consistent typographic voice without a remote font request.
- `font-display` uses bundled Montserrat Bold for English display and quote text, followed by Helvetica Neue LT GEO for Georgian glyph fallback.
- Font files are loaded with `font-display: swap`.

## Responsive baseline

- Minimum supported viewport: 320px.
- Figma landing references: 1920px desktop and 428px mobile.
- Mobile landing geometry: 485px hero, three 431px quote sections, and a 32px footer.
- Desktop landing geometry: 808px hero, three 1200px quote sections, and a 50px footer.
- All controls remain keyboard-visible and the page must not create horizontal overflow.

## Accessibility and verification

- Target: WCAG 2.2 AA.
- Required automated application coverage uses Pest feature tests.
- Desktop, mobile, accessibility, locale, motion, and overflow behavior are reviewed manually against Figma until a frontend runner is explicitly accepted.
- Exact Figma rasters stay unchanged; decorative stills have empty alternative text because the adjacent quote and movie caption provide the meaningful content.

## Motion

The landing reproduces the [Must Awards 2016](https://mustapp.com/2016) scroll signature: desktop movie backdrops stay fixed to the viewport, and quote content moves upward at 1.2 times the section's exit offset. Matching the reference, the parallax is disabled at 650px and below. It is also disabled when the operating system requests reduced motion.
