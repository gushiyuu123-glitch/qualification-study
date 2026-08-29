import fs from 'node:fs'
import path from 'node:path'
import {
  color2QuestionRegistryEntries,
  getColor2PastExamEntries,
} from '../src/color2QuestionRegistry.js'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const index = read('index.html')
const identity = read('src/color2QuestionIdentity.js')
const stats = read('src/color2AllRandomStats.js')
const guide = read('src/color2PracticeTargetGuide.js')
const skip = read('src/color2SkipQueue.js')

if (color2QuestionRegistryEntries.length !== 332) {
  throw new Error(`色彩2級の安定ID登録数が不正です: ${color2QuestionRegistryEntries.length}`)
}
if (getColor2PastExamEntries().length !== 314) {
  throw new Error(`過去問の安定ID登録数が不正です: ${getColor2PastExamEntries().length}`)
}

const keys = color2QuestionRegistryEntries.map((entry) => entry.key)
if (new Set(keys).size !== keys.length) {
  throw new Error('色彩2級の安定question keyが重複しています。')
}

for (const entry of color2QuestionRegistryEntries) {
  if (
    !entry.key ||
    !entry.examKey ||
    !entry.questionId ||
    !Number.isInteger(entry.groupNumber) ||
    !/^[A-Z]$/.test(entry.part)
  ) {
    throw new Error(`安定IDメタデータが不正です: ${entry.key}`)
  }
}

for (const token of [
  'color2QuestionKey',
  'color2ExamKey',
  'color2QuestionId',
  'qualify:color2-question-identity',
  'visibleChoices',
  'sourcePrompt',
  'entryMatchesHost',
  'clearIdentity',
]) {
  if (!identity.includes(token)) throw new Error(`question identity実装が不足: ${token}`)
}

for (const [name, source] of [
  ['無限ランダム統計', stats],
  ['Web問題文変換', guide],
  ['スキップ保留', skip],
]) {
  if (!source.includes('getColor2QuestionIdentity')) {
    throw new Error(`${name}が安定question identityを使用していません。`)
  }
  if (/match\s*\(\s*\/問題\\\(/.test(source)) {
    throw new Error(`${name}に表示ラベルの問題番号パースが残っています。`)
  }
}

if (!stats.includes('stableKeyFromLegacyStatsKey')) {
  throw new Error('旧ランダム統計キーから安定IDへの移行処理がありません。')
}

const identityPath = '/src/color2QuestionIdentity.js'
const statsPath = '/src/color2AllRandomStats.js'
const guidePath = '/src/color2PracticeTargetGuide.js'
const skipPath = '/src/color2SkipQueue.js'

for (const token of [identityPath, statsPath, guidePath, skipPath]) {
  if (!index.includes(token)) throw new Error(`index.html登録不足: ${token}`)
}
if (index.indexOf(identityPath) > index.indexOf(statsPath)) {
  throw new Error('question identityはランダム統計より先に読み込んでください。')
}
if (index.indexOf(identityPath) > index.indexOf(guidePath)) {
  throw new Error('question identityは問題文Web変換より先に読み込んでください。')
}
if (index.indexOf(identityPath) > index.indexOf(skipPath)) {
  throw new Error('question identityはスキップ保留より先に読み込んでください。')
}

console.log('色彩検定2級 安定question identity検証OK: 332問 / 過去問314問 / 表示ラベル非依存 / 表示中設問へ再バインド / 旧統計キー移行')
