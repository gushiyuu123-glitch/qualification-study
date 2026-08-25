import { defineWinterGroup } from './utils.js'

const sourcePrompt = `【本試験は記述式】
次の[A]〜[E]の空欄にあてはまる適切な名称または記号を、マークシート用紙裏面の解答欄にひとつ記入しなさい。ただし、[A]、[B]、[D]は15文字以内のカタカナの配色技法の名称、[C]はPCCSの色相記号、[E]はマンセル値で解答すること。

図1はあまり見慣れないような新鮮な感じにしたかったので[A]配色にしたが、この配色では明度差とともに、色相差が必要なので、同一色相配色や無彩色を使った配色ではつくることができない。
さらに図1は特色の組みあわせで、PCCSの色相環では[B]という配色技法になる6:yOと[C]の色を組みあわせた2色配色であるが、この配色の6:yOの色を8:Yと4:rOの色に置き換えた3色配色は、PCCSの色相環では[D]という配色技法になる。
また、図1の6:yOの色はマンセル表色系の色相記号では8YRと表示されるが、明度3.5、彩度6.0のこの色はマンセル値では[E]と表される。`

const q17Image = { src: '/color2-2025-winter-practice/q17.svg', alt: '2025年度冬期 問題17 図1の家具ポスターを学習用に再構成した図版' }

export const q17 = defineWinterGroup({
  number: 17,
  defaultPoints: 3,
  caution: '本試験はA〜Eを記述する問題。練習サイトでは原文と図の手掛かりを保持したまま、各空欄だけを4択化している。公式解答はA=コンプレックス、B=ダイアード、C=18:B、D=スプリットコンプリメンタリー、E=8YR 3.5/6.0（または8YR 3.5/6）。',
  items: [
    {
      part: 'A', prompt: sourcePrompt,
      choices: ['コンプレックス', 'ナチュラル', 'カマイユ', 'フォカマイユ'],
      correctIndex: 0,
      explanation: '解答はコンプレックス。図1はlt18°とdk6の2色配色で、明度差とともに色相差があり、同一色相配色や無彩色配色ではつくれない。',
      questionType: 'written-converted', points: 3, image: q17Image,
    },
    {
      part: 'B', prompt: sourcePrompt,
      choices: ['ダイアード', 'トライアド', 'テトラード', 'スプリットコンプリメンタリー'],
      correctIndex: 0,
      explanation: '解答はダイアード。6:yOと18:BはPCCS色相環で色相差12の補色関係にあり、補色の位置にある2色を使う配色技法である。',
      questionType: 'written-converted', points: 3, image: q17Image,
    },
    {
      part: 'C', prompt: sourcePrompt,
      choices: ['6:yO', '12:G', '18:B', '24:RP'],
      correctIndex: 2,
      explanation: '解答は18:B。6:yOの補色になる色相は、色相差12の18:Bである。',
      questionType: 'written-converted', points: 3, image: q17Image,
    },
    {
      part: 'D', prompt: sourcePrompt,
      choices: ['トライアド', 'テトラード', 'スプリットコンプリメンタリー', 'コンプレックス'],
      correctIndex: 2,
      explanation: '解答はスプリットコンプリメンタリー。補色関係にある片側の色相を両隣の色相に置き換えた3色配色である。',
      questionType: 'written-converted', points: 3, image: q17Image,
    },
    {
      part: 'E', prompt: sourcePrompt,
      choices: ['8YR 3.5/6.0', '8YR 6.0/3.5', '3.5YR 8/6.0', '8YR-3.5-6.0'],
      correctIndex: 0,
      explanation: '解答は8YR 3.5/6.0（または8YR 3.5/6）。マンセル表色系は色相 明度/彩度の順に連記し、「-」や「:」は使用しない。',
      questionType: 'written-converted', points: 3, image: q17Image,
    },
  ],
})
