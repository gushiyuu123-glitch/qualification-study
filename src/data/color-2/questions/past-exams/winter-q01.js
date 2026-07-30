import { defineWinterGroup } from './utils.js'

export const wq01 = defineWinterGroup({
  "number": 1,
  "questionPage": 29,
  "answerPage": 61,
  "defaultPoints": 2,
  "caution": "加齢による眼の変化、色覚の多様性、ユニバーサルデザインの用語を取り違えない。",
  "items": [
    {
      "part": "A",
      "prompt": "加齢によって黄みを増し、やがて茶褐色へ変化する眼の部位はどれか。",
      "choices": ["視細胞", "角膜", "錐体", "水晶体"],
      "correctIndex": 3,
      "explanation": "水晶体は加齢により黄変し、短波長の光を吸収しやすくなる。"
    },
    {
      "part": "B",
      "prompt": "高齢になると吸収されやすくなり、黒との区別がつきにくくなる色はどれか。",
      "choices": ["青", "赤", "緑", "黄"],
      "correctIndex": 0,
      "explanation": "黄変した水晶体は短波長の青い光を多く吸収するため、青と黒を区別しにくくなる。"
    },
    {
      "part": "C",
      "prompt": "水晶体が濁ることで生じ、加齢とともに割合が増える眼の病気はどれか。",
      "choices": ["老眼", "白内障", "視野欠損", "色覚異常"],
      "correctIndex": 1,
      "explanation": "水晶体が濁る病気は白内障である。"
    },
    {
      "part": "D",
      "prompt": "遺伝・病気・加齢などにより、人ごとに色の見え方が異なる性質を何というか。",
      "choices": ["演色性", "多様性", "ドミナント", "透明視"],
      "correctIndex": 1,
      "explanation": "色の識別に関わる個人差は色覚の多様性として扱う。"
    },
    {
      "part": "E",
      "prompt": "背景と文字を見分けやすくするため、特に確保すると効果的な差はどれか。",
      "choices": ["明度を同じにする", "色相を揃える", "明度差をつける", "彩度差を小さくする"],
      "correctIndex": 2,
      "explanation": "色相だけに頼らず明度差を確保すると、幅広い色覚で読み取りやすい。"
    },
    {
      "part": "F",
      "prompt": "案内サインなどで、対象の存在を発見しやすい性質を表す用語はどれか。",
      "choices": ["視認性", "誘目性", "識別性", "可読性"],
      "correctIndex": 0,
      "explanation": "対象の存在を見つけやすい性質は視認性である。"
    }
  ]
})
