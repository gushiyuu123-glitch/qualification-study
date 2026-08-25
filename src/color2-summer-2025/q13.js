import { defineSummerGroup } from './utils.js'

const sourceGapPrompt = (part) => `原本問題(13)の空欄${part}。問題ページにはA〜Fの選択肢と写真A・Bは掲載されているが、空欄に対応する本文が確認できない。推測で設問本文を補完せず、原本に印刷された選択肢から解答する。`

export const q13 = defineSummerGroup({
  number: 13,
  questionPage: 19,
  answerPage: 58,
  defaultPoints: 2,
  caution: '原本の問題ページと解答・解説ページに不整合がある。問題ページにはファッション写真A・BとA〜Fの選択肢だけが掲載され、解答・解説はインテリア空間の内容になっている。AI推測で本文を作らず、問題ページの選択肢と解答表の正答番号だけをそのまま保持する。写真は正答判断材料として使わない。',
  items: [
    {
      part: 'A',
      prompt: sourceGapPrompt('A'),
      choices: ['暖色系', '寒色系', '中間色', '暗清色'],
      correctIndex: 0,
      explanation: '原本解答表はA-①。解説ページはインテリア空間について説明しているが、問題ページには対応本文がないため、その説明から設問を逆生成していない。',
    },
    {
      part: 'B',
      prompt: sourceGapPrompt('B'),
      choices: ['低明度・低彩度の暖色', '中明度・中彩度の寒色', 'グレイッシュな色', 'ビビッドな色'],
      correctIndex: 3,
      explanation: '原本解答表はB-④。対応する問題本文が原本問題ページで確認できないため、正答番号と選択肢のみ保持する。',
    },
    {
      part: 'C',
      prompt: sourceGapPrompt('C'),
      choices: ['彩度を抑えた色系', '彩度の高い色系', '対比の強い色', '鮮やかな色調の色'],
      correctIndex: 0,
      explanation: '原本解答表はC-①。対応する問題本文を解説から推測補完していない。',
    },
    {
      part: 'D',
      prompt: sourceGapPrompt('D'),
      choices: ['中明度', '低明度', '高彩度', '低彩度'],
      correctIndex: 2,
      explanation: '原本解答表はD-③。対応する問題本文を解説から推測補完していない。',
    },
    {
      part: 'E',
      prompt: sourceGapPrompt('E'),
      choices: ['水色などの寒色系の色', '暖色・中性色系のオフホワイト', '明度差のある無彩色の色調', 'ブルー系の鮮やかな色調'],
      correctIndex: 1,
      explanation: '原本解答表はE-②。対応する問題本文を解説から推測補完していない。',
    },
    {
      part: 'F',
      prompt: sourceGapPrompt('F'),
      choices: ['暗い色調', '明るい色調', '高彩度の色系', '低明度の色系'],
      correctIndex: 1,
      explanation: '原本解答表はF-②。対応する問題本文を解説から推測補完していない。',
    },
  ],
})
