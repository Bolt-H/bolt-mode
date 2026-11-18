# Motion, view transitions, dialog, popover

## Motion basics

- Animate `opacity` and `transform` / `translate`. Layout properties jank.
- Reduced motion has two shapes:
  - An animation that is pure decoration: put it inside `@media (prefers-reduced-motion: no-preference)`. Off by default.
  - An animation that carries meaning: keep it, make it gentler under `reduce` (shorter, no travel). Keep colour fades.
- Never `* { animation-duration: 0.01ms }` globally. If an animation never runs, `animationend` never fires: check `getAnimations()` before waiting on it.
- Read the finished animation from `event.animation`, not by filtering `getAnimations()`.
- Auto-running motion needs a pause control. Nothing flashes more than 3 times a second.
- The end state must be right with animation off.
- Scroll-driven effects (`animation-timeline`) are for non-essential polish.

## Enter and exit of an element

```css
.sheet { transition: opacity .2s, translate .2s, display .2s allow-discrete; }
.sheet[data-closing] { opacity: 0; translate: 0 40px; }
@starting-style { .sheet { opacity: 0; translate: 0 40px; } }
```

- `transition-behavior: allow-discrete` is its own declaration or a keyword in the list, not inside the shorthand's other parts.
- Top-layer elements (dialog, popover) also need `overlay .2s allow-discrete` where supported (Chrome only; Safari simply cuts).
- Where `display` transitions are missing, mark the element `data-closing`, wait for `getAnimations()` to settle (cap at 2 s), then remove it.
- Firefox claims `allow-discrete` but does not do it: probe with a real test before trusting it.
- Keep `@starting-style` and `:root` at the top level of the sheet, not nested in a component scope.

## View transitions (same document, Safari 18)

```ts
if (!document.startViewTransition) { update(); return }
document.startViewTransition({ update: () => flushSync(update), types: ['forward'] })
```

```css
html:active-view-transition-type(forward)::view-transition-old(root) { animation-name: out-left; }
html:active-view-transition-type(back)::view-transition-new(root)   { animation-name: in-left; }
```

- Feature-detect; without support call the update straight away.
- Direction: pass `types` (Safari 18.2) and style with `:active-view-transition-type()`. No attribute on `html` to set and clean up. Move on `transform`, not `linear` easing.
- Names must be unique in a snapshot. Give a shared element a name only for the transition, and remove it in `finished`.
- Lists that reorder: unique `view-transition-name` plus `view-transition-class`; additions and removals match `::view-transition-new(.cls):only-child`. Add `::view-transition { pointer-events: none }`.
- Text inside a transitioned box: `width: fit-content`, and `object-fit` on the old and new pseudo-elements so it does not stretch.
- Do not transition an element that has a running animation.
- After the change, move focus to the new heading (`tabindex="-1"`).
- Few shared elements. More than a handful turns into noise.
- Reduced motion: `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important }`. The app skips the transition instead, which is also fine.
- Element-scoped transitions are Chrome only. Cross-document (`@view-transition { navigation: auto }`) is for multi-page sites, not a single-page app.
- Cached screens: `content-visibility: hidden` plus `inert` on inactive ones, with `display: none` under `@supports not`.

## Dialog

```tsx
const ref = useRef<HTMLDialogElement>(null)
<dialog ref={ref} aria-labelledby="t">
  <h2 id="t">…</h2>
  <form method="dialog"><button>Got it</button></form>
</dialog>
// open: ref.current?.showModal()
```

- `showModal()` gives the top layer, inert background, focus handling and Esc. Add none of: `role="dialog"`, `aria-modal`, a focus trap, an Esc listener.
- Always a visible close button (voice control needs it). `<form method="dialog">` closes without JS.
- `closedby="any"` closes on backdrop tap but is not in Safari: also handle a click on the dialog's own box edge (`event.target === dialog`).
- Do not lock the page by `overflow: hidden` or `position: fixed` on `html` / `body`. It shifts the layout and breaks sticky. Use `overscroll-behavior: contain` on `dialog:modal` and `dialog::backdrop`, with `overflow: hidden` on the backdrop; test on the phone because the snapshot lists Safari as unsupported.
- Style `::backdrop` and the dialog to match the project's look.
- Declarative open and close (Safari 26.2): `<button command="show-modal" commandfor="id">`, `command="close"`. Keep the `ref` path as the fallback.

## Popover (Safari 17 / iOS 18.3)

- Menus, tooltips and toasts: `popover` plus `popovertarget`. Light dismiss and the top layer come free.
- `<dialog popover>` combines dialog meaning with light dismiss. Never call `showModal()` on an element with a `popover` attribute.
- Toasts must not close when the user touches something else: `popover="manual"`.
- Interest-based previews (`interestfor`) are Chrome only.
