import { q01 } from './color2-winter-2025/q01.js'
import { q02 } from './color2-winter-2025/q02.js'
import { q03 } from './color2-winter-2025/q03.js'
import { q04 } from './color2-winter-2025/q04.js'
import { q05 } from './color2-winter-2025/q05.js'
import { q06 } from './color2-winter-2025/q06.js'
import { q07 } from './color2-winter-2025/q07.js'
import { q08 } from './color2-winter-2025/q08.js'
import { q09 } from './color2-winter-2025/q09.js'
import { q10 } from './color2-winter-2025/q10.js'
import { q11 } from './color2-winter-2025/q11.js'
import { q12 } from './color2-winter-2025/q12.js'
import { q13 } from './color2-winter-2025/q13.js'
import { q14 } from './color2-winter-2025/q14.js'
import { q15 } from './color2-winter-2025/q15.js'
import { q16 } from './color2-winter-2025/q16.js'
import { q17 } from './color2-winter-2025/q17.js'

export const winter2025Groups = [q01,q02,q03,q04,q05,q06,q07,q08,q09,q10,q11,q12,q13,q14,q15,q16,q17]
export const EXPECTED_QUESTION_COUNT_WINTER_2025 = 104
export const EXPECTED_POINT_TOTAL_WINTER_2025 = 200

export const color2Winter2025Questions = winter2025Groups.flatMap((group) => group.items.map((item, index) => ({
  id: '2025-winter-' + String(group.number).padStart(2, '0') + '-' + String(item.part).toLowerCase(),
  groupNumber: group.number,
  part: item.part,
  order: index + 1,
  points: Number(item.points ?? group.defaultPoints ?? 1),
  prompt: String(item.prompt ?? '').trim(),
  choices: item.choices.map((choice) => String(choice)),
  correctIndex: Number(item.correctIndex),
  explanation: String(item.explanation ?? '').trim(),
  caution: String(item.caution ?? group.caution ?? '').trim(),
  questionType: item.questionType ?? 'choice',
  image: item.image ?? null,
})))

export const color2Winter2025PointTotal = color2Winter2025Questions.reduce((sum, question) => sum + question.points, 0)

if (color2Winter2025Questions.length !== EXPECTED_QUESTION_COUNT_WINTER_2025) throw new Error('2025冬期の問題数が不正です')
if (color2Winter2025PointTotal !== EXPECTED_POINT_TOTAL_WINTER_2025) throw new Error('2025冬期の配点合計が不正です')
