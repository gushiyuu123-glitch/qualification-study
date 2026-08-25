// 2026年度夏期の教科書過去問を、設問・選択肢・正答の意味を変えずに選択練習として収録します。
const sourceInstruction = '次のA〜Fの空欄にあてはまる最も適切なものを、それぞれの①②③④からひとつ選びその番号をマークしなさい。'
const sourceText = 'インテリアにおいてパブリック空間として分類される空間に玄関があるが、玄関は来客を暖かく迎え入れる雰囲気が必要となるので、暖色系の色、自然素材の色、［A］でのコーディネーションが基本となる。玄関と各部屋をつなぐ空間の廊下や階段は、玄関と［B］色というのが一般的である。また、安全性が特に重要となる階段は、段差がある部分に［C］色を配すると高齢者にも見えやすくなる。ほかにもパブリック空間として分類される空間には、［D］やリビングルームなどがあるが、リビングルームの壁や天井には暖色系のオフホワイトや［E］の色がよく用いられ、［F］すると安定感が得られる。'
const sourcePrompt = `${sourceInstruction}\n\n${sourceText}`

export const q13 = {
  number: 13,
  questionPage: 13,
  answerPage: 18,
  defaultPoints: 2,
  caution: '原本の問題(13)の共通指示・A〜Fの一続きの文章・選択肢・解答を基準にする。各設問では同じ原文を読み、対応する空欄だけを解く。',
  items: [
    { part: 'A', prompt: sourcePrompt, choices: ['鮮やかなビビッドカラー', 'コントラストのあるモノトーン', 'ベージュやオフホワイト系の色', 'ダークカラーなどの暗清色'], correctIndex: 2, explanation: '教科書の正答は③。' },
    { part: 'B', prompt: sourcePrompt, choices: ['共通した方向性の', '対照的な', 'コンセプトの異なる', '色相差のある'], correctIndex: 0, explanation: '教科書の正答は①。' },
    { part: 'C', prompt: sourcePrompt, choices: ['玄関と同じ', '階段と一体感のある', 'ほかとの違和感がない', '明度差をつけた'], correctIndex: 3, explanation: '教科書の正答は④。' },
    { part: 'D', prompt: sourcePrompt, choices: ['ベッドルーム', '和室', '子ども部屋', 'キッチン'], correctIndex: 1, explanation: '教科書の正答は②。' },
    { part: 'E', prompt: sourcePrompt, choices: ['低明度・高彩度', '低明度・低彩度', '高明度・高彩度', '高明度・低彩度'], correctIndex: 3, explanation: '教科書の正答は④。' },
    { part: 'F', prompt: sourcePrompt, choices: ['壁や天井よりも明度を低く', '壁や天井よりも明度を高く', '壁や天井と同明度に', '壁や天井と同明度で彩度を低く'], correctIndex: 0, explanation: '教科書の正答は①。' },
  ],
}
