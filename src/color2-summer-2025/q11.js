import { defineSummerGroup } from './utils.js'

export const q11 = defineSummerGroup({
  number: 11,
  questionPage: 17,
  answerPage: 58,
  defaultPoints: 2,
  caution: "写真は細部の一色ではなく、コーディネート全体の色相関係を大きく捉えて判断する。公開用図版は原本写真を簡略化している。",
  items: [
  {"part":"A","prompt":"写真Aのファッションコーディネートの配色として最も適切なものはどれか。","choices":["ナチュラル配色","トーンイントーン配色","ダイアード配色","トリコロール配色"],"correctIndex":2,"explanation":"教科書原本では③ダイアード配色が正答。ダイアードは色相環上で対向する2色を基本とする配色である。公開用図版は原本写真を簡略化しているため、細かな色関係は原本ほど再現されない。","image":{"src":"/past-exams/color2/2025-summer/q11-a.svg","alt":"写真Aを学習用に再構成したファッションコーディネート"}},
  {"part":"B","prompt":"写真Bのファッションコーディネートの配色として最も適切なものはどれか。","choices":["コンプレックス配色","ドミナントトーン配色","ドミナントカラー配色","ビコロール配色"],"correctIndex":2,"explanation":"教科書原本では③ドミナントカラー配色が正答。同系の色みで全体をまとめた配色として判断する。","image":{"src":"/past-exams/color2/2025-summer/q11-b.svg","alt":"写真Bを学習用に再構成したファッションコーディネート"}}
]
})
