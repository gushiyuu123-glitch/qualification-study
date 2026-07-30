import { defineWinterGroup } from './utils.js'

export const wq02 = defineWinterGroup({
  "number": 2,
  "questionPage": 30,
  "answerPage": 61,
  "defaultPoints": 2,
  "caution": "分光分布・分光反射率・分光視感効率と、錐体視・杆体視の関係を分けて判断する。",
  "items": [
    {
      "part": "A",
      "prompt": "照明光に含まれる各波長のエネルギー量を表す特性はどれか。",
      "choices": ["分光感度", "比視感度", "分光分布", "色光分布"],
      "correctIndex": 2,
      "explanation": "光源が波長ごとにどれだけのエネルギーを放つかを分光分布で表す。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "B",
      "prompt": "図1のように可視域全体のエネルギーが比較的均等な昼光の特徴として適切なものはどれか。",
      "choices": ["橙から赤の成分だけが多い", "長波長域のエネルギーだけが多い", "夕方の太陽光に近い", "全波長の光が比較的均等に含まれる"],
      "correctIndex": 3,
      "explanation": "昼光は可視域の各波長を比較的広く含む白色光である。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "C",
      "prompt": "物体が波長ごとに光を反射する割合を表す曲線はどれか。",
      "choices": ["色光反射率", "分光反射率", "色光透過率", "分光透過率"],
      "correctIndex": 1,
      "explanation": "波長別の反射割合を分光反射率という。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "D",
      "prompt": "約380〜500nmの反射率が高い物体は、白色光の下でどの色に見えやすいか。",
      "choices": ["赤", "黄", "緑", "シアン"],
      "correctIndex": 3,
      "explanation": "青から緑の短波長域を多く反射するため、シアン系に見える。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "E",
      "prompt": "視細胞が波長ごとに感じる相対的な明るさの感度を何というか。",
      "choices": ["比視覚度", "視感度率", "分光視感効率", "分光視覚度率"],
      "correctIndex": 2,
      "explanation": "波長ごとの相対的な明るさの感度は分光視感効率（比視感度）で表す。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "F",
      "prompt": "明所視の分光視感効率曲線を示す視細胞はどれか。",
      "choices": ["錐体細胞", "杆体細胞", "水平細胞", "双極細胞"],
      "correctIndex": 0,
      "explanation": "明るい環境では錐体細胞が主に働く。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "G",
      "prompt": "周囲が暗くなると、相対的に感度が高くなる光の波長域はどれか。",
      "choices": ["長波長", "中波長", "短波長", "長波長と短波長"],
      "correctIndex": 2,
      "explanation": "杆体視へ移ると感度のピークが短波長側へ移動する。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    },
    {
      "part": "H",
      "prompt": "暗くなるにつれて眼の感度が短波長側へ移る現象を何というか。",
      "choices": ["明順応", "暗順応", "リープマン効果", "プルキンエシフト"],
      "correctIndex": 3,
      "explanation": "錐体視から杆体視へ移ることで感度のピークが短波長側へ移る現象がプルキンエシフトである。",
      "image": {"src": "/past-exams/color2/2025-winter/q02-graphs.svg", "alt": "光源の分光分布、物体の分光反射率、視細胞の感度曲線"}
    }
  ]
})
