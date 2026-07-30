import { defineWinterGroup } from './utils.js'

export const wq06 = defineWinterGroup({
  "number": 6,
  "questionPage": 34,
  "answerPage": 63,
  "defaultPoints": 2,
  "caution": "錯視の名称だけでなく、どこがどのように明るく・色づいて見えるかを対応づける。",
  "items": [
    {"part":"A","prompt":"白い背景で格子の十字路を抜いた部分は、周囲よりどのように見えるか。","choices":["黄みを帯びる","青みを帯びる","暗く見える","明るく見える"],"correctIndex":3,"explanation":"白背景では抜けた十字路部分が周囲より明るく見える。","image":{"src":"/past-exams/color2/2025-winter/q06-illusions.svg","alt":"エーレンシュタイン効果、ネオンカラー効果、マッハバンドの図"}},
    {"part":"B","prompt":"図1の格子で生じる明るさの錯視を何というか。","choices":["エーレンシュタイン効果","リープマン効果","補色残像","主観色"],"correctIndex":0,"explanation":"放射状の線や格子の切れ目に明るい円が見える現象はエーレンシュタイン効果である。","image":{"src":"/past-exams/color2/2025-winter/q06-illusions.svg","alt":"エーレンシュタイン効果、ネオンカラー効果、マッハバンドの図"}},
    {"part":"C","prompt":"色の線が格子の抜けた部分へにじみ出て広がるように見える現象はどれか。","choices":["面積効果","ハーマン格子","色陰現象","ネオンカラー効果"],"correctIndex":3,"explanation":"線の色が囲まれた領域へ拡散して見える錯視はネオンカラー効果である。","image":{"src":"/past-exams/color2/2025-winter/q06-illusions.svg","alt":"エーレンシュタイン効果、ネオンカラー効果、マッハバンドの図"}},
    {"part":"D","prompt":"物理的な色・明るさと、知覚される色・明るさがずれる現象の総称はどれか。","choices":["色の連想","錯視","色嗜好","色の象徴性"],"correctIndex":1,"explanation":"物理量と心理的な見えが食い違う現象を錯視という。"},
    {"part":"E","prompt":"滑らかな明度変化面と一定明度面の境界で、暗い側に現れる帯はどう見えるか。","choices":["明るい","暗い","黄みを帯びる","青みを帯びる"],"correctIndex":1,"explanation":"暗い側の境界付近には、実際より暗い帯が見える。","image":{"src":"/past-exams/color2/2025-winter/q06-illusions.svg","alt":"エーレンシュタイン効果、ネオンカラー効果、マッハバンドの図"}},
    {"part":"F","prompt":"明度境界に実際にはない明暗の帯が見える現象はどれか。","choices":["ベンハムトップ","マッカロー効果","マッハバンド","フィル・イン"],"correctIndex":2,"explanation":"明度の変化境界で生じる帯状の明暗はマッハバンドである。","image":{"src":"/past-exams/color2/2025-winter/q06-illusions.svg","alt":"エーレンシュタイン効果、ネオンカラー効果、マッハバンドの図"}},
    {"part":"G","prompt":"マッハバンドは、異なる明るさが隣接する境界で起こる何の一種か。","choices":["縁辺対比","明順応","暗順応","明度の同化"],"correctIndex":0,"explanation":"隣接領域の差が境界付近で強調されるため、縁辺対比の一種である。"},
    {"part":"H","prompt":"マッハバンドを網膜の働きで説明するとき、関係する仕組みはどれか。","choices":["透明視","同化効果","側抑制","黄変"],"correctIndex":2,"explanation":"隣接する受容野間の側抑制により境界情報が強調される。"}
  ]
})
