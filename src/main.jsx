import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const studyContents = {
  'テーマ① マーケティングの基本概念／市場環境': {
    label: 'テーマ① マーケティングの基本概念／市場環境',
    items: [
      {
        title: 'マーケティング・コンセプト',
        page: 'P.9',
        intro: [
          'マーケティング・コンセプトは、顧客が何を必要としているかを出発点に、商品・価格・流通・伝え方を組み立てていく考え方。',
          '優れた技術や製品そのものを先に置く「製品コンセプト」と違い、顧客ニーズを確認してから、満足につながる仕組みを設計する。',
        ],
        sections: [
          {
            title: '判断の軸',
            body: [
              '最初に見るのは「何を作れるか」ではなく「顧客は何を求めているか」。',
              '製品改良や専門家の意見は手段として使えるが、マーケティング・コンセプトの出発点そのものではない。',
            ],
          },
          {
            title: '製品コンセプトとの違い',
            body: [
              '製品コンセプトは、技術力や品質の高い製品を作れば市場で評価されるという発想。',
              'マーケティング・コンセプトは、顧客ニーズを把握し、そのニーズに合う価値を戦略的に提供する発想。',
            ],
          },
        ],
        cautions: [
          '問題文で「出発点」を聞かれたら、製品・技術・生産現場ではなく顧客ニーズを選ぶ。',
          '「売り込む方法」ではなく、顧客視点で売れる仕組みを作る考え方として整理する。',
        ],
        terms: ['顧客ニーズ', '顧客満足', '製品コンセプト'],
      },
      {
        title: 'セグメンテーションの4変数',
        page: 'P.14〜15',
        intro: [
          'セグメンテーションは、市場にいる人を共通する特徴で分ける市場細分化の作業。',
          '代表的な分類軸は、地理的変数、人口統計的変数、サイコグラフィック変数、行動上の変数の4つ。',
        ],
        sections: [
          {
            title: '地理的変数',
            body: [
              '地域によって顧客ニーズが異なる場合に使う。',
              '例は気候、人口密度、行政単位。',
            ],
          },
          {
            title: '人口統計的変数',
            body: [
              '年齢や所得など、客観的な属性で分ける。',
              '例は年齢、性別、所得、学歴、職業。',
            ],
          },
          {
            title: 'サイコグラフィック変数',
            body: [
              '暮らし方や心理的な特徴で分ける。',
              '例はライフスタイル、パーソナリティ。',
            ],
          },
          {
            title: '行動上の変数',
            body: [
              '商品を求める理由や、実際の利用・購買行動で分ける。',
              '例は求める便益、使用頻度、ロイヤルティ。',
            ],
          },
        ],
        cautions: [
          '人口密度は「人口」という言葉が入っていても、地域の密集度なので地理的変数。',
          'パーソナリティは行動そのものではなく、サイコグラフィック変数。',
          '使用頻度やロイヤルティは、実際の利用・購買に関わるため行動上の変数。',
        ],
        terms: [
          '市場細分化',
          '地理的変数',
          '人口統計的変数',
          'サイコグラフィック変数',
          '行動上の変数',
        ],
      },
      {
        title: 'ターゲティング',
        page: 'P.17',
        intro: [
          'ターゲティングは、細分化した市場の中から、自社が経営資源を集中して投入する標的市場を決める作業。',
          'すべての市場を同じように狙うのではなく、自社の強みや資源と合う市場を選ぶ。',
        ],
        sections: [
          {
            title: '無差別型マーケティング',
            body: [
              '市場ごとの差を大きく見ず、共通の商品・サービスを広く提供する。',
            ],
          },
          {
            title: '差別型マーケティング',
            body: [
              '複数のセグメントを選び、それぞれに異なる商品・サービスを用意する。',
            ],
          },
          {
            title: '集中型マーケティング',
            body: [
              '1つ、または少数のセグメントに対象を絞り、経営資源を集中する。',
            ],
          },
        ],
        cautions: [
          '差別型は「複数」、集中型は「1つまたは少数」。ここを逆にしない。',
          'ターゲティングは、市場を分ける作業ではなく、分けた後に狙う市場を決める作業。',
        ],
        terms: [
          '標的市場',
          '無差別型マーケティング',
          '差別型マーケティング',
          '集中型マーケティング',
        ],
      },
      {
        title: 'ポジショニング',
        page: 'P.19',
        intro: [
          'ポジショニングは、標的市場の顧客の頭の中で、自社の商品やブランドを競合と比べてどこに位置づけるかを設計すること。',
          '実際の売り場での配置ではなく、顧客の知覚内での相対的な位置を作る。',
        ],
        sections: [
          {
            title: '考える順番',
            body: [
              '市場を分けるセグメンテーション、狙う市場を決めるターゲティング、その市場での位置を決めるポジショニングの順で考える。',
              '製品が完成した後だけに考えるのではなく、製品設計や伝え方を決める前から方向を定める。',
            ],
          },
          {
            title: '相対的な位置づけ',
            body: [
              '「高品質」「低価格」などの特徴を単独で決めるのではなく、競合と比べたときに顧客がどう認識するかを見る。',
            ],
          },
        ],
        cautions: [
          'ポジショニングは物理的な場所ではなく、顧客のマインド内の位置。',
          '競合との比較を含む相対的な考え方。',
        ],
        terms: ['STP', '顧客の知覚', '相対的位置づけ'],
      },
      {
        title: '有効なポジショニングの3条件',
        page: 'P.20',
        intro: [
          'ポジショニングの切り口は、顧客にとって意味があり、競合と異なり、競合より優れている必要がある。',
          '公式問題集では、重要性・独自性・優越性の3条件として整理する。',
        ],
        sections: [
          {
            title: '重要性',
            body: ['顧客がその違いを価値のあるものとして重視すること。'],
          },
          {
            title: '独自性',
            body: ['競合にはない、または競合と明確に異なること。'],
          },
          {
            title: '優越性',
            body: ['その切り口で競合よりも優れた価値を提供できること。'],
          },
        ],
        cautions: [
          '「確実性」はもっともらしく見えるが、この3条件には含まれない。',
          '3語は「重要・独自・優越」で固定して覚える。',
        ],
        terms: ['重要性', '独自性', '優越性'],
      },
      {
        title: 'マーケティング・ミックスの4P',
        page: 'P.21',
        intro: [
          '4Pは、企業が標的市場に価値を届けるために組み合わせる4つの施策。',
          'Product、Price、Place、Promotionを一体で設計する。',
        ],
        sections: [
          {
            title: 'Product',
            body: ['製品・サービスとして、どのような価値を提供するか。'],
          },
          {
            title: 'Price',
            body: ['顧客が支払う価格をどのように設定するか。'],
          },
          {
            title: 'Place',
            body: ['どこで、どの経路を通して顧客へ届けるか。'],
          },
          {
            title: 'Promotion',
            body: ['価値をどのように伝え、購入や利用につなげるか。'],
          },
        ],
        cautions: [
          'ProfitはPから始まるが、4Pには含まれない。',
          '4つを別々に決めず、互いに矛盾しないよう組み合わせる。',
        ],
        terms: ['Product', 'Price', 'Place', 'Promotion'],
      },
      {
        title: '4Pと4Cの対応',
        page: 'P.22',
        intro: [
          '4Pが企業側の施策を表すのに対し、4Cは同じ活動を顧客側の視点から捉え直したもの。',
          '対応関係をセットで覚える。',
        ],
        sections: [
          {
            title: 'Product ↔ Customer Solution',
            body: ['製品そのものではなく、顧客の問題をどう解決するか。'],
          },
          {
            title: 'Price ↔ Customer Cost',
            body: ['表示価格だけでなく、顧客が負担する費用や手間を含めて考える。'],
          },
          {
            title: 'Place ↔ Convenience',
            body: ['顧客が入手・利用しやすいかという利便性で考える。'],
          },
          {
            title: 'Promotion ↔ Communication',
            body: ['一方的な告知ではなく、顧客との意思疎通として考える。'],
          },
        ],
        cautions: [
          'Placeに対応するのはConvenience。Coverageではない。',
          '4Pは企業側、4Cは顧客側という視点の違いを押さえる。',
        ],
        terms: [
          'Customer Solution',
          'Customer Cost',
          'Convenience',
          'Communication',
        ],
      },
      {
        title: 'マーケティング・マネジメントの2つの適合',
        page: 'P.27',
        intro: [
          'マーケティング成果を出すには、標的市場と4Pを合わせるだけでは足りない。',
          '顧客との適合と、4P同士の適合という2方向の一貫性が必要。',
        ],
        sections: [
          {
            title: '標的市場と4Pの適合',
            body: [
              '選んだ顧客のニーズに、製品・価格・流通・プロモーションが合っているかを見る。',
            ],
          },
          {
            title: '4P各要素間の適合',
            body: [
              '高級製品なのに極端な低価格や安売り中心の伝え方をするなど、各施策が互いに矛盾していないかを見る。',
            ],
          },
        ],
        cautions: [
          '外側の「顧客と4Pの適合」と、内側の「4P同士の適合」を分けて考える。',
          'どれか1つのPだけが優れていても、全体が不整合なら成果につながりにくい。',
        ],
        terms: ['標的市場', 'マーケティング・ミックス', '適合性'],
      },
      {
        title: 'マクロ環境とPEST',
        page: 'P.48',
        intro: [
          '企業が直接コントロールしにくい大きな外部環境は、政治・法律、経済、社会文化、技術のPESTで整理できる。',
          '市場内の競合や代替品などの競争要因とは分けて考える。',
        ],
        sections: [
          {
            title: 'Political',
            body: ['法律、規制、政策などの政治・法的要因。'],
          },
          {
            title: 'Economic',
            body: ['経済成長率、所得、物価、1人あたりGDPなどの経済要因。'],
          },
          {
            title: 'Social',
            body: ['高齢化、家族形態、価値観、生活様式などの社会文化要因。'],
          },
          {
            title: 'Technological',
            body: ['インターネットや携帯端末など、技術の普及・変化。'],
          },
        ],
        cautions: [
          '代替品の登場は業界内の競争環境であり、PESTのマクロ環境には含めない。',
          '「外部要因ならすべてPEST」ではなく、社会全体の大きな環境変化かを確認する。',
        ],
        terms: ['PEST', 'マクロ環境', '市場環境'],
      },
    ],
  },
  'テーマ② 戦略的マーケティング': {
    label: 'テーマ② 戦略的マーケティング',
    items: [
      {
        title: 'ポーターの5つの競争要因',
        page: 'P.52',
        intro: [
          '5つの競争要因は、業界の収益性や競争の厳しさを、5方向の圧力から分析する枠組み。',
          '現在の競合だけでなく、参入者、代替品、買い手、売り手まで含めて見る。',
        ],
        sections: [
          {
            title: '業界内の競争関係',
            body: ['既存企業同士の競争がどれほど激しいか。'],
          },
          {
            title: '新規参入の脅威',
            body: [
              '新しい企業が入りやすいほど競争圧力は高まる。参入障壁が低いほど脅威は大きい。',
            ],
          },
          {
            title: '代替製品・サービスの脅威',
            body: [
              '同じ目的を別の方法で満たす商品・サービスに顧客が移る可能性。',
            ],
          },
          {
            title: '買い手の交渉力',
            body: ['顧客側が価格や条件に強く影響できる程度。'],
          },
          {
            title: '売り手の交渉力',
            body: ['原材料やサービスを供給する側が条件に強く影響できる程度。'],
          },
        ],
        cautions: [
          '構成要因は「新規参入の脅威」であり、「既存業者の撤退」ではない。',
          '自社と直接競う企業だけを見て終わらない。',
        ],
        terms: ['業界内競争', '新規参入', '代替品', '買い手', '売り手'],
      },
      {
        title: 'SWOT分析',
        page: 'P.55〜56',
        intro: [
          'SWOT分析は、自社の内部環境と外部環境を分けて整理し、戦略の方向を考える方法。',
          'StrengthとWeaknessは内部、OpportunityとThreatは外部に置く。',
        ],
        sections: [
          {
            title: 'Strength / Weakness',
            body: [
              '強みと弱みは、自社が持つ経営資源、能力、仕組みなどの内部環境。',
            ],
          },
          {
            title: 'Opportunity / Threat',
            body: [
              '機会と脅威は、市場・競争・社会変化など、自社の外側にある外部環境。',
              'Threatは、将来の損害や成長上の障壁につながる外部要因。',
            ],
          },
          {
            title: 'クロスSWOT',
            body: [
              'SOは強みで機会を取る。WOは弱みを補い機会を取る。',
              'STは強みで脅威に対応する。WTは弱みと脅威が重なるリスクを抑える。',
            ],
          },
        ],
        cautions: [
          '良い要因だから強み、悪い要因だから弱みと決めない。自社内部か外部かを先に見る。',
          'OとTは将来の外部環境。SとWは現在の自社内部。',
        ],
        terms: ['Strength', 'Weakness', 'Opportunity', 'Threat', 'クロスSWOT'],
      },
      {
        title: 'アンゾフの製品―市場マトリックス',
        page: 'P.28〜30',
        intro: [
          '製品と市場を、それぞれ既存か新規かで分け、企業の成長方向を4つに整理する。',
          'どちらが新しいのかを確認すると、名称の混同を防げる。',
        ],
        sections: [
          {
            title: '市場浸透',
            body: [
              '既存製品を既存市場でさらに売る。利用頻度や顧客数を増やす方向。',
            ],
          },
          {
            title: '製品開発',
            body: ['新製品を既存市場へ投入する。'],
          },
          {
            title: '市場開発',
            body: ['既存製品を新市場へ展開する。'],
          },
          {
            title: '多角化',
            body: [
              '新製品を新市場へ展開する。製品も市場も新しいため不確実性が大きい。',
            ],
          },
        ],
        cautions: [
          '市場開発は「既存製品×新市場」、製品開発は「新製品×既存市場」。',
          '名前だけで判断せず、製品と市場のどちらが既存・新規かを表に当てはめる。',
        ],
        terms: ['市場浸透', '製品開発', '市場開発', '多角化'],
      },
      {
        title: 'PPM',
        page: 'P.30〜33',
        intro: [
          'PPMは、複数の事業を市場成長率と相対的市場シェアの2軸で分類し、資金配分を考える手法。',
          '事業ごとの資金の生み方と必要な投資を見ながら、企業全体で配分する。',
        ],
        sections: [
          {
            title: '花形',
            body: [
              '高成長・高シェア。成長のための投資が必要だが、将来の中心事業になり得る。',
            ],
          },
          {
            title: '問題児',
            body: [
              '高成長・低シェア。資金を必要とし、投資によって花形へ育つ可能性がある。',
            ],
          },
          {
            title: '金のなる木',
            body: [
              '低成長・高シェア。大きな追加投資を抑えながら資金を生み出しやすい。',
            ],
          },
          {
            title: '負け犬',
            body: [
              '低成長・低シェア。収益性や将来性を見て、縮小・売却・撤退も検討する。',
            ],
          },
        ],
        cautions: [
          '問題児は高成長・低シェア。名称から「成長率も低い」と決めつけない。',
          '金のなる木が生む資金を、問題児など将来性のある事業へ配分する。',
        ],
        terms: ['市場成長率', '相対的市場シェア', '花形', '問題児', '金のなる木', '負け犬'],
      },
      {
        title: 'ポーターの3つの基本戦略',
        page: 'P.36〜38',
        intro: [
          '企業が長期にわたり業界平均以上の成果を目指すための基本方向は、コスト・リーダーシップ、差別化、集中の3つ。',
          '集中は、特定分野で低コストを狙うコスト集中と、独自性を狙う差別化集中に分かれる。',
        ],
        sections: [
          {
            title: 'コスト・リーダーシップ',
            body: [
              '業界内で他社より低いコストを実現し、低価格でも利益を確保できる仕組みを作る。',
              '規模の経済性や経験効果は、この戦略と結びつく。',
            ],
          },
          {
            title: '差別化',
            body: [
              '顧客に価値のある、競合にはない特異性を作る。',
              '模倣されにくい違いを作り、革新によって維持できれば、高価格でも選ばれやすくなる。',
            ],
          },
          {
            title: '集中',
            body: [
              '特定の製品分野や顧客セグメントに経営資源を集中し、その分野で優位性を作る。',
              '市場シェアの小さい企業に適する場合が多い。',
            ],
          },
        ],
        cautions: [
          '規模効果や経験効果による低コストは、差別化ではなくコスト・リーダーシップ。',
          '複数戦略を同時に中途半端に追い、どの優位性も作れない状態はスタック・イン・ザ・ミドル。',
        ],
        terms: [
          'コスト・リーダーシップ',
          '差別化',
          '集中',
          'コスト集中',
          '差別化集中',
          'スタック・イン・ザ・ミドル',
        ],
      },
      {
        title: '市場地位別の競争戦略',
        page: 'P.38〜40',
        intro: [
          'コトラーは、同じ業界で競う企業を市場シェアと戦略上の特徴から、リーダー、チャレンジャー、フォロワー、ニッチャーに分類した。',
          '立場によって基本戦略が異なる。',
        ],
        sections: [
          {
            title: 'リーダー',
            body: [
              '業界最大のシェアを持つ企業。総市場規模を拡大し、首位の立場を維持する。',
            ],
          },
          {
            title: 'チャレンジャー',
            body: [
              '業界2位・3位など、リーダーへ挑む企業。差別化を基本に優位性を作る。',
            ],
          },
          {
            title: 'フォロワー',
            body: [
              'リーダーやチャレンジャーより経営資源が少なく、模倣を基本に追随する。',
            ],
          },
          {
            title: 'ニッチャー',
            body: [
              '業界全体ではシェアが小さくても、特定市場に集中し、その領域で強みを持つ。',
            ],
          },
        ],
        cautions: [
          '順番を固定する。リーダー＝総市場規模の拡大、チャレンジャー＝差別化、フォロワー＝模倣、ニッチャー＝集中。',
          'ニッチャーは単に小さい企業ではなく、特定市場で強みを作る企業。',
        ],
        terms: ['リーダー', 'チャレンジャー', 'フォロワー', 'ニッチャー'],
      },
      {
        title: '事業の定義と2つの落とし穴',
        page: 'コラム',
        intro: [
          '戦略を決める前に、その企業が「何の事業を行うのか」を定義する必要がある。',
          '製品名だけで定義すると顧客の本当の目的を見失いやすいが、広げすぎると資源が分散する。',
        ],
        sections: [
          {
            title: '顧客の目的から定義する',
            body: [
              '鉄道会社を「鉄道を走らせる会社」とだけ捉えると、飛行機や自動車など別の移動手段を見落とす。',
              '顧客が求めているのは鉄道そのものではなく、目的地へ移動することだと捉える。',
            ],
          },
          {
            title: 'マーケティング近視眼',
            body: [
              '事業を製品中心に狭く定義し、顧客ニーズや代替手段の変化を見落とす状態。',
            ],
          },
          {
            title: 'マーケティング遠視眼',
            body: [
              '事業を広く定義しすぎ、関係する分野へ投資を広げすぎて、経営資源が不足する状態。',
            ],
          },
        ],
        cautions: [
          '狭く定義すれば必ず悪く、広く定義すれば必ず良いわけではない。',
          '顧客が本当に求めるものと、自社が現実に集中できる範囲の両方を見る。',
        ],
        terms: ['事業の定義', 'マーケティング近視眼', 'マーケティング遠視眼'],
      },
    ],
  },
}

const enhancerStyles = `
.category-panel.is-compact-category .note-block,
.category-panel.is-compact-category .caution-block {
  display: none;
}

.category-panel.is-compact-category .category-title > button {
  display: none;
}

.study-action-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  margin-top: 18px;
}

.study-action-button {
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid #d7d7d7;
  background: #ffffff;
  color: #303030;
  font: inherit;
  font-size: 12px;
  font-weight: 760;
  text-align: left;
}

.study-action-button::after {
  content: '→';
  float: right;
  color: var(--accent);
}

.study-action-button.is-content {
  border-color: color-mix(in srgb, var(--accent) 34%, #d7d7d7);
  background: var(--accent-soft);
  color: var(--accent);
}

.study-reader-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #eeeeee;
}

.study-reader-shell {
  width: min(100%, 600px);
  min-height: 100dvh;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.06);
  color: #171717;
}

.study-reader-header {
  position: sticky;
  z-index: 2;
  top: 0;
  display: grid;
  grid-template-columns: 54px 1fr 68px;
  align-items: center;
  min-height: 58px;
  padding-top: env(safe-area-inset-top);
  border-bottom: 1px solid #e8e8e8;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px);
}

.study-reader-header button {
  min-height: 44px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
}

.study-reader-close {
  font-size: 21px;
}

.study-reader-brand {
  justify-self: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.study-reader-header span {
  justify-self: end;
  padding-right: 16px;
  color: #8a8a8a;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.1em;
}

.study-reader-main {
  padding: 26px 20px calc(112px + env(safe-area-inset-bottom));
}

.study-reader-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #ececec;
  color: #777777;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.study-reader-meta strong {
  color: #222222;
  font-size: 11px;
}

.study-reader-title {
  padding: 28px 0 24px;
}

.study-reader-title small {
  display: block;
  margin-bottom: 12px;
  color: var(--accent, #285fce);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.study-reader-title h1 {
  margin: 0;
  font-size: clamp(27px, 7.4vw, 38px);
  line-height: 1.22;
  letter-spacing: -0.04em;
}

.study-reader-intro {
  padding: 18px;
  background: #f5f5f5;
}

.study-reader-intro p,
.study-reader-section p,
.study-reader-caution p {
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
}

.study-reader-intro p + p,
.study-reader-section p + p,
.study-reader-caution p + p {
  margin-top: 11px;
}

.study-reader-section {
  padding: 22px 0;
  border-bottom: 1px solid #e4e4e4;
}

.study-reader-section h2 {
  margin: 0 0 12px;
  font-size: 15px;
  letter-spacing: -0.01em;
}

.study-reader-caution {
  margin-top: 22px;
  padding: 18px;
  border-left: 3px solid var(--accent, #285fce);
  background: var(--accent-soft, #edf3ff);
}

.study-reader-caution strong,
.study-reader-terms strong {
  display: block;
  margin-bottom: 12px;
  font-size: 11px;
}

.study-reader-terms {
  margin-top: 20px;
}

.study-reader-term-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.study-reader-term-list span {
  padding: 7px 9px;
  border: 1px solid #dddddd;
  color: #555555;
  font-size: 10px;
  font-weight: 700;
}

.study-reader-actions {
  position: fixed;
  z-index: 101;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: minmax(0, 600px);
  justify-content: center;
  pointer-events: none;
}

.study-reader-actions-inner {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 9px;
  padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid #e5e5e5;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(14px);
  pointer-events: auto;
}

.study-reader-actions button {
  min-height: 56px;
  padding: 0 15px;
  border: 1px solid #d7d7d7;
  background: #ffffff;
  color: #303030;
  font: inherit;
  font-size: 12px;
  font-weight: 760;
  text-align: left;
}

.study-reader-actions button:last-child {
  border-color: var(--accent, #285fce);
  background: var(--accent, #285fce);
  color: #ffffff;
}

.study-reader-actions button:disabled {
  color: #b0b0b0;
}

.study-reader-actions button:last-child small {
  display: block;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 8px;
  letter-spacing: 0.08em;
}

@media (max-width: 420px) {
  .study-action-row {
    grid-template-columns: 1fr;
  }

  .study-reader-main {
    padding-inline: 18px;
  }

  .study-reader-actions-inner {
    grid-template-columns: 82px minmax(0, 1fr);
    padding-inline: 18px;
  }
}
`

function StudyContentEnhancer() {
  const [reader, setReader] = useState(null)
  const scrollRef = useRef(null)

  const content = useMemo(
    () => (reader ? studyContents[reader.categoryLabel] : null),
    [reader],
  )

  const currentItem = content?.items[reader?.index ?? 0] ?? null

  useEffect(() => {
    const enhancePanels = () => {
      document.querySelectorAll('.category-panel').forEach((panel) => {
        const categoryLabel = panel
          .querySelector('.category-title h2')
          ?.textContent?.trim()
        const categoryContent = studyContents[categoryLabel]

        if (!categoryContent || panel.dataset.studyActions === 'true') return

        const originalQuizButton = panel.querySelector(
          '.category-title > button',
        )
        const summary = panel.querySelector('.category-summary')
        const row = document.createElement('div')
        row.className = 'study-action-row'
        row.dataset.enhancerOwned = 'true'

        if (originalQuizButton) {
          const quizButton = document.createElement('button')
          quizButton.type = 'button'
          quizButton.className = 'study-action-button is-quiz'
          quizButton.textContent = '解く'
          quizButton.setAttribute(
            'aria-label',
            `${categoryLabel}の問題を解く`,
          )
          quizButton.addEventListener('click', () =>
            originalQuizButton.click(),
          )
          row.appendChild(quizButton)
        }

        const contentButton = document.createElement('button')
        contentButton.type = 'button'
        contentButton.className = 'study-action-button is-content'
        contentButton.textContent = '内容を見る'
        contentButton.setAttribute(
          'aria-label',
          `${categoryLabel}の内容を見る`,
        )
        contentButton.addEventListener('click', () => {
          setReader({ categoryLabel, index: 0 })
        })
        row.appendChild(contentButton)

        panel.classList.add('is-compact-category')
        panel.dataset.studyActions = 'true'

        if (summary) {
          summary.insertAdjacentElement('afterend', row)
        } else {
          panel.appendChild(row)
        }
      })
    }

    enhancePanels()

    const observer = new MutationObserver(enhancePanels)
    observer.observe(document.getElementById('root'), {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!reader) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setReader(null)
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [reader])

  const moveTo = (nextIndex) => {
    if (!content) return

    if (nextIndex >= content.items.length) {
      setReader(null)
      return
    }

    setReader((current) => ({ ...current, index: nextIndex }))
    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <>
      <style>{enhancerStyles}</style>
      {reader &&
        content &&
        currentItem &&
        createPortal(
          <div
            className="study-reader-backdrop"
            ref={scrollRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${content.label}の学習内容`}
          >
            <div className="study-reader-shell">
              <header className="study-reader-header">
                <button
                  className="study-reader-close"
                  type="button"
                  onClick={() => setReader(null)}
                  aria-label="内容一覧を閉じる"
                >
                  ←
                </button>
                <button
                  className="study-reader-brand"
                  type="button"
                  onClick={() => setReader(null)}
                >
                  QUALIFY
                </button>
                <span>CONTENTS</span>
              </header>

              <main className="study-reader-main">
                <div className="study-reader-meta">
                  <span>{content.label}</span>
                  <strong>
                    {reader.index + 1} / {content.items.length}
                  </strong>
                </div>

                <section className="study-reader-title">
                  <small>{currentItem.page}</small>
                  <h1>{currentItem.title}</h1>
                </section>

                <section className="study-reader-intro">
                  {currentItem.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>

                {currentItem.sections.map((section) => (
                  <section className="study-reader-section" key={section.title}>
                    <h2>{section.title}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section className="study-reader-caution">
                  <strong>要注意点</strong>
                  {currentItem.cautions.map((caution) => (
                    <p key={caution}>{caution}</p>
                  ))}
                </section>

                <section className="study-reader-terms">
                  <strong>重要語句</strong>
                  <div className="study-reader-term-list">
                    {currentItem.terms.map((term) => (
                      <span key={term}>{term}</span>
                    ))}
                  </div>
                </section>
              </main>

              <div className="study-reader-actions">
                <div className="study-reader-actions-inner">
                  <button
                    type="button"
                    disabled={reader.index === 0}
                    onClick={() => moveTo(reader.index - 1)}
                  >
                    前へ
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTo(reader.index + 1)}
                  >
                    <small>
                      {reader.index >= content.items.length - 1
                        ? 'END'
                        : 'NEXT CONTENT'}
                    </small>
                    {reader.index >= content.items.length - 1
                      ? 'テーマ一覧へ戻る'
                      : `次へ：${content.items[reader.index + 1].title}`}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <StudyContentEnhancer />
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => undefined)
  })
}
