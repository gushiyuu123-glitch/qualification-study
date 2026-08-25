import { defineSummerGroup } from './utils.js'

const q04Image = { src: '/past-exams/color2/2025-summer/q04-munsell.svg', alt: '2025年度夏期 問題4の図1と図2の色票' }

export const q04 = defineSummerGroup({
  number: 4,
  questionPage: 10,
  answerPage: 53,
  defaultPoints: 2,
  caution: "マンセル表色系では、色相・明度・彩度と色立体の構造を分けて覚える。図1・図2は原本色票を基準にした画面用近似色。",
  items: [
  {"part":"A","prompt":"マンセル表色系は、色を体系的に配列するどの方式の一つか。","choices":["カラースペース","カラーダイヤル","カラーピッカー","カラーオーダシステム"],"correctIndex":3,"explanation":"マンセル表色系は、知覚的な属性に基づき色を体系化したカラーオーダシステムである。"},
  {"part":"B","prompt":"マンセル表色系では、何を記号と色票で表すか。","choices":["色の三属性の段階","トーンの分類","混色の原理を用いた色","光の色"],"correctIndex":0,"explanation":"マンセル表色系は色相・明度・彩度という色の三属性を段階で表す。"},
  {"part":"C","prompt":"マンセルが基本色として選んだ5色の組み合わせはどれか。","choices":["YR・GY・BG・PB・RP","R・Y・G・B・P","C・M・Y・K","R・G・B"],"correctIndex":1,"explanation":"マンセルの基本色はR、Y、G、B、Pの5色である。"},
  {"part":"D","prompt":"図1に示した色の色相記号として最も適切なものはどれか。","choices":["10BG","5B","5PB","10PB"],"correctIndex":2,"explanation":"教科書の正答は③。図1の色相は5PBで表される。","questionType":"visual-color","image":q04Image},
  {"part":"E","prompt":"Yの色相で、10のつく色相はどの色相寄りになるか。","choices":["GY","YR","RP","R"],"correctIndex":0,"explanation":"Yで10のつく色相はGY寄りになる。"},
  {"part":"F","prompt":"BGの色相で、5よりも小さい数字がつく色相はどの色相寄りになるか。","choices":["B","PB","G","P"],"correctIndex":2,"explanation":"BGで5より小さい数字がつく色相はG寄りになる。"},
  {"part":"G","prompt":"図2の無彩色をマンセル表色系で表す記号はどれか。","choices":["n-5","5s","Gy-5","N5"],"correctIndex":3,"explanation":"教科書の正答は④。無彩色はNeutralのNと明度の数値で表し、図2はN5となる。","questionType":"visual-color","image":q04Image},
  {"part":"H","prompt":"無彩色のNの後につく数値は、どの属性の値か。","choices":["彩度","明度","トーン","クロマ"],"correctIndex":1,"explanation":"無彩色には色相と彩度がないため、Nの後の数値は明度を示す。"},
  {"part":"I","prompt":"マンセル色立体の等色相面の形について正しいものはどれか。","choices":["どの色相も正三角形","すべて同じ形の四角形","色相によって異なる形","色相によって大きさの違う正方形"],"correctIndex":2,"explanation":"色相ごとに最高彩度やその明度が異なるため、等色相面の形も異なる。"},
  {"part":"J","prompt":"マンセル色立体を中心軸に垂直に水平切断した面には、どの色が並ぶか。","choices":["明度が等しい色","彩度が等しい色","色調が等しい色","明度と彩度がともに等しい色"],"correctIndex":0,"explanation":"水平切断した等明度面には、明度が等しい色が並ぶ。"}
]
})
