import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {
  COLOR2_FIGURE_AUDIT_STATUSES,
  color2FigureRegistry,
} from '../src/color2FigureRegistry.js'

const root = process.cwd()
const folders = [
  'public/color2-2026-summer-practice',
  'public/color2-2025-summer-practice',
  'public/color2-2025-winter-practice',
]

function publicPath(file) {
  return `/${file.replaceAll('\\', '/').replace(/^public\//, '')}`
}

function gitBlobSha(buffer) {
  const header = Buffer.from(`blob ${buffer.length}\0`)
  return crypto.createHash('sha1').update(header).update(buffer).digest('hex')
}

const actualSvgPaths = folders.flatMap((folder) =>
  fs.readdirSync(path.join(root, folder), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => publicPath(`${folder}/${entry.name}`)),
)

const registryPaths = Object.keys(color2FigureRegistry)
const missingLocks = actualSvgPaths.filter((src) => !color2FigureRegistry[src])
const staleLocks = registryPaths.filter((src) => !actualSvgPaths.includes(src))

if (missingLocks.length) {
  throw new Error(`図版ロック未登録: ${missingLocks.join(', ')}`)
}
if (staleLocks.length) {
  throw new Error(`存在しない図版がロックに残っています: ${staleLocks.join(', ')}`)
}

for (const src of actualSvgPaths) {
  const entry = color2FigureRegistry[src]
  if (!COLOR2_FIGURE_AUDIT_STATUSES.includes(entry.auditStatus)) {
    throw new Error(`図版監査ステータスが不正: ${src} / ${entry.auditStatus}`)
  }

  const file = path.join(root, 'public', src.replace(/^\//, ''))
  const actualSha = gitBlobSha(fs.readFileSync(file))
  if (actualSha !== entry.gitBlobSha) {
    throw new Error(
      `図版が承認済みrevisionから変更されています: ${src} / expected=${entry.gitBlobSha} actual=${actualSha}`,
    )
  }
}

const q03 = color2FigureRegistry['/color2-2026-summer-practice/q03-lighting.svg']
if (!q03 || q03.auditStatus !== 'source-reviewed') {
  throw new Error('2026夏期Q3図版は原本再確認済みrevisionとして固定してください。')
}

const pending = registryPaths.filter(
  (src) => color2FigureRegistry[src].auditStatus === 'locked-pending-source-audit',
).length
const reviewed = registryPaths.length - pending

console.log(
  `色彩検定2級 図版integrity検証OK: ${registryPaths.length}図版ロック / 原本再確認済み${reviewed} / 原本監査待ち${pending} / Git blob SHA固定`,
)
