import { defineWinterGroup } from './utils.js'

export const wq09 = defineWinterGroup({
  "number": 9,
  "questionPage": 37,
  "answerPage": 66,
  "defaultPoints": 2,
  "caution": "サイン、RGB・CMYK、色再現域、カラーマネジメントの役割を媒体ごとに整理する。",
  "items": [
    {"part":"A","prompt":"サインデザインについて適切な説明はどれか。","choices":["可読性だけ高めればよい","文字だけで情報を伝える","ピクトグラムは明度差だけを意味する","誘目性・視認性と色のユニバーサルデザインへの配慮が必要"],"correctIndex":3,"explanation":"サインは発見しやすさと読み取りやすさに加え、多様な色覚への配慮が必要である。"},
    {"part":"B","prompt":"Webデザインの色指定で一般的に使われる色空間はどれか。","choices":["RGB","HSB","CMYK","Webセーフカラーだけ"],"correctIndex":0,"explanation":"ディスプレイ表示は加法混色のRGB色空間を用いる。"},
    {"part":"C","prompt":"RGB色空間の色選択について正しい説明はどれか。","choices":["CMYK各成分を0〜100％で設定する","R・G・Bをそれぞれ256段階で組み合わせる","Webセーフカラーは色料三原色を6段階にする","HSBはC・M・Y・Kで設定する"],"correctIndex":1,"explanation":"RGBは各成分0〜255の256段階を組み合わせて色を表す。"},
    {"part":"D","prompt":"RGBで作成した鮮やかな緑や青がCMYK印刷で再現できないことがある主な理由はどれか。","choices":["色再現域が異なるため","光の色空間は赤だけ広いため","CIE xy色度図は印刷より狭いため","CMYKは緑と青の再現域が常に広いため"],"correctIndex":0,"explanation":"RGBとCMYKでは色再現域が異なり、RGBの一部の鮮やかな色は印刷域外になる。"},
    {"part":"E","prompt":"DTP作業の色彩管理で適切なものはどれか。","choices":["AD変換だけで色ずれを防ぐ","照明とディスプレイの色温度差だけをプロファイルで補正する","作業空間の照明条件を一定に保つ","プロファイルはアナログ化時だけ使う"],"correctIndex":2,"explanation":"印刷物の見え方は照明の色温度や照度でも変わるため、観察条件を一定にする。"}
  ]
})
