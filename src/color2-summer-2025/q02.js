import { defineSummerGroup } from './utils.js'

export const q02 = defineSummerGroup({
  number: 2,
  questionPage: 8,
  answerPage: 52,
  defaultPoints: 2,
  caution: "光源・物体・眼のどの性質を問うているかを先に切り分ける。",
  items: [
  {"part":"A","prompt":"波長ごとの光の強さを表したものを何というか。","choices":["屈折率","視感効率","分光分布","分光感度"],"correctIndex":2,"explanation":"波長ごとの放射エネルギーの強さを示すグラフを分光分布という。"},
  {"part":"B","prompt":"図1の分光分布から判断できる光源として最も適切なものはどれか。","choices":["昼間の太陽光","青みがかった光","白熱電球の光","可視光の一部を含まない光"],"correctIndex":2,"explanation":"長波長側のエネルギーが多い連続分布は、黄みから赤みを帯びる白熱電球の特徴である。"},
  {"part":"C","prompt":"物体に当たった光が戻ってくる割合を示す曲線を何というか。","choices":["比視感度","分光反射率","分光透過率","分光視感効率"],"correctIndex":1,"explanation":"波長ごとの反射率を示すものが分光反射率曲線である。"},
  {"part":"D","prompt":"図2の分光反射率をもつ物体を白色光の下で見たときの色として最も適切な色票はどれか。","choices":[{"text":"色票①","colors":["#b32027"]},{"text":"色票②","colors":["#d1198f"]},{"text":"色票③","colors":["#11834a"]},{"text":"色票④","colors":["#f1d318"]}],"correctIndex":0,"explanation":"長波長域の反射率が高いため、赤系の色に見える。","questionType":"visual-color"},
  {"part":"E","prompt":"視線を固定したときに色を検出できる範囲を何というか。","choices":["色順応","色視野","色彩恒常","可視範囲"],"correctIndex":1,"explanation":"視野のうち、色として検出できる範囲を色視野という。"},
  {"part":"F","prompt":"暗い場所で働く杆体に含まれ、暗所での感度へ影響する視物質はどれか。","choices":["赤オプシン","緑オプシン","青オプシン","ロドプシン"],"correctIndex":3,"explanation":"杆体の視物質はロドプシンで、暗所視に関わる。"},
  {"part":"G","prompt":"周囲が暗くなるにつれて感度のピークが短波長側へ移る現象を何というか。","choices":["明所視","薄明視","ドミナント効果","プルキンエシフト"],"correctIndex":3,"explanation":"錐体視から杆体視へ移行すると、感度のピークが短波長側へ移る。これがプルキンエシフトである。"},
  {"part":"H","prompt":"プルキンエシフトにより、暗所で相対的に明るく見えやすくなるのはどの波長域の色か。","choices":["短波長","中波長","長波長","短波長と長波長"],"correctIndex":0,"explanation":"暗所では短波長側への感度が相対的に高まり、青系が明るく見えやすい。"}
]
})
