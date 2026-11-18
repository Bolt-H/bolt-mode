# Video from HTML: HyperFrames, as a later option

Read only when the user wants a video: a demo of their app for a portfolio, a short clip of a feature, a motion study rendered to compare two curves side by side. Nothing in the `motion` skill needs it.

## What it is

HyperFrames (github.com/heygen-com/hyperframes, Apache-2.0, by HeyGen) renders an HTML page to MP4. Each element is timed with `data-start` and `data-duration`; the animation is one paused GSAP timeline registered on `window.__timelines`; the renderer seeks that timeline frame by frame in headless Chrome and encodes with FFmpeg, so the same files always give the same video. It needs Node 22+ and FFmpeg. The CLI (`npx hyperframes init`, `preview`, `check`, `snapshot`, `render`) does the work; a desktop Studio app edits the same files.

## What carries over from this skill

The laws in `SKILL.md` came from its motion doctrine, so they apply as they are. A film adds:

- **Story first.** A film over about 15 s needs one viewer doing one real task, start to result; three different storylines are written in words before anything is built.
- **Film timing is slower than UI timing.** A line holds 0.5 s plus 0.3 s a word; the last line at least 2 s. A pause of 0.3-0.75 s before the payoff.
- **Real screens only.** Show the app's real screens (screenshots or the real app); never a made-up screen.
- **Something new every 2-4 s,** and no stretch of more than 3 s where nothing changes.

## Before using it

- It is a third-party repo: read before running, install nothing without the user's yes.
- Its own skills send a usage event to HeyGen when they start, and some features (reverse a video, style templates, generated voice and music) are paid HeyGen Pro features. Plain HTML-to-MP4 rendering is free and local.
- A plain screen recording of the app on a phone may be all a portfolio needs; reach for HyperFrames only when the video must be designed.
