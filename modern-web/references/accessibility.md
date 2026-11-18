# Accessibility

## Semantics

- Native element first: `<button>` for actions, `<a>` for URLs, `<ul>` / `<ol>` for lists, `<dialog>`, `<details>`. ARIA only where no native element fits, and never to change a native role.
- One `<h1>` per screen, no skipped levels. Landmarks: `header`, `nav`, `main`, `footer`. `<search>` for a search area.
- `lang` on the root and on any run in another language (a Hebrew or Greek quote, for example, needs it for correct reading).
- Every link, button and icon-only control has a name. Decorative icons: `aria-hidden="true"` or `alt=""`. Informative SVG: a `<title>` or `aria-label`.
- Never `aria-hidden` or `role="presentation"` on something focusable.
- Do not disable zoom.
- Generated content (`::before`) is read by some screen readers and not copied: keep it decorative.

## Focus and targets

- Style `:focus-visible`, not `:focus`. If you remove the default ring, replace it with an `outline` (3:1 contrast) and an `outline-offset`.
- Targets at least 24 by 24 CSS px (WCAG 2.5.8). Set by `min-block-size` and padding, so content can grow them. This app uses 44 px and above, which is better; keep it. Bump on `(pointer: coarse)`.
- Custom gesture: `touch-action: pan-y` for horizontal swipe, not `none`. A swipe needs a button alternative.
- Move focus on a screen change, to the new heading with `tabindex="-1"`.

## Live regions

- One polite region (`role="status"`) and one assertive (`role="alert"`) per page. Assertive only for data loss, timeouts and failures.
- Not for "Loading…". Use `<progress>`.
- Debounce a region that updates fast. A short delay when focus is moving, so announcements do not collide.
- Do not update a live region inside `inert` content.

## Colour and text

- Never colour alone to show state: add an icon, text or shape.
- Text spacing must survive being enlarged: no fixed heights on text boxes.
- Respect the user's text size: `rem` for type. The `text-scale` meta tag is Chrome only.

## Dialogs

Native `<dialog>` with `showModal()`: no focus trap code needed. A custom overlay needs `inert` on the rest, `role="dialog"`, and focus moved in. See `motion-dialogs.md`.

## Testing

Run an automated checker, then a keyboard pass (tab through the whole screen), then VoiceOver on the phone for the main flow.
