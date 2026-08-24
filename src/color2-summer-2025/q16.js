import { defineSummerGroup } from './utils.js'

export const q16 = defineSummerGroup({
  number: 16,
  questionPage: 22,
  answerPage: 60,
  defaultPoints: 2,
  caution: "色票は端末差があるため、原本の色方向を基準に判断する。",
  items: [
  {"part":"A","prompt":"色票Aに最も適切なJIS物体色の慣用色名はどれか。","choices":["鶯色","鴇色","鳶色","鶸色"],"correctIndex":1,"explanation":"淡い赤紫みのピンクは鴇色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-a.svg","alt":"2025年度夏期 問題16 色票A"}},
  {"part":"B","prompt":"色票Bに最も適切なJIS物体色の慣用色名はどれか。","choices":["黄丹","海老茶","黄蘗色","琥珀色"],"correctIndex":3,"explanation":"黄みを帯びた茶色は琥珀色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-b.svg","alt":"2025年度夏期 問題16 色票B"}},
  {"part":"C","prompt":"色票Cに最も適切なJIS物体色の慣用色名はどれか。","choices":["新橋色","藤色","海松色","緑青色"],"correctIndex":0,"explanation":"明るい青緑系の色は新橋色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-c.svg","alt":"2025年度夏期 問題16 色票C"}},
  {"part":"D","prompt":"色票Dに最も適切なJIS物体色の慣用色名はどれか。","choices":["ローアンバー","タン","バーガンディー","ポピーレッド"],"correctIndex":3,"explanation":"鮮やかな赤はポピーレッドである。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-d.svg","alt":"2025年度夏期 問題16 色票D"}},
  {"part":"E","prompt":"色票Eに最も適切なJIS物体色の慣用色名はどれか。","choices":["テラコッタ","バーミリオン","バーントアンバー","ローシェンナ"],"correctIndex":2,"explanation":"暗い褐色はバーントアンバーである。原本では黒ではなく、褐色の色みが確認できる。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-e.svg","alt":"2025年度夏期 問題16 色票E"}},
  {"part":"F","prompt":"色票Fに最も適切なJIS物体色の慣用色名はどれか。","choices":["ウィスタリア","サックスブルー","スレートグレイ","ライラック"],"correctIndex":1,"explanation":"灰みを帯びた青はサックスブルーである。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-f.svg","alt":"2025年度夏期 問題16 色票F"}}
]
})
