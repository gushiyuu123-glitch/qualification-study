import { defineSummerGroup } from './utils.js'

export const q17 = defineSummerGroup({
  number: 17,
  questionPage: 23,
  answerPage: 60,
  defaultPoints: 3,
  caution: "記述式は表記ゆれを許容するが、配色名・PCCS記号・マンセル値の要素を欠かさない。",
  items: [
  {"part":"AB","prompt":"【本試験は記述式】図1の空欄A・Bに入る2つの配色技法の組み合わせとして正しいものはどれか（順不同）。","choices":["トーンイントーンとドミナントトーン","トーンオントーンとドミナントカラー","カマイユとフォカマイユ","ナチュラルハーモニーとコンプレックスハーモニー"],"correctIndex":0,"explanation":"lt4+・lt12+・lt20+のように同一トーンでまとめられており、トーンイントーン配色またはドミナントトーン配色と判断できる。","questionType":"written-converted","points":6,"image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
  {"part":"C","prompt":"【本試験は記述式】図1で使われる3色はPCCS色相環を3等分した関係である。この配色技法はどれか。","choices":["トライアド","テトラード","ダイアード","ヘクサード"],"correctIndex":0,"explanation":"PCCS24色相環で色相差8ずつの3色関係はトライアドである。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
  {"part":"D","prompt":"【本試験は記述式】図1のlt4+、空欄D、lt20+が色相差8ずつになるとき、空欄Dに入るPCCSトーン記号はどれか。","choices":["lt4","lt8","lt12","lt20"],"correctIndex":2,"explanation":"色相4、12、20は8ずつ離れるため、空欄はlt12となる。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}},
  {"part":"E","prompt":"【本試験は記述式】図1のlt4に対応する色が、マンセル色相10R・明度7.5・彩度8.0であるとき、正しいマンセル値はどれか。","choices":["10R 7.5/8.0","5R 7.5/8.0","10R 8.0/7.5","10YR 7.5/8.0"],"correctIndex":0,"explanation":"マンセル値はH V/Cの順に表し、10R 7.5/8.0（10R 7.5/8）となる。","questionType":"written-converted","image":{"src":"/past-exams/color2/2025-summer/q17-poster.svg","alt":"オレンジ地に緑と青紫の花を配したポスター"}}
]
})
