# Unslop: what to refuse

The shapes a model reaches for when nobody decided. Each is allowed when the project's look chose it on purpose (for example a project that chose paper textures, a highlighter and hand-drawn boxes owns those). Reaching for one when nothing asked for it means no one decided. Rewrite the element; toning it down keeps the default.

Adapted from Impeccable's craft floor and detector rules (see `NOTICE.md`).

## Adding what nobody asked for

The most common thing a reviewer pins on a generated screen: a label, divider, legend, badge, extra button or line of copy that the design or ticket never had. Build what was asked; propose additions to the user as options.

## Page structure

- **Identical cards as the whole page** (icon tile, heading, two lines, repeated). Group by meaning with space and type first. A card is the last container to reach for; a card inside a card is always wrong.
- **The hero number**: a big stat, a small label, three supporting stats. Show the real thing instead.
- **A small tracked label above a heading** (a kicker or eyebrow). The heading carries itself; if the words matter, put them in the heading or the line under it. A label that names an object passes only when the user would not know what they are looking at without it.
- **Section numbers** (01 / 02 / 03) unless the order is itself the information.
- **A sheet or modal** for something that could happen in place. A sheet earns itself when the task needs the user's whole attention or would lose work if interrupted.
- **The same text three times** in one box. Say it once, where it matters.

## Surfaces and depth

- **Gradient text.** Emphasis comes from weight or size.
- **Glow**: a coloured halo shadow, a radial glow behind a hero, neon on near-black. A shadow has an offset and a soft blur.
- **One depth per box.** A hairline border plus a wide soft shadow on every card in a row is the ghost card; pick an edge or a lift.
- **A thick coloured stripe** down one side of a rounded card or alert.
- **A hard offset shadow** (`4px 4px 0`) unless the look is built on it.
- **Glass and blur** as decoration rather than a specific effect.
- **Background lines, stripes, grids or noise** need a real surface under them. A pattern the look chose is earned; a second pattern on top of it is not.
- **The two looks every model ships**: warm cream with a serif headline and an italic accent, and near-black with one neon accent. Light or dark is chosen from the scene (who reads it, where, in what light), never from the category.
- **Mono as a costume** for "technical". Mono is for code, data and measurements.
- **Symbols as an icon set**: emoji or stray unicode standing in for drawn icons. Icons share one stroke and weight.
- **Fake life**: decorative sparklines, progress rings, a pulsing "live" dot, a blinking cursor, a marquee.
- **Geometric masks** (a circle or many-point `clip-path`) faking the edge of a photo subject. Use the real picture whole, or a cut-out image.

## Type

- **A default face**: Inter, Roboto, Geist, Space Grotesk, Plus Jakarta Sans, Fraunces, Playfair. The project's face is chosen; a new project picks one with the user.
- **A system display face** (Arial Black, Impact) as the voice of a headline.
- **Flat steps**: heading and body less than 1.25x apart. Make one step clearly bigger.
- **Tracking** tighter than -0.04em on display type, or wider than 0.05em on body text.
- **A whole sentence at display size.** Big type suits one or two words.

## Two tests before handing over

- **Cover the name.** Could another app use this screen unchanged? Then it is the default with a name on it.
- **Swap the name in the copy.** If nothing becomes false, the copy is generic (see `wording/rules.md`).
