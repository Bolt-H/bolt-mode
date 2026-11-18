# Forms and input

## Structure

- A real `<form>` with a `<label>` per control. Enter submits for free.
- Choice control by count: radios for 2 to 5 options, `<select>` for 6 or more, `<input list>` with `<datalist>` for 10 or more.
- On/off setting: `<input type="checkbox" switch>` (Safari 17.4; other browsers show a plain checkbox, which still works). Style with `accent-color`.
- Hide a field visually with the `.visually-hidden` recipe (`clip-path: inset(50%)`, 1px box), not `display: none`, so it stays reachable.
- Multi-step form: `inert` or `hidden` on the steps that are not showing.

## iPhone keyboard and input

- Input text at least 16px, set as `font-size: max(1rem, 1em)`, or iOS zooms the page on focus. Tap target about 48px tall.
- Codes: `inputmode="numeric"` with `autocomplete="one-time-code"`. Never `type="number"` for a code or a PIN. One field, not one box per digit.
- `enterkeyhint="done|go|next|search"` names the return key.
- Identifier fields (usernames, tokens, paths): `autocorrect="off" autocapitalize="none" spellcheck="false"`.
- Do not block paste.
- The keyboard covers inputs: give the scroll area `scroll-padding-block-end` so the focused field scrolls clear.
- Autogrowing textarea: `field-sizing: content` with `min-block-size: 3lh` and `max-block-size: 10lh` (Safari 26.2). Reset any `width` / `height: 100%` that an earlier rule set, since explicit sizes override it. Text input: set `min-inline-size` and `max-inline-size` too.
- Names: one full-name field, and accept any script. Names in any script must pass.

## Validation

- Style `:user-invalid`, never `:invalid`. It stays quiet until the user has interacted or tried to submit, so a required field is not red on load.
- Messages are visible text with an error icon (alt text "Error") or worded as errors. Not colour alone.
- Do not disable the submit button to stop bad input. Let submit run and show what is wrong.
- Keep `aria-invalid` and `aria-describedby` in step: add the message id to `aria-describedby` only while the field is invalid (a small script on `blur` and `input`).
- One polite live region with `role="status"` for announcements. On a failed submit move focus to the first invalid field.
- Check on blur; clear the error as soon as the value becomes valid on `input`.

## Enter to submit with IME

```ts
onKeyDown={(e) => {
  if (e.key !== 'Enter') return
  if (e.nativeEvent.isComposing || e.keyCode === 229) return // Safari needs the 229 test
  e.preventDefault(); form.requestSubmit()
}}
```

Some keyboards insert directly, so this matters little there, but it guards Japanese or Chinese input and costs two lines.

## Autofill and sign-in

- Autofill tokens exist for each field: `username`, `current-password`, `new-password`, `one-time-code`, address and payment parts. A PIN field can use `autocomplete="off"` on purpose, since a PIN is not a password to save. 
- Highlight of autofilled fields can be restyled with `:autofill`.
