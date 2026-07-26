import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'color-harmony'
const CATEGORY_LABEL = '色彩調和'

const colorQualification = qualifications.find(
  (qualification) => qualification.id === 'color-2',
)

if (
  colorQualification &&
  !colorQualification.categories.some((category) => category.id === CATEGORY_ID)
) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary:
      '調和の原理、自然の秩序、ドミナント、各種配色技法、色相環の分割を比較して整理する。',
    keyPoints: [
      'ナチュラルハーモニーとコンプレックスハーモニーは、黄側・青紫側の明度関係が逆になる。',
      'ドミナントカラーは色相、ドミナントトーンはトーンを共通要素として全体をまとめる。',
      'トーン・オン・トーンは同系色相と明度差、トーン・イン・トーンは同一・類似トーンを核にする。',
      'ダイアードからヘクサードは、色相環を規則的に分割して色を選ぶ。',
    ],
    cautions: [
      '似た名称は、何を統一するか、何に差をつけるか、何色使うかの3点で見分ける。',
      '配色演習は問題として登録せず、解答例から判別条件だけを学習内容として残す。',
    ],
  })
}

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: '配色と調和 ― ジャッドの四原理',
      page: 'P.48',
      focusTerms: ['秩序の原理', 'なじみの原理', '類似性の原理', '明瞭性の原理'],
      intro: [
        '色彩調和論は、どのような色の組み合わせを人が美しく、まとまりがあると感じるかを説明する考え方である。',
        'アメリカの色彩学者ジャッドは、従来の調和論を四つの原理に整理した。名称だけでなく、判断条件を対応させて覚える。',
      ],
      sections: [
        {
          title: '四つの原理',
          pairs: [
            { cue: '規則的な色群から規則的に選ぶ', answer: '秩序の原理' },
            { cue: '自然や日常で見慣れた色の並び', answer: 'なじみの原理' },
            { cue: '同系色相・同系トーンなど共通性をもつ', answer: '類似性の原理' },
            { cue: 'はっきりしたコントラストをもつ', answer: '明瞭性の原理' },
          ],
          body: [
            '四原理は互いに完全に独立するとは限らない。自然で見慣れた並びが、同時に規則性や類似性をもつこともある。試験では、設問の中心となる条件を選ぶ。',
          ],
        },
        {
          title: 'ルードの限定色による考え方',
          pairs: [
            { cue: '多くの色を使うより', answer: '限られた色で達成する' },
          ],
          body: [
            'ルードは、美しい配色は色数を増やすことだけで生まれるのではなく、ごく限られた色を効果的に使うことで達成できると考えた。欧米の配色論では重要な考え方の一つである。',
          ],
        },
      ],
      cautions: [
        '「似た色だから調和する」は類似性の原理。「自然界で見慣れているから調和する」はなじみの原理。',
        '明瞭性の原理は、類似ではなく明確な差やコントラストをもつ組み合わせ。',
      ],
      terms: ['秩序の原理', 'なじみの原理', '類似性の原理', '明瞭性の原理', '限られた色で達成する'],
      visual: { kind: 'principles' },
    },
    {
      title: 'ナチュラルハーモニー',
      page: 'P.48〜49',
      focusTerms: ['黄に近い色相は高明度', '青紫に近い色相は低明度', 'ナチュラルハーモニー'],
      intro: [
        '自然光のもとでは、同じ対象でも光が当たる部分は黄みを帯びて明るく、陰の部分は青みを帯びて暗く見える。',
        'この自然の見え方に沿い、色相の位置と明度を対応させる配色がナチュラルハーモニーである。',
      ],
      sections: [
        {
          title: '明度の方向',
          pairs: [
            { cue: '黄に近い色相', answer: '高明度' },
            { cue: '青紫に近い色相', answer: '低明度' },
            { cue: '自然の見え方に沿う配色', answer: 'ナチュラルハーモニー' },
          ],
          body: [
            '黄寄りの色を明るく、青紫寄りの色を暗くする。自然の光と陰の関係に近いため、なじみやすく安定した印象になる。',
          ],
        },
        {
          title: '組み合わせる色相',
          pairs: [
            { cue: '基本となる色相関係', answer: '隣接色相・類似色相' },
            { cue: '必要な条件', answer: '色相差がある' },
          ],
          body: [
            '同一色相だけでは黄側と青紫側の位置関係がつくれない。無彩色のみの配色も、この原理による配色にはならない。',
          ],
        },
      ],
      cautions: [
        '「黄に近い＝明るい、青紫に近い＝暗い」で固定する。コンプレックスハーモニーは逆。',
        '黄そのものと青紫そのものだけを使うという意味ではなく、色相環上でどちら側に近いかを見る。',
      ],
      terms: ['黄に近い色相は高明度', '青紫に近い色相は低明度', '隣接色相・類似色相', 'ナチュラルハーモニー'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: '自然の順序', colors: ['#b8c92b', '#0c6550'], note: '黄側を明るく／青紫側を暗く' },
          { label: '暖色の例', colors: ['#d99b67', '#7b493f'], note: '黄赤側を明るく／紫側を暗く' },
        ],
      },
    },
    {
      title: 'コンプレックスハーモニー',
      page: 'P.50',
      focusTerms: ['黄に近い色相は低明度', '青紫に近い色相は高明度', '不調和の調和'],
      intro: [
        'コンプレックスハーモニーは、ナチュラルハーモニーとは逆の明度関係をつくる配色である。',
        '自然界では見慣れにくい複雑で新鮮な印象になり、違和感を含みながら成立するため「不調和の調和」とも呼ばれる。',
      ],
      sections: [
        {
          title: '明度の方向',
          pairs: [
            { cue: '黄に近い色相', answer: '低明度' },
            { cue: '青紫に近い色相', answer: '高明度' },
            { cue: '別名', answer: '不調和の調和' },
          ],
          body: [
            '黄側を暗くし、青紫側を明るくする。自然な光と陰の順序に逆らうため、複雑で意外性のある印象になる。',
          ],
        },
        {
          title: '成立条件',
          pairs: [
            { cue: '基本となる色相関係', answer: '補色色相・対照色相など' },
            { cue: '必要な条件', answer: '色相差がある' },
          ],
          body: [
            '同一色相や無彩色だけでは、黄側と青紫側の明度を逆転させる関係がつくれない。',
          ],
        },
      ],
      cautions: [
        'ナチュラルハーモニーとの違いは色相ではなく、黄側と青紫側の明度の向き。',
        '「複雑な配色」という印象だけで判断せず、必ず明度関係を見る。',
      ],
      terms: ['黄に近い色相は低明度', '青紫に近い色相は高明度', '補色色相・対照色相', '不調和の調和'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: '逆の順序', colors: ['#61702b', '#78d4b0'], note: '黄側を暗く／青紫側を明るく' },
          { label: '対照例', colors: ['#4d413e', '#53a8cf'], note: '違和感を含む新鮮な配色' },
        ],
      },
    },
    {
      title: 'ドミナント',
      page: 'P.52',
      focusTerms: ['共通の要素', '統一感やなじみ感', 'ドミナント効果'],
      intro: [
        '自然の風景では、一つの色やトーンが全体を支配し、まとまりを感じさせることがある。これをドミナント効果という。',
        'ドミナントは「支配的な」「優勢な」という意味で、配色全体に共通要素をもたせる考え方である。',
      ],
      sections: [
        {
          title: '共通要素による統一',
          pairs: [
            { cue: '全体に共通させるもの', answer: '共通の要素' },
            { cue: '生まれる印象', answer: '統一感やなじみ感' },
            { cue: '現象名', answer: 'ドミナント効果' },
          ],
          body: [
            '共通させる要素には、色相、トーン、明度、彩度がある。どの属性を支配的にするかで配色技法の名称が変わる。',
          ],
        },
        {
          title: '代表的な種類',
          pairs: [
            { cue: '色相を共通にする', answer: '色相のドミナント' },
            { cue: 'トーンを共通にする', answer: 'トーンのドミナント' },
            { cue: '明度を共通にする', answer: '明度のドミナント' },
            { cue: '彩度を共通にする', answer: '彩度のドミナント' },
          ],
          body: [
            '公式テキストでは、特にドミナントカラー配色とドミナントトーン配色を具体的な技法として学ぶ。',
          ],
        },
      ],
      cautions: [
        'ドミナントは特定の1色だけを使うという意味ではない。複数色に共通する属性をつくる。',
      ],
      terms: ['共通の要素', '統一感やなじみ感', 'ドミナント効果', '色相のドミナント', 'トーンのドミナント'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: '色相のドミナント', colors: ['#286943', '#0d5633', '#6e9870'], note: '緑系で統一' },
          { label: 'トーンのドミナント', colors: ['#b66f58', '#7e6b91', '#71885b', '#597586'], note: '落ち着いたトーンで統一' },
        ],
      },
    },
    {
      title: 'ドミナントカラー配色',
      page: 'P.53',
      focusTerms: ['色相を統一', '一つの支配的な色相', 'トーンは自由'],
      intro: [
        'ドミナントカラー配色は、三色以上の配色で一つの支配的な色相を決め、その色相を軸に全体をまとめる技法である。',
        '色みのイメージが前面に出るため、色相による統一感をつくりたいときに使う。',
      ],
      sections: [
        {
          title: '何を統一するか',
          pairs: [
            { cue: '統一する属性', answer: '色相' },
            { cue: '中心となるもの', answer: '一つの支配的な色相' },
            { cue: '選べるトーン', answer: '自由' },
          ],
          body: [
            'PCCSでは同一色相が最も典型的だが、色相に統一感があれば隣接・類似色相を含めてもよい。トーンの並び順に制限はなく、グラデーションである必要もない。',
          ],
        },
        {
          title: '選択範囲',
          pairs: [
            { cue: '典型', answer: '同一色相' },
            { cue: '許容される範囲', answer: '隣接・類似色相' },
          ],
          body: [
            '同じ色みを保ちながら、明清色・中間色・暗清色など異なるトーンを組み合わせられる。',
          ],
        },
      ],
      cautions: [
        'カラーを統一し、トーンは変えてよい。ドミナントトーン配色とは逆。',
        '同一色相でも二色だけでは、公式テキストが示す三色以上の典型から外れる。',
      ],
      terms: ['色相を統一', '一つの支配的な色相', 'トーンは自由', '同一色相', '隣接・類似色相'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: '緑系', colors: ['#70a676', '#0f6b40', '#a8b9a0', '#436e50'], note: '色相を統一・トーンを変化' },
          { label: '赤系', colors: ['#c28e87', '#b47075', '#efb2b4', '#7f2634'], note: '同じ色みで全体をまとめる' },
        ],
      },
    },
    {
      title: 'ドミナントトーン配色',
      page: 'P.53',
      focusTerms: ['トーンを統一', '色相は自由', 'トーンのイメージ'],
      intro: [
        'ドミナントトーン配色は、三色以上の配色でトーンを統一し、配色全体をまとめる技法である。',
        '色相が変わってもトーンが共通するため、軽い、優しい、重い、渋いなど、トーン固有の感情効果を表現しやすい。',
      ],
      sections: [
        {
          title: '何を統一するか',
          pairs: [
            { cue: '統一する属性', answer: 'トーン' },
            { cue: '選べる色相', answer: '自由' },
            { cue: '前面に出るもの', answer: 'トーンのイメージ' },
          ],
          body: [
            'PCCSでは同一トーンが最も典型的だが、トーンに統一感やなじみ感があれば類似トーンを含めてもよい。',
          ],
        },
        {
          title: '代表例',
          pairs: [
            { cue: '高明度・低彩度で統一', answer: 'pトーンなど' },
            { cue: '低明度・中彩度で統一', answer: 'dkトーンなど' },
          ],
          body: [
            '同じトーンであれば、色相環の離れた色相を選んでも全体に共通した印象が残る。',
          ],
        },
      ],
      cautions: [
        'トーンを統一し、色相は変えてよい。ドミナントカラー配色とは逆。',
        '色相の並び順には制限がなく、グラデーションである必要はない。',
      ],
      terms: ['トーンを統一', '色相は自由', 'トーンのイメージ', '同一トーン', '類似トーン'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: 'soft系', colors: ['#c78350', '#9a748f', '#9aa958', '#648095'], note: '色相を変えてトーンを統一' },
          { label: 'dark系', colors: ['#352f4c', '#4b2f31', '#41442e', '#2d4a49'], note: '暗く重い印象を共通化' },
        ],
      },
    },
    {
      title: 'トーン・オン・トーン配色',
      page: 'P.54',
      focusTerms: ['同系色相', '明度差を大きく', 'トーンを重ねる'],
      intro: [
        'トーン・オン・トーン配色は、同系色相を使い、明度差を明確にした濃淡配色である。',
        '色相の統一感を保ちながら、明るい色と暗い色を重ねるため、落ち着きと明快なコントラストを両立する。',
      ],
      sections: [
        {
          title: '判断の核',
          pairs: [
            { cue: '色相', answer: '同一・類似色相' },
            { cue: '差をつける属性', answer: '明度' },
            { cue: '必要な明度差', answer: '大きくする' },
            { cue: '語の意味', answer: 'トーンを重ねる' },
          ],
          body: [
            'PCCSでは、重ならない異なるトーンを組み合わせて濃淡差をつくる。同一トーンでは明度差が不足するため成立しにくい。',
          ],
        },
        {
          title: '色相の範囲',
          pairs: [
            { cue: '最も典型的', answer: '同一色相' },
            { cue: '許容される範囲', answer: '色相差1〜3' },
          ],
          body: [
            '隣接・類似色相まで使えるが、色みの統一感を崩さないことが重要である。',
          ],
        },
      ],
      cautions: [
        'オンは「濃淡」。同系色相を維持し、明度差を大きくする。',
        'ドミナントカラー配色も色相をまとめるが、トーン・オン・トーンは明度差が明確であることが条件。',
      ],
      terms: ['同一・類似色相', '明度差を大きく', 'トーンを重ねる', '色相差1〜3'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: '赤系の濃淡', colors: ['#efb7a3', '#713123'], note: '同系色相＋大きな明度差' },
          { label: '緑系の濃淡', colors: ['#b7c88c', '#263d2a'], note: '明るい色と暗い色を重ねる' },
        ],
      },
    },
    {
      title: 'トーン・イン・トーン配色',
      page: 'P.55',
      focusTerms: ['同一・類似トーン', '色相は自由', 'トーンの中で'],
      intro: [
        'トーン・イン・トーン配色は、同じ色調、または近似したトーンで全体をまとめる配色である。',
        '色相は表現したいイメージに応じて自由に選び、トーンがもつ感情効果を前面に出す。',
      ],
      sections: [
        {
          title: '判断の核',
          pairs: [
            { cue: '統一するもの', answer: '同一・類似トーン' },
            { cue: '選べる色相', answer: '自由' },
            { cue: '語の意味', answer: 'トーンの中で' },
          ],
          body: [
            '同一トーンの配色が最も典型的で、トーン差の近い類似トーンも組み合わせられる。pトーンなら軽い・弱い・優しい・かわいい印象が共通する。',
          ],
        },
        {
          title: 'ドミナントトーンとの関係',
          pairs: [
            { cue: '共通点', answer: 'トーンをまとめる' },
            { cue: '代表的な見分け', answer: '同一・類似トーン' },
          ],
          body: [
            'ドミナントトーン配色と非常に近い概念で、公式テキストの典型例では同一トーンや近似トーンを使う。名称を問われた場合は設問の表現を丁寧に読む。',
          ],
        },
      ],
      cautions: [
        'インは「色調」。明度差を大きくする配色ではない。',
        'トーン・オン・トーンは色相を統一、トーン・イン・トーンはトーンを統一する。',
      ],
      terms: ['同一・類似トーン', '色相は自由', 'トーンの中で', 'トーンをまとめる'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: 'lightトーン', colors: ['#d8c995', '#b2c98f', '#99bfaa'], note: '色相を変えて同じ軽さに統一' },
          { label: 'paleトーン', colors: ['#e3c6c2', '#bad5d5', '#d9cce3'], note: '優しく弱いイメージを共有' },
        ],
      },
    },
    {
      title: 'トーナル配色',
      page: 'P.56',
      focusTerms: ['中明度', '中・低彩度', 'd・sf・ltg・g'],
      intro: [
        'トーナル配色は、中明度で中・低彩度の中間色だけを組み合わせる配色である。',
        '色相を強調するよりも、中間色がもつ穏やか、控えめ、落ち着いた印象を前面に出す。',
      ],
      sections: [
        {
          title: '使う領域',
          pairs: [
            { cue: '明度', answer: '中明度' },
            { cue: '彩度', answer: '中・低彩度' },
            { cue: 'PCCSの代表トーン', answer: 'd・sf・ltg・g' },
          ],
          body: [
            'dトーンが典型で、sf、ltg、gトーンも範囲に含まれる。色相は自由に選べる。',
          ],
        },
        {
          title: '中性色',
          pairs: [
            { cue: '暖色でも寒色でもない', answer: '中性色' },
          ],
          body: [
            'PCCSでは黄緑から緑付近、青紫から赤紫付近などが中性色の範囲として扱われる。トーナル配色では中性色系の落ち着いた組み合わせがよく用いられる。',
          ],
        },
      ],
      cautions: [
        'トーンを統一するだけではトーナル配色にならない。使用できるトーン領域が限定される。',
        '高明度・高彩度のbやv、低明度のdkなどは基本領域から外れる。',
      ],
      terms: ['中明度', '中・低彩度', 'd・sf・ltg・g', '中性色'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: 'トーナル', colors: ['#8c6758', '#6e7769', '#81705d', '#586c67'], note: '中明度・中低彩度' },
        ],
      },
    },
    {
      title: 'カマイユ＆フォカマイユ配色',
      page: 'P.57',
      focusTerms: ['ほとんど一色に見える', '少しだけ変化', '色相もトーンも近い'],
      intro: [
        'カマイユとフォカマイユは、色相とトーンの両方を近づけ、微妙な差を味わう配色である。',
        'カマイユはほぼ単色に見えるほど差が小さく、フォカマイユはそこから少しだけ変化を広げる。',
      ],
      sections: [
        {
          title: 'カマイユ配色',
          pairs: [
            { cue: '見え方', answer: 'ほとんど一色に見える' },
            { cue: '色相', answer: '同一・隣接色相' },
            { cue: 'トーン', answer: '同一・類似トーン' },
          ],
          body: [
            '色相差・明度差・彩度差が極めて小さい、繊細で微妙な配色である。フランス語で単色画法を意味する。',
          ],
        },
        {
          title: 'フォカマイユ配色',
          pairs: [
            { cue: 'カマイユとの違い', answer: '少しだけ変化' },
            { cue: '色相', answer: '類似色相' },
            { cue: 'トーン', answer: '同一・類似トーン' },
          ],
          body: [
            'フォは「まがいもの」「偽りの」という意味。カマイユより色相やトーンの差が少し大きいが、全体としては近い色のまとまりを保つ。',
          ],
        },
      ],
      cautions: [
        'カマイユのほうが差が小さい。フォカマイユのほうが少し変化が見える。',
        'トーン・オン・トーンのように明度差を大きく取らない。',
      ],
      terms: ['ほとんど一色に見える', '少しだけ変化', '同一・隣接色相', '類似色相', '同一・類似トーン'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: 'カマイユ', colors: ['#c2ae3b', '#bfae46'], note: '差が極めて小さい' },
          { label: 'フォカマイユ', colors: ['#dfc9a9', '#cfb370'], note: '少しだけ差が見える' },
        ],
      },
    },
    {
      title: 'ビコロール＆トリコロール配色',
      page: 'P.58',
      focusTerms: ['明快な2色配色', '明快な3色配色', '白や黒を中央'],
      intro: [
        'ビコロールは明快な二色配色、トリコロールは明快な三色配色である。色数が名称に直結する。',
        'どちらも色相・明度・彩度の差を利用し、コントラストをはっきり感じさせる。',
      ],
      sections: [
        {
          title: 'ビコロール配色',
          pairs: [
            { cue: '色数', answer: '2色' },
            { cue: '特徴', answer: '明快な2色配色' },
            { cue: '典型', answer: '高彩度色どうし・有彩色と無彩色' },
          ],
          body: [
            '補色関係、高彩度色どうし、明度差の大きい対照トーン、赤と白、白と黒などが典型である。',
          ],
        },
        {
          title: 'トリコロール配色',
          pairs: [
            { cue: '色数', answer: '3色' },
            { cue: '特徴', answer: '明快な3色配色' },
            { cue: '分離を強める方法', answer: '白や黒を中央' },
          ],
          body: [
            '高彩度色を中心に明度差や彩度差をつける。白や黒を中央に置くとセパレーション効果が働き、隣接する有彩色の衝突を整理できる。国旗に多く見られる。',
          ],
        },
      ],
      cautions: [
        'ビコロールは二色、トリコロールは三色。単に色数が二・三ならよいのではなく、明快なコントラストが必要。',
      ],
      terms: ['2色', '明快な2色配色', '3色', '明快な3色配色', '白や黒を中央', 'セパレーション効果'],
      visual: {
        kind: 'swatches',
        groups: [
          { label: 'ビコロール', colors: ['#f1eee5', '#bf2834'], note: '明快な2色' },
          { label: 'トリコロール', colors: ['#173d72', '#f4f2e8', '#b52b34'], note: '明快な3色' },
        ],
      },
    },
    {
      title: '色相環の分割による配色',
      page: 'P.59〜60',
      focusTerms: ['ダイアード', 'スプリットコンプリメンタリー', 'トライアド', 'テトラード', 'ペンタード', 'ヘクサード'],
      intro: [
        '色相環を規則的に分割し、色相間隔が均等になるように選ぶ方法である。ジャッドの秩序の原理と明瞭性の原理に結びつく。',
        '名称、色数、図形、PCCSでの選び方をセットで覚える。',
      ],
      sections: [
        {
          title: '2色・3色配色',
          pairs: [
            { cue: '補色位置の2色・色相差12', answer: 'ダイアード' },
            { cue: '補色の片側を両隣へ分裂した3色', answer: 'スプリットコンプリメンタリー' },
            { cue: '3等分・正三角形・色相差8', answer: 'トライアド' },
          ],
          body: [
            'ダイアードは色相環の直径上にある二色。スプリットコンプリメンタリーは一色対二色の関係。トライアドは三点が均等で、バランスのよい対照配色になる。',
          ],
        },
        {
          title: '4色・5色・6色配色',
          pairs: [
            { cue: '4等分・正方形・色相差6', answer: 'テトラード' },
            { cue: '本来5等分・PCCSではトライアド＋白黒', answer: 'ペンタード' },
            { cue: '本来6等分・またはテトラード＋白黒', answer: 'ヘクサード' },
          ],
          body: [
            'PCCSの24色相環は5等分できないため、ペンタードではトライアドに白と黒を加える。ヘクサードは6等分した六色、またはテトラードに白と黒を加えた六色として扱える。',
          ],
        },
      ],
      cautions: [
        'スプリットコンプリメンタリーとトライアドはどちらも三色だが、前者は補色の両隣、後者は三等分。',
        'ペンタードを色相環の五等分だけで覚えない。PCCSではトライアド＋白黒が重要。',
        '色数はダイアード2、トライアド3、テトラード4、ペンタード5、ヘクサード6。',
      ],
      terms: ['ダイアード', '色相差12', 'スプリットコンプリメンタリー', 'トライアド', '色相差8', 'テトラード', '色相差6', 'ペンタード', 'トライアド＋白黒', 'ヘクサード', 'テトラード＋白黒'],
      visual: {
        kind: 'wheels',
        groups: [
          { label: 'ダイアード', points: [0, 12] },
          { label: 'スプリット', points: [0, 11, 13] },
          { label: 'トライアド', points: [0, 8, 16] },
          { label: 'テトラード', points: [0, 6, 12, 18] },
          { label: 'ペンタード', points: [0, 8, 16], extras: ['W', 'Bk'] },
          { label: 'ヘクサード', points: [0, 4, 8, 12, 16, 20] },
        ],
      },
    },
    {
      title: '配色技法の比較整理',
      page: 'P.61',
      focusTerms: ['色相でまとめる', 'トーンでまとめる', '色相環の分割・色数'],
      intro: [
        '似た技法を個別に暗記すると混ざりやすい。まず「色相でまとめる」「トーンでまとめる」「色相環を分割する」の三群に分ける。',
      ],
      sections: [
        {
          title: '色相でまとめる配色',
          pairs: [
            { cue: '色相を統一・トーン自由', answer: 'ドミナントカラー' },
            { cue: '同系色相・明度差を大きく', answer: 'トーン・オン・トーン' },
            { cue: '色相もトーンも非常に近い', answer: 'カマイユ' },
            { cue: 'カマイユより少し変化', answer: 'フォカマイユ' },
          ],
          body: [],
        },
        {
          title: 'トーンでまとめる配色',
          pairs: [
            { cue: 'トーンを統一・色相自由', answer: 'ドミナントトーン' },
            { cue: '同一・類似トーン', answer: 'トーン・イン・トーン' },
            { cue: '中明度・中低彩度の限定領域', answer: 'トーナル' },
          ],
          body: [],
        },
        {
          title: '色数・色相環による配色',
          pairs: [
            { cue: '明快な2色', answer: 'ビコロール' },
            { cue: '補色位置の2色', answer: 'ダイアード' },
            { cue: '明快な3色', answer: 'トリコロール' },
            { cue: '3等分の3色', answer: 'トライアド' },
            { cue: '4色・5色・6色', answer: 'テトラード・ペンタード・ヘクサード' },
          ],
          body: [],
        },
      ],
      cautions: [
        '色数が同じでも名称は条件で変わる。ビコロールは明快な二色、ダイアードは補色位置の二色。',
        'ドミナントトーンとトーン・イン・トーンは近いが、問題文の「統一」「同一・類似トーン」という語を手がかりにする。',
      ],
      terms: ['色相でまとめる', 'トーンでまとめる', '色相環の分割・色数', '明快な2色', '補色位置の2色'],
      visual: { kind: 'comparison' },
    },
    {
      title: '解答例の読み取り ― 自然調和とドミナント',
      page: 'P.62',
      focusTerms: ['黄寄りを高明度', '黄寄りを低明度', '同一色相', '同一トーン'],
      intro: [
        '配色演習そのものは問題として登録せず、解答例から技法を判別する観察順序を整理する。',
      ],
      sections: [
        {
          title: '自然の秩序',
          pairs: [
            { cue: '黄寄りが明るく・青紫寄りが暗い', answer: 'ナチュラルハーモニー' },
            { cue: '黄寄りが暗く・青紫寄りが明るい', answer: 'コンプレックスハーモニー' },
          ],
          body: [
            '色相環上の位置を先に確認し、その後に各色の明度を比べる。色名だけで判断しない。',
          ],
        },
        {
          title: 'ドミナント',
          pairs: [
            { cue: '色相がそろいトーンが異なる', answer: 'ドミナントカラー' },
            { cue: 'トーンがそろい色相が異なる', answer: 'ドミナントトーン' },
          ],
          body: [
            'ドミナントカラーではトーンの順番に制限はなく、グラデーションでなくてもよい。ドミナントトーンでは色相の順番は自由である。',
          ],
        },
        {
          title: 'トーン・オン・トーン',
          pairs: [
            { cue: '同系色相＋大きな明度差', answer: 'トーン・オン・トーン' },
          ],
          body: [
            '同じ色相記号や近い色相を確認し、次に明度差が明確かを見る。',
          ],
        },
      ],
      cautions: [
        'ナチュラル／コンプレックスは黄側と青紫側の方向、ドミナントは何をそろえたかで判断する。',
      ],
      terms: ['ナチュラルハーモニー', 'コンプレックスハーモニー', 'ドミナントカラー', 'ドミナントトーン', 'トーン・オン・トーン'],
    },
    {
      title: '解答例の読み取り ― トーン系と色数',
      page: 'P.63',
      focusTerms: ['同一・類似トーン', 'd・sf・g・ltg', 'ほとんど一色', '明快な2色', '明快な3色'],
      intro: [
        'トーン系の技法は、色相環より先にトーン区分を確認すると見分けやすい。最後に色数とコントラストを確認する。',
      ],
      sections: [
        {
          title: 'トーン系',
          pairs: [
            { cue: '同じdkなど同一・類似トーン', answer: 'トーン・イン・トーン' },
            { cue: 'd・sf・g・ltgの中間色のみ', answer: 'トーナル' },
          ],
          body: [
            'トーン・イン・トーンは色相を自由に選べる。トーナルは使えるトーン領域そのものが限定される。',
          ],
        },
        {
          title: '微差の配色',
          pairs: [
            { cue: 'ほとんど一色に見える', answer: 'カマイユ' },
            { cue: '類似色相で少し変化がある', answer: 'フォカマイユ' },
          ],
          body: [
            'カマイユは差が極小、フォカマイユはそこから少し差を広げる。',
          ],
        },
        {
          title: '明快な色数',
          pairs: [
            { cue: 'コントラストの強い2色', answer: 'ビコロール' },
            { cue: 'コントラストの強い3色', answer: 'トリコロール' },
          ],
          body: [
            '白や黒を中央に置くとセパレーション効果が強まり、三色の境界が明瞭になる。',
          ],
        },
      ],
      cautions: [
        '色が二つ・三つあるだけで決めず、明快なコントラストがあるかを見る。',
        'カマイユ／フォカマイユは色相だけでなくトーンも近い。',
      ],
      terms: ['トーン・イン・トーン', 'トーナル', 'カマイユ', 'フォカマイユ', 'ビコロール', 'トリコロール'],
    },
  ],
}

let readerIndex = 0
let backdrop = null
let previousBodyOverflow = ''

function createElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== undefined) element.textContent = text
  return element
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightTextNode(textNode, pattern) {
  const text = textNode.nodeValue ?? ''
  const matches = [...text.matchAll(pattern)]
  if (matches.length === 0) return

  const fragment = document.createDocumentFragment()
  let cursor = 0
  matches.forEach((match) => {
    const index = match.index ?? 0
    if (index > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, index)))
    fragment.appendChild(createElement('span', 'study-term-highlight', match[0]))
    cursor = index + match[0].length
  })
  if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)))
  textNode.replaceWith(fragment)
}

function applyFocusTerms(shell, item) {
  const focusTerms = [...new Set(item.focusTerms ?? [])].sort((a, b) => b.length - a.length)
  const focusSet = new Set(focusTerms)

  shell.querySelectorAll('.study-reader-term-list span').forEach((element) => {
    element.classList.toggle('is-focus-term', focusSet.has(element.textContent?.trim() ?? ''))
  })

  if (focusTerms.length === 0) return
  const pattern = new RegExp(focusTerms.map(escapeRegExp).join('|'), 'g')

  shell
    .querySelectorAll('.study-reader-intro p, .study-reader-section p, .study-reader-caution p')
    .forEach((target) => {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          return node.parentElement?.closest('.study-term-highlight')
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT
        },
      })
      const textNodes = []
      while (walker.nextNode()) textNodes.push(walker.currentNode)
      textNodes.forEach((textNode) => highlightTextNode(textNode, pattern))
    })
}

function createMemoryPair({ cue, answer }) {
  const row = createElement('p', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
    createElement('span', 'study-term-highlight', answer),
  )
  return row
}

function createSwatchVisual(groups) {
  const visual = createElement('div', 'harmony-visual harmony-swatch-groups')
  groups.forEach((group) => {
    const card = createElement('section', 'harmony-swatch-card')
    card.appendChild(createElement('strong', '', group.label))
    const strip = createElement('div', 'harmony-swatch-strip')
    group.colors.forEach((color) => {
      const swatch = createElement('span')
      swatch.style.background = color
      strip.appendChild(swatch)
    })
    card.append(strip, createElement('small', '', group.note))
    visual.appendChild(card)
  })
  return visual
}

function createPrinciplesVisual() {
  const visual = createElement('div', 'harmony-visual harmony-principles')
  ;[
    ['秩序', '規則的に選ぶ'],
    ['なじみ', '見慣れた並び'],
    ['類似性', '共通性をもつ'],
    ['明瞭性', '差をはっきり'],
  ].forEach(([title, copy]) => {
    const card = createElement('section')
    card.append(createElement('strong', '', title), createElement('small', '', copy))
    visual.appendChild(card)
  })
  return visual
}

function wheelPoint(index, radius = 78, center = 100) {
  const angle = (index / 24) * Math.PI * 2 - Math.PI / 2
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  }
}

function createWheelSvg(points, extras = []) {
  const namespace = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(namespace, 'svg')
  svg.setAttribute('viewBox', '0 0 200 200')
  svg.classList.add('harmony-wheel-svg')

  for (let index = 0; index < 24; index += 1) {
    const point = wheelPoint(index)
    const circle = document.createElementNS(namespace, 'circle')
    circle.setAttribute('cx', String(point.x))
    circle.setAttribute('cy', String(point.y))
    circle.setAttribute('r', points.includes(index) ? '6' : '3')
    circle.setAttribute('class', points.includes(index) ? 'is-selected' : '')
    svg.appendChild(circle)
  }

  if (points.length >= 2) {
    const polygon = document.createElementNS(namespace, points.length === 2 ? 'line' : 'polygon')
    if (points.length === 2) {
      const first = wheelPoint(points[0])
      const second = wheelPoint(points[1])
      polygon.setAttribute('x1', String(first.x))
      polygon.setAttribute('y1', String(first.y))
      polygon.setAttribute('x2', String(second.x))
      polygon.setAttribute('y2', String(second.y))
    } else {
      polygon.setAttribute(
        'points',
        points.map((index) => {
          const point = wheelPoint(index)
          return `${point.x},${point.y}`
        }).join(' '),
      )
    }
    polygon.setAttribute('class', 'harmony-wheel-line')
    svg.appendChild(polygon)
  }

  extras.forEach((label, index) => {
    const text = document.createElementNS(namespace, 'text')
    text.setAttribute('x', '100')
    text.setAttribute('y', String(94 + index * 20))
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('class', 'harmony-wheel-extra')
    text.textContent = label
    svg.appendChild(text)
  })

  return svg
}

function createWheelsVisual(groups) {
  const visual = createElement('div', 'harmony-visual harmony-wheel-grid')
  groups.forEach((group) => {
    const card = createElement('section', 'harmony-wheel-card')
    card.append(createElement('strong', '', group.label), createWheelSvg(group.points, group.extras ?? []))
    visual.appendChild(card)
  })
  return visual
}

function createComparisonVisual() {
  const visual = createElement('div', 'harmony-visual harmony-comparison')
  ;[
    ['色相でまとめる', 'ドミナントカラー／オン・トーン／カマイユ'],
    ['トーンでまとめる', 'ドミナントトーン／イン・トーン／トーナル'],
    ['分割・色数', 'ビコロール／ダイアード〜ヘクサード'],
  ].forEach(([title, copy]) => {
    const card = createElement('section')
    card.append(createElement('strong', '', title), createElement('small', '', copy))
    visual.appendChild(card)
  })
  return visual
}

function createVisual(config) {
  if (!config) return null
  if (config.kind === 'swatches') return createSwatchVisual(config.groups)
  if (config.kind === 'principles') return createPrinciplesVisual()
  if (config.kind === 'wheels') return createWheelsVisual(config.groups)
  if (config.kind === 'comparison') return createComparisonVisual()
  return null
}

function ensureStyles() {
  if (document.getElementById('color-harmony-style')) return
  const style = document.createElement('style')
  style.id = 'color-harmony-style'
  style.textContent = `
    .study-memory-pair {
      display: flex;
      align-items: baseline;
      gap: 0.42em;
      margin: 0;
      font-weight: 750;
    }
    .study-memory-pair + .study-memory-pair { margin-top: 7px; }
    .study-memory-pair-cue { color: #222; }
    .study-memory-pair-arrow { color: #777; font-weight: 650; }

    .harmony-visual {
      margin: 24px 0 12px;
      padding: 16px;
      border: 1px solid #d8d8d8;
      background: #f7f7f7;
    }

    .harmony-swatch-groups,
    .harmony-principles,
    .harmony-comparison,
    .harmony-wheel-grid {
      display: grid;
      gap: 12px;
    }
    .harmony-swatch-groups { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .harmony-swatch-card,
    .harmony-principles section,
    .harmony-comparison section,
    .harmony-wheel-card {
      padding: 12px;
      background: #fff;
      border: 1px solid #e1e1e1;
    }
    .harmony-swatch-card strong,
    .harmony-wheel-card strong,
    .harmony-principles strong,
    .harmony-comparison strong {
      display: block;
      margin-bottom: 8px;
      font-size: 0.82rem;
    }
    .harmony-swatch-card small,
    .harmony-principles small,
    .harmony-comparison small {
      display: block;
      margin-top: 8px;
      color: #666;
      font-size: 0.72rem;
      line-height: 1.55;
    }
    .harmony-swatch-strip {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      min-height: 74px;
    }
    .harmony-principles,
    .harmony-comparison { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .harmony-principles section,
    .harmony-comparison section { min-height: 94px; }
    .harmony-wheel-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .harmony-wheel-card { text-align: center; }
    .harmony-wheel-svg { width: 100%; max-width: 150px; height: auto; }
    .harmony-wheel-svg circle { fill: #bbb; }
    .harmony-wheel-svg circle.is-selected { fill: #d51f26; }
    .harmony-wheel-line { fill: none; stroke: #222; stroke-width: 2.5; }
    .harmony-wheel-extra { fill: #333; font-size: 15px; font-weight: 800; }

    @media (max-width: 560px) {
      .harmony-swatch-groups,
      .harmony-principles,
      .harmony-comparison { grid-template-columns: 1fr; }
      .harmony-wheel-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  `
  document.head.appendChild(style)
}

function handleEscape(event) {
  if (event.key === 'Escape') closeReader()
}

function closeReader() {
  if (!backdrop) return
  backdrop.remove()
  backdrop = null
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleEscape)
}

function moveTo(nextIndex) {
  if (nextIndex >= content.items.length) {
    closeReader()
    return
  }
  readerIndex = Math.max(0, nextIndex)
  renderReader()
  window.requestAnimationFrame(() => {
    backdrop?.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function renderReader() {
  const item = content.items[readerIndex]

  if (!backdrop) {
    backdrop = createElement('div', 'study-reader-backdrop')
    backdrop.setAttribute('role', 'dialog')
    backdrop.setAttribute('aria-modal', 'true')
    backdrop.setAttribute('aria-label', `${content.label}の学習内容`)
    document.body.appendChild(backdrop)
  }

  backdrop.replaceChildren()

  const shell = createElement('div', 'study-reader-shell')
  const header = createElement('header', 'study-reader-header')
  const closeButton = createElement('button', 'study-reader-close', '←')
  closeButton.type = 'button'
  closeButton.setAttribute('aria-label', '内容一覧を閉じる')
  closeButton.addEventListener('click', closeReader)

  const brand = createElement('button', 'study-reader-brand', 'QUALIFY')
  brand.type = 'button'
  brand.addEventListener('click', closeReader)
  header.append(closeButton, brand, createElement('span', '', 'CONTENTS'))

  const main = createElement('main', 'study-reader-main')
  const meta = createElement('div', 'study-reader-meta')
  meta.append(
    createElement('span', '', content.label),
    createElement('strong', '', `${readerIndex + 1} / ${content.items.length}`),
  )

  const title = createElement('section', 'study-reader-title')
  title.append(createElement('small', '', item.page), createElement('h1', '', item.title))

  const intro = createElement('section', 'study-reader-intro')
  item.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const visual = createVisual(item.visual)
  if (visual) main.appendChild(visual)

  item.sections.forEach((section) => {
    const sectionElement = createElement('section', 'study-reader-section')
    sectionElement.appendChild(createElement('h2', '', section.title))
    ;(section.pairs ?? []).forEach((pair) => {
      sectionElement.appendChild(createMemoryPair(pair))
    })
    section.body.forEach((paragraph) => {
      sectionElement.appendChild(createElement('p', '', paragraph))
    })
    main.appendChild(sectionElement)
  })

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  item.cautions.forEach((paragraph) => caution.appendChild(createElement('p', '', paragraph)))

  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '重要語句'))
  const termList = createElement('div', 'study-reader-term-list')
  item.terms.forEach((term) => termList.appendChild(createElement('span', '', term)))
  terms.appendChild(termList)
  main.append(caution, terms)

  const actions = createElement('div', 'study-reader-actions')
  const actionsInner = createElement('div', 'study-reader-actions-inner')
  const previous = createElement('button', '', '前へ')
  previous.type = 'button'
  previous.disabled = readerIndex === 0
  previous.addEventListener('click', () => moveTo(readerIndex - 1))

  const next = createElement('button')
  next.type = 'button'
  const isLast = readerIndex >= content.items.length - 1
  next.append(
    createElement('small', '', isLast ? 'END' : 'NEXT CONTENT'),
    document.createTextNode(isLast ? 'テーマ一覧へ戻る' : `次へ：${content.items[readerIndex + 1].title}`),
  )
  next.addEventListener('click', () => moveTo(readerIndex + 1))

  actionsInner.append(previous, next)
  actions.appendChild(actionsInner)
  shell.append(header, main, actions)
  backdrop.appendChild(shell)
  applyFocusTerms(shell, item)
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhanceColorHarmonyPanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'

    const contentButton = createElement('button', 'study-action-button is-content', '内容を見る')
    contentButton.type = 'button'
    contentButton.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    contentButton.addEventListener('click', openReader)
    row.appendChild(contentButton)

    panel.classList.add('is-compact-category')
    panel.dataset.colorReferenceActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

ensureStyles()
enhanceColorHarmonyPanel()
const observer = new MutationObserver(enhanceColorHarmonyPanel)
observer.observe(document.getElementById('root'), { childList: true, subtree: true })
