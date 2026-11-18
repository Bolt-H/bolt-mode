---
name: motion
description: Design UI motion that feels crafted in React/CSS web apps and PWAs: timing, easing, choreography, the seam between two states, and when to keep still. Use when planning or building an animation, a page change, or anything that opens, closes or moves.
---

# Motion

Motion is craft you can see: every move has a **cause**, says one thing, and lands still. This skill is the design side. The check side is `unslop` (its `animation/rules.md`); run it before handing over. For which platform feature to use and whether iPhone Safari has it, use `modern-web`.

## Steps

1. **Read what already moves.** Grep the app for `transition`, `animation`, `@keyframes`, `startViewTransition`, `.animate(`. List the curves, durations and directions in use. New motion reuses them, so the app keeps one vocabulary. `references/project-motion.md` is a template for writing that list down. Done when you can name the app's arrival curve, its leaving curve and its page direction.
2. **Decide what moves and what stays still** (see "Keep still" below). Done when each candidate change has a yes or no and the reason.
3. **Write the motion plan** before any code, in the template below, with a number wherever you would write an adjective. Done when every change has a cause, a seam row, a timeline in ms, a reduced-motion line and checkpoints.
4. **Build it** with `transform` and `opacity`, in CSS, WAAPI or View Transitions, using the app's tokens, never literal curves. Recipes and exact numbers: `references/craft.md`.
5. **Look at it frame by frame.** Pause every animation and seek it to each checkpoint (`references/craft.md`, "Seeing it"), screenshot at phone size (390 x 844), compare with the plan. Then run `unslop`. Done when each checkpoint frame shows what the plan says, and nothing is still moving after the plan's last ms. If you could not watch it, say so.

## The laws

- **Cause.** A move starts on the frame of its cause: the tap, the save, the data arriving. It comes from where the cause is (the thing tapped). Nothing starts "a moment later" by itself.
- **Seam.** How A leaves decides how B enters: same axis, same direction, same speed at the handoff. Leave on an ease-in, arrive on the matching ease-out, the two halves of one curve. Hand off mid-motion; a state that settles to rest before the next one starts is a dead beat. Back runs the forward path in reverse.
- **Scale is a direction.** Opening grows on both sides of the seam; closing shrinks on both sides. A box that shrinks away is answered by something shrinking into place, never by something growing from small.
- **Carrier.** The best seam hands one concrete thing across: the button becomes the box, the face travels to its page. A crossfade has no carrier; keep it for a swap on one spot.
- **Current.** One direction means "next" across the app; back is its mirror. Other directions are reserved and carry meaning (up: something rises over the page). Consecutive changes keep the current unless a visible cause turns them.
- **Ease by role.** Arriving: a long-tailed ease-out. Leaving: an ease-in, about 60-75% of the entrance's time. Moving between two places on screen: ease-in-out. Linear only for progress, rotation and constant speed. One curve on everything is the generated default.
- **Overlap.** The next element starts when the one before is 30-50% done. List items 40-80 ms apart, words 60-120 ms; a whole cascade inside a UI stays under about 300 ms.
- **Weight.** Heavy things (a box, a sheet, a page) travel further and longer; light things (a label, a chip) travel less and snap. Overshoot belongs to things with mass, and stays off text, numbers and controls. Springs are named by damping ratio: 1.0 no bounce, 0.75-0.85 premium, 0.45-0.6 playful.
- **One idea per move.** Combine properties only when they say the same thing: rise plus fade says "arriving". Text in flight stays upright and readable.
- **Land and hold.** Once something lands it is still. What keeps moving is only what is live: a count that changed, a sync note. Decoration loops (breathing, floating, pulsing, shimmer) are out.
- **Arrive from close by.** Content rises 8-24 px, a page slides 40-56 px, with the fade finished in the first 30-40% of the travel. Partial travel beats a trip from off-screen.

| What | Time |
|---|---|
| Press | shows on pointer-down; releases in 120-180 ms |
| Small swap (label, chip, count) | 120-200 ms |
| Box or sheet opening | 240-320 ms; its contents landed by about 450 ms |
| Page change | 320-420 ms; a long travel grows with distance, up to about 600 ms |
| Closing | 60-75% of its opening |

Motion the user sees twenty times a day is shorter than motion they see once.

## Keep still

- Anything under the finger (typing, scrolling, dragging) follows the finger.
- Text while it is being read.
- The result of a tap: the state changes on the tap and motion only shows it. Focus and input work from the first frame.
- A problem message: it appears in place, quickly.
- A state the user is coming back to (closing a help card): it is restored, not opened again, so its entrance does not replay.
- `prefers-reduced-motion: reduce`: no movement; at most an opacity change of 120 ms.

## The motion plan

```
GOAL:        what the motion makes the user understand, one line
STATES:      A -> B, and back
CAUSE:       what starts each change, on which frame
CARRIER:     what travels across, from where to where
SEAMS:       per change: exit (axis, direction, ease, ms) | entry (axis, direction, ease, ms) | carrier
TIMELINE:    per element, ms from the cause: property from -> to, token, start, duration
STILL:       what does not move, and why
REDUCED:     what happens with reduced motion; FALLBACK where a feature is missing
CHECKPOINTS: the ms to seek and screenshot, and what each frame must show
```

## References

- `references/craft.md`: CSS curves by role, springs in CSS, cascade, swap, morph and group-slide recipes, transitions that have a cause, what to change when the user says "too fast" or "jumpy", and how to seek animations frame by frame. Read it at step 4.
- `references/project-motion.md`: a template for your app's motion vocabulary and tokens. Fill it in once per project (step 1), then reuse it.
- `references/video.md`: turning HTML into video with HyperFrames, as a later option. Read it only when the user wants a video.
