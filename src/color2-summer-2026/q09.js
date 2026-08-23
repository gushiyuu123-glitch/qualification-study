// 2026年度夏期の出題内容を基に、転載を避けて学習用に再構成した問題です。
export const q09 = {
  "number": 9,
  "questionPage": null,
  "answerPage": 1,
  "defaultPoints": 2,
  "caution": "RGB・CMYK・色域・カラープロファイルを、用途と一緒に整理する。",
  "items": [
    {
      "part": "A",
      "prompt": "SOSサインのような案内表示について適切な説明はどれか。",
      "choices": [
        "ピクトグラムを用い、視認性を高めている",
        "誘目性を低くすることが最優先である",
        "文字だけで伝えることが最重要である",
        "誘目性だけを高め、視認性は低くてよい"
      ],
      "correctIndex": 0,
      "explanation": "非常時のサインは図記号と高いコントラストを使い、直感的に見つけて理解できる設計が必要である。",
      "questionType": "visual-diagram",
      "image": {
        "src": "/exam-papers/color2/2026-summer/q09-sign.svg",
        "alt": "色彩検定2級の学習用に再構成した図版"
      }
    },
    {
      "part": "B",
      "prompt": "一般的に印刷物を制作するDTP作業で用いる色空間はどれか。",
      "choices": [
        "RGB",
        "HSB",
        "Webセーフカラー",
        "CMYK"
      ],
      "correctIndex": 3,
      "explanation": "印刷はシアン・マゼンタ・イエロー・黒のインキを扱うCMYK色空間が基本である。"
    },
    {
      "part": "C",
      "prompt": "RGB色空間で各成分を256段階に設定すると、表現できる色数はどれか。",
      "choices": [
        "65,536色",
        "約1,677万色",
        "216色",
        "100万色"
      ],
      "correctIndex": 1,
      "explanation": "256×256×256＝16,777,216色を表現できる。"
    },
    {
      "part": "D",
      "prompt": "印刷色再現空間と光の色を扱う空間の色域について正しい説明はどれか。",
      "choices": [
        "両者の色域は同一である",
        "印刷色域は一般にRGB色域より狭く、RGBでは出せてもCMYKでは難しい色がある",
        "印刷色域は緑・青でRGBより広い",
        "印刷色域は赤だけRGBより広い"
      ],
      "correctIndex": 1,
      "explanation": "一般にRGBのほうが広い色域をもち、鮮やかな緑や青などはCMYKで再現しにくい。"
    },
    {
      "part": "E",
      "prompt": "RGBで設計した色をCMYKへ変換する際の色ずれを抑えるために必要なものはどれか。",
      "choices": [
        "AD変換だけを行う",
        "照明の色温度だけを固定する",
        "カラープロファイルを設定する",
        "アナログデータだけを使う"
      ],
      "correctIndex": 2,
      "explanation": "機器や色空間の特性をカラープロファイルで管理し、変換時の色差を抑える。"
    }
  ]
}
