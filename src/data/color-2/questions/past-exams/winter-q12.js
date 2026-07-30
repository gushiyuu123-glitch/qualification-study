import { defineWinterGroup } from './utils.js'

export const wq12 = defineWinterGroup({
  "number": 12,
  "questionPage": 40,
  "answerPage": 67,
  "defaultPoints": 2,
  "caution": "色相差と明度差を見て、フォカマイユとトーンオントーンを判別する。",
  "items": [
    {"part":"A","prompt":"近い茶系色をわずかに変化させてまとめたコーディネートはどれか。","choices":["フォカマイユ","コンプレックス","グラデーション","セパレーション"],"correctIndex":0,"explanation":"同一〜類似色相・トーンのわずかな変化なのでフォカマイユ配色である。","image":{"src":"/past-exams/color2/2025-winter/q12-outfits.svg","alt":"茶系の近似色コーディネートと赤系の明度差コーディネート"}},
    {"part":"B","prompt":"赤系の同系色で明度差をつけたコーディネートはどれか。","choices":["アクセントカラー","トーンオントーン","カマイユ","ドミナントトーン"],"correctIndex":1,"explanation":"同一〜類似色相で明度差をつけているためトーンオントーン配色である。","image":{"src":"/past-exams/color2/2025-winter/q12-outfits.svg","alt":"茶系の近似色コーディネートと赤系の明度差コーディネート"}}
  ]
})
