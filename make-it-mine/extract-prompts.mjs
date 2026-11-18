// Prints the user's last N prompts from Claude Code's local history.
// Read-only: it writes nothing and sends nothing anywhere.
// Usage: node extract-prompts.mjs [count]   (default 50)
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const limit = Number(process.argv[2]) || 50
const root = join(homedir(), '.claude', 'projects')

// Every session file: ~/.claude/projects/<project>/<session>.jsonl, newest first.
const files = []
for (const project of readdirSync(root, { withFileTypes: true })) {
  if (!project.isDirectory()) continue
  const dir = join(root, project.name)
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.jsonl')) continue
    const path = join(dir, f)
    files.push({ path, mtime: statSync(path).mtimeMs })
  }
}
files.sort((a, b) => b.mtime - a.mtime)

const prompts = []
for (const { path } of files) {
  const lines = readFileSync(path, 'utf8').split('\n')
  const found = []
  for (const line of lines) {
    if (!line.trim()) continue
    let row
    try { row = JSON.parse(line) } catch { continue }
    if (row.type !== 'user' || row.isMeta || row.isSidechain) continue
    const c = row.message?.content
    // A real prompt is a string, or a list that has text blocks. Tool results are not prompts.
    const text = typeof c === 'string'
      ? c
      : Array.isArray(c) ? c.filter(b => b.type === 'text').map(b => b.text).join('\n') : ''
    const t = text.trim()
    if (!t) continue
    if (t.startsWith('<') ) continue            // slash-command wrappers, system reminders
    if (t.startsWith('[Request interrupted')) continue
    found.push({ at: row.timestamp || '', text: t })
  }
  prompts.push(...found.reverse())               // newest first inside a session
  if (prompts.length >= limit) break
}

const last = prompts.slice(0, limit)
console.log(`Found ${last.length} prompts in ${files.length} session files.\n`)
last.reverse().forEach((p, i) => {
  const short = p.text.length > 700 ? p.text.slice(0, 700) + ' [cut]' : p.text
  console.log(`--- ${i + 1} (${p.at.slice(0, 10)}) ---\n${short}\n`)
})
