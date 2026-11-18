---
name: modern-web
description: Use when writing or changing UI, CSS, forms, animation or client JS in a React/Vite web app or PWA (iPhone Safari is the strictest browser to satisfy) and a platform feature might replace a library or an old pattern. Gives the pick and the Safari check.
---

# modern-web

Reach for the platform before a library or a hand-built pattern. Every pick here is checked against **iPhone Safari**, the browser that most often lacks new features. If your users are on something else, adjust the table. The detail lives in `references/`; read only the file the task touches.

Source: Google Chrome's `modern-web-guidance` (snapshot 2026-11-10), rewritten for this stack. See `NOTICE.md`.

## Check before you use a feature

1. Find it in `references/ios-support.md`. Listed as **widely** means use it plainly.
2. **newly** means use it, behind `CSS.supports()` / `@supports` / `'x' in obj`, and keep the old behaviour as the fallback. The page still works without it.
3. **no Safari** (or not listed) means the feature may only decorate. Nothing the user needs may depend on it.
4. Not in the table: confirm Safari support on MDN or webstatus.dev (WebFetch) before writing code. Say "not checked" if you cannot.

The table is a dated snapshot. Re-check anything newer than its date.

## Old pattern, modern pick

| Instead of | Use | Safari | Detail |
|---|---|---|---|
| hand-built modal: backdrop div, Esc listener, focus trap | `<dialog>` + `showModal()` | widely | motion-dialogs |
| JS toggle for menu / tooltip | `popover` + `popovertarget` | newly | motion-dialogs |
| `onClick` that opens a dialog | `command` / `commandfor` | 26.2 | motion-dialogs |
| `100vh` | `100dvh` | widely | css-layout |
| media query on viewport for a component | container query + `cqi` | widely | css-layout |
| JS class when a child is checked | `:has()` | widely | css-layout |
| `:invalid` styling on load, `touched` state | `:user-invalid` | widely | forms-input |
| auto-grow textarea in JS | `field-sizing: content` | 26.2 | forms-input |
| toggle built from div + checkbox | `<input type="checkbox" switch>` | 17.4 | forms-input |
| animation lib for page / list change | `document.startViewTransition()` | 18 | motion-dialogs |
| JS class for direction (`data-motion`) | `startViewTransition({update, types})` + `:active-view-transition-type()` | 18.2 | motion-dialogs |
| enter / exit via setTimeout | `@starting-style` + `transition-behavior: allow-discrete` | 17.5 | motion-dialogs |
| JS to even out headings | `text-wrap: balance`, body `pretty` | 17.5 / 26 | css-layout |
| font swap shifts the layout | `font-size-adjust: from-font` | 17 | css-layout |
| `JSON.parse(JSON.stringify(x))` | `structuredClone(x)` | widely | js-html |
| `[...a].sort()` | `a.toSorted()` | widely | js-html |
| manual AbortController + setTimeout | `AbortSignal.timeout(ms)` | widely | js-html |
| `reduce` grouping | `Object.groupBy` | widely | js-html |
| `setTimeout(0)` to yield | `scheduler.yield()` with a `setTimeout` fallback | no Safari | performance |

## React and Vite notes

- Attributes React's types do not know yet: spread them, `{...({ popover: '', commandfor: id } as any)}`. Do not drop the feature for a type error.
- Open a `<dialog>` with a ref: `ref.current?.showModal()`. A dialog opened with `open` or `show()` is not modal.
- Per-instance ids and `anchor-name`s: `useId()`.
- Keep `:root` and `@starting-style` rules at the top level of the stylesheet.
- A view transition's update callback must change the DOM before it returns, so call `flushSync` inside it. (Our own note, not from the source.)
- Without a feature, the old behaviour stays. Never remove the fallback to "clean up".

## Your project's look

Features serve the project's chosen look (see its `CLAUDE.md` and `bolt-mode/taste.md`). A modern feature never brings a default browser look with it. Restyle `::backdrop`, `accent-color`, focus rings and `<select>` to match. For languages written without spaces (Thai, Chinese, Japanese), test `text-wrap` and `hyphens` on a real phone with real text.

## Known gaps

The source has **no** guidance on service workers, offline, IndexedDB or storage, and its two PWA guides are Chrome-only (`beforeinstallprompt`, Web Install API; iOS has neither). For those topics read the app's own code and check MDN. Do not invent a pattern from this skill.

## References

- `references/ios-support.md`: the dated Safari table. Read first.
- `references/css-layout.md`: layout, units, selectors, tokens, dark mode, type, fonts.
- `references/motion-dialogs.md`: motion, view transitions, entry/exit, dialog, popover.
- `references/forms-input.md`: forms, validation, iOS input quirks, non-Latin input.
- `references/performance.md`: loading, long tasks, images, fonts, caching.
- `references/accessibility.md`: focus, targets, live regions, names.
- `references/js-html.md`: JS built-ins and HTML semantics.
