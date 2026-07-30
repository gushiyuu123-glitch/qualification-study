import { defineWinterGroup } from './utils.js'

export const wq08 = defineWinterGroup({
  "number": 8,
  "questionPage": 36,
  "answerPage": 65,
  "defaultPoints": 2,
  "caution": "配色技法の名称は、色相差・トーン差・色数を図から読み取って判断する。",
  "items": [
    {"part":"A","prompt":"テトラード配色のバッグとして適切なものはどれか。","choices":["4色相を等間隔に使った多色バッグ","無彩色を含む4色バッグ","3色相のバッグ","補色2色のバッグ"],"correctIndex":0,"explanation":"テトラードは色相環を4等分した4色配色である。","image":{"src":"/past-exams/color2/2025-winter/q08-objects.svg","alt":"バッグ、キャビネット、カップの配色例"}},
    {"part":"B","prompt":"トーンイントーン配色のキャビネットとして適切なものはどれか。","choices":["明度差の大きい茶系","近い明清色トーンでまとめた淡色系","暗い緑の濃淡","赤と黄の強い対照"],"correctIndex":1,"explanation":"近いトーンを用いて全体をまとめる配色がトーンイントーン配色である。","image":{"src":"/past-exams/color2/2025-winter/q08-objects.svg","alt":"バッグ、キャビネット、カップの配色例"}},
    {"part":"C","prompt":"ビコロール配色のカップとして適切なものはどれか。","choices":["紫の濃淡","黄緑の濃淡","青・白・赤の3色","黄緑と紫の明快な2色"],"correctIndex":3,"explanation":"ビコロールは明快な2色配色である。","image":{"src":"/past-exams/color2/2025-winter/q08-objects.svg","alt":"バッグ、キャビネット、カップの配色例"}},
    {"part":"D","prompt":"図の空欄へ入れてトーナル配色にする色として適切なものはどれか。","choices":["高彩度の赤","中彩度のやわらかな赤橙","鮮やかな黄","高彩度の黄緑"],"correctIndex":1,"explanation":"トーナル配色は中明度・中低彩度の中間色を用いる。","image":{"src":"/past-exams/color2/2025-winter/q08-objects.svg","alt":"バッグ、キャビネット、カップの配色例"}},
    {"part":"E","prompt":"ロマンチックな配色イメージとして適切な説明はどれか。","choices":["グレイや黒と寒色の高彩度色","低・中彩度のブラウン","白を基調にピンク系の明清色","特にパープル系の高明度色だけ"],"correctIndex":2,"explanation":"白を基調にピンク系のp・ltトーンなどを組み合わせるとロマンチックな印象になる。"},
    {"part":"F","prompt":"シックな配色イメージとして適切な説明はどれか。","choices":["やや色みのある無彩色を組み合わせる","白系p・ltトーンだけを使う","白ベースに強いアクセントカラー","ベースカラーと強く対比する色だけを使う"],"correctIndex":0,"explanation":"シックでは無彩色系やgトーンを中心に、強すぎない対比でまとめる。"}
  ]
})
