---
name: be-ambitious
description: Raise a task to the result the user would love, not the minimum they typed. Runs only on /be-ambitious.
disable-model-invocation: true
---

# Be ambitious

Ambition here means a **better outcome per token**, not more tokens. If the user is on a limited plan (see `bolt-mode/SKILL.md`), a plan that costs three times as much and lands the same result has failed this skill. Method from Felix Rieseberg, "How to be more ambitious" (see NOTICE.md).

The task is whatever follows `/be-ambitious`; with nothing after it, the user's latest request; with neither, ask for it in one line and stop. Reply in the reply language from `bolt-mode/SKILL.md`.

## The user's rules hold first

Ambition raises the standard. It never raises permissions.

- Push only on the user's yes, each time.
- A new ticket is a draft first; the user approves, then publish. Never start a ticket before they say go.
- Anything that runs on its own (a bot, a schedule, a service): read that project's own `CLAUDE.md` first. Never change a token, a schedule, standing config or what it may send without a yes.
- Anything that spends money, can't be undone, or replaces what they asked for: ask first, with 2-3 labelled options, one question.
- Edit only what the task covers. A better plan for their repo is text, not edits, until they agree.

## Steps

1. **Goal beyond the goal.** What does the user want to be true afterwards? Ask "what happens next?" of the deliverable, then of that answer. Finish when you can say it in one line, in their terms.
2. **Pick the lenses that fit**, usually one or two; name the skipped ones.
   - **Altitude**: aim at the outcome, not the artefact. Three rungs: a better deliverable built from the raw inputs; the decision or action it exists to drive; a better way to reach the outcome. Take the highest rung you can finish and check now.
   - **Depth**: start from the rawest material (the real files, logs, the screen on their phone), use the instruments the best practitioner uses, aim past the stated bar (the stated bar stays the pass line).
   - **Range**: restate the deliverable as verbs ("get a tired person to feel at home in 5 seconds"), then borrow what a field *does* (a motion designer tests at 10% speed). Methods, not role play. Run it as one pass of your own; no subagent crews unless the user asks.
3. **Budget gate.** For each addition write its cost (small / medium / large) and the outcome it buys. Drop it if it only makes the job bigger. Prefer, in order: reading what exists (their skills, the glossary, the code) over new research; one check over three; one screen done well over all screens done adequately, when the ask allows splitting. If the whole plan is large, say so and offer the first slice.
4. **Outside judge.** Name what shows it worked other than you saying so: a test, a measurement, the `unslop` checklists, a slowed-down animation, their own phone. If you cannot watch it, say so and ask them to look.
5. **Write the output** (short; size it to the task):
   - Goal beyond the goal, one line.
   - Lenses used and skipped, one line each.
   - The rewritten prompt in one block, in the user's voice, ending with the judge and the pass line.
   - Cost: what it spends, what it buys, what was cut for budget.
   - Needs: access or data missing, named exactly. Never invent a source or result.
6. **Then.** Handed a task: do the first rung that stays inside their rules and the budget, unless "The user's rules" says ask. Handed a prompt to improve: stop after step 5.

Finish when each addition has a cost, an outcome it buys, and a judge. Report honestly against the judge: a missed hard target with real numbers is a good result; a faked one is not.
