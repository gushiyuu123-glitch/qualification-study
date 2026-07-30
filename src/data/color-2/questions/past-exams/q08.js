import { defineSummerGroup } from './utils.js'

export const q08 = defineSummerGroup({
  number: 8,
  questionPage: 14,
  answerPage: 56,
  defaultPoints: 2,
  caution: "配色名は、見た目だけでなく色相差とトーン関係から判定する。",
  items: [
  {"part":"A","prompt":"ナチュラルハーモニーの配色として最も適切なスニーカーはどれか。","choices":[{"text":"無彩色中心","colors":["#7d7d78","#222222"]},{"text":"黄の明清色中心","colors":["#f0d441","#f4e97b"]},{"text":"青紫と黄","colors":["#333d76","#ecd51d"]},{"text":"紫系の自然な明度関係","colors":["#7a4b97","#b283be"]}],"correctIndex":3,"explanation":"ナチュラルハーモニーは黄に近い色を明るく、青紫に近い色を暗くする自然な明度関係を使う。","questionType":"visual-color"},
  {"part":"B","prompt":"トーナル配色として最も適切な靴下の組み合わせはどれか。","choices":[{"text":"中明度・中低彩度の中間色","colors":["#8a6c4b","#b0848f","#7591a1"]},{"text":"明清色中心","colors":["#f0df1d","#6fc9b8"]},{"text":"暗清色中心","colors":["#283257","#db6045"]},{"text":"黄緑の明清色","colors":["#8cc41f","#dbe64b"]}],"correctIndex":0,"explanation":"トーナル配色は中明度・中低彩度の中間色を中心にまとめる。","questionType":"visual-color"},
  {"part":"C","prompt":"フォカマイユ配色として最も適切なバッグはどれか。","choices":[{"text":"赤紫の濃淡","colors":["#7a334d","#9c5163"]},{"text":"青緑の類似色・類似トーン","colors":["#82c8b8","#69a99d"]},{"text":"青の濃淡","colors":["#176b91","#3099b4"]},{"text":"無彩色とベージュ","colors":["#999996","#c4b691"]}],"correctIndex":1,"explanation":"フォカマイユは同一または類似色相で、同一・類似トーンに少し変化をつける。","questionType":"visual-color"},
  {"part":"D","prompt":"図の家具をトーンオントーン配色にするため、空欄へ入れる色として最も適切なものはどれか。","choices":[{"text":"青緑","colors":["#2b6763"]},{"text":"橙","colors":["#dd5d2d"]},{"text":"淡いベージュ","colors":["#e8d7a8"]},{"text":"暗い緑","colors":["#314720"]}],"correctIndex":3,"explanation":"トーンオントーンは同系色相で明度差を明確にする配色なので、暗い緑が適する。","questionType":"visual-color"},
  {"part":"E","prompt":"クリアなイメージの配色にする方法として最も適切なものはどれか。","choices":["無彩色のハイコントラスト配色に高彩度の寒色を用いる。","ホワイト系にグリーン系の暗清色を組み合わせる。","pトーンやltトーンを中心に、ホワイト系を組み合わせる。","ベースカラーにブラウン系のpトーンやltgトーンを用いる。"],"correctIndex":2,"explanation":"クリアなイメージは明清色のp・ltトーンとホワイト系を中心にすると表現しやすい。"},
  {"part":"F","prompt":"エレガントなイメージの配色にする方法として最も適切なものはどれか。","choices":["YR系のトーンとltgトーン、中彩度の中間色を用いる。","アクセントカラーとベースカラーのコントラストを強くする。","pトーンやltgトーンを用い、パープル系の色相で明度差を抑える。","ベースカラーにpトーンやltトーンの赤〜橙系を用いる。"],"correctIndex":2,"explanation":"エレガントはパープル系の類似色相と、p・ltgトーンの穏やかな明度差が適する。"}
]
})
