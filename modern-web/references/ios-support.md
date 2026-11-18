# iPhone Safari support table

Snapshot of the source repo, dated 2026-11-10. Re-check anything newer. "widely" = Baseline widely available, use plainly. "newly" = use behind a feature test with a fallback. "no Safari" = decoration only.

## Widely (use plainly)

| Feature | Safari since |
|---|---|
| `<dialog>` + `showModal()` | 15.4 |
| `dvh` / `svh` / `lvh` units | 15.4 |
| container queries (size) | 16 |
| subgrid | 16 |
| `overflow: clip` | 16 |
| `:user-valid` / `:user-invalid` | 16.5 |
| individual `translate` / `rotate` / `scale` | 14.1 |
| `:has()` | Baseline since 2023-12 |

## Newly (feature-test, keep a fallback)

| Feature | Safari | Note |
|---|---|---|
| popover attribute | 17 (iOS 18.3 for Baseline) | polyfill exists: `@oddbird/popover-polyfill` |
| `command` / `commandfor` | 26.2 | do not mix with `popovertarget` on one button |
| view transitions, same document | 18 | |
| `view-transition-class`, transition `types`, `:active-view-transition-type()` | 18.2 | |
| cross-document view transitions | 18.2 | not for a single-page app |
| `@starting-style` | 17.5 | |
| `transition-behavior: allow-discrete` | 17.4 | `display` transitions need Safari 18+ |
| `scrollbar-gutter` | 18.2 | |
| `content-visibility` | 26 | |
| `text-wrap: balance` | 17.5 | |
| `text-wrap: pretty` | 26 | no Firefox |
| `font-size-adjust` | 17 | `from-font` keyword |
| `field-sizing: content` | 26.2 | Baseline 2026-06 |
| `<input type="checkbox" switch>` | 17.4 | Safari only; others show a plain checkbox |
| `contrast-color()` | 26 | |
| container style queries | 18 | |
| scroll-driven animations | Baseline 2026-10-27 | non-essential effects only |
| Navigation API | 26.2 | |
| `light-dark()` | newly | pair with `color-scheme: light dark` |

## No Safari (decoration only, or skip)

| Feature | Status |
|---|---|
| `scheduler.yield()` / Scheduler API | not in Safari: fall back to `setTimeout` in a Promise |
| `<dialog closedby="any">` | not in Safari: keep a backdrop click handler |
| `overscroll-behavior` on dialog and `::backdrop` | listed "unsupported in Safari" in the snapshot; test on the phone |
| `moveBefore()` | not in Safari |
| `scroll-initial-target`, scroll snap events | not in Safari |
| `interpolate-size`, `calc-size()` | not in Safari |
| element-scoped `element.startViewTransition` | Chrome only |
| `overlay` property | Chrome only |
| anchor positioning | Safari 27, no Firefox: tethered overlays need a fallback |
| `<meta name="text-scale">` | Chrome only |
| `beforeinstallprompt`, `<install>`, `navigator.install()` | not in Safari: iPhone installs by Share, Add to Home Screen |
| `flex-wrap: balance`, grid lanes | Chrome 150 / Safari 27.2 only |
| `line-clamp` unprefixed | nowhere: use the `-webkit-line-clamp` set with `display: -webkit-box` |

## JS built-ins

The source gives no support data for these and treats them as safe. From general knowledge they are in iOS 15.4 to 17.4 or later: `structuredClone`, `toSorted` / `toReversed` / `with`, `Object.groupBy`, `Promise.withResolvers`, `AbortSignal.timeout` / `any`, `Error` `cause`, `replaceChildren`. Re-check `Object.groupBy`, `Promise.withResolvers` and `AbortSignal.any` if the phone's iOS is older than 17.4.

## Safari bug to remember

`KeyboardEvent.isComposing` has the wrong event order in Safari (WebKit bug 165004). For Enter-to-submit on a field that takes IME input, also check `event.keyCode === 229`. See `forms-input.md`.
