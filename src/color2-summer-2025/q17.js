import { defineSummerGroup } from './utils.js'

const q17Image = { src: '/past-exams/color2/2025-summer/q17-poster.svg', alt: '2025年度夏期 問題17の図1を学習用に再構成したポスター' }

export const q17 = defineSummerGroup({
  number: 17,
  questionPage: 23,
  answerPage: 60,
  defaultPoints: 3,
  caution: "本試験は記述式。原本の文章が与える条件だけを手掛かりに、配色技法名・PCCS記号・マンセル値を判断する。4択化のために答えの定義を先回りして追加しない。",
  items: [
    {"part":"A","prompt":"【本試験は記述式】中彩度の明清色のトーンだけを組みあわせた図1について、トーンがもつイメージを打ち出しやすい配色として当てはまる配色技法はどれか。","choices":["トーンイントーン","トーンオントーン","カマイユ","ナチュラルハーモニー"],"correctIndex":0,"explanation":"教科書の正答はトーンイントーン。図1は中彩度の明清色のトーンをそろえながら色相を変えている。","questionType":"written-converted","image":q17Image},
    {"part":"B","prompt":"【本試験は記述式】同じ図1について、特定のトーンがもつイメージを全体に支配的に打ち出す配色技法として当てはまるものはどれか。","choices":["ドミナントカラー","ドミナントトーン","トーンオントーン","フォカマイユ"],"correctIndex":1,"explanation":"教科書の正答はドミナントトーン。一つのトーンのイメージを全体に統一して打ち出す見方でも図1を説明できる。","questionType":"written-converted","image":q17Image},
    {"part":"C","prompt":"【本試験は記述式】図1の3色は、PCCS色相環でバランスのよい対照色相配色となっている。この色相関係を表す配色技法はどれか。","choices":["ダイアード","テトラード","トライアド","ヘクサード"],"correctIndex":2,"explanation":"教科書の正答はトライアド。図1の3色はPCCS色相環上で均等な関係になる。","questionType":"written-converted","image":q17Image},
    {"part":"D","prompt":"【本試験は記述式】図1の3色が lt4、［D］、lt20 で、色相差8ずつになるとき、［D］に入るPCCS記号はどれか。","choices":["sf12","b12","lt12","p12"],"correctIndex":2,"explanation":"教科書の正答はlt12。lt4・lt12・lt20で色相番号が8ずつ離れる。","questionType":"written-converted","image":q17Image},
    {"part":"E","prompt":"【本試験は記述式】図1で使われているlt4に近い色をマンセル表色系で表し、色相が10R、明度が7.5、彩度が8.0のとき、正しい表記はどれか。","choices":["10R 7.5/8.0","5R 7.5/8.0","10R 8.0/7.5","10YR 7.5/8.0"],"correctIndex":0,"explanation":"教科書の正答は10R 7.5/8.0。マンセル値は色相 H、明度 V、彩度 C の順に H V/C と表す。","questionType":"written-converted","image":q17Image}
  ]
})
