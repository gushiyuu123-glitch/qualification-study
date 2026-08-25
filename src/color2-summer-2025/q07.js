import { defineSummerGroup } from './utils.js'

export const q07 = defineSummerGroup({
  number: 7,
  questionPage: 13,
  answerPage: 55,
  defaultPoints: 2,
  caution: "配色技法は、色相差・トーン差・色数の3点を順に確認する。",
  items: [
  {"part":"A","prompt":"ビコロール配色の基本的な特徴として最も適切なものはどれか。","choices":["色相もトーンも近似した","コントラスト感のある明快な","中間色だけを使った","一見すると単色に見える"],"correctIndex":1,"explanation":"ビコロールは白黒のように明快なコントラストをもつ2色配色が典型である。"},
  {"part":"B","prompt":"ビコロール配色の典型例として最も適切な組み合わせはどれか。","choices":[{"text":"白と黒","colors":["#f4f4f0","#111111"]},{"text":"黄橙の濃淡","colors":["#d99a17","#f2c52b"]},{"text":"灰紫と黄緑","colors":["#c6c1c9","#9fbd44"]},{"text":"青緑と紺","colors":["#1681a1","#203a67"]}],"correctIndex":0,"explanation":"白と黒の組み合わせは明度差が大きく、典型的なビコロール配色である。","questionType":"visual-color"},
  {"part":"C","prompt":"ビコロール配色の典型として扱われる組み合わせはどれか。","choices":["暗清色だけ","明度差の小さい色","中明度の低彩度色どうし","高彩度色と無彩色"],"correctIndex":3,"explanation":"高彩度色と無彩色の組み合わせは彩度差が大きく、明快なビコロールになる。"},
  {"part":"D","prompt":"ビコロール配色の典型となるトーン関係はどれか。","choices":["同一トーンの類似色相","類似トーンの同一色相","明度差のある対照トーン","高明度色による類似トーン"],"correctIndex":2,"explanation":"明度差の大きい対照トーンは、コントラストの明快な2色配色になる。"},
  {"part":"E","prompt":"ダイアード配色の組み合わせとして最も適切なものはどれか。","choices":[{"text":"黄土色と黒","colors":["#82601a","#111111"]},{"text":"薄灰色と紫","colors":["#c9c8cf","#6c55a5"]},{"text":"黄と青紫","colors":["#f2dd17","#7b72bd"]},{"text":"黄と黄緑","colors":["#f2dd17","#8fc74d"]}],"correctIndex":2,"explanation":"ダイアードは色相環を2等分した補色関係の2色配色である。","questionType":"visual-color"},
  {"part":"F","prompt":"PCCSにおけるダイアードの色相関係はどれか。","choices":["有彩色と無彩色","同一・類似トーン","色相差が4〜8の色","色相差が12の補色"],"correctIndex":3,"explanation":"PCCSでは色相差12の補色関係がダイアードである。"},
  {"part":"G","prompt":"トリコロール配色の例として最も適切なものはどれか。","choices":[{"text":"赤紫・橙・緑","colors":["#512034","#873817","#0e5f45"]},{"text":"ベージュ・灰・黒","colors":["#cbbb95","#68675e","#252526"]},{"text":"灰紫・灰茶・灰青","colors":["#806f83","#8a6f64","#5b777b"]},{"text":"淡黄・黄・黄緑","colors":["#f1e5a2","#f4df36","#a9c651"]}],"correctIndex":0,"explanation":"教科書の正答は①。三つの色を明快に対比させた配色例として示されている。色相環の3等分を条件とするトライアドとは別に判定する。","questionType":"visual-color"},
  {"part":"H","prompt":"スプリットコンプリメンタリーの例として最も適切なものはどれか。","choices":[{"text":"赤・黒・黄土","colors":["#c02531","#111111","#9b6f18"]},{"text":"青緑・橙・水色","colors":["#168d88","#df783b","#5c98cf"]},{"text":"青紫・黄・赤紫","colors":["#6f60a7","#f1df29","#c9678d"]},{"text":"青緑の濃淡","colors":["#b4e0d0","#41958c","#20736d"]}],"correctIndex":1,"explanation":"補色の一方を、その両隣の色相へ分けた3色配色がスプリットコンプリメンタリーである。","questionType":"visual-color"},
  {"part":"I","prompt":"図1の4色相を色相環上で4等分して正方形状に選んだ配色はどれか。","choices":["ドミナント","ペンタード","トーンオントーン","テトラード"],"correctIndex":3,"explanation":"色相環を4等分した4色配色はテトラードである。"},
  {"part":"J","prompt":"テトラードに白と黒を加えた6色配色を何というか。","choices":["グラデーション","カマイユ","ヘクサード","コンプレックスハーモニー"],"correctIndex":2,"explanation":"テトラードの4色に白と黒を加えた6色配色はヘクサードと呼ばれる。"}
]
})
