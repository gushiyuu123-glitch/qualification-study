import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { qualifications } from '../src/data/qualifications.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

function fail(message) {
  errors.push(message)
}

function absolute(relativePath) {
  return path.join(root, relativePath)
}

function requireFile(relativePath) {
  if (!fs.existsSync(absolute(relativePath))) {
    fail(`missing file: ${relativePath}`)
  }
}

function assertUnique(items, label) {
  const seen = new Set()
  items.forEach((item) => {
    if (!item) {
      fail(`${label}: empty id`)
      return
    }
    if (seen.has(item)) fail(`${label}: duplicate id ${item}`)
    seen.add(item)
  })
}

assertUnique(qualifications.map((item) => item.id), 'qualification')

const qualificationById = new Map(qualifications.map((item) => [item.id, item]))
qualifications.forEach((qualification) => {
  assertUnique(
    (qualification.resources ?? []).map((item) => item.id),
    `${qualification.id} resource`,
  )
  assertUnique(
    (qualification.categories ?? []).map((item) => item.id),
    `${qualification.id} category`,
  )
})

const questionFiles = [
  'src/data/questions.js',
  ...fs
    .readdirSync(absolute('src'))
    .filter((name) => /^registerTheme\d+Questions\.js$/.test(name))
    .sort()
    .map((name) => `src/${name}`),
]

const questionIds = []
for (const relativePath of questionFiles) {
  const source = fs.readFileSync(absolute(relativePath), 'utf8')

  for (const match of source.matchAll(/\bid:\s*['"]([^'"]+)['"]/g)) {
    questionIds.push(match[1])
  }

  for (const match of source.matchAll(/\bqualificationId:\s*['"]([^'"]+)['"]/g)) {
    if (!qualificationById.has(match[1])) {
      fail(`${relativePath}: unknown qualificationId ${match[1]}`)
    }
  }

  for (const match of source.matchAll(/\bsourceId:\s*['"]([^'"]+)['"]/g)) {
    const sourceId = match[1]
    const exists = qualifications.some((qualification) =>
      (qualification.resources ?? []).some((resource) => resource.id === sourceId),
    )
    if (!exists) fail(`${relativePath}: unknown sourceId ${sourceId}`)
  }

  for (const match of source.matchAll(/\bcategoryId:\s*['"]([^'"]+)['"]/g)) {
    const categoryId = match[1]
    const exists = qualifications.some((qualification) =>
      (qualification.categories ?? []).some((category) => category.id === categoryId),
    )
    if (!exists) fail(`${relativePath}: unknown categoryId ${categoryId}`)
  }

  for (const match of source.matchAll(/\bcorrectIndex:\s*(\d+)/g)) {
    const index = Number(match[1])
    if (!Number.isInteger(index) || index < 0 || index > 4) {
      fail(`${relativePath}: suspicious correctIndex ${match[1]}`)
    }
  }
}
assertUnique(questionIds, 'registered question')

requireFile('public/sw.js')
requireFile('public/manifest.webmanifest')

const indexHtml = fs.readFileSync(absolute('index.html'), 'utf8')
for (const match of indexHtml.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const value = match[1]
  if (!value.startsWith('/') || value === '/') continue

  const relativePath = value.startsWith('/src/')
    ? value.slice(1)
    : `public${value}`
  requireFile(relativePath)
}

for (const match of indexHtml.matchAll(/https:\/\/qualification-study\.vercel\.app\/([^"<]+\.(?:png|jpe?g|svg|webp))/g)) {
  requireFile(`public/${match[1]}`)
}

const manifest = JSON.parse(
  fs.readFileSync(absolute('public/manifest.webmanifest'), 'utf8'),
)
for (const icon of manifest.icons ?? []) {
  if (typeof icon?.src === 'string' && icon.src.startsWith('/')) {
    requireFile(`public${icon.src}`)
  }
}

if (errors.length > 0) {
  console.error('QUALIFY 全体検証NG')
  errors.forEach((message) => console.error(`- ${message}`))
  process.exit(1)
}

console.log(
  `QUALIFY 全体検証OK: ${qualifications.length}資格 / ${questionIds.length}共通問題 / 参照ファイル・ID整合`,
)
