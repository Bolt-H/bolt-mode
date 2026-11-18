# Unslop: wording

Adapted, in our own words, from the `unslop` skill in cursor/plugins (pstack/skills/unslop) and from Impeccable's `clarify` reference and style guide (see `NOTICE.md`), with notes for UI text and for non-English text.

Edit the text so that it says what it means plainly. Keep the meaning and the tone.

## Say what it does

- **Name the mechanism or the number, not a feeling.** "Square pictures look best" is a feeling. "The app crops the picture to a circle, so a square picture keeps its edges" says what happens. If a line could sit unchanged in some other product, it says nothing about this one, so cut it.
- **Name the actor.** Prefer "The importer writes the file name into the project note" to "The file name will be written into...". Use the passive only when the actor is unknown or does not matter.
- **Use the plain word.** Use "use", not "utilize" or "leverage". Use "help", not "facilitate". Cut "in order to", "due to the fact that" and "it is important to note".
- **Cut adverbs propping up a weak verb.** Write "fast", or give the number, rather than "runs quickly".
- **One idea per sentence.** If the reader has to go back to parse it, split it.
- **Write whole sentences.** Don't drop articles and verbs, don't use arrows as words, and don't use abbreviations the reader has to decode.

## Words and phrases that give it away

- Vocabulary: crucial, delve, enhance, foster, garner, intricate, pivotal, showcase, testament, underscore, vibrant, seamless, robust, tapestry, landscape (abstract). Swap each for the plain word.
- "Serves as", "stands as", "boasts", "features" used in place of "is" or "has".
- "Not just X, but Y." State Y.
- Lists forced into threes. Use the real number.
- A different synonym every time for the same thing. Pick one name and keep it. This matters most in UI: one thing, one label, everywhere.
- "From X to Y" when X and Y are not two ends of one scale.
- Trailing "-ing" phrases ("..., ensuring a smooth experience"). Cut them.
- Vague sources ("experts say"). Name the source or cut the line.
- Metaphor nouns where a concrete word exists: surface, vector, substrate, north star, flywheel, harness, scaffolding.
- Mannered lines: aphorisms, fragments for effect, personified code. The pattern is the tell: one "Not a feature. A platform." is a choice, three on a page are a machine.
- Engineer words worn as flavour: load-bearing, highest-leverage, unlock, "X theater". Name the specific thing.
- Even rhythm: every sentence the same length, every paragraph the same size. Vary it on purpose.
- Chatbot lines: "Great question", "I hope this helps", "Certainly!". Hedging: "could potentially possibly". Endings like "the future looks bright".

## Punctuation and layout of prose

- No em dashes. Use a full stop or a comma.
- A colon only before a list or an example, never to join two clauses.
- Bold only for a real lead-in that ends with a full stop and is followed by new detail. Not "**Speed:** speed improved".
- Sentence-case headings, straight quotes, no decorative emoji.

## UI text in particular

- **Short on the page, full on a tap.** A screen shows the shortest true label ("No photo yet >"). The full steps open when asked for. A paragraph of instructions under a title is clutter.
- **Steps are numbered, one action each.** Put the exact thing the person types or looks for (a message, a folder, a file, a line) on a line of its own, so it can be read and copied whole.
- **Every label matches the action.** A button says what happens when it is pressed ("Got it", "Close"), not "OK". For something that destroys, name the thing and what happens, on the message and on the button ("Delete this note"), and prefer an undo to a question when the step can be undone.
- **Say each idea once.** If the title already says it, the line under it adds something new (what to do, what changed) or goes.
- **Errors say three things**: what failed, why when it is known, and what to do now ("Couldn't save. Try again."). Keep what the person typed.
- **Empty is not one state.** First use, nothing matched, and could not load each say what happened and offer the next step.
- **Loading names the real work** ("Opening your library") and never shows progress that isn't measured.
- **Other languages.** Use the digits the project chose (for example Latin digits, not Thai numerals, if that is the project's rule). Keep English terms the project already uses rather than inventing translations. Don't mix two words for one thing.
