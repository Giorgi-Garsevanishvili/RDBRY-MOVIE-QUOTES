# Figma implementation inventory

File key: Yt0MACroyqQ5QmGobnG0my
Page: 0:1 — Movie quotes, desktop/mobile, English version

The canvas mixes final screens, component studies, validation variants, hidden alternatives, and review overlays. Request design context for the exact node. Never reproduce the green Done or yellow Pending Review status border.

## Desktop

| Area                           |                                                            Node |
| ------------------------------ | --------------------------------------------------------------: |
| Long landing                   |                                                       337:29589 |
| Registration                   |                                                       369:30758 |
| Login                          |                                                       369:30882 |
| Email verification             |                                                       369:31166 |
| Password reset request/states  |                 2943:31973, 2943:31604, 2943:31809, 17043:30119 |
| Feed                           |                                                       335:23914 |
| Feed search                    |                                                       335:24052 |
| Create quote from feed         |                                                       590:29761 |
| Notifications                  |                                                       635:30899 |
| Movie list                     |                                                      1267:31302 |
| Add movie                      |                                         1267:31463, 17043:30658 |
| Movie details/menu             |                                            337:25815, 750:32820 |
| Add/view/edit quote            |                                4365:32519, 660:31720, 337:29043 |
| Google profile                 |                                                      3196:32274 |
| Username/password/email states | 4728:32419, 17283:30206, 4411:32903 and hidden profile variants |
| 404 / 403                      |                                            223:15561, 225:15639 |

## Mobile

| Area                      |                                                                                Node |
| ------------------------- | ----------------------------------------------------------------------------------: |
| Landing                   |                                                                           346:43181 |
| Registration/login        |                                                                346:42858, 346:42938 |
| Registration feedback     |                                                                346:43000, 346:43013 |
| Verification/recovery     | 346:43068, 2968:32184, 2968:32353, 2968:32304, 2968:32449, 17043:31053, 17043:30961 |
| Feed/search/notifications |                                                     346:43090, 346:43211, 660:30796 |
| Create quote / side menu  |                                                              5319:33083, 5319:33293 |
| Movie list/create         |                                                 5319:33337, 5319:33215, 17043:31671 |
| Movie details             |                                                             5319:33471, 17043:31417 |
| Quote view/edit           |                                                  5319:33607, 5343:37393, 5319:33669 |
| Profile states            |                             5131:32427, 5134:33321, 5150:36595 plus hidden variants |
| Error states              |                                                                346:43027, 346:43046 |

## Observed foundation

Primary red is #E31221; brand gold is #DDCCAA; body text is white; surfaces are near-black purple gradients. Helvetica Neue and Montserrat appear in the file. Extract exact tokens, assets, and responsive rules per slice.

Figma URLs for assets expire. Save exact raster assets locally. Preserve exported SVG vector data while converting it to a typed React component to satisfy the Redberry asset convention.

## PR 03 asset map

- `resources/js/assets/landing/interstellar.png` — shared desktop/mobile source still.
- `resources/js/assets/landing/royal-tenenbaums.png` — shared desktop/mobile source still.
- `resources/js/assets/landing/lord-of-the-rings.png` — shared desktop/mobile source still.
- `resources/js/assets/fonts/helvetica-neue-lt-geo-{roman,medium,bold}.ttf` — selected from the user-supplied Georgian archive after confirming both Latin and Georgian glyph coverage.
- The landing caret and quote rule preserve Figma's exported vector geometry as typed React/CSS components; raw SVG files are not stored.
