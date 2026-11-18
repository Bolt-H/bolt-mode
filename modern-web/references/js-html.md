# JS built-ins and HTML

## JS

| Instead of | Use | Watch for |
|---|---|---|
| `JSON.parse(JSON.stringify(x))`, `_.cloneDeep` | `structuredClone(x)` | keeps Date, Map, Set, cycles; throws on functions and DOM nodes; drops class prototypes and private fields; not for JSON-normalising (`undefined` stays) |
| `[...a].sort()`, `a.slice().reverse()` | `a.toSorted()`, `a.toReversed()`, `a.toSpliced()`, `a.with(i, v)` | results are dense (no holes); do not use on a Set or NodeList without converting |
| `[...a].reverse().find(f)` | `a.findLast(f)`, `findLastIndex` | the index is the original forward index |
| `reduce` into buckets | `Object.groupBy(items, f)`, `Map.groupBy` | result has a null prototype; read with `Object.hasOwn` or `?? []`; keep `reduce` when it also transforms or sums |
| `let resolve; new Promise(r => resolve = r)` | `const { promise, resolve, reject } = Promise.withResolvers()` | keep `new Promise` when the work is inside the executor |
| `AbortController` plus `setTimeout` | `AbortSignal.timeout(ms)`; both with `AbortSignal.any([c.signal, AbortSignal.timeout(ms)])` | a timeout error is named `TimeoutError`, not `AbortError`; check both |
| `new Error('x: ' + e.message)` | `new Error('x', { cause: e })` | log the cause; do not send it to a client |
| split on `=` and `&` | `new URLSearchParams(s)` | `+` decodes to a space; `location.hash` needs `slice(1)`; duplicate keys: `getAll` |
| clear then append children | `el.replaceChildren(...nodes)` | |
| UTF-8 by hand | `TextEncoder` / `TextDecoder` | |
| global event bus on `window` | `new CustomEvent(name, { detail })` | |
| moving a node and losing focus or state | `moveBefore()` | no Safari: plain `insertBefore` there |

Dates: format with `Intl.DateTimeFormat` (pass a locale; for example `th-TH-u-nu-latn` gives Thai text with Latin digits). Durations: `Intl.DurationFormat`. Sort timestamps with a high-precision source, not `Date.now()`, when the order matters within a millisecond.

## HTML

- `<!DOCTYPE html>`, `lang`, viewport meta (`width=device-width, initial-scale=1`; add `viewport-fit=cover` for the notch).
- `<button type="button">` inside forms unless it should submit.
- Boolean attributes without values: `disabled`, not `disabled="disabled"`.
- `<picture>` for formats, `srcset` for sizes, `loading="lazy"` off-screen.
- `<blockquote cite>`, `<figure>` and `<figcaption>`, `<cite>` for a work's title:.
- Scrollable `<pre>`: `tabindex="0"`, `role="region"` with a name.
- Web components (custom elements, shadow DOM, form-associated elements) exist but a React app is not built from them; do not add them without a reason.
