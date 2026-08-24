import { defineSummerGroup } from './utils.js'

export const q11 = defineSummerGroup({
  number: 11,
  questionPage: 17,
  answerPage: 58,
  defaultPoints: 2,
  caution: "写真は細部の一色ではなく、コーディネート全体の色相数と統一関係で判断する。",
  items: [
  {"part":"A","prompt":"写真Aのファッションコーディネートの配色として最も適切なものはどれか。","choices":["ナチュラル配色","トーンイントーン配色","ダイアード配色","トリコロール配色"],"correctIndex":0,"explanation":"写真全体の色相関係と明度関係を大きく捉え、自然な明度秩序に沿ったナチュラル配色として判断する。","image":{"src":"/past-exams/color2/2025-summer/q11-a.svg","alt":"写真Aを学習用に再構成したファッションコーディネート"}},
  {"part":"B","prompt":"写真Bのファッションコーディネートの配色として最も適切なものはどれか。","choices":["コンプレックス配色","ドミナントトーン配色","ドミナントカラー配色","ビコロール配色"],"correctIndex":2,"explanation":"同系の色みで全体をまとめているため、ドミナントカラー配色として判断する。","image":{"src":"/past-exams/color2/2025-summer/q11-b.svg","alt":"写真Bを学習用に再構成したファッションコーディネート"}}
]
})
