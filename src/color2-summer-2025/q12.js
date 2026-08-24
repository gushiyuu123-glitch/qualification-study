import { defineSummerGroup } from './utils.js'

export const q12 = defineSummerGroup({
  number: 12,
  questionPage: 18,
  answerPage: 58,
  defaultPoints: 2,
  caution: "写真全体の色相差とトーン差を見て、カマイユ・トーンオントーンなどを判別する。",
  items: [
  {"part":"A","prompt":"写真Aのファッションコーディネートの配色として最も適切なものはどれか。","choices":["ナチュラル配色","カマイユ配色","セパレーション配色","アクセントカラー配色"],"correctIndex":1,"explanation":"ほぼ同一色相・同一トーンに見える微差の配色なのでカマイユ配色である。","image":{"src":"/past-exams/color2/2025-summer/q12-a.svg","alt":"オフホワイト系でまとめたファッションコーディネート"}},
  {"part":"B","prompt":"写真Bのファッションコーディネートの配色として最も適切なものはどれか。","choices":["グラデーション配色","トーナル配色","フォカマイユ配色","トーンオントーン配色"],"correctIndex":3,"explanation":"同系色相を保ちながら明度差をつけているため、トーンオントーン配色である。","image":{"src":"/past-exams/color2/2025-summer/q12-b.svg","alt":"ピンクと赤を用いたファッションコーディネート"}}
]
})
