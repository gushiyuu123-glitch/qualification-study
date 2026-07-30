import { defineWinterGroup } from './utils.js'

export const wq11 = defineWinterGroup({
  "number": 11,
  "questionPage": 39,
  "answerPage": 67,
  "defaultPoints": 2,
  "caution": "写真全体を大きく捉え、色相差・明度差・使用色数から配色技法を判断する。",
  "items": [
    {"part":"A","prompt":"青系デニムを主役に全体をまとめたコーディネートの配色技法はどれか。","choices":["ダイアード","ナチュラル","バイカラー","ドミナントカラー"],"correctIndex":3,"explanation":"青系の一つの支配色で全体をまとめているためドミナントカラー配色である。","image":{"src":"/past-exams/color2/2025-winter/q11-outfits.svg","alt":"青系デニムのコーディネートと白黒のコーディネート"}},
    {"part":"B","prompt":"白と黒の明快な2色で構成されたコーディネートの配色技法はどれか。","choices":["トリコロール","ドミナントトーン","ビコロール","トーンイントーン"],"correctIndex":2,"explanation":"白と黒の明快な2色配色なのでビコロール配色である。","image":{"src":"/past-exams/color2/2025-winter/q11-outfits.svg","alt":"青系デニムのコーディネートと白黒のコーディネート"}}
  ]
})
