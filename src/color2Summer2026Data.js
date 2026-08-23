import { q01 } from './color2-summer-2026/q01.js'
import { q02 } from './color2-summer-2026/q02.js'
import { q03 } from './color2-summer-2026/q03.js'
import { q04 } from './color2-summer-2026/q04.js'
import { q05 } from './color2-summer-2026/q05.js'
import { q06 } from './color2-summer-2026/q06.js'
import { q07 } from './color2-summer-2026/q07.js'
import { q08 } from './color2-summer-2026/q08.js'
import { q09 } from './color2-summer-2026/q09.js'
import { q10 } from './color2-summer-2026/q10.js'
import { q11 } from './color2-summer-2026/q11.js'
import { q12 } from './color2-summer-2026/q12.js'
import { q13 } from './color2-summer-2026/q13.js'
import { q14 } from './color2-summer-2026/q14.js'
import { q15 } from './color2-summer-2026/q15.js'
import { q16 } from './color2-summer-2026/q16.js'
import { q17 } from './color2-summer-2026/q17.js'

export const EXPECTED_QUESTION_COUNT = 104
export const EXPECTED_POINT_TOTAL = 200

const assetPrefix = '/exam-papers/color2/2026-summer/'
const practiceAssetPrefix = '/color2-2026-summer-practice/'

export const color2Summer2026Groups = [
  q01, q02, q03, q04, q05, q06, q07, q08, q09,
  q10, q11, q12, q13, q14, q15, q16, q17,
]

function stripLegacyChoiceNumber(value) {
  return String(value ?? '').replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, '')
}

function fourChoiceIndexes(groupNumber, part, choices, correctIndex) {
  if (choices.length === 4) return [0, 1, 2, 3]

  if (groupNumber === 17 && part === 'D') return [0, 1, 2, 3]
  if (groupNumber === 17 && part === 'E') return [2, 3, 6, 7]

  const distractors = choices
    .map((_, index) => index)
    .filter((index) => index !== correctIndex)
    .slice(0, 3)

  return [correctIndex, ...distractors].sort((a, b) => a - b)
}

function normalizeImage(image) {
  if (!image?.src) return null

  return {
    ...image,
    src: image.src.replace(assetPrefix, practiceAssetPrefix),
  }
}

function normalizeItem(group, item, order) {
  const choices = Array.isArray(item.choices) ? item.choices : []
  const selectedIndexes = fourChoiceIndexes(group.number, item.part, choices, item.correctIndex)
  const selectedChoices = selectedIndexes.map((index) => stripLegacyChoiceNumber(choices[index]))
  const correctIndex = selectedIndexes.indexOf(item.correctIndex)

  if (selectedChoices.length !== 4 || correctIndex < 0) {
    throw new Error(`2026夏期 問題(${group.number})${item.part}: 4択への変換に失敗しました。`)
  }

  return {
    id: `2026-summer-${String(group.number).padStart(2, '0')}-${String(item.part).toLowerCase()}`,
    groupNumber: group.number,
    part: item.part,
    order,
    points: Number(item.points ?? group.defaultPoints ?? 1),
    prompt: String(item.prompt ?? '').trim(),
    choices: selectedChoices,
    correctIndex,
    explanation: String(item.explanation ?? '').trim(),
    caution: String(item.caution ?? group.caution ?? '').trim(),
    questionType: item.questionType ?? 'text',
    image: normalizeImage(item.image),
  }
}

export const color2Summer2026Questions = color2Summer2026Groups.flatMap((group) =>
  group.items.map((item, index) => normalizeItem(group, item, index)),
)

export const color2Summer2026PointTotal = color2Summer2026Questions.reduce(
  (sum, question) => sum + question.points,
  0,
)

if (color2Summer2026Questions.length !== EXPECTED_QUESTION_COUNT) {
  throw new Error(`2026夏期の問題数が不正です: ${color2Summer2026Questions.length}`)
}

if (color2Summer2026PointTotal !== EXPECTED_POINT_TOTAL) {
  throw new Error(`2026夏期の配点合計が不正です: ${color2Summer2026PointTotal}`)
}
