import { defineWinterGroup } from './utils.js'

const sourcePrompt = '次のA〜Fの色について、最も適切なJISの物体色の慣用色名を、それぞれの①②③④からひとつ選び、その番号をマークしなさい。'
const q16Image = { src: '/color2-2025-winter-practice/q16.svg', alt: '2025年度冬期 問題16の色票A〜F' }

export const q16 = defineWinterGroup({
  number: 16,
  defaultPoints: 2,
  caution: '原本の色票・慣用色名表記・公式解答を基準にする。画面上の色票は印刷原本をレンダリングした中央部の色を基準にした近似色。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['韓紅花', '鶸色', '代赭', '鉄色'], correctIndex: 0, explanation: '解答は①、韓紅花。', questionType: 'visual-color', image: q16Image },
    { part: 'B', prompt: sourcePrompt, choices: ['煤竹色', '常磐色', '桧皮色', '海松色'], correctIndex: 3, explanation: '解答は④、海松色。', questionType: 'visual-color', image: q16Image },
    { part: 'C', prompt: sourcePrompt, choices: ['古代紫', '弁柄色', '利休鼠', '緑青色'], correctIndex: 0, explanation: '解答は①、古代紫。', questionType: 'visual-color', image: q16Image },
    { part: 'D', prompt: sourcePrompt, choices: ['オールドローズ', 'テラコッタ', 'バーガンディー', 'ポピーレッド'], correctIndex: 2, explanation: '解答は③、バーガンディー。', questionType: 'visual-color', image: q16Image },
    { part: 'E', prompt: sourcePrompt, choices: ['アンバー', 'エクルベイジュ', 'ゴールデンイエロー', 'ネープルスイエロー'], correctIndex: 3, explanation: '解答は④、ネープルスイエロー。', questionType: 'visual-color', image: q16Image },
    { part: 'F', prompt: sourcePrompt, choices: ['シャトルーズグリーン', 'ボトルグリーン', 'セルリアンブルー', 'ナイルブルー'], correctIndex: 3, explanation: '解答は④、ナイルブルー。', questionType: 'visual-color', image: q16Image },
  ],
})
