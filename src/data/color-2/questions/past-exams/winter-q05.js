import { defineWinterGroup } from './utils.js'

export const wq05 = defineWinterGroup({
  "number": 5,
  "questionPage": 33,
  "answerPage": 63,
  "defaultPoints": 2,
  "caution": "色立体・無彩色表示・5色相環と10色相環の位置関係を、色票の見た目と結びつける。",
  "items": [
    {"part":"A","prompt":"マンセル色立体について正しい説明はどれか。","choices":["無彩色の中心軸の周囲に各色相の等色相面が並ぶ","水平断面には等彩度の色だけが並ぶ","同一円周上に同じ色相が並ぶ","等色相面はすべて同じ正三角形になる"],"correctIndex":0,"explanation":"無彩色の明度軸を中心に、色相環の順で等色相面が配置される。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}},
    {"part":"B","prompt":"明度1の黒に近い無彩色をマンセル値で表すとどれか。","choices":["Bk","n-1.5","Gy-1.5","N1"],"correctIndex":3,"explanation":"無彩色はNの後に明度を付けて表すため、明度1はN1である。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}},
    {"part":"C","prompt":"黄色系の代表色相をマンセル色相記号で表すとどれか。","choices":["10Y","5Y","0YR","5GY"],"correctIndex":1,"explanation":"Yの代表色相は5Yである。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}},
    {"part":"D","prompt":"図のように色相と明度がほぼ同じで、鮮やかさだけが変わる並びはどれか。","choices":["色相が同じで明度が変わる","色相が同じで明度・彩度が変わる","明度が等しく彩度が変わる","彩度が等しく明度が変わる"],"correctIndex":2,"explanation":"同じ色相・同じ明度で彩度だけが変化する系列である。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}},
    {"part":"E","prompt":"マンセル5色相環で赤の両隣に位置する色の組み合わせはどれか。","choices":["緑と紫","黄と青緑","紫と黄","青緑と緑"],"correctIndex":2,"explanation":"5色相環はR→Y→G→B→Pの順なので、Rの隣はYとPである。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}},
    {"part":"F","prompt":"マンセル10色相環で黄とほぼ対向する位置にある色はどれか。","choices":["黄と緑","青紫と黄","赤と黄緑","黄赤と紫"],"correctIndex":1,"explanation":"10色相環でYとほぼ対向するのはPBである。","image":{"src":"/past-exams/color2/2025-winter/q05-munsell.svg","alt":"マンセル表色系の色票と色相関係"}}
  ]
})
