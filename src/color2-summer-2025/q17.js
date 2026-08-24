import { defineSummerGroup } from './utils.js'

export const q17 = defineSummerGroup({
  number: 17,
  questionPage: 23,
  answerPage: 60,
  defaultPoints: 3,
  caution: "本試験は記述式。配色技法名・PCCS記号・マンセル値をそれぞれ独立して答えられるようにする。",
  items: [
    {"part":"A","prompt":"【本試験は記述式】図1はlt4・lt12・lt20のように、同じトーンを保ちながら色相を変えてまとめている。この配色技法はどれか。","choices":["トーンイントーン","トーンオントーン","カマイユ","ナチュラルハーモニー"],"correctIndex":0,"explanation":"同一・類似トーンで色相を変えてまとめる配色はトーンイントーンである。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
    {"part":"B","prompt":"【本試験は記述式】図1を、ライトトーンを支配的に使った配色として捉えたときの配色技法はどれか。","choices":["ドミナントカラー","ドミナントトーン","トーンオントーン","フォカマイユ"],"correctIndex":1,"explanation":"一つのトーンを支配的に使って全体を統一する配色はドミナントトーンである。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
    {"part":"C","prompt":"【本試験は記述式】図1で使われる3色はPCCS色相環を3等分した関係である。この配色技法はどれか。","choices":["ダイアード","テトラード","トライアド","ヘクサード"],"correctIndex":2,"explanation":"PCCS24色相環で色相差8ずつの3色関係はトライアドである。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
    {"part":"D","prompt":"【本試験は記述式】図1のlt4、空欄D、lt20が色相差8ずつになるとき、空欄Dに入るPCCSトーン記号はどれか。","choices":["sf12","b12","lt12","p12"],"correctIndex":2,"explanation":"色相4・12・20は8ずつ離れるため、ライトトーンの色相12を表すlt12が入る。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
    {"part":"E","prompt":"【本試験は記述式】図1のlt4に対応する色が、マンセル色相10R・明度7.5・彩度8.0であるとき、正しいマンセル値はどれか。","choices":["10R 7.5/8.0","5R 7.5/8.0","10R 8.0/7.5","10YR 7.5/8.0"],"correctIndex":0,"explanation":"マンセル値はH V/Cの順に表すため、10R 7.5/8.0となる。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}}
  ]
})
