# Unslop: critique a screen

For when the user asks to critique or review a design. A critique reports and asks; fixing is the next turn, after they pick. Rubric adapted from Impeccable's critique (see `NOTICE.md`); the ten heuristics are Jakob Nielsen's.

## Steps

1. **Pin one target**: one screen in one state ("Home, logged in"), with its files. A narrow target read closely beats a whole app at a glance.
2. **Look at it the real way** (SKILL.md, step 1). If you can only read the source, the report's first line says so, and every finding is "from the code, to confirm on a real device".
3. **Judge before you measure.** Write the specificity verdict, scores and issues first. Then run the page check in `design/rules.md` and go down `design/refuse.md`, and add what they caught that you missed. Numbers read first anchor the judgment.
4. **Write the report** below, in the reply language, in the chat. The chat is the deliverable.
5. **End on one question** with 2-3 options taken from the findings (which to fix first, how far to go). Ask only that, last. Each fix can become a ticket if the user wants it kept.

## The report

- **Method**: rendered at phone size with screenshots of each state, or "source only, not rendered".
- **Belongs to this product?** Could another app use this screen unchanged? Name what makes it this product's, or what makes it the default.
- **Scores**: the ten heuristics below, 0-4 each, as a table with the key finding per row. `n/a` with a one-line reason when one cannot apply; the total is out of 4 x the number scored. Most real screens land at 20-32 of 40. A 4 means nothing left to fix.
- **What works**: two or three things, each with why.
- **Priority issues**: three to five, worst first. Each: `[P0-P3] what`, why it matters to the user, the concrete fix (selector, line, wording), and where (file:line).
- **Walk-throughs**: the user one-handed on a phone, interrupted; someone on a screen reader with large text; someone with the longest real data, an empty list and no network. Name what broke for each, not what they are like.
- **Minor notes**, then **the question**.

## Severity

| | Means |
|---|---|
| P0 | Blocks the task |
| P1 | Real difficulty, or fails WCAG AA |
| P2 | An annoyance with a way round it |
| P3 | Polish |

Unsure between two? If the user would stop mid-task over it, it is P1 or worse. Keep P3s few; a long tail buries what matters.

## The ten heuristics

| # | Heuristic | Look for |
|---|---|---|
| 1 | Status is visible | Every tap answers at once; saving, loading, offline and where-am-I are shown |
| 2 | Speaks the person's language | Their words and their world's notation, in a natural order |
| 3 | Control and freedom | Back, cancel and undo; nothing traps them |
| 4 | Consistency | One word and one component per job, across screens |
| 5 | Error prevention | Undo over confirm, constraints over warnings, nothing lost |
| 6 | Recognition over recall | Choices visible and labelled, nothing to remember from the last screen |
| 7 | Flexibility | Shortcuts for the frequent path that don't clutter the first one |
| 8 | Only what's needed | Each element earns its place; one clear focus |
| 9 | Error recovery | What failed, why, what to do now, with their input kept |
| 10 | Help in place | The reason or the how, at the point of use |

Score anchors: 0 absent or broken, 1 rare, 2 partial with big gaps, 3 good with small gaps, 4 excellent.

## Cognitive load, quickly

Fail count over these eight: one clear focus; groups of four or fewer; related things grouped; hierarchy obvious at a squint; one decision at a time; four or fewer choices at any decision point; nothing to carry over from the last screen; complexity shown only when needed. 0-1 fails is light, 2-3 moderate, 4 or more is a P1.
