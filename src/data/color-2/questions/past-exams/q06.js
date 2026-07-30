import { defineSummerGroup } from './utils.js'

export const q06 = defineSummerGroup({
  number: 6,
  questionPage: 12,
  answerPage: 54,
  defaultPoints: 2,
  caution: "錯視名だけでなく、どの図で何がどう見えるかを対応づける。",
  items: [
  {"part":"A","prompt":"図1のアとイを交互に見続けた後、ウを見ると、ウの横縞は何色に見えるか。","choices":["赤","赤の心理補色","黄","青緑"],"correctIndex":0,"explanation":"緑の横縞へ順応した後は、その反対色である赤が横縞として知覚される。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig1.svg","alt":"緑の横縞、赤の縦縞、白黒の縞模様"}},
  {"part":"B","prompt":"同じ操作の後、ウの縦縞は何色に見えるか。","choices":["紫","橙","緑（青緑）","赤紫"],"correctIndex":2,"explanation":"赤の縦縞へ順応した後は、反対色の緑系が縦縞として見える。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig1.svg","alt":"緑の横縞、赤の縦縞、白黒の縞模様"}},
  {"part":"C","prompt":"縞の方向と色の組み合わせに応じて補色が残るこの現象を何というか。","choices":["リープマン効果","色相対比","色相の同化","マッカロー効果"],"correctIndex":3,"explanation":"方向と色の組み合わせに依存して生じる残効をマッカロー効果という。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig1.svg","alt":"緑の横縞、赤の縦縞、白黒の縞模様"}},
  {"part":"D","prompt":"マッカロー効果は、視覚系が方向と色の組み合わせにどのように反応した結果生じるか。","choices":["側抑制","視野欠損","順応","拡散反射"],"correctIndex":2,"explanation":"特定の方向と色の組み合わせへ順応した結果、補色の残効が生じる。","image":{"src":"/past-exams/color2/2025-summer/q6-fig1.svg","alt":"緑の横縞、赤の縦縞、白黒の縞模様"}},
  {"part":"E","prompt":"図2の白い十字路の抜けた部分は、黒い図ではどのように見えるか。","choices":["黄の色みが緑から広がって見える","黒がほかの部分より暗く見える","黒がほかの部分より明るく見える","主観色が見える"],"correctIndex":1,"explanation":"白い切れ目は周囲との関係により、ほかの黒い部分より暗く見える。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig2.svg","alt":"黒い格子に白い切れ目がある図"}},
  {"part":"F","prompt":"図2のような白い線の切れ目によって生じる現象はどれか。","choices":["ハーマングリッド","マッハバンド","色陰現象","エーレンシュタイン効果"],"correctIndex":3,"explanation":"線の切れ目が周囲より明るく、または暗く見える現象をエーレンシュタイン効果という。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig2.svg","alt":"黒い格子に白い切れ目がある図"}},
  {"part":"G","prompt":"図2の十字路を図3のような色線にすると、切れ目部分はどのように見えるか。","choices":["元の色より鮮やかに見える","色が線からにじみ出て広がるように見える","線の心理補色の円形が見える","ハレーションが見える"],"correctIndex":1,"explanation":"線の色が切れ目へにじみ出て広がるように見える。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig3.svg","alt":"黒い格子の間を青い線でつないだ図"}},
  {"part":"H","prompt":"図3で色がにじみ出て広がるように見える現象を何というか。","choices":["ネオンカラー効果","縁辺対比","補色残像","透明視"],"correctIndex":0,"explanation":"色線の切れ目から色が広がるように見える現象はネオンカラー効果である。","questionType":"visual-diagram","image":{"src":"/past-exams/color2/2025-summer/q6-fig3.svg","alt":"黒い格子の間を青い線でつないだ図"}}
]
})
