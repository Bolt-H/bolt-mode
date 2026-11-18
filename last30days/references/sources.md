# Sources and endpoints

Tested 2026-11-17 from a Windows PC through WebFetch and WebSearch. Re-test when something breaks; these free services change.

## Reddit: Arctic Shift (works)

Reddit's own JSON (`old.reddit.com/search.json`, `www.reddit.com/.../search.json`) is refused by WebFetch ("unable to fetch"), and WebSearch refuses `reddit.com` as a domain. `site:reddit.com` in the query is ignored. Use the public archive instead.

Base: `https://arctic-shift.photon-reddit.com/api`

Search posts in one subreddit by title word:
`/posts/search?subreddit=ClaudeAI&title=Pro%20plan&after=2026-10-18&limit=30`

- `subreddit` (or `author`) is required. `title` without it returns 400. `query` returns 400 or 422.
- `title` takes one or two plain words. Some words return 422 for no visible reason (seen: `token`, `weekly`, `usage`; `limit` and `Pro plan` worked). On 422, retry with a synonym. Try 3 words before giving up on a sub.
- `after` and `before` take `YYYY-MM-DD`. `limit` up to 100. `sort=desc` is by date, not score.
- Listing without `title` returns the newest posts with full text; 100 posts is about 500K characters, too big to read. Use `limit=5` to 25 for sanity checks only.
- `fields=` returned 400 in every form tried.
- Each row: `title`, `score`, `num_comments`, `created_utc` (unix seconds), `permalink`, `selftext`. In the WebFetch prompt ask for those as one line per post.

One post by id: `/posts/ids?ids=t3_1xwla4y` gives title, score, selftext.

Comment tree of a thread: `/comments/tree?link_id=t3_<id>&limit=40`. The id is the segment after `/comments/` in the permalink. Returns nested comments with author and score; long threads end with a "more" stub. Comment scores are early snapshots too.

Pacing: one request at a time. Three parallel requests produced 422 on all of them.

Subreddit picking: WebSearch (no domain filter) for "<topic> subreddit", note the names seen; add the community the product's own page links to.

## Hacker News: Algolia (works)

`https://hn.algolia.com/api/v1/search?query=claude%20code&tags=story&numericFilters=created_at_i%3E<FROM_UNIX>&hitsPerPage=15`

- FROM_UNIX: `date -d <FROM> +%s`.
- Only `created_at_i` may go in `numericFilters`. A `points` filter returns 400. Filter points yourself.
- `tags=story` for stories; `tags=(story,ask_hn)` to include Ask HN; `tags=comment` searches comment text.
- Multi-word queries are AND. When a 4-word query returns nothing, cut to the 1-2 words that name the entity.
- `search` is relevance-ranked; `search_by_date` is newest-first.
- Comments of one story: `https://hn.algolia.com/api/v1/items/<objectID>`.
- Story link: `https://news.ycombinator.com/item?id=<objectID>`.

## YouTube (titles only)

- WebFetch on `youtube.com/results` returns navigation text only. Watch pages return no date, views or description.
- WebSearch with `allowed_domains: ["youtube.com"]` returns video titles and `watch?v=` URLs, plus a short model summary that may include claims from the video. No upload date, no views. Treat every video as undated: list them in a "วิดีโอที่เจอ" line, outside the dated evidence, with no word on how recent they are.

## Web

- WebSearch is US-only and returns titles and URLs. Add the month and year ("November 2026") to bias toward fresh pages. Check a page's own date with WebFetch before using it as in-window.
- Vendor blogs (SEO posts, tool makers) are marketing. Anthropic or product docs are the source for plan facts.
- Search summaries can carry old facts. Quote a number after fetching the page it came from.

## Not available

X, TikTok, Instagram, Threads need keys or cookies. Say so once in the coverage line when the topic would normally live there.
