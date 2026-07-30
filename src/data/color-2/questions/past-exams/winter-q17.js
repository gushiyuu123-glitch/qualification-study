import { defineWinterGroup } from './utils.js'

export const wq17 = defineWinterGroup({
  "number": 17,
  "questionPage": 45,
  "answerPage": 69,
  "defaultPoints": 3,
  "caution": "本試験は記述式。配色技法名、PCCS記号、マンセル値の表記要素を欠かさない。",
  "items": [
    {"part":"A","prompt":"【本試験は記述式】図1のように、補色関係で明度差と色相差を大きくした配色技法はどれか。","choices":["コンプレックス","ナチュラルハーモニー","カマイユ","トーンイントーン"],"correctIndex":0,"explanation":"自然にはあまり見慣れない補色関係を使い、明度差と色相差をもたせた配色はコンプレックス配色である。","image":{"src":"/past-exams/color2/2025-winter/q17-poster.svg","alt":"茶色地に青の文字と家具を配したポスター"},"questionType":"written-converted"},
    {"part":"B","prompt":"【本試験は記述式】PCCS色相環で補色位置にある2色を組み合わせる配色技法はどれか。","choices":["トライアド","ダイアード","テトラード","ヘクサード"],"correctIndex":1,"explanation":"色相差12の補色関係にある2色配色をダイアードという。","image":{"src":"/past-exams/color2/2025-winter/q17-poster.svg","alt":"茶色地に青の文字と家具を配したポスター"},"questionType":"written-converted"},
    {"part":"C","prompt":"【本試験は記述式】PCCS色相6:yOの補色に当たる色相記号はどれか。","choices":["12:G","18:B","20:V","24:RP"],"correctIndex":1,"explanation":"6:yOから色相差12の位置は18:Bである。","image":{"src":"/past-exams/color2/2025-winter/q17-poster.svg","alt":"茶色地に青の文字と家具を配したポスター"},"questionType":"written-converted"},
    {"part":"D","prompt":"【本試験は記述式】補色の片側を両隣の2色へ置き換えた3色配色を何というか。","choices":["スプリットコンプリメンタリー","トライアド","トーナル","フォカマイユ"],"correctIndex":0,"explanation":"補色の一方をその両隣の色相へ分けた配色がスプリットコンプリメンタリーである。","image":{"src":"/past-exams/color2/2025-winter/q17-poster.svg","alt":"茶色地に青の文字と家具を配したポスター"},"questionType":"written-converted"},
    {"part":"E","prompt":"【本試験は記述式】色相8YR、明度3.5、彩度6.0のマンセル値として正しいものはどれか。","choices":["8YR 3.5/6.0","8YR 6.0/3.5","8Y 3.5/6.0","8YR 3.5-6.0"],"correctIndex":0,"explanation":"マンセル値はH V/Cの順で、8YR 3.5/6.0（8YR 3.5/6）と表す。","image":{"src":"/past-exams/color2/2025-winter/q17-poster.svg","alt":"茶色地に青の文字と家具を配したポスター"},"questionType":"written-converted"}
  ]
})
