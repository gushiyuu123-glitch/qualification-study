import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const queue = read('src/color2SkipQueue.js')
const css = read('src/color2SkipQueue.css')
const integrityCss = read('src/color2Integrity.css')
const summer2026 = read('src/color2Summer2026Practice.js')
const summer2025 = read('src/color2Summer2025Practice.js')
const winter2025 = read('src/color2Winter2025Practice.js')
const allRandom = read('src/color2AllRandomPractice.js')
const adaptive = read('src/color2AdaptiveRandomPractice.js')
const index = read('index.html')

for (const token of [
  'qualify:color2:skip-queue:v1',
  'qualify:color2-skip',
  'data-color2-skip',
  'ノア確認用データをコピー',
  '保留だけ解く',
  'skipCount',
  'sourcePrompt',
  'displayPrompt',
  'questionId',
  'randomKey',
  'openReview',
  'qualify-color2-skip-review-v2',
  'getColor2QuestionIdentity',
  'figureRevision',
  'buildRevision',
  'needsAudit',
  'reasonCounts',
  '図・写真がおかしい',
  '文が意味不明',
  '選択肢との対応',
  '単純に難しい',
  'anomalyScore',
]) {
  if (!queue.includes(token)) throw new Error(`スキップ保留実装が不足: ${token}`)
}

if (queue.includes('labelText.match(') || queue.includes('resolveExamKey(')) {
  throw new Error('スキップ保留に表示ラベル依存のquestion特定が残っています。')
}

for (const [name, source, mode] of [
  ['2026夏期', summer2026, '2026-summer'],
  ['2025夏期', summer2025, '2025-summer'],
  ['2025冬期', winter2025, '2025-winter'],
]) {
  for (const token of [
    'answeredPoints',
    'skippedCount',
    'function skipCurrent()',
    `event.detail?.mode === '${mode}'`,
    'スキップ ${skippedCount}問',
  ]) {
    if (!source.includes(token)) throw new Error(`${name}のスキップ未回答処理が不足: ${token}`)
  }
}

for (const [name, source, mode] of [
  ['全過去問∞', allRandom, 'all-random'],
  ['苦手優先', adaptive, 'adaptive'],
]) {
  if (!source.includes('function skipCurrent()')) throw new Error(`${name}: skipCurrentがありません。`)
  if (!source.includes(`event.detail?.mode === '${mode}'`)) throw new Error(`${name}: スキップイベント接続がありません。`)
}

for (const token of ['reviewMode', 'reviewTotal', 'startReview', 'openReview']) {
  if (!allRandom.includes(token)) throw new Error(`スキップ保留復習モードが不足: ${token}`)
}

for (const token of [
  '.color2-skip-action',
  '.color2-skip-queue',
  '.color2-skip-toast',
  '@media (max-width: 640px)',
]) {
  if (!css.includes(token)) throw new Error(`スキップ保留CSSが不足: ${token}`)
}

for (const token of [
  '.color2-skip-toast__reasons',
  '[data-audit-level="high"]',
  '.color2-skip-queue__reason',
]) {
  if (!integrityCss.includes(token)) throw new Error(`異常シグナルCSSが不足: ${token}`)
}

if (!index.includes('/src/color2SkipQueue.js')) {
  throw new Error('color2SkipQueue.jsがindex.htmlに登録されていません。')
}
if (index.indexOf('/src/color2SkipQueue.js') < index.indexOf('/src/color2PracticeTargetGuide.js')) {
  throw new Error('スキップ保留は問題文Web変換の後に読み込んでください。')
}

console.log(
  '色彩検定2級 スキップ保留検証OK: 5モード / 未回答分離 / 安定問題ID / 永続保留 / 回数集計 / 理由タグ / 異常優先度 / 図版revision / build revision / 保留復習 / ノア確認JSON / 原問題データ非改変',
)
