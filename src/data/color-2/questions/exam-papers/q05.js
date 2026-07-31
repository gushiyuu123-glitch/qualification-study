// 2026年度夏期の出題内容を基に、転載を避けて学習用に再構成した問題です。
export const q05 = {
  "number": 5,
  "questionPage": null,
  "answerPage": 1,
  "defaultPoints": 2,
  "caution": "マンセル記号の順序、色相環、等明度面を図と対応づける。",
  "items": [
    {
      "part": "A",
      "prompt": "修正マンセル表色系について正しい説明はどれか。",
      "choices": [
        "アメリカ光学会による検討を経て修正された",
        "JIS標準色票を基に最初から作られた",
        "色表示を日本語読みだけで表す",
        "色相環は24色相で構成される"
      ],
      "correctIndex": 0,
      "explanation": "マンセル表色系はアメリカ光学会による検討を経て修正され、修正マンセル表色系となった。"
    },
    {
      "part": "B",
      "prompt": "マンセル表色系の明度について正しい説明はどれか。",
      "choices": [
        "反射率が等間隔になるよう設定される",
        "明度軸そのものをNeutralと呼ぶ",
        "完全に光を吸収する理想的な黒を明度0とする",
        "PCCSの明度と同じ尺度である"
      ],
      "correctIndex": 2,
      "explanation": "理想的な黒を0、理想的な白を10として明度を表す。"
    },
    {
      "part": "C",
      "prompt": "マンセル記号として形式が正しいものはどれか。",
      "choices": [
        "0R 3/3",
        "7YR 4/4",
        "5Y 12/3",
        "2.5GB 3.5/4.1"
      ],
      "correctIndex": 1,
      "explanation": "マンセル値は色相 明度/彩度の順で表し、明度は0〜10の範囲で記す。"
    },
    {
      "part": "D",
      "prompt": "マンセル10色相環で5Bのほぼ反対側に位置する色相はどれか。",
      "choices": [
        "10R",
        "5YR",
        "10YR",
        "5R"
      ],
      "correctIndex": 1,
      "explanation": "B（青）の反対側にはYR（黄赤）が位置し、5Bと5YRがほぼ対向する。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q05-munsell.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "E",
      "prompt": "同じ等明度面内に位置する色の並びとして正しい図はどれか。",
      "choices": [
        "明度を一定にして色相・彩度が変化する並び",
        "色相一定で明度だけが上がる並び",
        "無彩色から色相を変えず明度が下がる並び",
        "色相環の5基本色だけを並べた図"
      ],
      "correctIndex": 0,
      "explanation": "等明度面では明度が一定で、色相と彩度の異なる色が平面上に並ぶ。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q05-munsell.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "F",
      "prompt": "学習用近似色票に最も適切なマンセル値はどれか。",
      "choices": [
        "5RP 8/4",
        "5R 6/10",
        "10R 4/4",
        "5YR 4/10"
      ],
      "correctIndex": 0,
      "explanation": "明るく低〜中彩度の赤紫系なので5RP 8/4が最も近い。",
      "questionType": "visual-color",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q05-munsell.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    }
  ]
}
