# 色彩検定2級｜問題データ設計図

この文書は、色彩検定2級の問題を追加する際の固定設計です。
別チャット・別担当で実装しても、参考書問題・過去問・試験用紙を混同しないことを最優先にします。

## 目的

- 公式テキスト本編11章から、学習用のオリジナル問題をできるだけ多く作る。
- 実際の過去問と試験用紙は、後から別チャットで追加する。
- 解答画面、誤答記録、要注意、未回答、ランダム出題は既存の共通問題エンジンを使う。
- 問題データの出所は `sourceId` とID接頭辞で完全に分離する。

## 絶対に混ぜない3つの問題源

| 問題源 | 表示名 | `sourceId` | 問題ID接頭辞 | 公式問題か |
|---|---|---|---|---|
| 参考書から作成した問題 | 参考書問題 | `color2-textbook-generated` | `color2-tb-` | いいえ |
| 実際の過去問 | 過去問 | 年度・期ごとに別ID | `color2-pe-` | 元資料に従う |
| 実際の試験用紙 | 試験用紙 | 年度・期ごとに別ID | `color2-ep-` | 元資料に従う |

### 固定ルール

- 参考書問題を「過去問」「公式問題」「本試験」と表示しない。
- 過去問を参考書問題のファイルへコピーしない。
- 試験用紙を過去問として登録しない。
- 同じ解答画面を使っても、`sourceId`、表示ラベル、ID接頭辞は必ず分ける。
- 一度公開した問題IDは、回答履歴との紐づけを守るため変更しない。
- 問題文を修正しても、同じ知識を問う問題ならIDは維持する。
- 問う知識や正解が変わる場合は新しいIDを発行し、旧問題は削除ではなく無効化を検討する。

## 対象範囲

参考書問題の対象は、ユーザーから画像で受領しサイト化した以下の本編11章だけです。

1. 色のユニバーサルデザイン
2. 光と色
3. 色の表示
4. 色彩心理
5. 色彩調和
6. 配色イメージ
7. ビジュアル
8. ファッション
9. インテリア
10. 景観色彩
11. 慣用色名

### 対象外

- P.138〜143の「資料」ページ
- 教科書内のコラム
- まだ受領していない過去問
- まだ受領していない本試験・夏期試験用紙
- 出典不明のネット問題

## 推奨ファイル構成

既存の巨大な `src/data/questions.js` に色彩検定2級の全問題を直接書き続けない。
色彩検定2級専用フォルダへ分割し、最後に共通問題配列へ結合します。

```text
src/
└─ data/
   ├─ questions.js
   └─ color-2/
      └─ questions/
         ├─ index.js
         ├─ schema.js
         ├─ textbook/
         │  ├─ index.js
         │  ├─ 01-universal-design.js
         │  ├─ 02-light-and-color.js
         │  ├─ 03-color-systems.js
         │  ├─ 04-color-psychology.js
         │  ├─ 05-color-harmony.js
         │  ├─ 06-color-image.js
         │  ├─ 07-visual.js
         │  ├─ 08-fashion.js
         │  ├─ 09-interior.js
         │  ├─ 10-landscape-color.js
         │  └─ 11-conventional-color-names.js
         ├─ past-exams/
         │  └─ README.md
         └─ exam-papers/
            └─ README.md
scripts/
└─ validate-color2-questions.mjs
```

### 共通配列への接続

```js
// src/data/color-2/questions/index.js
import { color2TextbookQuestions } from './textbook'

export const color2Questions = [
  ...color2TextbookQuestions,
  // 過去問と試験用紙は別チャットで後から追加する。
]
```

```js
// src/data/questions.js
import { color2Questions } from './color-2/questions'

export const questions = [
  ...marketingQuestions,
  ...color2Questions,
]
```

既存ファイルの都合で直ちに完全分割できない場合でも、色彩検定2級の新規問題は上記フォルダへ置き、最終的に `questions` へ結合する形を守ります。

## 資格・問題源の登録

`src/data/qualifications.js` の色彩検定2級へ、参考書問題のリソースを追加します。

```js
{
  id: 'color-2',
  // ...
  resources: [
    {
      id: 'color2-textbook-generated',
      type: 'generated-questions',
      label: '参考書問題',
      description: '公式テキスト本編から作成したオリジナル問題。公式問題・過去問ではない。',
      official: false,
    },
  ],
}
```

過去問と試験用紙は、受領した年度・期・版ごとに別リソースとして追加します。

```js
// 例。実物を受領するまで作成しない。
{
  id: 'color2-past-exam-2025-summer',
  type: 'past-exam',
  label: '2025年度 夏期 過去問',
}

{
  id: 'color2-exam-paper-2026-summer',
  type: 'exam-paper',
  label: '2026年度 夏期 試験用紙',
}
```

## 参考書問題のカテゴリー

問題カテゴリーは本編11章と一致させます。参考書を読む画面の親章構造を壊さず、問題側では章別フィルターとして使います。

| 順番 | `categoryId` | 表示名 |
|---|---|---|
| 1 | `color2-tb-universal-design` | 色のユニバーサルデザイン |
| 2 | `color2-tb-light-and-color` | 光と色 |
| 3 | `color2-tb-color-systems` | 色の表示 |
| 4 | `color2-tb-color-psychology` | 色彩心理 |
| 5 | `color2-tb-color-harmony` | 色彩調和 |
| 6 | `color2-tb-color-image` | 配色イメージ |
| 7 | `color2-tb-visual` | ビジュアル |
| 8 | `color2-tb-fashion` | ファッション |
| 9 | `color2-tb-interior` | インテリア |
| 10 | `color2-tb-landscape-color` | 景観色彩 |
| 11 | `color2-tb-conventional-color-names` | 慣用色名 |

子章は `subcategoryId` と `subcategoryLabel` で保持します。現在の問題エンジンが子章フィルターを使わなくても、将来の絞り込みと監査のため必ず記録します。

## 問題オブジェクトの標準形

現在の問題エンジンが必要とする既存フィールドを維持し、将来用のメタデータを追加します。

```js
{
  qualificationId: 'color-2',
  sourceId: 'color2-textbook-generated',
  sourceLabel: '参考書問題',
  sourceKind: 'textbook-generated',
  official: false,

  categoryId: 'color2-tb-color-harmony',
  categoryLabel: '色彩調和',
  subcategoryId: 'color-harmony-techniques',
  subcategoryLabel: '配色技法',

  id: 'color2-tb-05-001',
  number: '参考書 05-001',
  sourcePage: 54,
  sourcePages: [54, 55],

  type: 'choice',
  questionType: 'comparison',
  difficulty: 'standard',
  tags: ['トーンオントーン', 'トーンイントーン', '混同注意'],

  prompt: '問題文',
  choices: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
  correctIndex: 1,

  explanation: '正解になる理由を、参考書内容に基づいて説明する。',
  choiceExplanations: [
    'Aが違う理由',
    'Bが正しい理由',
    'Cが違う理由',
    'Dが違う理由',
  ],
  caution: '混同しやすい点、深読み不要の判断軸。',

  visual: null,
  status: 'active',
}
```

### 必須フィールド

現在の共通問題エンジンで最低限必要なものは以下です。

- `qualificationId`
- `sourceId`
- `sourceLabel`
- `categoryId`
- `categoryLabel`
- `type`
- `id`
- `number`
- `prompt`
- `choices`
- `correctIndex`
- `explanation`
- `caution`

追加メタデータはUIが未対応でも問題データ内に保持します。

## 問題タイプ

単純暗記だけに偏らず、以下を混ぜます。

- `definition`：用語の定義を選ぶ
- `incorrect`：誤っている説明を選ぶ
- `matching`：用語と説明・条件の組み合わせ
- `comparison`：似た概念の違い
- `application`：用途や場面から適切な設計を判断
- `sequence`：工程・順序を問う
- `calculation`：数値や色数の計算
- `visual-color`：色チップから名称・分類を判断
- `visual-diagram`：オリジナル図から配色技法や構造を判断
- `cause-effect`：原因と結果の関係を問う

## 作問ルール

### 内容

- ユーザーから受領した公式テキスト本編の内容だけを根拠にする。
- 参考資料ページ、コラム、ネット知識を混ぜない。
- 問題文と解説は原文を長く転載せず、意味を保って言い換える。
- 条件、理由、比較、例外を削りすぎない。
- 正解は必ず1つにする。
- 文章の言い回しだけで正解が分かる不自然な選択肢を避ける。
- 架空の出題傾向を「頻出」「過去に出た」と断定しない。

### 選択肢

- 原則4択。内容上必要なら3〜5択でもよい。
- 誤答選択肢は、実際に混同しやすい近接概念から作る。
- 同じ問題内で選択肢の粒度を揃える。
- 正解位置が偏らないよう、章単位で分布を確認する。
- 「すべて正しい」「該当なし」は原則使わない。

### 解説

- 正解の理由だけでなく、他の選択肢が違う理由も保持する。
- `caution` には、ユーザーの誤答原因分類に役立つ判断軸を書く。
- 深読みで外しやすい問題は「問題文に書かれた条件だけで判断する」と明記する。

### 視覚問題

- 教科書写真や図版をそのまま転載しない。
- CSS、SVG、色チップ、単純な図形でオリジナル図を作る。
- 慣用色名の画面色は学習用近似色であり、端末差があると表示する。
- 色だけに依存せず、色名・記号・パターンなども併用する。
- 画像がなくても問題文だけで意味が破綻しないデータ構造にする。

## 問題数の方針

ユーザーは「できるだけたくさん」を希望している。ただし、同じ文章の語尾だけを変えた水増しはしません。

### 初期目標

- 最低500問
- 推奨600〜700問
- 慣用色名は色名・由来・系統・比較を分けて100問以上
- 色彩調和、配色イメージ、ファッションは図解・比較問題を厚くする

### 章別の目安

| 章 | 目安 |
|---|---:|
| 色のユニバーサルデザイン | 25〜35問 |
| 光と色 | 45〜60問 |
| 色の表示 | 25〜35問 |
| 色彩心理 | 35〜50問 |
| 色彩調和 | 70〜100問 |
| 配色イメージ | 45〜65問 |
| ビジュアル | 35〜50問 |
| ファッション | 55〜80問 |
| インテリア | 40〜60問 |
| 景観色彩 | 35〜55問 |
| 慣用色名 | 100〜160問 |

問題数は品質検証後の実数を優先し、目標達成のために曖昧な問題を残してはいけません。

## 参考書問題の表示

問題設定画面では、同じ問題エンジン内で問題源を選べるようにします。

```text
問題源
├─ 参考書問題（公式問題ではない）
├─ 過去問（未登録）
└─ 試験用紙（未登録）
```

参考書問題を選んだ場合は、画面上に次を表示します。

> 公式テキスト本編の内容から作成したオリジナル問題です。実際の過去問・本試験問題ではありません。

過去問や試験用紙が未登録の段階では、空の選択肢を無理に表示せず、登録後に追加します。

## 既存問題エンジンとの接続

現在の `quizEngine` は、以下の条件で問題を絞り込めます。

- `qualificationId`
- `sourceId`
- `categoryId`
- `mode`：全問題、間違いだけ、要注意だけ、未回答だけ
- `count`

したがって、参考書問題・過去問・試験用紙は `sourceId` を分けるだけで、同じ解答・記録機能を利用できます。

共通エンジンを参考書問題専用に複製してはいけません。

## 検証スクリプト

`scripts/validate-color2-questions.mjs` を作り、少なくとも次を検査します。

- 問題IDの重複がない
- `color2-tb-` の問題が参考書問題以外の `sourceId` を持っていない
- 参考書問題に `official: true` がない
- 参考書問題フォルダに `color2-pe-`、`color2-ep-` がない
- `correctIndex` が選択肢の範囲内
- 選択肢が重複していない
- 正解選択肢が空ではない
- `qualificationId` が `color-2`
- `categoryId` が11章のいずれか
- `subcategoryId` とページ情報がある
- `explanation` と `caution` が空ではない
- 章ごとの正解位置が極端に偏っていない
- 無効化済み問題を通常出題へ含めていない

検証に失敗した状態でmainへ統合しません。

## 実装順序

1. 問題スキーマと検証スクリプトを作る。
2. 色彩検定2級へ `参考書問題` リソースを登録する。
3. 11章のカテゴリIDを固定する。
4. 章ごとの問題ファイルを作る。
5. 1章ずつ件数・正答・解説を二重確認する。
6. 全章を `color2TextbookQuestions` へ結合する。
7. 共通 `questions` 配列へ追加する。
8. ビルド、検証、実画面の問題源フィルターを確認する。
9. 問題総数・章別件数・正解位置分布を報告する。

## 過去問・試験用紙を追加する別チャットへの指示

- この設計図を最初に読む。
- 参考書問題ファイルを編集しない。
- 実物画像をすべて受領し、ユーザーが「これで全部」と言うまで実装しない。
- 年度・期・問題番号・ページを保持する。
- 元資料の問題文と選択肢を勝手に参考書問題へ転用しない。
- 同じ知識が重複しても、出所が異なるため別IDで保持する。
- 実際の過去問と試験用紙の関係が不明なら推測せず確認する。

## 完了条件

参考書問題の実装完了は、次をすべて満たした状態です。

- 11章すべてに問題がある
- 参考書問題と過去問・試験用紙が `sourceId` で分離されている
- 参考書問題に「公式問題ではない」と表示される
- 既存の誤答・要注意・未回答・ランダム機能が動く
- 問題IDが重複しない
- 全問題の正解・解説を二重確認済み
- 検証スクリプトが成功する
- 既存の参考書本文11章を削除・移動・短縮していない
- マーケティング検定の問題データを変更していない
