import { defineSummerGroup } from './utils.js'

export const q11 = defineSummerGroup({
  number: 11,
  questionPage: 17,
  answerPage: 58,
  defaultPoints: 2,
  caution: "写真は細部の一色ではなく、コーディネート全体の色相数と統一関係で判断する。",
  items: [
  {"part":"A","prompt":"写真Aのファッションコーディネートの配色として最も適切なものはどれか。","choices":["バイカラー配色","トーンイントーン配色","ダイアード配色","トリコロール配色"],"correctIndex":0,"explanation":"黒と白の明快な2色構成なので、バイカラー配色である。","image":{"src":"/past-exams/color2/2025-summer/q11-a.svg","alt":"黒と白を中心にしたファッションコーディネート"}},
  {"part":"B","prompt":"写真Bのファッションコーディネートの配色として最も適切なものはどれか。","choices":["コンプレックス配色","ドミナントトーン配色","ドミナントカラー配色","ビコロール配色"],"correctIndex":2,"explanation":"黒からグレイまで同系の無彩色でまとめられ、色相の共通性が強いためドミナントカラー配色である。","image":{"src":"/past-exams/color2/2025-summer/q11-b.svg","alt":"黒からグレイでまとめたファッションコーディネート"}}
]
})
