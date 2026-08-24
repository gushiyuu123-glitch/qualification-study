import { defineWinterGroup } from './utils.js'

export const q02 = defineWinterGroup({
  number: 2,
  defaultPoints: 2,
  caution: '2025年度冬期の教科書原本に沿って収録。図と色票を使う設問は、原本と同じ判断材料を残す。',
  items: [
    { part: 'A', prompt: '照明光の特性を波長ごとのエネルギーとして表すものはどれか。', choices: ['分光感度', '比視感度', '分光分布', '色光分布'], correctIndex: 2, explanation: '教科書の正答は③。照明光の波長ごとのエネルギー分布は分光分布で表す。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'B', prompt: '図1の分光分布から読み取れる昼光の特徴として正しいものはどれか。', choices: ['橙から赤の成分が多い', '長波長域のエネルギーが多い', '光色が夕方の太陽光に近い', '全波長の光がほぼ均等に含まれている'], correctIndex: 3, explanation: '教科書の正答は④。昼光の図は可視範囲の全波長がほぼ均等に含まれている。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'C', prompt: '物体に当たった光がはね返る割合を波長ごとに表す曲線はどれか。', choices: ['色光反射率', '分光反射率', '色光透過率', '分光透過率'], correctIndex: 1, explanation: '教科書の正答は②。波長ごとの反射割合は分光反射率であり、グラフは分光反射率曲線という。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'D', prompt: '図2の分光反射率をもつ物体を白色光の下で見たとき、最も近い色票はどれか。', choices: ['色票①', '色票②', '色票③', '色票④'], correctIndex: 3, explanation: '教科書の正答は④。原本では文字の色名ではなく、赤・黄・緑・青の4枚の色票から選ぶ問題である。', questionType: 'visual-color', image: { src: '/color2-2025-winter-practice/q02-d.svg', alt: '2025年度冬期 問題2D 図2と色票①〜④' } },
    { part: 'E', prompt: '錐体細胞と杆体細胞の各波長光に対する相対的な感度を表す用語はどれか。', choices: ['比視覚度', '視感度率', '分光視感効率', '分光視感度率'], correctIndex: 2, explanation: '教科書の正答は③。各波長に対する相対的な感度は分光視感効率（比視感度）という。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'F', prompt: '図3の分光視感効率曲線で、実線が示す細胞はどれか。', choices: ['錐体細胞', '杆体細胞', '水平細胞', '双極細胞'], correctIndex: 0, explanation: '教科書の正答は①。実線は明所視に対応する錐体細胞の感度を表す。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'G', prompt: '周囲が暗くなるにつれて相対的に感度が高くなる光はどれか。', choices: ['長波長', '中波長', '短波長', '長波長と短波長'], correctIndex: 2, explanation: '教科書の正答は③。暗所では感度のピークが短波長側へ移る。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
    { part: 'H', prompt: '明所視から暗所視へ、またはその逆へ感度が移り変わる現象はどれか。', choices: ['明順応', '暗順応', 'リープマン効果', 'プルキンエシフト'], correctIndex: 3, explanation: '教科書の正答は④。錐体視と杆体視の感度ピークが移る現象はプルキンエシフトである。', questionType: 'visual-diagram', image: { src: '/color2-2025-winter-practice/q02.svg', alt: '2025年度冬期 問題2 図1〜図3' } },
  ],
})
