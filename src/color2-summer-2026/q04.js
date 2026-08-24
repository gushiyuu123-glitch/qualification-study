// 2026年度夏期の教科書過去問を、設問・選択肢・正答の意味を変えずに4択練習として収録します。
export const q04 = {
  number: 4,
  questionPage: 4,
  answerPage: 18,
  defaultPoints: 2,
  caution: '教科書の問題(4)に沿って、マンセル表色系の成立と色立体を整理する。図版の色は画面用の近似色。',
  items: [
    { part: 'A', prompt: 'マンセル表色系は、何の表示に使われるか。', choices: ['物体の色', '光の色', '有彩色', '可視光'], correctIndex: 0, explanation: '教科書の正答は①。マンセル表色系は物体の色の表示に用いられる。', points: 1 },
    { part: 'B', prompt: 'マンセル表色系は、どの表色系の一つか。', choices: ['混色系', '顕色系', 'カラーカード', 'グレイスケール'], correctIndex: 1, explanation: '教科書の正答は②。マンセル表色系は顕色系の表色系である。', points: 1 },
    { part: 'C', prompt: 'マンセルはどの国の人物か。', choices: ['アメリカ', 'イギリス', 'ドイツ', 'スウェーデン'], correctIndex: 0, explanation: '教科書の正答は①。マンセルはアメリカの人物である。', points: 1 },
    { part: 'D', prompt: 'マンセルは色をどのように整理するためにその原型を考えたか。', choices: ['主観的', '客観的', '知覚的', '系統的'], correctIndex: 3, explanation: '教科書の正答は④。色を系統的に整理することを目指した。', points: 1 },
    { part: 'E', prompt: '原色が円周上に等間隔に置かれた色相環の順序に従って、各色相の等色相面を無彩色の中心軸のまわりに集めたものは何か。', choices: ['色断面', '色立体', '標準色票', '三属性'], correctIndex: 1, explanation: '教科書の正答は②。等色相面を中心軸のまわりに集めた三次元構造が色立体である。', points: 1 },
    {
      part: 'F',
      prompt: 'マンセルが原色として選んだ5色の組みあわせはどれか。',
      choices: ['図①の3色', '図②の4色', '図③の5色', '図④の5色'],
      correctIndex: 2,
      explanation: '教科書の正答は③。R・Y・G・B・Pの5色である。',
      questionType: 'visual-color',
      image: { src: '/color2-2026-summer-practice/q04-munsell.svg', alt: '2026年度夏期 問題4Fの色の組みあわせ' },
    },
    { part: 'G', prompt: '各色相で、同じ色相の色を明度・彩度の違いで並べた面は何か。', choices: ['等色相面', '色再現領域', '分光反射率曲線', '分光感度曲線'], correctIndex: 0, explanation: '教科書の正答は①。同じ色相の色を明度・彩度の違いで並べた面を等色相面という。' },
    { part: 'H', prompt: 'マンセル表色系では、最高彩度の色は色相によって何が異なるか。', choices: ['明度だけ', '彩度だけ', '明度や彩度', '色み'], correctIndex: 2, explanation: '教科書の正答は③。色相によって最高彩度の位置や値、対応する明度が異なる。' },
    { part: 'I', prompt: 'マンセルは、色相によって形が違う色立体を何と呼んだか。', choices: ['カラースペース', 'カラーツリー', 'カラープロファイル', 'ナチュラルハーモニー'], correctIndex: 1, explanation: '教科書の正答は②。マンセルはこの色立体をカラーツリーと呼んだ。' },
    { part: 'J', prompt: '等明度面の無彩色を中心とする同一円周上には、どの色が並ぶか。', choices: ['高彩度色', '純色', '等彩度色', '代表色'], correctIndex: 2, explanation: '教科書の正答は③。同一円周上には彩度が等しい色が並ぶ。' },
  ],
}
