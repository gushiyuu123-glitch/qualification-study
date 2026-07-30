import { defineSummerGroup } from './utils.js'

export const q16 = defineSummerGroup({
  number: 16,
  questionPage: 22,
  answerPage: 60,
  defaultPoints: 2,
  caution: "色票は端末差があるため、色の方向と慣用色名の系統も合わせて判断する。",
  items: [
  {"part":"A","prompt":"色票Aに最も適切なJIS物体色の慣用色名はどれか。","choices":["鶯色","鴇色","鳶色","鶸色"],"correctIndex":1,"explanation":"淡い赤紫みのピンクは鴇色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-a.svg","alt":"淡い赤紫みのピンクの学習用近似色"}},
  {"part":"B","prompt":"色票Bに最も適切なJIS物体色の慣用色名はどれか。","choices":["黄丹","海老茶","黄蘗色","琥珀色"],"correctIndex":3,"explanation":"黄みを帯びた茶色は琥珀色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-b.svg","alt":"黄みを帯びた茶色の学習用近似色"}},
  {"part":"C","prompt":"色票Cに最も適切なJIS物体色の慣用色名はどれか。","choices":["新橋色","藤色","海松色","緑青色"],"correctIndex":0,"explanation":"鮮やかな青緑系の色は新橋色である。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-c.svg","alt":"青緑系の学習用近似色"}},
  {"part":"D","prompt":"色票Dに最も適切なJIS物体色の慣用色名はどれか。","choices":["ローアンバー","タン","バーガンディー","ポピーレッド"],"correctIndex":3,"explanation":"鮮やかな赤はポピーレッドである。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-d.svg","alt":"鮮やかな赤の学習用近似色"}},
  {"part":"E","prompt":"色票Eに最も適切なJIS物体色の慣用色名はどれか。","choices":["テラコッタ","バーミリオン","バーントアンバー","ローシェンナ"],"correctIndex":2,"explanation":"非常に暗い褐色はバーントアンバーである。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-e.svg","alt":"非常に暗い褐色の学習用近似色"}},
  {"part":"F","prompt":"色票Fに最も適切なJIS物体色の慣用色名はどれか。","choices":["ウィスタリア","サックスブルー","スレートグレイ","ライラック"],"correctIndex":1,"explanation":"灰みを帯びた青はサックスブルーである。","questionType":"visual-color","image":{"src":"/past-exams/color2/2025-summer/q16-f.svg","alt":"灰みを帯びた青の学習用近似色"}}
]
})
