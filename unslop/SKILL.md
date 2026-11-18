---
name: unslop
description: Check a screen, its motion and its words for the tells that make work look machine-made or careless, and fix them before the user sees it. Use before handing over anything the user will look at (screen, page, component, animation, UI text, doc), when they say it looks off, generic, jerky or "AI slop", and when they ask to unslop, polish, critique or review a design.
---

# Unslop

Get it right the first time. Before you show anything, look at it the way the user will on their own device, and remove whatever gives it away as rushed or machine-made.

Read only the files the work touches:

| The work has | Read |
|---|---|
| Any text a person reads: UI labels, instructions, docs, ticket comments, commit messages | `wording/rules.md` |
| Anything drawn: layout, type, colour, spacing, images, icons | `design/rules.md`, then `design/refuse.md` before the first edit |
| Anything that moves: page changes, sheets that open, presses, loading | `animation/rules.md` to check it; the `motion` skill to design new motion |
| A request to critique or review a design | `critique.md`, instead of the steps below: report and ask, don't fix |

A screen usually needs the first three. Also read `bolt-mode/taste.md`: it holds what the user already said they like and dislike.

## How to run it

1. **Look at it the real way.** Open it at the size the user uses (a phone is 390 x 844) and take screenshots of every state: the list, the page you reach from it, every sheet, pressed, empty and long data. For motion, step through it frame by frame (see `animation/rules.md`). A rule you checked only in the code is not checked.
2. **Go down the checklist** for each kind the work has. Write down each tell you find, with where it is.
3. **Fix the tells in one batch, then look again.** Fix everything one look showed before the next screenshot, rather than a screenshot per tweak. One fix often causes another tell, for example a smaller font that leaves a highlight hanging.
4. **Measure what can be measured** with a script in the page rather than by eye: contrast, tap-target size, smallest text, overflow, whether a sheet opens at its top, where focus lands. `design/rules.md` has a script you can paste in. Your own sense that a rebuild "matches" the design is the least reliable check there is; put the two side by side.
5. **Tell the user what you checked and what you could not**, plainly. For example: "I could not watch the animation because the browser pane was hidden." Never say something is smooth if you did not see it move.

## What counts as a tell

A tell is anything a careful designer would not have shipped: a gap, a break, a jump, a word that says nothing, a piece nobody asked for. If you notice it, the user will too, so fix it rather than mention it. If you are unsure, do the plain, careful thing.

The project's own look comes first. Where a project has chosen a look (see its `CLAUDE.md` and `bolt-mode/taste.md`), keep to it, and read these rules inside it: a pattern the look chose is its own, not a default. Contrast, 44px targets and visible focus hold under any look.
