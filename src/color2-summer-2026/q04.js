const sourcePrompt = `次の[A]〜[J]の空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。

マンセル表色系は、[A]の表示に使われる[B]の一つで、[C]のマンセルが色を[D]に整理するためにその原型を考えた。その[E]は、原色である[F]が円周上に等間隔に置かれた色相環の順序に従って、各色相の[G]を無彩色の中心軸のまわりに集めたものとなっている。
マンセル表色系では、最高彩度の色は色相によって[H]が異なる。そのため色相によって[G]の形が違うことから、マンセルはこの[E]を[I]と呼んだ。マンセルの[E]を中心軸に対して垂直に交わるように、水平に横に切断すると、そこには明度が等しい色が並ぶ等明度面が現れる。そして、等明度面の無彩色を中心とする同一円周上には[J]が並ぶ。`

const q04Image = { src: '/color2-2026-summer-practice/q04-munsell.svg', alt: '2026年度夏期 問題4Fの色の組みあわせ' }

export const q04 = {
  number: 4,
  questionPage: 4,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本のA〜J空欄文章・色票・選択肢・公式解答を基準にする。A〜Eは各1点、F〜Jは各2点。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['物体の色', '光の色', '有彩色', '可視光'], correctIndex: 0, explanation: '解答は①。マンセル表色系は物体の色の表示に使われる。', points: 1 },
    { part: 'B', prompt: sourcePrompt, choices: ['混色系', '顕色系', 'カラーカード', 'グレイスケール'], correctIndex: 1, explanation: '解答は②。マンセル表色系は顕色系の一つである。', points: 1 },
    { part: 'C', prompt: sourcePrompt, choices: ['アメリカ', 'イギリス', 'ドイツ', 'スウェーデン'], correctIndex: 0, explanation: '解答は①。マンセルはアメリカの人物である。', points: 1 },
    { part: 'D', prompt: sourcePrompt, choices: ['主観的', '客観的', '知覚的', '系統的'], correctIndex: 3, explanation: '解答は④。マンセルは色を系統的に整理するために原型を考えた。', points: 1 },
    { part: 'E', prompt: sourcePrompt, choices: ['色断面', '色立体', '標準色票', '三属性'], correctIndex: 1, explanation: '解答は②。各色相の等色相面を無彩色の中心軸のまわりに集めたものは色立体である。', points: 1 },
    { part: 'F', prompt: sourcePrompt, choices: ['図①の3色', '図②の4色', '図③の5色', '図④の5色'], correctIndex: 2, explanation: '解答は③。原本の図③に示された5色が対応する。', questionType: 'visual-color', image: q04Image },
    { part: 'G', prompt: sourcePrompt, choices: ['等色相面', '色再現領域', '分光反射率曲線', '分光感度曲線'], correctIndex: 0, explanation: '解答は①。各色相の等色相面を中心軸のまわりに集める。' },
    { part: 'H', prompt: sourcePrompt, choices: ['明度だけ', '彩度だけ', '明度や彩度', '色み'], correctIndex: 2, explanation: '解答は③。最高彩度の色は色相によって明度や彩度が異なる。' },
    { part: 'I', prompt: sourcePrompt, choices: ['カラースペース', 'カラーツリー', 'カラープロファイル', 'ナチュラルハーモニー'], correctIndex: 1, explanation: '解答は②。マンセルはこの色立体をカラーツリーと呼んだ。' },
    { part: 'J', prompt: sourcePrompt, choices: ['高彩度色', '純色', '等彩度色', '代表色'], correctIndex: 2, explanation: '解答は③。等明度面の無彩色を中心とする同一円周上には等彩度色が並ぶ。' },
  ],
}
