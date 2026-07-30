import { defineWinterGroup } from './utils.js'

export const wq04 = defineWinterGroup({
  "number": 4,
  "questionPage": 32,
  "answerPage": 62,
  "defaultPoints": 2,
  "caution": "マンセルの明度・彩度・色相記号と、PCCSの用語を混同しない。",
  "items": [
    {"part":"A","prompt":"マンセル表色系で明度を表す属性名はどれか。","choices":["ヒュー","ライトネス","バリュー","サチュレーション"],"correctIndex":2,"explanation":"マンセル表色系の明度はValue（バリュー）で表す。"},
    {"part":"B","prompt":"マンセル表色系の明度が基準としている尺度はどれか。","choices":["カラースペース","ポジショニングマップ","カラーダイヤル","グレイスケール"],"correctIndex":3,"explanation":"マンセルの明度は無彩色のグレイスケールを基準にする。"},
    {"part":"C","prompt":"光を100％反射する理想的な白のマンセル明度はどれか。","choices":["10","0","9.5","1"],"correctIndex":0,"explanation":"理想的な白を明度10、理想的な黒を明度0とする。"},
    {"part":"D","prompt":"マンセルのクロマは何を表す段階か。","choices":["一次色からの距離","強調色からの距離","中間色からの距離","無彩色からの距離"],"correctIndex":3,"explanation":"彩度（Chroma）は無彩色の中心軸からどれだけ離れているかを表す。"},
    {"part":"E","prompt":"白・灰色・黒など無彩色のマンセル彩度はいくつか。","choices":["0","1.5","0s","1s"],"correctIndex":0,"explanation":"無彩色の彩度は0である。"},
    {"part":"F","prompt":"有彩色の最大彩度について適切な説明はどれか。","choices":["常に9s","常に10","常に100","色相および明度によって異なる"],"correctIndex":3,"explanation":"実現できる最大彩度は色相と明度によって異なる。"},
    {"part":"G","prompt":"マンセルの基本5色に中間色相を加えた色相数はいくつか。","choices":["5","10","20","24"],"correctIndex":1,"explanation":"R・Y・G・B・Pの5色と中間5色で10色相になる。"},
    {"part":"H","prompt":"色相記号の前に付けて細分化する数値の範囲として適切なものはどれか。","choices":["0から50","0より大きく10以下","100未満","0以上で上限は色相により異なる"],"correctIndex":1,"explanation":"色相は0を使わず、0より大きく10以下の数値で細分化する。"},
    {"part":"I","prompt":"マンセル色相10Bに最も近い色はどれか。","choices":["紫寄りの青","赤紫","青紫寄りの青","緑"],"correctIndex":2,"explanation":"10BはBの中でPB側に位置するため、青から青紫へ寄る色を選ぶ。"},
    {"part":"J","prompt":"色相記号に付く数値のうち、その色相の中心を表すものはどれか。","choices":["0","5","20","50"],"correctIndex":1,"explanation":"5の付く色相がその色相を代表する中心位置になる。"}
  ]
})
