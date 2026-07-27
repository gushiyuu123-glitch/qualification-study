import { qualifications } from './data/qualifications'

const CATEGORY_ID = 'conventional-color-names'
const CATEGORY_LABEL = '慣用色名'
const colorQualification = qualifications.find((qualification) => qualification.id === 'color-2')

if (colorQualification && !colorQualification.categories.some((category) => category.id === CATEGORY_ID)) {
  colorQualification.categories.push({
    id: CATEGORY_ID,
    label: CATEGORY_LABEL,
    summary: 'JISの慣用色名63色を、色チップ・系統色名・由来・混同比較から覚える。',
    keyPoints: [
      '慣用色名は、色名・大まかな系統色名・由来を結びつけて覚える。',
      '金・銀以外は、JISで系統色名と代表的なマンセル値が定められている。',
      '試験では似た色名を並べ、色相の寄り・明暗・鮮やかさの差から見分ける。',
    ],
    cautions: [
      'マンセル値を一字一句丸暗記するより、色の方向と由来を優先する。',
      '画面の色は端末や表示環境で変わるため、色チップは学習用の近似色として使う。',
    ],
  })
}

const color = (name, reading, system, munsell, hex, origin, hook, english = '') => ({
  name,
  reading,
  system,
  munsell,
  hex,
  origin,
  hook,
  english,
})

const japaneseColors = [
  color('鴇色', 'ときいろ', '明るい紫みの赤', '7RP 7.5/8', '#d98f8e', 'トキの翼の内側や風切羽・尾羽に見られる淡いピンク。近世の和装で流行した。', 'トキの羽'),
  color('韓紅花', 'からくれない', 'あざやかな赤', '1.5R 5.5/13', '#e9423d', '中国から渡来した紅花染めの濃い赤。古くは「くれない」と呼ばれた。', '紅花の濃い赤'),
  color('蘇芳', 'すおう', 'くすんだ赤', '4R 4/7', '#8e2f2f', 'インドやマレー半島原産のマメ科植物スオウの心材を煮出して染めた色。', 'スオウの心材'),
  color('鳶色', 'とびいろ', '暗い黄みの赤', '7.5R 3.5/5', '#6a3528', '鳥のトビの羽に似た、赤みのある暗い茶色。江戸前期から用いられた。', 'トビの羽'),
  color('海老茶', 'えびちゃ', '暗い黄みの赤', '8R 3/4.5', '#4b1e21', '葡萄の古名「えび」に由来する暗い赤紫。海老そのものの色ではない。', '葡萄の古名えび'),
  color('弁柄色', 'べんがらいろ', '暗い黄みの赤', '8R 3.5/7', '#75352f', 'インド・ベンガル地方産の赤色酸化鉄顔料に由来する。', 'ベンガルの酸化鉄'),
  color('檜皮色', 'ひわだいろ', '暗い灰みの黄赤', '1YR 4.3/4', '#6a4330', 'ヒノキの樹皮のような茶色。黒みのある蘇芳染めともいわれる。', 'ヒノキの樹皮'),
  color('琥珀色', 'こはくいろ', 'くすんだ黄みの赤', '8YR 5.5/6.5', '#9b5b22', '樹脂の化石である琥珀の色。酒類の色を表す言葉にも使われる。', '樹脂の化石'),
  color('黄丹', 'おうに', 'つよい黄赤', '10R 6/12', '#e8752d', '紅花とクチナシで染めた皇太子の礼服の色。臣下が使えない禁色だった。', '皇太子の禁色'),
  color('代赭', 'たいしゃ', 'くすんだ黄赤', '2.5YR 5/8.5', '#a64f2c', '中国・山西省代州産の赤土を原料とした絵の具の色。', '代州の赤土'),
  color('柑子色', 'こうじいろ', '明るい黄赤', '5.5YR 7.5/9', '#e69532', 'コウジミカンの実のような色。日本語のオレンジ色を代表する古い色名。', 'コウジミカン'),
  color('朽葉色', 'くちばいろ', '灰みの赤みを帯びた黄', '10YR 5/2', '#74613a', '朽ちて落ちた葉のような色。赤朽葉・黄朽葉・青朽葉など派生色もある。', '朽ちた落ち葉'),
  color('鬱金色', 'うこんいろ', 'つよい黄', '2Y 7.5/12', '#d99b00', 'ショウガ科ウコンの根で染めた鮮やかな黄色。着物やカレー粉にも関係する。', 'ウコンの根'),
  color('刈安色', 'かりやすいろ', 'うすい緑みの黄', '3Y 8.5/7', '#d2bd32', 'イネ科植物カリヤスを染料にした黄。古代から用いられた。', 'イネ科カリヤス'),
  color('黄蘗色', 'きはだいろ', '明るい黄緑', '9Y 8/8', '#d4ca13', 'ミカン科キハダの樹皮の内側を染料にした色。藍との重ね染めにも使われた。', 'キハダの樹皮'),
  color('鶸色', 'ひわいろ', 'つよい黄緑', '1GY 7.5/8', '#a6ad16', '小鳥ヒワの羽から名づけられた黄緑色。', 'ヒワの羽'),
  color('海松色', 'みるいろ', '暗い灰みの黄緑', '9.5Y 4.5/2.5', '#4e552e', '海藻ミルのような暗いオリーブ系の色。中世以降の代表的な伝統色。', '海藻ミル'),
  color('常磐色', 'ときわいろ', 'こい緑', '3G 4.5/7', '#24613c', '松や杉など常緑樹の葉の色。常に変わらないことから永久性を表した。', '常緑樹'),
  color('緑青色', 'ろくしょういろ', 'くすんだ緑', '4G 5/4', '#3e7a58', '孔雀石からつくられる緑色顔料・緑青の色。古来の代表的な緑の絵の具。', '孔雀石の顔料'),
  color('鉄色', 'てついろ', 'ごく暗い青緑', '2.5BG 2.5/2.5', '#1f3937', '焼いた鉄の肌を思わせる暗い青緑。鉄紺とも呼ばれる。', '焼いた鉄の肌'),
  color('新橋色', 'しんばしいろ', '明るい緑みの青', '2.5B 6.5/5.5', '#55a8ad', '明治末から大正期に新橋芸者が好んだ、化学染料による明るい青緑。', '新橋芸者'),
  color('納戸色', 'なんどいろ', 'つよい緑みの青', '4B 4/6', '#176a78', '江戸時代を代表する藍染めの青。納戸の暗がりや幕、役人の衣服など諸説ある。', '江戸の藍染め'),
  color('甕覗き', 'かめのぞき', 'やわらかい緑みの青', '4.5B 7/4', '#91c9c3', '藍甕に布を一度だけ浸した、ごく薄い藍染めの青。', '甕を一度だけ覗く'),
  color('縹色', 'はなだいろ', 'つよい青', '3PB 4/7.5', '#3e6fa8', '藍染めの代表的な強い青。縹は藍汁に糸が浸かった字形とされる。', '藍染めの代表青'),
  color('藤色', 'ふじいろ', '明るい青紫', '10PB 6.5/6.5', '#9a86b5', '藤の花房からとられた明るい青紫。平安時代から親しまれた。', '藤の花房'),
  color('江戸紫', 'えどむらさき', 'こい青みの紫', '3P 3.5/7', '#634885', '江戸の紫草染めに由来する青みの紫。江戸名物として知られた。', '江戸＝青みの紫'),
  color('古代紫', 'こだいむらさき', 'くすんだ紫', '7.5P 4/6', '#6c485f', '近世の青みの江戸紫に対し、伝統的な赤みの紫を区別して呼んだ色。', '古代＝赤みの紫'),
  color('銀鼠', 'ぎんねず', '明るい灰色', 'N6.5', '#9b9b96', '銀に近い明るい灰色。江戸時代、鼠色は粋な流行色となった。', '銀に近い鼠色'),
  color('茶鼠', 'ちゃねずみ', '黄赤みの灰色', '5YR 6/1', '#78685a', '江戸時代の「四十八茶百鼠」に数えられる、茶色みの灰色。', '茶みの鼠色'),
  color('利休鼠', 'りきゅうねずみ', '緑みの灰色', '2.5G 5/1', '#59665b', '利休好みや抹茶の連想から生まれた、緑みの灰色。', '抹茶の緑み'),
  color('煤竹色', 'すすたけいろ', '赤みを帯びた黄みの暗い灰色', '9.5YR 3.5/1.5', '#5b4331', '煤けて黒くなった竹のような色。近世初期にはすでに使われていた。', '煤けた竹'),
]

const foreignColors = [
  color('ローズピンク', 'rose pink', '明るい紫みの赤', '10RP 7/8', '#d88791', '紫みを帯びたピンクのバラの花に由来する。', '紫みのバラ', 'rose pink'),
  color('ポピーレッド', 'poppy red', 'あざやかな赤', '4R 5/14', '#dc3d36', '赤いポピーの花からつけられた色名。', '赤いポピー', 'poppy red'),
  color('バーントシェンナ', 'burnt sienna', 'くすんだ黄赤', '10R 4.5/7.5', '#9a4b35', 'イタリアのシエナ産の土を焼いてつくる赤褐色顔料。', 'シエナの土を焼く', 'burnt sienna'),
  color('バーガンディー', 'burgundy', 'ごく暗い紫みの赤', '10RP 2/2.5', '#2f2027', 'フランス・ブルゴーニュ産の赤ワインの色。', 'ブルゴーニュワイン', 'burgundy'),
  color('オールドローズ', 'old rose', 'やわらかい赤', '1R 6/6.5', '#b56d69', 'ビクトリア朝に流行した、やや灰みを帯びたバラ色。', '古びた灰みのバラ', 'old rose'),
  color('マルーン', 'maroon', '暗い赤', '5R 2.5/6', '#4d1d1c', '大粒の栗を表すフランス語マロンに由来する、赤みの強い栗色。', '栗のマロン', 'maroon'),
  color('テラコッタ', 'terracotta', 'くすんだ黄みの赤', '7.5R 4.5/8', '#9a4f37', 'イタリア語で「焼いた土」。素焼きの陶器や建材の色。', '焼いた土', 'terracotta'),
  color('ローシェンナ', 'raw sienna', 'つよい黄赤', '4YR 5/9', '#a55f2d', '焼いていないシエナ産の土を用いた黄褐色顔料。rawは「生の」の意味。', '焼かないシエナ土', 'raw sienna'),
  color('エクルベイジュ', 'ecru beige', 'うすい赤みの黄', '7.5YR 8.5/4', '#d9bd8e', 'フランス語écruは「未加工・生の」。未加工の羊毛のようなベージュ。', '未加工の羊毛', 'ecru beige'),
  color('アンバー', 'amber', 'くすんだ赤みの黄', '8YR 5.5/6.5', '#9b641f', '英語で琥珀を表す。琥珀のような黄褐色。', '琥珀', 'amber'),
  color('ローアンバー', 'raw umber', '暗い黄', '2.5Y 4/6', '#5a4322', 'イタリア・ウンブリア地方の土を焼かずに用いる暗い黄褐色顔料。', '焼かないウンブリア土', 'raw umber'),
  color('ネープルスイエロー', 'Naples yellow', 'つよい黄', '2.5Y 8/7.5', '#c99319', '「ナポリの黄」を意味する古い絵の具の色名。', 'ナポリの黄', 'Naples yellow'),
  color('タン', 'tan', 'くすんだ黄赤', '6YR 5/6', '#a6683c', '樹皮から採ったタンニンでなめした革の色。', 'なめし革', 'tan'),
  color('ゴールデンイエロー', 'golden yellow', 'つよい赤みの黄', '7.5YR 7/10', '#e2921d', '黄金の輝きを感じさせる黄。絵の具の色名として広まった。', '黄金の輝き', 'golden yellow'),
  color('バーントアンバー', 'burnt umber', 'ごく暗い赤みの黄', '10YR 3/3', '#38271d', 'ウンブリア産の土を焼き、暗い褐色にした顔料。', 'ウンブリア土を焼く', 'burnt umber'),
  color('ジョンブリアン', 'jaune brillant', 'あざやかな黄', '5Y 8.5/14', '#d9a900', 'フランス語で「輝かしい黄色」。新しい絵の具につけられた色名。', '輝かしい黄色', 'jaune brillant'),
  color('シャトルーズグリーン', 'chartreuse green', '明るい黄緑', '4GY 8/10', '#a8bd32', 'フランスのシャトルーズ修道院でつくられた黄緑色のリキュールに由来する。', '黄緑のリキュール', 'chartreuse green'),
  color('グラスグリーン', 'grass green', 'くすんだ黄緑', '5GY 5/5', '#617b32', '英語で草を意味するgrassから生まれた古い色名。', '草の緑', 'grass green'),
  color('ミントグリーン', 'mint green', '明るい緑', '2.5G 7.5/8', '#8ab17a', 'ハッカを表すミントに由来する。ミント系リキュールや菓子の色として定着した。', 'ハッカ・ミント', 'mint green'),
  color('ボトルグリーン', 'bottle green', 'ごく暗い緑', '5G 2.5/3', '#203c2d', '古い酒瓶に使われた濃い緑色ガラスの色。', '濃緑の酒瓶', 'bottle green'),
  color('ナイルブルー', 'Nile blue', 'くすんだ青緑', '10BG 5.5/5', '#4b8f86', 'ナイル川を連想して名づけられた青緑。ナイルグリーンより先に登場した。', 'ナイル川の青緑', 'Nile blue'),
  color('リーフグリーン', 'leaf green', 'つよい黄緑', '5GY 6/7', '#6f9d37', '木の葉を意味するleafからつけられた、分かりやすい黄緑の色名。', '木の葉', 'leaf green'),
  color('アップルグリーン', 'apple green', 'やわらかい黄みの緑', '10GY 8/5', '#78ad55', '英語圏の青リンゴの皮を表す黄みの緑。', '青リンゴ', 'apple green'),
  color('マラカイトグリーン', 'malachite green', 'こい緑', '4G 4.5/9', '#1d7449', '孔雀石マラカイトの緑。古代から顔料として知られる。', '孔雀石', 'malachite green'),
  color('ピーコックグリーン', 'peacock green', 'あざやかな青緑', '7.5BG 4.5/9', '#00826f', '孔雀の羽の緑のような鮮やかな青緑。', '孔雀の羽', 'peacock green'),
  color('セルリアンブルー', 'cerulean blue', 'あざやかな青', '9B 4.5/9', '#1684a0', '空を意味する語に由来し、近代の青色顔料の色名として定着した。', '空の青', 'cerulean blue'),
  color('ミッドナイトブルー', 'midnight blue', 'ごく暗い紫みの青', '5PB 1.5/2', '#171d2b', '真夜中の青を意味する、黒に近い暗い紺色。', '真夜中', 'midnight blue'),
  color('ライラック', 'lilac', 'やわらかい紫', '6P 7/6', '#a88dad', 'ライラックの花に由来する淡い紫。', 'ライラックの花', 'lilac'),
  color('サックスブルー', 'saxe blue', 'くすんだ青', '1PB 5/4.5', '#547886', 'ドイツ東部ザクセン地方の英語名Saxeに由来する、染織品の青。', 'ザクセン地方', 'saxe blue'),
  color('ウイスタリア', 'wistaria', 'あざやかな青紫', '10PB 5/12', '#7161a8', '藤の英語名に由来する。藤色より鮮やかで青みが強い。', '鮮やかな藤', 'wistaria'),
  color('スレートグレイ', 'slate grey', '暗い灰色', '2.5PB 3.5/0.5', '#4c4b46', '屋根材に使われる粘板岩スレートの暗い灰色。', '粘板岩', 'slate grey'),
  color('ランプブラック', 'lamp black', '黒', 'N1', '#11100e', 'ランプ油を燃やして得た煤を原料にした、古い黒色顔料。', 'ランプの煤', 'lamp black'),
]

const allColors = [...japaneseColors, ...foreignColors]
const colorMap = new Map(allColors.map((entry) => [entry.name, entry]))
const pick = (...names) => names.map((name) => colorMap.get(name)).filter(Boolean)

const groups = [
  {
    title: '和色名｜赤・赤紫・茶',
    page: 'P.128〜129',
    intro: '生き物、植物染料、土や樹皮から生まれた暖色系の和色名をまとめる。由来の対象を先に思い浮かべると、名前と色が結びつきやすい。',
    colors: pick('鴇色', '韓紅花', '蘇芳', '鳶色', '海老茶', '弁柄色', '檜皮色', '琥珀色'),
    cautions: ['海老茶の「えび」は海老ではなく葡萄の古名。', '弁柄色・代赭・テラコッタはすべて土や顔料に関係するが、色相と由来が異なる。'],
  },
  {
    title: '和色名｜黄赤・黄・黄緑',
    page: 'P.129〜130',
    intro: '礼服、果実、落ち葉、植物染料、小鳥などから生まれた黄系の和色名。自然物の名前がそのまま記憶フックになる。',
    colors: pick('黄丹', '代赭', '柑子色', '朽葉色', '鬱金色', '刈安色', '黄蘗色', '鶸色'),
    cautions: ['黄丹は皇太子の礼服に使われた禁色。', '黄蘗色はキハダの樹皮、刈安色はイネ科植物、鬱金色はウコンの根。'],
  },
  {
    title: '和色名｜緑・青緑',
    page: 'P.130',
    intro: '海藻、常緑樹、鉱物、鉄から名づけられた緑系の和色名。黄みの緑から暗い青緑へ順に並べて見る。',
    colors: pick('海松色', '常磐色', '緑青色', '鉄色'),
    cautions: ['海松色は海藻ミルの暗い黄緑。常磐色は常緑樹の濃い緑。', '鉄色は灰色ではなく、ごく暗い青緑。'],
  },
  {
    title: '和色名｜青・青紫',
    page: 'P.130〜131',
    intro: '藍染めに関係する青と、藤や紫草に関係する紫を整理する。薄い青から強い青、青みの紫から赤みの紫へ並べる。',
    colors: pick('新橋色', '納戸色', '甕覗き', '縹色', '藤色', '江戸紫', '古代紫'),
    cautions: ['甕覗きは薄い藍、縹色は強い藍染めの青。', '江戸紫は青み、古代紫は赤み。この方向差を固定する。'],
  },
  {
    title: '和色名｜鼠・灰・暗色',
    page: 'P.131',
    intro: '江戸時代に粋な色として発達した鼠色系。灰色に何色がわずかに混ざっているかで見分ける。',
    colors: pick('銀鼠', '茶鼠', '利休鼠', '煤竹色'),
    cautions: ['銀鼠はほぼ無彩色、茶鼠は黄赤み、利休鼠は緑み。', '煤竹色は煤けた竹の暗い茶灰色で、単純な黒ではない。'],
  },
  {
    title: '外来色名｜赤・赤紫・土の赤',
    page: 'P.132',
    intro: '花、ワイン、栗、土、焼成から生まれた赤系の外来色名。名称の対象物を見れば、明暗と鮮やかさの方向を推測しやすい。',
    colors: pick('ローズピンク', 'ポピーレッド', 'バーントシェンナ', 'バーガンディー', 'オールドローズ', 'マルーン', 'テラコッタ'),
    cautions: ['バーガンディーはワインの暗い紫赤、マルーンは栗由来の暗い赤。', 'バーントシェンナは顔料、テラコッタは焼いた土や陶器。'],
  },
  {
    title: '外来色名｜黄赤・黄・茶',
    page: 'P.133',
    intro: '土の顔料、羊毛、琥珀、革、黄金などから生まれた黄褐色系の外来色名を整理する。rawとburntの対比が重要。',
    colors: pick('ローシェンナ', 'エクルベイジュ', 'アンバー', 'ローアンバー', 'ネープルスイエロー', 'タン', 'ゴールデンイエロー', 'バーントアンバー', 'ジョンブリアン'),
    cautions: ['rawは焼かない、burntは焼く。シェンナとアンバーの両方で使われる。', 'エクルベイジュは未加工の羊毛、タンはなめし革。'],
  },
  {
    title: '外来色名｜黄緑・緑・青緑',
    page: 'P.134',
    intro: '酒、草、葉、果実、鉱物、瓶、川、孔雀など、対象物がはっきりした緑系の外来色名をまとめる。',
    colors: pick('シャトルーズグリーン', 'グラスグリーン', 'ミントグリーン', 'ボトルグリーン', 'ナイルブルー', 'リーフグリーン', 'アップルグリーン', 'マラカイトグリーン', 'ピーコックグリーン'),
    cautions: ['ナイルブルーは名前にブルーが入るが、見た目はくすんだ青緑。', 'マラカイトグリーンは孔雀石、ピーコックグリーンは孔雀の羽。'],
  },
  {
    title: '外来色名｜青・紫・灰・黒',
    page: 'P.135',
    intro: '空、夜、花、地名、岩石、煤から生まれた寒色・無彩色系の外来色名を整理する。',
    colors: pick('セルリアンブルー', 'ミッドナイトブルー', 'ライラック', 'サックスブルー', 'ウイスタリア', 'スレートグレイ', 'ランプブラック'),
    cautions: ['ウイスタリアは藤色より鮮やかで青みが強い。', 'スレートグレイは粘板岩、ランプブラックはランプ油の煤。'],
  },
]

const comparisons = [
  {
    title: '混同比較｜紫・青系',
    page: 'P.130〜135 比較',
    intro: '紫と藍系は、名前だけで判断すると混同しやすい。青み・赤み、明るさ、鮮やかさの順で見分ける。',
    sets: [
      { label: '江戸紫と古代紫', note: '江戸紫は青み、古代紫は赤みでくすむ。', colors: pick('江戸紫', '古代紫') },
      { label: '藤色・ウイスタリア・ライラック', note: '藤色は明るい青紫、ウイスタリアは鮮やか、ライラックは柔らかい紫。', colors: pick('藤色', 'ウイスタリア', 'ライラック') },
      { label: '甕覗き・新橋色・納戸色・縹色', note: '薄い藍→明るい青緑→強い青緑→強い青の順で整理する。', colors: pick('甕覗き', '新橋色', '納戸色', '縹色') },
      { label: '鉄色・ボトルグリーン・ミッドナイトブルー', note: 'いずれも暗いが、鉄色は青緑、ボトルは緑、ミッドナイトは紫みの青。', colors: pick('鉄色', 'ボトルグリーン', 'ミッドナイトブルー') },
    ],
    cautions: ['色名の漢字や英語だけで決めず、色相の寄りを最初に確認する。'],
  },
  {
    title: '混同比較｜土・鼠・素材系',
    page: 'P.128〜135 比較',
    intro: '土、鉱物、灰、素材から生まれた色は似た暗色になりやすい。由来と系統色名をセットにする。',
    sets: [
      { label: '弁柄色・代赭・バーントシェンナ・テラコッタ', note: '酸化鉄・赤土・焼いた顔料・焼いた土という由来の違い。', colors: pick('弁柄色', '代赭', 'バーントシェンナ', 'テラコッタ') },
      { label: '琥珀色とアンバー', note: '和名と英名で、どちらも琥珀に由来する近い色。', colors: pick('琥珀色', 'アンバー') },
      { label: '緑青色とマラカイトグリーン', note: 'どちらも孔雀石に関係する。和色名と外来色名の対応として覚える。', colors: pick('緑青色', 'マラカイトグリーン') },
      { label: '銀鼠・茶鼠・利休鼠・スレートグレイ', note: '無彩色、黄赤み、緑み、暗い岩石灰の順に比較する。', colors: pick('銀鼠', '茶鼠', '利休鼠', 'スレートグレイ') },
    ],
    cautions: ['同じ由来をもつ和名と外来名がある。別々に暗記せず対応関係を使う。'],
  },
]

const content = {
  label: CATEGORY_LABEL,
  items: [
    {
      title: 'JIS慣用色名の覚え方',
      page: 'P.128〜135',
      intro: [
        '慣用色名は、ある色の中心的な代表色を示す名称である。JISでは金・銀を除き、対応する系統色名と代表的なマンセル値が定められている。',
        '試験対策では、マンセル値の完全暗記よりも「色名 → 大まかな色の方向 → 由来」を一続きで引き出せる状態を目指す。',
      ],
      pairs: [
        ['JISで定められるもの', '系統色名と代表的なマンセル値'],
        ['優先して覚える', '色名・色の方向・由来'],
        ['見分ける順序', '色相の寄り → 明暗 → 鮮やかさ'],
        ['収録数', '和色名31色・外来色名32色'],
      ],
      colors: [],
      sets: [],
      cautions: [
        '慣用色名は幅をもつ色を表すため、色票の一点だけを絶対視しない。',
        '画面上の色は学習用近似色。教科書の印刷色や実物色票と完全には一致しない。',
      ],
      terms: ['系統色名と代表的なマンセル値', '色名・色の方向・由来', '色相の寄り → 明暗 → 鮮やかさ'],
    },
    ...groups.map((group) => ({
      ...group,
      intro: [group.intro],
      pairs: [
        ['覚える軸', '色名 → 色の方向 → 由来'],
        ['この画面の色数', `${group.colors.length}色`],
      ],
      sets: [],
      terms: group.colors.map((entry) => entry.hook),
    })),
    ...comparisons.map((entry) => ({
      ...entry,
      intro: [entry.intro],
      pairs: [
        ['比較の順序', '色相の寄り → 明暗 → 鮮やかさ'],
        ['名前が似るとき', '由来と系統色名を確認する'],
      ],
      colors: [],
      terms: entry.sets.flatMap((set) => set.colors.map((item) => item.name)),
    })),
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

function textColor(hex) {
  const normalized = hex.replace('#', '')
  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  return r * 0.299 + g * 0.587 + b * 0.114 > 155 ? '#161616' : '#ffffff'
}

function createMemoryPair([cue, answer]) {
  const row = createElement('p', 'study-memory-pair')
  row.append(
    createElement('span', 'study-memory-pair-cue', cue),
    createElement('span', 'study-memory-pair-arrow', '→'),
    createElement('span', 'study-term-highlight', answer),
  )
  return row
}

function createColorCard(entry, compact = false) {
  const card = createElement('article', `conventional-color-card${compact ? ' is-compact' : ''}`)
  const swatch = createElement('div', 'conventional-color-swatch')
  swatch.style.background = entry.hex
  swatch.style.color = textColor(entry.hex)
  const name = createElement('strong', '', entry.name)
  const reading = createElement('small', '', entry.reading)
  swatch.append(name, reading)

  const details = createElement('div', 'conventional-color-details')
  const system = createElement('p')
  system.append(createElement('span', '', '系統色名'), createElement('strong', '', entry.system))
  const munsell = createElement('p')
  munsell.append(createElement('span', '', 'マンセル'), createElement('strong', '', entry.munsell))
  const origin = createElement('p', 'conventional-color-origin', entry.origin)
  const hook = createElement('p', 'conventional-color-hook')
  hook.append(createElement('span', '', '記憶フック'), createElement('strong', 'study-term-highlight', entry.hook))
  details.append(system, munsell, origin, hook)
  card.append(swatch, details)
  return card
}

function createColorGrid(colors) {
  const section = createElement('section', 'conventional-color-visual')
  section.appendChild(createElement('h2', '', '色チップと由来'))
  const note = createElement('p', 'conventional-color-screen-note', '画面表示は学習用の近似色です。色名・系統色名・由来の対応を優先してください。')
  const grid = createElement('div', 'conventional-color-grid')
  colors.forEach((entry) => grid.appendChild(createColorCard(entry)))
  section.append(note, grid)
  return section
}

function createComparisonSets(sets) {
  const section = createElement('section', 'conventional-comparison-section')
  section.appendChild(createElement('h2', '', '混同しやすい色を並べて比較'))
  sets.forEach((set) => {
    const block = createElement('article', 'conventional-comparison-block')
    block.append(createElement('h3', '', set.label), createElement('p', '', set.note))
    const row = createElement('div', 'conventional-comparison-row')
    set.colors.forEach((entry) => row.appendChild(createColorCard(entry, true)))
    block.appendChild(row)
    section.appendChild(block)
  })
  return section
}

function ensureStyles() {
  if (document.getElementById('conventional-color-names-study-style')) return
  const style = document.createElement('style')
  style.id = 'conventional-color-names-study-style'
  style.textContent = `
    .conventional-color-visual,.conventional-comparison-section{margin:26px 0 12px}
    .conventional-color-visual>h2,.conventional-comparison-section>h2{margin:0 0 10px;font-size:1.05rem}
    .conventional-color-screen-note{margin:0 0 14px;color:#686868;font-size:.78rem;line-height:1.7}
    .conventional-color-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .conventional-color-card{overflow:hidden;border:1px solid #d7d7d7;background:#fff}
    .conventional-color-swatch{display:grid;align-content:end;min-height:150px;padding:14px}
    .conventional-color-swatch strong{font-size:1.16rem;line-height:1.35}
    .conventional-color-swatch small{margin-top:3px;font-size:.72rem;opacity:.84}
    .conventional-color-details{display:grid;gap:8px;padding:13px}
    .conventional-color-details p{margin:0;line-height:1.65}
    .conventional-color-details p:not(.conventional-color-origin){display:flex;align-items:baseline;justify-content:space-between;gap:12px}
    .conventional-color-details p>span:first-child{color:#777;font-size:.68rem;letter-spacing:.04em;white-space:nowrap}
    .conventional-color-details p>strong{font-size:.76rem;text-align:right}
    .conventional-color-origin{padding-top:8px;border-top:1px solid #ececec;color:#444;font-size:.8rem}
    .conventional-color-hook{padding-top:2px}
    .conventional-color-hook .study-term-highlight{font-size:.82rem}
    .conventional-comparison-block{margin:0 0 18px;padding:14px;border:1px solid #d8d8d8;background:#f8f7f3}
    .conventional-comparison-block h3{margin:0 0 5px;font-size:.94rem}
    .conventional-comparison-block>p{margin:0 0 12px;color:#555;font-size:.78rem;line-height:1.7}
    .conventional-comparison-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px}
    .conventional-color-card.is-compact .conventional-color-swatch{min-height:96px;padding:10px}
    .conventional-color-card.is-compact .conventional-color-swatch strong{font-size:.86rem}
    .conventional-color-card.is-compact .conventional-color-details{padding:9px}
    .conventional-color-card.is-compact .conventional-color-origin,.conventional-color-card.is-compact .conventional-color-hook{display:none}
    .conventional-color-card.is-compact .conventional-color-details p{display:grid;gap:2px}
    .conventional-color-card.is-compact .conventional-color-details p>strong{text-align:left;font-size:.7rem}
    @media(max-width:640px){
      .conventional-color-grid{grid-template-columns:1fr}
      .conventional-color-swatch{min-height:132px}
      .conventional-comparison-row{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media(max-width:390px){.conventional-comparison-row{grid-template-columns:1fr}}
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
  window.requestAnimationFrame(() => backdrop?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function renderReader() {
  const currentItem = content.items[readerIndex]

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
  meta.append(createElement('span', '', content.label), createElement('strong', '', `${readerIndex + 1} / ${content.items.length}`))
  const title = createElement('section', 'study-reader-title')
  title.append(createElement('small', '', currentItem.page), createElement('h1', '', currentItem.title))
  const intro = createElement('section', 'study-reader-intro')
  currentItem.intro.forEach((paragraph) => intro.appendChild(createElement('p', '', paragraph)))
  main.append(meta, title, intro)

  const memory = createElement('section', 'study-reader-section')
  memory.appendChild(createElement('h2', '', '覚える核'))
  currentItem.pairs.forEach((pair) => memory.appendChild(createMemoryPair(pair)))
  main.appendChild(memory)

  if (currentItem.colors.length) main.appendChild(createColorGrid(currentItem.colors))
  if (currentItem.sets.length) main.appendChild(createComparisonSets(currentItem.sets))

  const caution = createElement('section', 'study-reader-caution')
  caution.appendChild(createElement('strong', '', '要注意点'))
  currentItem.cautions.forEach((paragraph) => caution.appendChild(createElement('p', '', paragraph)))
  const terms = createElement('section', 'study-reader-terms')
  terms.appendChild(createElement('strong', '', '記憶フック'))
  const termList = createElement('div', 'study-reader-term-list')
  currentItem.terms.forEach((term) => termList.appendChild(createElement('span', '', term)))
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
}

function openReader() {
  ensureStyles()
  readerIndex = 0
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  renderReader()
}

function enhancePanel() {
  document.querySelectorAll('.category-panel').forEach((panel) => {
    const label = panel.querySelector('.category-title h2')?.textContent?.trim()
    if (label !== CATEGORY_LABEL || panel.dataset.colorReferenceActions === 'true') return

    const summary = panel.querySelector('.category-summary')
    const row = createElement('div', 'study-action-row')
    row.dataset.enhancerOwned = 'true'
    row.style.gridTemplateColumns = '1fr'
    const button = createElement('button', 'study-action-button is-content', '内容を見る')
    button.type = 'button'
    button.setAttribute('aria-label', `${CATEGORY_LABEL}の内容を見る`)
    button.addEventListener('click', openReader)
    row.appendChild(button)

    panel.classList.add('is-compact-category')
    panel.dataset.colorReferenceActions = 'true'
    if (summary) summary.insertAdjacentElement('afterend', row)
    else panel.appendChild(row)
  })
}

ensureStyles()
enhancePanel()
const root = document.getElementById('root')
if (root) new MutationObserver(enhancePanel).observe(root, { childList: true, subtree: true })
