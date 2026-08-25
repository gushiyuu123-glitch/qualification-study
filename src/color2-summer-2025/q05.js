import { defineSummerGroup } from './utils.js'

export const q05 = defineSummerGroup({
  number: 5,
  questionPage: 11,
  answerPage: 54,
  defaultPoints: 2,
  caution: "マンセル値の表記と、色相環上の位置関係を混同しない。",
  items: [
  {"part":"A","prompt":"マンセル表色系について正しい記述はどれか。","choices":["色相・明度・彩度に小数点を使った表示はできない。","色相記号で10の数字がつく色相が代表色相である。","光を100％反射する理想的な白の明度は0である。","PCCSで緑みの青にあたる色のマンセル色相記号は5Bである。"],"correctIndex":3,"explanation":"マンセルでは小数表記も可能で、理想白は明度10、理想黒は0。緑みの青は5B付近で表す。"},
  {"part":"B","prompt":"マンセル表色系の彩度について正しい記述はどれか。","choices":["無彩色からどれだけ離れているかを表す段階である。","色相にかかわらず最高彩度は常に10である。","同じ彩度値なら色相にかかわらず鮮やかさが同じに見える。","最高彩度の段階には1色だけが位置する。"],"correctIndex":0,"explanation":"彩度は無彩色軸からの距離を表す。最高彩度は色相や明度によって異なる。"},
  {"part":"C","prompt":"BGの記号で表される色相範囲に位置する色票はどれか。","choices":[{"text":"色票①","colors":["#12677a"]},{"text":"色票②","colors":["#285d93"]},{"text":"色票③","colors":["#5e962f"]},{"text":"色票④","colors":["#138b76"]}],"correctIndex":3,"explanation":"BGは青緑を表すため、青と緑の中間にある色票④が該当する。","questionType":"visual-color"},
  {"part":"D","prompt":"図の5色の関係として最も適切なものはどれか。","choices":["等色相で明度が等しい色","等彩度で明度が変わる色","等明度で彩度が等しい色","等色相で彩度が変わる色"],"correctIndex":1,"explanation":"図は同一色相・同一彩度のまま明度だけが変化している。","image":{"src":"/past-exams/color2/2025-summer/q5-gradient.svg","alt":"2025年度夏期 問題5Dの5色の色票列"}},
  {"part":"E","prompt":"マンセル5色相の色相環で、図1のGの両隣に位置する色の組み合わせはどれか。","choices":[{"text":"色票①","colors":["#b4202a","#73518a"]},{"text":"色票②","colors":["#db3651","#1e9baa"]},{"text":"色票③","colors":["#e2bd17","#226796"]},{"text":"色票④","colors":["#a867a9","#f0c91d"]}],"correctIndex":2,"explanation":"5色相環はR→Y→G→B→Pの順で、Gの両隣はYとBである。","questionType":"visual-color"},
  {"part":"F","prompt":"マンセル10色相の色相環で、ほぼ対向する位置にある色の組み合わせはどれか。","choices":[{"text":"色票①","colors":["#a91c28","#17765e"]},{"text":"色票②","colors":["#694b7a","#247c91"]},{"text":"色票③","colors":["#1b8b68","#db8a42"]},{"text":"色票④","colors":["#e2c418","#c75a8a"]}],"correctIndex":0,"explanation":"マンセル10色相ではRとBGがほぼ対向する。","questionType":"visual-color"}
]
})
