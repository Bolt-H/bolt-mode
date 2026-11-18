# Performance

The app is a single-page PWA, so the loading advice that matters is the shell, fonts and long tasks. Offline and storage are not covered by the source (see SKILL.md, Known gaps).

## Loading

- Scripts: `type="module"` is deferred already. Non-critical third-party code gets `defer` and goes late. Self-host what you can.
- No `@import` in CSS: it chains requests. Split CSS by `media` where a part only matters at one size.
- `preconnect` for a known origin you will call, `preload` for what this view needs now, `prefetch` for the next view. The app has no font CDN, so it needs little of this.
- Images: `width` and `height` always. `loading="lazy"` below the fold, never on the first image. `fetchpriority="high"` for the one main image only. `srcset` with a real `sizes`. AVIF or WebP through `<picture>`.
- Avatars here are small circles; request the size shown.

## Long tasks and input

- Any script over 50 ms blocks taps. Split it and yield between pieces.
- Yield with `scheduler.yield()` where it exists, otherwise `await new Promise(r => setTimeout(r))`. `setTimeout` goes to the back of the queue, so it is the fallback, not the first choice. Safari has no `scheduler`.
- Update the screen first, then do heavy work in a Web Worker or deferred. Tapping must look instant.
- Debounce `scroll`, `resize` and fast `input` handlers.
- Batch DOM reads, then batch writes. Reading `offsetHeight` between writes forces layout each time.
- No heavy `setInterval` polling.
- Passing data to a worker: `structuredClone` or `transfer`.

## Rendering

- `content-visibility: auto` plus `contain-intrinsic-size: auto <guess>` for off-screen sections of long pages (Safari 26). Skip on short pages. Content stays in the accessibility tree.
- `contain: layout style paint` on an isolated widget keeps its changes from reflowing the page.
- `will-change` only on the element about to animate, never in bulk.

## Caching (from the source, general)

- Hashed bundles and fonts: cache first. HTML shell and manifest: network first. Dynamic reads: stale while revalidate. Cap cache size and age. Never cache POST. Do not cache opaque cross-origin responses heavily.
- `Cache-Control: no-store` on non-private pages stops the back-forward cache. Use it only for truly private data.
- This is a summary of principles, not an offline design. For service worker code, read the app's own code and MDN first.
