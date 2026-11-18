# CSS, layout, type, fonts

## Layout choice

- One axis: flexbox. Two axes: grid. Rows inside cards that must line up with the parent's tracks: subgrid. Long prose in columns: multi-column.
- Tethered overlay: anchor positioning only with a fallback (Safari 27).
- Flex items holding long text need `min-inline-size: 0`, or they overflow.
- No `order` or `*-reverse` on interactive content. Tab order follows the DOM and stops matching the screen.
- `grid-auto-flow: dense` reorders the screen from the DOM: keep it off anything interactive.
- `auto-fit` / `auto-fill` need a definite container width.
- Put the plain declaration before `subgrid` so an older engine still gets a layout.

## Units and sizing

- App shell height: `100dvh`.
- A component that adapts to its own space: `container: card / inline-size`, then `@container` and `cqi` units. The card stops caring where it sits.
- Fluid text: `clamp(min, preferred, max)` in `rem`, max at most 2.5 times the min, so the user's text size still applies.
- Reserve space for media with `aspect-ratio` or width and height attributes.
- Cut with `overflow: clip`; `hidden` makes a scroll container you did not ask for.
- Boxes with text take `min-height`, never a fixed `height` (WCAG 1.4.12 text spacing).

## Selectors and cascade

- Parent styled by a child's state: `label:has(:checked)`. No JS class. Never nest `:has()`.
- Order independence: `button:hover:not(:disabled)` beats two rules that depend on their order.
- Fallback for a pseudo-class in one rule: `:is(:popover-open, .popover-open)`. Not for pseudo-elements.
- Exclude a whole subtree: `@scope (.card) to (.content)`. Nearest-ancestor theming (`.dark` inside `.light`): `@scope`.
- Layers: declare `@layer reset, base, theme, components, utilities;` once at the top. `:where()` keeps low-priority rules easy to override.
- Reset by element type, not with `*`: a `*` rule cannot be overridden by lower layers.
- Layers and `:where()` handle specificity; BEM is not needed.
- Prefer `currentColor`, `inherit`, `em` and logical properties (`margin-inline-start`) over repeated variables. Ask "should this flip in RTL?"; if no, keep the physical one.

## Tokens and theme

- Values live in custom properties on `:root`, not inline. Tiers: literal, semantic, general UI, component. A small app needs one or two. Follow the names already in the project's stylesheet.
- Dark mode, when wanted: `<meta name="color-scheme" content="light dark">`, `:root { color-scheme: light dark }`, colours as `light-dark(a, b)`. A manual toggle stores the choice and sets `color-scheme` on the root; the base stays `light dark`.
- If the stylesheet sets `color-scheme: light` on purpose, change it only when the user asks for dark.
- Native parts (selection, scrollbar, controls) take `accent-color` and `scrollbar-color`. Keep `scrollbar-width: auto`; a thin thumb is too small to grab.
- `corner-shape: squircle` is an optional extra over `border-radius`.

## Text

- `text-wrap: balance` on short centred lines (titles, quotes). `pretty` on body text. Never on `*`.
- `lang` on the root (for example `th`) drives hyphenation and breaking. Thai and similar languages break by dictionary: test on a phone.
- Line length in `ch`. Unitless `line-height`.
- One-line truncation: `white-space: nowrap; overflow: clip; text-overflow: ellipsis`. Several lines: `-webkit-line-clamp`.
- `overflow-wrap: anywhere` for long paths and URLs.

## Fonts

- `font-display: swap` shows the fallback first, then jumps. Cut the jump with `font-size-adjust: from-font` on the container, so the fallback matches the real font's x-height.
- Preload only above-the-fold fonts: `<link rel="preload" as="font" type="font/woff2" crossorigin>`. The `crossorigin` is needed even on the same origin. No `fetchpriority` on fonts. The app ships TTF; WOFF2 is smaller.
- Subset to the glyphs used when size matters.
- Mixed fonts inline (code in a sentence): even them out with `font-size-adjust`, not a magic `em`.

## iPhone

- Pad bars and sheets with `env(safe-area-inset-bottom)`.
- `scrollbar-gutter: stable` stops the layout nudge when a scrollbar appears.
- Long lists below the fold: `content-visibility: auto` with `contain-intrinsic-size: auto <guess>` (Safari 26). Not for short pages or above the fold.
