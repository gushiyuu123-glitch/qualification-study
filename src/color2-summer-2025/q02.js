import { defineSummerGroup } from './utils.js'

const q02Image = { src: '/past-exams/color2/2025-summer/q02-light.svg', alt: '2025年度夏期 問題2の図1から図3と色票選択肢' }

export const q02 = defineSummerGroup({
  number: 2,
  questionPage: 8,
  answerPage: 52,
  defaultPoints: 2,
  caution: "光源・物体・眼のどの性質を問うているかを先に切り分ける。図を参照する設問は、原本と同じ波長方向・曲線形状・色票関係から判断する。",
  items: [
  {"part":"A","prompt":"波長ごとの光の強さを表したものを何というか。","choices":["屈折率","視感効率","分光分布","分光感度"],"correctIndex":2,"explanation":"波長ごとの放射エネルギーの強さを示すグラフを分光分布という。","image":q02Image},
  {"part":"B","prompt":"図1の分光分布から判断できる光源として最も適切なものはどれか。","choices":["昼間の太陽光","青みがかった光","白熱電球の光","可視光の一部を含まない光"],"correctIndex":2,"explanation":"図1は長波長側ほど比エネルギーが大きい連続分布で、白熱電球の光の特徴に対応する。","image":q02Image},
  {"part":"C","prompt":"物体に当たった光が戻ってくる割合を示す曲線を何というか。","choices":["比視感度","分光反射率","分光透過率","分光視感効率"],"correctIndex":1,"explanation":"波長ごとの反射率を示すものが分光反射率曲線である。","image":q02Image},
  {"part":"D","prompt":"図2の分光反射率をもつ物体を白色光の下で見たときの色として最も適切な色票はどれか。","choices":[{"text":"色票①","colors":["#d62a2a"]},{"text":"色票②","colors":["#c91d73"]},{"text":"色票③","colors":["#0a8034"]},{"text":"色票④","colors":["#f1d318"]}],"correctIndex":0,"explanation":"図2は長波長側の反射率が高いため、赤系の色票①に対応する。","questionType":"visual-color","image":q02Image},
  {"part":"E","prompt":"視線を固定したときに色を検出できる範囲を何というか。","choices":["色順応","色視野","色彩恒常","可視範囲"],"correctIndex":1,"explanation":"視野のうち、色として検出できる範囲を色視野という。"},
  {"part":"F","prompt":"暗い場所で働く杆体に含まれ、暗所での感度へ影響する視物質はどれか。","choices":["赤オプシン","緑オプシン","青オプシン","ロドプシン"],"correctIndex":3,"explanation":"杆体の視物質はロドプシンで、暗所視に関わる。","image":q02Image},
  {"part":"G","prompt":"周囲が暗くなるにつれて感度のピークが短波長側へ移る現象を何というか。","choices":["明所視","薄明視","ドミナント効果","プルキンエシフト"],"correctIndex":3,"explanation":"図3の実線から点線へ感度の中心が短波長側へ移る変化をプルキンエシフトという。","image":q02Image},
  {"part":"H","prompt":"プルキンエシフトにより、暗所で相対的に明るく見えやすくなるのはどの波長域の色か。","choices":["短波長","中波長","長波長","短波長と長波長"],"correctIndex":0,"explanation":"暗所では短波長側への感度が相対的に高まり、青系が明るく見えやすい。","image":q02Image}
]
})
