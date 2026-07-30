import { definePracticeGroup } from './utils.js'

export const practice2025Entries = [
  ...definePracticeGroup({
    number: 1,
    questionPage: 48,
    answerPage: 70,
    defaultPoints: 1,
    caution: '色の機能、色覚、視覚、光源の基礎用語を近い概念と取り違えない。',
    items: [
      {part:'A',prompt:'誘目性が高い配色として適切なものはどれか。',choices:['色相差やトーン差が小さい配色','注意を向けて探すときの発見しやすさ','黒背景で黄のような高彩度色を使う','一般に低彩度の有彩色'],correctIndex:2,explanation:'黒など暗い背景に高彩度の黄を置くと、強い対比で誘目性が高くなる。'},
      {part:'B',prompt:'遺伝により色を区別しづらい色覚特性について適切な説明はどれか。',choices:['杆体細胞の働きだけで分類する','加齢による水晶体黄変だけを指す','反対色説だけで説明される','国内に300万人以上いるとされる'],correctIndex:3,explanation:'遺伝による色覚特性をもつ人は国内に多数おり、ユニバーサルデザイン上の配慮が必要である。'},
      {part:'C',prompt:'暗順応について適切な説明はどれか。',choices:['杆体細胞には赤オプシンがある','S・M・L錐体の感度域は同じ','視野周辺より中心の色感度が高い','ロドプシン再合成に時間がかかり明順応より長い'],correctIndex:3,explanation:'暗順応は杆体細胞のロドプシン再合成に時間がかかるため、明順応より時間を要する。'},
      {part:'D',prompt:'光色について適切な説明はどれか。',choices:['照らされた面の明るさを色温度という','照明光の色みで、分光分布から把握できる','白熱電球は560nm以上を含むため青い','演色性が高いほど暗く感じる'],correctIndex:1,explanation:'光源が発する光の色みが光色で、分光分布からその特性を読み取れる。'},
      {part:'E',prompt:'蛍光ランプの特徴として適切なものはどれか。',choices:['白熱電球より効率がよく消費電力が小さい','3000Kの昼光色をいう','普通形は美術館専用である','分光分布は青と黄の2峰だけ'],correctIndex:0,explanation:'蛍光ランプは白熱電球より発光効率が高く、経済性に優れる。'},
      {part:'F',prompt:'図の分光分布をもつランプとして適切なものはどれか。',choices:['白熱電球','白色LEDの昼光色','蛍光ランプの普通形','白色LEDの電球色'],correctIndex:2,explanation:'複数の鋭いピークをもつ分光分布は一般的な蛍光ランプの特徴である。',image:{src:'/practice/color2/2025/q01-spectrum.svg',alt:'蛍光ランプの分光分布'}}
    ]
  }),
  ...definePracticeGroup({
    number: 2,
    questionPage: 49,
    answerPage: 70,
    defaultPoints: 1,
    caution: 'マンセル色相環、明度・彩度表記、5色相環・10色相環の位置関係を確認する。',
    items: [
      {part:'A',prompt:'マンセル色相環について正しい説明はどれか。',choices:['基本色はR・G・B・P・W','Yで数値が小さいほどGY寄り','5の付く色相がその色相を代表する','5BはPCCSでもBと同じ略号'],correctIndex:2,explanation:'各色相で5の付く位置が代表色相になる。'},
      {part:'B',prompt:'マンセルの明度と彩度について正しい説明はどれか。',choices:['彩度はChromaで、彩度0は無彩色','色票で最も明るい色は常に明度10','理想白の明度は0','彩度が同じなら色相にかかわらず鮮やかさの感じは完全に同じ'],correctIndex:0,explanation:'彩度はChromaで表し、0は無彩色である。'},
      {part:'C',prompt:'マンセル5色相環で黄の両隣に位置する色はどれか。',choices:['緑と赤','赤と青緑','紫と緑','紫と赤'],correctIndex:0,explanation:'5色相環R→Y→G→B→Pで、Yの両隣はRとGである。',image:{src:'/practice/color2/2025/q02-munsell.svg',alt:'マンセル5色相環と10色相環の配色例'}},
      {part:'D',prompt:'マンセル10色相環で赤紫とほぼ対向する位置の組み合わせはどれか。',choices:['赤と青','紫と黄緑','赤紫と青緑','黄赤と紫'],correctIndex:1,explanation:'PとGY付近がほぼ対向する位置関係になる。',image:{src:'/practice/color2/2025/q02-munsell.svg',alt:'マンセル5色相環と10色相環の配色例'}},
      {part:'E',prompt:'色相5P、明度6.5、彩度4のマンセル表記として正しいものはどれか。',choices:['5P 6.5-4','5P 4/6.5','5P:4/6.5','5P 6.5/4'],correctIndex:3,explanation:'マンセル値は色相 明度/彩度の順で表す。'},
      {part:'F',prompt:'暗い青紫の色票に最も近いマンセル値はどれか。',choices:['5Y 9/2','5PB 2/2','5P 8/4','5PB 4/10'],correctIndex:3,explanation:'暗く鮮やかな青紫なので、低明度・高彩度の5PB 4/10が最も近い。',image:{src:'/practice/color2/2025/q02-munsell.svg',alt:'マンセル5色相環と10色相環の配色例'}}
    ]
  }),
  ...definePracticeGroup({
    number: 3,
    questionPage: 50,
    answerPage: 70,
    defaultPoints: 1,
    caution: '色相差とトーン差を図から読み、配色技法名を判定する。',
    items: [
      {part:'A',prompt:'黄緑の色票と組み合わせてトーンオントーン配色になる色はどれか。',choices:['同系色相で明度差のある淡い黄緑','無彩色の灰','青緑','紫'],correctIndex:0,explanation:'同系色相で明度差をつけるとトーンオントーン配色になる。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}},
      {part:'B',prompt:'濃い青の色票と組み合わせてトーンイントーン配色になる色はどれか。',choices:['淡い水色','紫','低彩度の茶','緑'],correctIndex:2,explanation:'近いトーンで色相を変えた低彩度の茶を組み合わせる。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}},
      {part:'C',prompt:'ナチュラルハーモニーの配色はどれか。',choices:['黄と暗い茶','緑と紫','青緑と暗緑','赤みの茶と明るい黄'],correctIndex:3,explanation:'自然光の明暗関係に沿い、黄寄りを明るくする配色がナチュラルハーモニーである。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}},
      {part:'D',prompt:'トーナル配色として適切なものはどれか。',choices:['中明度・中低彩度の3色','高彩度の黄緑グラデーション','青の濃淡だけ','緑と黄緑の高彩度配色'],correctIndex:0,explanation:'トーナル配色は中明度・中低彩度の中間色を中心にまとめる。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}},
      {part:'E',prompt:'ダイアード配色として適切なものはどれか。',choices:['緑と青','赤紫と緑','暗緑と黄','黄緑と青緑'],correctIndex:1,explanation:'色相環で補色位置にある2色の組み合わせがダイアードである。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}},
      {part:'F',prompt:'スプリットコンプリメンタリー配色として適切なものはどれか。',choices:['赤橙・黄・黄緑','橙・青・青緑','紫・橙・緑','水色・青・黄緑'],correctIndex:1,explanation:'補色の一方を両隣の2色へ分けた3色配色がスプリットコンプリメンタリーである。',image:{src:'/practice/color2/2025/q03-palettes.svg',alt:'トーンオントーン、ナチュラルハーモニー、トーナル、ダイアード、スプリットコンプリメンタリーの配色例'}}
    ]
  })
]
