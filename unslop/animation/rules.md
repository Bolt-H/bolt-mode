# Unslop: animation

Motion that feels made by hand: nothing jumps, nothing stutters, nothing looks hollow. People notice a jerk of a single frame on a phone, so test for it.

## Nothing teleports

- **Moving between pages moves.** Opening an item slides its page in. The thing tapped (a face, a name) travels from where it was to where it lands, and going back runs the same path in reverse. A page that simply replaces another looks like a warp.
- **Pressing shows at once.** A row changes colour while it is held, so the press registers before the page moves.
- **Sheets rise; they don't appear.** Keep it short (about 0.2s) and ease out.

## Smooth, every frame

- **Animate only `transform` and `opacity`.** Anything else (width, top, margin, box-shadow, background, a font size) makes the browser lay out or repaint every frame, and on a phone that drops frames. To grow something, scale it.
- **Don't animate inside a page snapshot.** In a view transition, an element animating inside the new page forces the whole page to repaint each frame, which causes stutter. Give the element its own `view-transition-name` and animate its `::view-transition-new(...)` instead, so it moves as its own layer.
- **Match the time to the distance.** A fixed time makes a long trip a fast streak that looks rough. Let the time grow with the distance, for example 0.40s for a short trip up to about 0.62s for a full-screen one.
- **Ease like a real object.** Fast out, slow in, for example `cubic-bezier(0.32, 0.72, 0, 1)`. Never linear for movement.
- **Keep it under about 0.6s.** Longer feels slow. A secondary element can land one beat (about 0.1s) after its page.

## Things that travel keep their shape

- **The two ends must have the same shape.** If the source and the target differ in padding, background or aspect ratio, the browser stretches between them, and a short word swells and then shrinks. Travel only the bare element (the text, the face) and let the padding and background arrive with the page.
- **Scale evenly.** For travelling text and images, set `::view-transition-old/new(name) { height: 100%; width: auto; }` so they scale by height and never squash.
- **What travels must be solid.** A ring with nothing inside (a letter avatar with no fill) looks hollow in flight. Give every face a solid fill. Plain text travels fine. Leave decoration such as a highlight off a travelling name rather than dragging it along.
- **Each traveller has a unique name, only while it travels.** Tag the tapped element just before the transition and clear the tags when it finishes. Two elements with the same name cancel the transition.

## Respect the person and the device

- **Reduced motion.** With `prefers-reduced-motion: reduce`, change pages with no movement.
- **A fallback.** Where view transitions are missing (Safari before iOS 18), still slide the new page in with a CSS animation.
- **Never block a tap.** A view transition waits for a painted frame, and a page in the background may never paint. Skip the transition after a short wait (about 0.6s) so the tap still changes the page.

## How to check it

- **Watch it, at phone size, more than once.** Try the item at the top and the one at the bottom, short names and long, with and without a picture.
- **Slow it down.** Set every animation's playback to 10%, for example `document.getAnimations().forEach(a => a.playbackRate = 0.1)` during the transition, or use the browser's animation tools. Look for anything that stretches, jumps or shows through.
- **Rule out the phone first.** If it stutters only on an iPhone, ask whether Low Power Mode is on. It lowers the frame rate and can be the whole cause.
- **If you cannot watch it** (the browser pane is hidden, or there is no display), say so. Check the logic with a script: the page changed, focus came back, no tags were left over. Then ask the user to look on their phone.
