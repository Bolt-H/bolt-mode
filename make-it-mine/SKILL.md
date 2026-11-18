---
name: make-it-mine
description: Tune this skill kit to you. Reads your own recent Claude Code prompts (with your permission), describes your prompting style, asks 5-8 short questions, then edits the kit's skills in ~/.claude/skills/ to fit you (name, language, playbook, model and effort for your plan, taste, testing rules), and gives you 2-3 tips. Run once after installing, and again whenever you want to retune. Runs only on /make-it-mine.
disable-model-invocation: true
---

# Make it mine

Tune the kit (`bolt-mode`, `idea-interview`, `unslop`, `motion`, `modern-web`, `last30days`, `be-ambitious`) to the person running it. Use the language the user writes in for this whole conversation. Keep every step short and friendly; the user may be new to this.

Rules for this skill:
- Edit only files inside `~/.claude/skills/` that belong to this kit. Never touch other skills, `settings.json`, or any project.
- Before each edit, back up the file once as `<file>.bak` next to it (skip if a `.bak` already exists), so the user can undo.
- Never copy the user's prompts into any file, and never repeat long pieces of them in the chat. Describe patterns; quote at most a few words.
- Nothing leaves the machine. Do not fetch, upload or post anything.

## Step 1. Ask permission to read prompts

Say this, in your own words, and wait for a yes:

> I can read your last ~50 Claude Code prompts to see how you write and work. I will read only the messages you typed (not Claude's answers, not tool output) from `~/.claude/projects/*/*.jsonl` on this computer. I will not save or send them anywhere. May I? You can also say no and answer the questions instead.

If the answer is no, skip to Step 3 and ask all the questions.

## Step 2. Read and describe the style

1. Check the skill folder for `extract-prompts.mjs` (next to this file). Tell the user what it does in one line, then run `node <this folder>/extract-prompts.mjs 50`. It is read-only. If `node` is missing or it fails, read the newest few `.jsonl` files by hand with Read and Grep, taking only lines whose `type` is `user` and whose content is the user's own text, and stop at about 50 prompts.
2. Describe the style in 5 short bullets. Base each on what you saw, and say "not enough data" where it is thin:
   - **Language**: which language or mix, and whether replies seem to be wanted in the same one.
   - **Length**: typical length (one line, a paragraph, a long dictated block).
   - **Done check**: how often they say when the work counts as done ("done when", "should show...", "tests pass").
   - **Mid-way corrections**: how often they correct or redirect after the first answer ("no, not that", "I meant..."). Give a rough ratio like "about 1 in 4 prompts".
   - **What they ask for most**: the top 2-3 kinds (build a feature, fix a bug, explain code, design a screen, write text, research).
3. Show the five bullets and ask: "Does this sound like you?" Take corrections.

## Step 3. Ask 5-8 short questions

Ask them **one at a time**, skipping any the prompts already answered clearly (say what you assumed). Offer 2-3 concrete options where you can, plus "something else".

1. **Projects**: what are you building or learning right now? (a line each)
2. **Stack**: what languages, frameworks or tools do you use most?
3. **Language**: what language should replies be in? (code and commands stay as they are)
4. **Budget and plan**: which Claude plan are you on (Free, Pro, Max, API)? Do you often run out of usage?
5. **Taste in design**: a few words on what you like and dislike (clean and plain, playful, dark, dense...). Any app whose look you love?
6. **Ask versus do**: should I ask more before acting, or decide routine things myself and tell you after?
7. **Testing**: should I run tests on every change, and should live checks wait until the end in one list, or do you want to check as we go?
8. **Name** (optional): what should I call you?

## Step 4. Edit the skills

Find the installed kit in `~/.claude/skills/` (on Windows `%USERPROFILE%\.claude\skills\`). If a skill folder is missing, say so and skip it. Make these edits, and **only** these:

| File | Change |
|---|---|
| `bolt-mode/SKILL.md`, "Your settings" table | Fill in **Name to use**, **Reply language**, **Plan**, **Default model and effort** (see below), **Asking vs doing**, **Testing**, **Projects and stack**. |
| `bolt-mode/SKILL.md`, playbook table | Add or reword rows to match what they ask for most (for example a "Study" playbook for a learner, a "Write" playbook for docs) and drop rows they will never use. Keep the table to about 8 rows. |
| `bolt-mode/taste.md` | Replace the example lines with facts the user said in Step 3 question 5, dated today. Only what they said, never a guess. |
| `bolt-mode/SKILL.md`, sections 5 and 6 | Rewrite the testing rule and the report wording to match their answer to question 7. |
| `idea-interview`, `unslop`, `be-ambitious`, `last30days` | Only if the reply language is not English: make sure the "reply in the reply language" lines stay and that the default example phrases match their language. Do not translate the whole skill. Add their name where a "the user" line reads awkwardly, only if they gave one. |
| `modern-web/SKILL.md` | If their stack is not a web app, add one line at the top: "Only use this skill for web UI work." If it is web, name the target browsers they care about. |
| `motion/references/project-motion.md` | Leave as the template. Mention in the summary that they can fill it in for their first project. |

**Model and effort defaults by plan** (write into the settings table):

| Plan | Default |
|---|---|
| Free | Sonnet at `low` effort; short sessions; one task per session. |
| Pro | Sonnet at `medium` effort for building, `low` for mechanical work; Opus at `medium` only for design taste or hard reasoning; never `high`. |
| Max | Sonnet at `medium` by default, Opus at `medium` for planning and design, `high` only when asked. |
| API | Same as Max, and mention that cost shows up per token, so keep long outputs in files. |

For each file you changed, show a **short before/after** (3-6 lines each, just the changed lines), like:

```
bolt-mode/SKILL.md  (settings table)
before: | Reply language | the language the user writes in |
after:  | Reply language | English |
```

Then tell them the `.bak` files can be deleted once they are happy, and that they can undo any file by copying its `.bak` back.

## Step 5. Give 2-3 tips

Based on what you actually saw in their prompts (not generic advice), give 2-3 tips, each one line plus a tiny before/after. Pick from what fits:
- **No done check** -> add one: "Done when: the page shows X and tests pass."
- **Many corrections** -> add a "Not allowed" line and one example of the output they want.
- **One long mixed prompt asking for 4 things** -> number the goals and say which matters most.
- **Vague words** ("make it nicer") -> name one concrete thing ("bigger title, one accent colour").
- **Always asking for everything at once** -> use `/bolt-mode` and let it run to the end.
- **Never asks for proof** -> add "Proof: show me the test output or a screenshot."

If there was no prompt data, give the 3 general tips from the README ("goal, done when, not allowed, proof") instead, and say that is what you did.

## Step 6. Close

End with 3 lines: what you changed, how to retune ("run `/make-it-mine` again any time"), and the one thing to try next (`/bolt-mode` with a real task).
