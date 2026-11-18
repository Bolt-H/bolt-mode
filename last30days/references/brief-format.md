# Brief format

Audience: the user, someone building with Claude Code. Short sentences, plain words, English for product names and quoted text. Write the brief in the reply language set in `bolt-mode/SKILL.md` (translate the headings below into it). No emojis, no em or en dashes, digits 0-9 only.

## Shape

1. Title line: `# What people say about <topic> (<FROM> to <TO>)`
2. One answer paragraph: what people mostly say, 2-3 sentences, strongest cluster first.
3. 3-6 clusters. Each is one paragraph that starts `**Short heading** - ` then the claim, then who said it with an inline link: `([r/ClaudeAI](url), 14 Nov)`. One or two sources per cluster. Add "seen in one place only" to single-lane claims. Body has no `##` headers.
4. `Quotes from users` (2-6 quotes): the original line, who, where, link. Quote short; paraphrase long comments.
5. For a PRODUCT: `Marketing claim vs what users say` - the first-party claim (from its page, linked) beside what users report. Skip when the page was not fetched.
6. `Videos found` (if any): title + link, no dates, no claims about popularity.
7. `Coverage` - one line: lanes searched, subreddits and terms, anything that errored, and that Reddit counts are early snapshots.
8. `What next?` - 2-3 specific follow-ups from the findings.

## Evidence rules

- Print a number (votes, comments) when its size is the point and it was fetched.
- Name a thread's title once, then give the substance. A ranked list of threads is not a brief.
- Separate fact from feeling. Mark a user's own measurement as the user's own.
- A contradiction between sources goes in, with both links.
- Write the thread's date. Old context carries "(old context, <month>)".

## Before presenting

Walk the draft once: each link comes from a fetched result; each cluster has a source inside the window; no "nobody mentions it" about a lane that errored; follow-ups tie to findings.
