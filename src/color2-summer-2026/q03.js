// 2026年度夏期の出題内容を基に、転載を避けて学習用に再構成した問題です。
export const q03 = {
  "number": 3,
  "questionPage": null,
  "answerPage": 1,
  "defaultPoints": 2,
  "caution": "照度・色温度・演色性・分光分布を、それぞれの定義と図で判断する。",
  "items": [
    {
      "part": "A",
      "prompt": "照度について正しい説明はどれか。",
      "choices": [
        "光源から放射される総光量を表す",
        "同じ光源なら距離が変わっても一定である",
        "屋外の曇天の昼間ではおよそ1万7千lxになることがある",
        "照明設計にはほとんど用いられない"
      ],
      "correctIndex": 2,
      "explanation": "照度は面に入射する光の量で、屋外の曇天昼間は約17,000lx程度になることがある。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q03-lighting.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "B",
      "prompt": "光色を色温度の低い順に並べたものはどれか。",
      "choices": [
        "昼光色→昼白色→電球色→白色",
        "白色→昼光色→昼白色→電球色",
        "昼光色→昼白色→白色→電球色",
        "電球色→白色→昼白色→昼光色"
      ],
      "correctIndex": 3,
      "explanation": "色温度は電球色が最も低く、白色、昼白色、昼光色の順に高くなる。"
    },
    {
      "part": "C",
      "prompt": "同じ色票を同じ照度で照らしても、光源によって色の見えが変わる主な理由はどれか。",
      "choices": [
        "錐体の種類が光源で変化するため",
        "光源の明るさだけが異なるため",
        "視距離が変化するため",
        "照明光の演色性が異なるため"
      ],
      "correctIndex": 3,
      "explanation": "光源の分光分布と演色性が異なると、物体から反射される光の成分が変わり、色の見えも変わる。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q03-lighting.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "D",
      "prompt": "長波長側を高く反射する色票を、長波長成分の少ない光で照らすとどう見えやすいか。",
      "choices": [
        "赤っぽい",
        "黒っぽい",
        "黄っぽい",
        "白っぽい"
      ],
      "correctIndex": 1,
      "explanation": "色票が反射できる長波長成分が光源に少ないため、反射光が弱く暗く見える。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q03-lighting.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "E",
      "prompt": "光源と演色性について正しい説明はどれか。",
      "choices": [
        "白熱電球は連続スペクトルをもち、演色評価の基準光として用いられる",
        "演色評価数は照度だけで決まる",
        "高出力LEDはすべて演色性が低い",
        "光源の分光分布は色の見えに影響しない"
      ],
      "correctIndex": 0,
      "explanation": "連続的な分光分布をもつ基準光と試験光源を比べて演色性を評価する。"
    },
    {
      "part": "F",
      "prompt": "図に示した3つの一般照明用光源に共通する特徴として適切なものはどれか。",
      "choices": [
        "図5と図6だけがLEDで、図7はハロゲン電球である",
        "赤外線や紫外線の放射が少ない",
        "450〜500nmの山は物体色の反射を表す",
        "図5→図6→図7の順に必ず色温度が高くなる"
      ],
      "correctIndex": 1,
      "explanation": "一般照明用LEDなどは、白熱電球に比べて赤外線や紫外線の放射が少ない。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q03-lighting.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    }
  ]
}
