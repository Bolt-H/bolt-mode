# Unslop: design

What makes a screen look generated or careless, and what to do instead.

## A look of its own

- **No default look.** Default system font, soft grey cards, one accent gradient, pill buttons, emoji icons and everything centred in identical rounded boxes are what people call "AI slop". `refuse.md` lists the rest. Follow the project's chosen look (its `CLAUDE.md`, `work-mode/taste.md`). If there is none yet, propose two or three real directions and let the user choose.
- **Borrow the pattern, not the skin.** When the user points at another app ("like a popular chat app"), copy how it works and how it is proportioned: a round face of a good size, the name, one line under it. Draw it in the project's own look.

## Alignment, size and proportion

- **Centre what is meant to be centred, and measure it.** A face in a circle, a title over a page or a ring on a row should sit exactly in the middle. Check it with a script: compare the left and right gaps, or the image's box against its frame. An eye on a small screenshot misses a few pixels.
- **Don't zoom pictures to fill a frame.** Show the whole picture, scaled to fit. Zooming crops the face and pushes it off-centre.
- **A face is filled.** A letter avatar has a background of its own, never just a ring, or it doesn't read as a profile picture. Use the page's own material or the accent. A flat grey wash looks gloomy.
- **Use a true circle when you mean a circle.** Hand-drawn wobble suits a ring around a letter in a sketchy look. A photo or avatar sits in a true circle.
- **Size faces like the app you borrow from.** List faces in popular chat apps are clearly larger than a minimum tap target. Too small reads as an afterthought.
- **Type in steps.** Body text, one smaller size for secondary lines, one larger for titles. Nothing under 14px on a phone. A sheet of instructions can be a size below the page, so it fits without scrolling.

## Highlights, underlines and decoration

- **A highlight never breaks in the middle of a word.** If a highlighted path or command wraps, it splits into odd boxes. Put the thing on a line of its own and let the line break only between words. Use `box-decoration-break: clone` if it must wrap.
- **One underline under one label.** If an arrow or icon follows a link's text, put both in one element under one underline. A gap in the underline looks broken.
- **Decoration has a job.** A highlighter marks the one thing that matters on the screen, not every bold word.

## Layout on the phone

- **A sheet opens at its top.** If it scrolls to its foot when it opens (often because focus went to a button at the bottom), the person starts reading in the middle. Focus the sheet's title with `preventScroll`.
- **Nothing hides under a fixed bar.** Check the last line and the last button above any fixed bar and the home indicator.
- **Long and empty data.** Try the longest name, a missing field, an empty list and a long unbroken string such as a URL. Each should still look intended ("not written yet" in grey, not a blank).
- **Space has rhythm.** Tight inside a group, generous between groups, and more space above a heading than below it, so the heading belongs to what follows. Read the computed values.
- **One job, one component.** Two rows that both open a page look alike; things that look different do different things.
- **A pressed thing stays put.** Tint it, or move a child inside it, so it never slides out from under the finger.
- **Popups escape their box.** A menu inside an `overflow: hidden` parent gets clipped; use `<dialog>`, the popover API or `position: fixed`.
- **Inputs at 16px or more**, or iOS Safari zooms in when one gets focus.

## Every state, and the parts you did not draw

- **Every control has its states**: default, pressed, focus, disabled, loading, error. A screen with no pressed state feels dead on a phone.
- **Browser surfaces carry the look too**: text selection, the caret, the focus ring, underline offset, scrollbars. Theme them from the palette. Models skip these most often, and they are the cheapest sign that a page was built rather than assembled.
- **Line breaks.** `text-wrap: balance` on headings and `pretty` on body text, then look where lines actually break on the phone, especially in languages written without spaces (Thai, Chinese, Japanese). Break a heading by hand only between phrases.

## Accessibility (part of looking finished)

- Contrast at least WCAG AA: 4.5:1 for text, 3:1 for large text, controls, icons and focus rings.
- Every tap target at least 44 x 44px.
- Focus goes somewhere sensible after every change, and back to the row you came from when you return.

## A check to paste into the page

Run this in the browser on each state. It reports text under 14px, low contrast and small tap targets.

```js
const parse = c => { const m = c.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 } }
const lum = ({ r, g, b }) => { const f = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
const bgOf = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { const p = parse(getComputedStyle(e).backgroundColor); if (p.a > 0.9) return p } return parse(getComputedStyle(document.body).backgroundColor) }
const issues = []
for (const el of document.querySelectorAll('body *')) {
  const text = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent).join('')
  if (!text || !el.getClientRects().length) continue
  const cs = getComputedStyle(el)
  if (parseFloat(cs.fontSize) < 14) issues.push(`small ${cs.fontSize}: ${text.slice(0, 30)}`)
  const a = lum(parse(cs.color)), b = lum(bgOf(el)), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  if (ratio < 4.5) issues.push(`contrast ${ratio.toFixed(2)}: ${text.slice(0, 30)}`)
}
for (const b of document.querySelectorAll('button, a, [role=button]')) {
  const r = b.getBoundingClientRect()
  if (r.width && (r.width < 44 || r.height < 44)) issues.push(`tap ${Math.round(r.width)}x${Math.round(r.height)}: ${b.textContent.trim().slice(0, 30)}`)
}
issues
```
