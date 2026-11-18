# Your app's motion vocabulary (template)

Fill this in once per project, in step 1 of `SKILL.md`, then reuse it so every new animation speaks the same language. Check it against the code before you rely on it: it goes stale.

## What already moves

| Where | What | Numbers |
|---|---|---|
| (example) List to detail page | page slides in from the right, back runs in reverse | 0.36 s, `cubic-bezier(0.2, 0.8, 0.2, 1)`, in from 56 px |
| (example) Bottom sheet | rises over a dimmed page | 0.28 s, ease-out, from 40 px |
| (example) Row press | background tint | 0.15 s |
| Reduced motion | nothing moves | |

## The vocabulary to keep

- **The current:** which direction means "next" (for example: opening a page enters from the right; back enters from the left).
- **Up means "over the page":** a sheet or box rises over the page it belongs to and sinks back.
- **Travellers:** the thing tapped (a face, a name) travels to where it lands.
- **A beat:** a secondary thing lands about 0.1 s after its page.

## Motion from the material

If the look has a material (paper, glass, ink, metal), let things move the way that material would. Write 3-5 lines here, for example "paper is slid, never zoomed through".

## Proposed tokens

Add these to the project's stylesheet when you agree them, and move the literal values onto them so one change retunes the app.

```css
:root {
  --ease-travel: cubic-bezier(0.32, 0.72, 0, 1); /* travelling a distance, growing from a cause */
  --ease-settle: cubic-bezier(0.2, 0.8, 0.2, 1);  /* pages, sheets, notes landing */
  --ease-leave: cubic-bezier(0.5, 0, 0.75, 0);    /* closing, leaving: accelerates away */
  --ease-swap: cubic-bezier(0.65, 0, 0.35, 1);    /* moving between two places on screen */
  --dur-press: 140ms;
  --dur-small: 180ms;
  --dur-box: 280ms;
  --dur-page: 360ms;
  --beat: 100ms;
}
```

## Local facts to record

- Which device and browser the user watches on. A one-frame jerk is easy to see on a phone. If it stutters only on an iPhone, ask about Low Power Mode first (`unslop`).
- Typing opens the iPhone keyboard only when focus happens inside the tap itself. Keep focus inside the tap and animate around it.
- Tests that run in jsdom animate nothing. Build motion so a test sees the end state at once, for example by skipping the animation when `matchMedia` or `element.animate` is missing.
