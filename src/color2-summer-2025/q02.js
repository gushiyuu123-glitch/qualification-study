import { defineSummerGroup } from './utils.js'

const q02Image = { src: '/past-exams/color2/2025-summer/q02-light.svg', alt: '2025年度夏期 問題2の図1から図3と色票選択肢' }

export const q02 = defineSummerGroup({
  number: 2,
  questionPage: 8,
  answerPage: 52,
  defaultPoints: 2,
  caution: '原本の空欄文・図1〜図3・色票選択肢の関係を維持する。',
  items: [
    {
      part: 'A',
      prompt: '波長ごとの光の強さを表したものを［A］という。',
      choices: ['屈折率', '視感効率', '分光分布', '分光感度'],
      correctIndex: 2,
      explanation: '原本解説では、波長ごとに光の強さをグラフなどで表したものを③分光分布という。',
      image: q02Image,
    },
    {
      part: 'B',
      prompt: '図1から、この光は［B］ことがわかる。',
      choices: ['昼間の太陽光である', '光色が青みがかっている', '白熱電球の光である', '可視光の一部が含まれていない'],
      correctIndex: 2,
      explanation: '原本解説では、図1は可視光のすべての波長を含み、長波長域のエネルギー量が相対的に多いため③白熱電球の光であることがわかるとしている。',
      image: q02Image,
    },
    {
      part: 'C',
      prompt: 'また、図2は物体に光が当たって戻ってくる割合を示し、［C］曲線という。',
      choices: ['比視感度', '分光反射率', '分光透過率', '分光視感効率'],
      correctIndex: 1,
      explanation: '原本解説では、物体に光が当たって戻ってくる割合は反射率で、図2は②分光反射率曲線のグラフとしている。',
      image: q02Image,
    },
    {
      part: 'D',
      prompt: '図2の特性をもつ物体を白色光の下で見たときの色は［D］である。',
      choices: [
        { text: '色票①', colors: ['#d62a2a'] },
        { text: '色票②', colors: ['#c91d73'] },
        { text: '色票③', colors: ['#0a8034'] },
        { text: '色票④', colors: ['#f1d318'] },
      ],
      correctIndex: 0,
      explanation: '原本解説では、図2は反射率の高低差が大きく長波長域で反射率が高いため、①のような鮮やかな赤に見えるとしている。',
      questionType: 'visual-color',
      image: q02Image,
    },
    {
      part: 'E',
      prompt: 'また、眼の網膜にある視細胞の分布は、色の見え方に影響を与えている。視線を固定したときに色が検出できる範囲を［E］という。',
      choices: ['色順応', '色視野', '色彩恒常', '可視範囲'],
      correctIndex: 1,
      explanation: '原本解説では、眼を固定したときに見える範囲を視野といい、そのうち色を検出できる範囲を②色視野という。',
    },
    {
      part: 'F',
      prompt: '図3は視細胞の各波長光に対する相対的な感度をグラフに表したもので、視物質の［F］の特性が点線で示される感度に影響していると考えられている。',
      choices: ['赤オプシン', '緑オプシン', '青オプシン', 'ロドプシン'],
      correctIndex: 3,
      explanation: '原本解説では、図3の点線は杆体の分光視感効率曲線で、暗い場所での視感効率には杆体の視物質である④ロドプシンの特性が影響していると考えられている。',
      image: q02Image,
    },
    {
      part: 'G',
      prompt: '周囲が薄暗くなっていくと、眼の感度は図3の実線から点線に徐々に移っていく。この移り変わりを［G］といい、［H］の色がより明るく見えてくる。',
      choices: ['明所視', '薄明視', 'ドミナント効果', 'プルキンエシフト'],
      correctIndex: 3,
      explanation: '原本解説では、錐体視から杆体視へ変わり、眼の感度が実線から点線へ移る変化を④プルキンエシフトという。',
      image: q02Image,
    },
    {
      part: 'H',
      prompt: '周囲が薄暗くなっていくと、眼の感度は図3の実線から点線に徐々に移っていく。この移り変わりを［G］といい、［H］の色がより明るく見えてくる。',
      choices: ['短波長', '中波長', '長波長', '短波長と長波長'],
      correctIndex: 0,
      explanation: '原本解説では、プルキンエシフトによって短波長の光に対する感度が相対的に高くなり、明るい所で青に見える①短波長の色がより明るく見えてくるとしている。',
      image: q02Image,
    },
  ],
})
