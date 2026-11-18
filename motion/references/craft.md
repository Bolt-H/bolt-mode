# Motion craft: the numbers

Read at step 4 of `SKILL.md`. Most numbers here were measured frame by frame on shipped launch films by the HyperFrames team (see `NOTICE.md`), then scaled down for a phone UI. Where a number is mine rather than measured, it says "start at" and you tune it at the checkpoints.

## Curves by role

GSAP names curves by degree minus one (`power2` is cubic, `power3` quartic, `power4` quintic). CSS has no names, so use these.

| Role | GSAP name | CSS |
|---|---|---|
| Arrive, soft | `power2.out` | `cubic-bezier(0.33, 1, 0.68, 1)` |
| Arrive, firm | `power3.out` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Arrive, snappy | `power4.out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Arrive, long glide | `expo.out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Leave | `power2.in` | `cubic-bezier(0.32, 0, 0.67, 0)` |
| Leave, accelerating | `power3.in` | `cubic-bezier(0.5, 0, 0.75, 0)` |
| Move on screen | `power2.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Small overshoot | `back.out(1.4)` | about `cubic-bezier(0.34, 1.4, 0.64, 1)`, tune by eye |

- **Mirrored pair for a seam:** leave on `power3.in`, arrive on `power3.out`, same distance and same duration on both sides; the speed then matches exactly at the handoff.
- A smooth `.inOut` on either side of a seam brings both sides to rest at the handoff, which is the dead beat the seam law forbids.
- `bounce` and `elastic` curves read as a cartoon on UI. A real spring (below) is the only bounce worth having, and only on things with mass.

## Springs in CSS

CSS `linear()` (Safari 17.2+) can hold a spring sampled into points. Generate the string once while building and keep it as a token; never compute it on every tap.

```js
// A spring as a CSS easing. zeta: damping ratio (1 none, 0.8 premium, 0.5 playful). ms: the animation's duration.
function springEasing(zeta = 0.8, ms = 450, steps = 40) {
  const omega = 4.6 / (zeta * (ms / 1000)) // settles within 1% by the end
  const wd = omega * Math.sqrt(Math.max(1e-6, 1 - zeta * zeta))
  const points = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * (ms / 1000)
    const x = zeta < 1
      ? 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t))
      : 1 - Math.exp(-omega * t) * (1 + omega * t)
    points.push(+x.toFixed(4))
  }
  points[steps] = 1
  return `linear(${points.join(', ')})`
}
```

A measured reference: a bottom sheet in a real app rose, passed its rest place by about 13% of its travel and settled 0.72 s after it started. On a phone UI keep the overshoot to a few px (a sheet: 4–8 px). Position and size may overshoot; opacity and colour never do.

## Choreography recipes

### Cascade (things arriving in order)

- One direction for the whole cascade, usually rising from below.
- Each element starts before the previous one settles; the gaps shrink as it goes (each gap about 0.84 of the one before), so it speeds up and resolves.
- Vary by weight: the anchor (a title, the field) travels further and longer; small words and marks travel less and snap.

| | Heavy | Normal | Light |
|---|---|---|---|
| Rise | 16–24 px | 10–14 px | 6–8 px |
| Time | 260–320 ms | 200–240 ms | 140–180 ms |

- Opacity reaches 1 in the first 30–40% of each rise; a slow fade fights the snap.
- In reading order, unless one element is what the user needs first (a field they will type into): then that one may lead.

### Swap in one place (a label, a count, a mark)

Old leaves, new arrives, on one spot, the seam law at small scale. A measured UI recipe: old lifts 18 px up while fading (180 ms, `power2.in`), new rises from 18 px below (260 ms, `power2.out`), starting 120 ms after the old one. A count works the same way with 10–12 px. Use tabular figures so digits do not jitter.

### Handoff (one state's content replaced by the next, mid-motion)

- The old content travels about 12% of its container in the current's direction on `power3.in`; its fade is done by about 30% of that travel.
- The new content starts at the mirrored offset, already at opacity 0.35 and already moving, on `power3.out`, same distance and time.
- The swap frame lands mid-motion; nothing is ever at rest at the seam. Both sides are never fully visible at once.

### Morph (one container becomes the next)

- Animate the container with `transform` only (translate and scale, the FLIP way: measure both layouts once, then interpolate). Width and height tweens relayout every frame.
- Children either counter-scale to stay undistorted, or crossfade: old children gone by 30% of the morph, new children in from 60%.
- Only the bare thing travels; padding, highlighter and decoration arrive with the destination (see `unslop` on shapes that stretch).

### Group slide (a list making room)

One built-in curve ends in a smack. Chain three phases on one property: ramp 10% of the distance in 20% of the time (`power3.in`), burst 65% in 18% (linear), tail the last 25% in 62% (`power4.out`). The tail is at least 3× the ramp's time. Reveal the new item during the burst; the burst hides its appearance.

```js
el.animate([
  { transform: 'translateY(0)', easing: 'cubic-bezier(0.5, 0, 0.75, 0)' },
  { transform: `translateY(${0.1 * d}px)`, offset: 0.2, easing: 'linear' },
  { transform: `translateY(${0.75 * d}px)`, offset: 0.38, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { transform: `translateY(${d}px)` },
], { duration: 570 })
```

### A beat before the payoff

Films hold 0.3–0.75 s between an action and its result. A UI cannot make the user wait that long; its version is one beat of 80–120 ms: a secondary note lands a beat after its page, the tick lands a beat after the press.

### Blur

Peak 6–10 px on text-sized things, 15–20 px full-screen, only during the fastest frames. Blur is costly on a phone and most UIs are drawn flat, not with optics, so start without it.

## Transitions that have a cause

Pick two or three for an app and repeat them, so they become its vocabulary.

| Kind | How | Fits |
|---|---|---|
| Morph | the tapped container becomes the next container | a button into a box, a card into a page |
| Grow from the cause | the new thing grows from the point that was tapped, scale up with the fade done early | a box, a menu, a note opening |
| Carry across | one element travels from the old place to its place on the new page | a face, a name, a number |
| Rise over | a slip rises over the dimmed page and sinks back | sheets, picker steps |
| Colour flood | the hero stays while the ground changes colour | a state change of the whole page |
| Iris from the tap | `clip-path: circle()` opens from the tap point, 150–250 ms | a bold reveal; it repaints, so test on the phone |
| Swap on one stage | old fades out, new arrives on the same spot; the ground never moves | two states of one control |

## When the user says

| The user says | Change |
|---|---|
| "too fast" | slow the travelling moves to about 0.7× their speed; leave presses and swaps alone |
| "slow", "it drags" | shorten the exits and the stagger first, then the entrance |
| "jumps", "like slides" | give the change a carrier and hand off mid-motion |
| "everything at once" | stagger in reading order, each starting before the last settles |
| "bouncy", "cheap" | take the overshoot off text and controls; keep it only on things with mass |
| "it jumps at that moment" | screenshot just before and just after the seam, then match position and speed there |
| "it stutters" | `unslop`'s animation rules (transform and opacity only, own layers, Low Power Mode) |

## Tells that look generated

The same fade-and-rise on every element; one curve and one duration everywhere; idle loops standing in for life; everything arriving on one frame; every page entering the same way whatever the cause; motion that makes the user wait for their own tap. When you find one, name it in the plan and replace it with something taken from the cause or the app's material.

## Seeing it

Every frame of a CSS or WAAPI animation is a function of its time, so you can stop it at any ms and look, the way a video renderer seeks.

```js
// Freeze every animation at `ms` after it started, then screenshot.
const seek = (ms) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms })
// Land and hold: nothing still running after the plan's last ms.
const stillMoving = () => document.getAnimations().filter((a) => a.playState === 'running').length
```

- Start every element of one change at the same moment with its own `delay`, so one ms means one moment across all of them.
- Seek to each checkpoint, plus 40 ms either side of each seam; that is where a jump hides.
- View Transition pseudo-elements show up in `document.getAnimations()` too while the transition runs.
- Write the plan's intent as checks you can run in the page: "the box is visible by 120 ms", "nothing running after 500 ms".
