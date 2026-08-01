const COLOR2_ID = 'color-2'
const VISUAL_VERSION = 1

const explicitVisualPattern =
  /(図(?:\d+|[A-ZＡ-Ｚア-ン])?|写真(?:[A-ZＡ-Ｚ])?|下に示した|次に示す|右に示した|左に示した|ポスター|標識デザイン|ファッションコーディネート|インテリアスタイルとして)/

const visualQuestionTypes = new Set([
  'visual-color',
  'visual-diagram',
  'written-converted',
])

const defaultPalettes = {
  spectrum: ['#aa4775', '#466b9d', '#68a15d'],
  wheel: ['#c84c4f', '#d88a3a', '#d8c13c', '#78a64a', '#3d8a70', '#40819a', '#4e67a0', '#745c99', '#9f557c'],
  illusion: ['#202221', '#f2f0e8', '#b23f6f', '#3d7f67'],
  fashion: ['#282a2d', '#d6d2c8', '#a74473', '#71836c'],
  interior: ['#ded7c9', '#7b6049', '#a94973', '#6c7d6d'],
  landscape: ['#a9c4d2', '#d7c9b0', '#7f8d68', '#735d4a'],
  sign: ['#b61f35', '#f6f2e8', '#202221'],
  poster: ['#b8c849', '#175f4d', '#f4e8a5', '#2d2f2e'],
  swatch: ['#b64f78', '#d5a65f', '#4a7c78', '#6a5c8a'],
  scheme: ['#8b3e67', '#d8b64b', '#4d7c73', '#66749c'],
  diagram: ['#303233', '#f1eee7', '#a94471', '#6f816d'],
}

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function choiceText(choice) {
  return normalize(typeof choice === 'string' ? choice : choice?.text)
}

function escapeXml(value) {
  return normalize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function flattenChoiceColors(question) {
  return (question.choices ?? []).flatMap((choice) =>
    typeof choice === 'object' && Array.isArray(choice.colors)
      ? choice.colors
      : [],
  )
}

export function color2QuestionHasChoiceVisual(question) {
  return flattenChoiceColors(question).length > 0
}

export function color2QuestionExplicitlyReferencesVisual(question) {
  return explicitVisualPattern.test(normalize(question.prompt))
}

export function color2QuestionNeedsVisual(question) {
  if (question?.qualificationId !== COLOR2_ID) return false
  if (color2QuestionExplicitlyReferencesVisual(question)) return true

  if (visualQuestionTypes.has(question.questionType)) {
    return !color2QuestionHasChoiceVisual(question)
  }

  return false
}

function inferVisualKind(question) {
  const text = [
    question.prompt,
    question.explanation,
    choiceText(question.choices?.[question.correctIndex]),
    ...(question.tags ?? []),
  ]
    .join(' ')
    .toLowerCase()

  if (/5色|ベーシックカラー/.test(text)) return 'scheme'
  if (/写真|ファッション|コーディネート|衣服|服装/.test(text)) return 'fashion'
  if (/部屋|インテリア|家具|ソファ|カーテン|床|天井/.test(text)) return 'interior'
  if (/景観|外壁|建築|住宅|街並み/.test(text)) return 'landscape'
  if (/標識|ピクトグラム|サイン/.test(text)) return 'sign'
  if (/分光|波長|反射率|視感効率|曲線|グラフ|光源/.test(text)) return 'spectrum'
  if (/縞|格子|残像|錯視|マッカロー|エーレンシュタイン|ネオンカラー|マッハバンド/.test(text)) return 'illusion'
  if (/色相環|等分|ダイアード|トライアド|テトラード|ヘクサード|スプリット/.test(text)) return 'wheel'
  if (/ポスター/.test(text)) return 'poster'
  if (/色票|慣用色名|マンセル値/.test(text)) return 'swatch'
  if (/図.*(?:色|配色)|5色|ベーシックカラー|配色|トーン|カマイユ|トーナル|ビコロール|トリコロール|ハーモニー|ドミナント/.test(text)) return 'scheme'
  return 'diagram'
}

const namedColors = [
  [/オフホワイト|白/, '#f3f0e8'],
  [/黒|ブラック/, '#202221'],
  [/グレイ|灰/, '#858782'],
  [/ベージュ/, '#c9b58e'],
  [/ブラウン|褐色|茶/, '#7c5d45'],
  [/ピンク/, '#d28fa8'],
  [/赤紫/, '#984f72'],
  [/青紫/, '#5e6190'],
  [/黄緑/, '#8aa84a'],
  [/青緑|シアン/, '#3b827e'],
  [/紫/, '#765882'],
  [/青/, '#426d9a'],
  [/緑/, '#447b5f'],
  [/黄/, '#d8bd3d'],
  [/橙|オレンジ/, '#d27a3e'],
  [/赤/, '#b94d50'],
]

function derivePalette(question, kind) {
  const colors = flattenChoiceColors(question)
  const context = [
    choiceText(question.choices?.[question.correctIndex]),
    question.prompt,
    question.explanation,
  ].join(' ')

  for (const [pattern, color] of namedColors) {
    if (pattern.test(context) && !colors.includes(color)) colors.push(color)
  }

  for (const color of defaultPalettes[kind] ?? defaultPalettes.diagram) {
    if (!colors.includes(color)) colors.push(color)
  }

  return colors.slice(0, 6)
}

function svgData(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function svgShell(body, title, subtitle = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 380" role="img" aria-label="${escapeXml(title)}">
  <rect width="720" height="380" rx="22" fill="#f5f3ee"/>
  <rect x="18" y="18" width="684" height="344" rx="16" fill="#fff" stroke="#d7d3ca"/>
  <text x="42" y="52" fill="#8c3c69" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-size="14" font-weight="800" letter-spacing="2">LEARNING VISUAL</text>
  <text x="42" y="78" fill="#75736e" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" font-size="12">${escapeXml(subtitle || '問題内容を学習用に再構成した補助図')}</text>
  ${body}
</svg>`
}

function schemeSvg(colors) {
  const widths = [128, 92, 116, 82, 104]
  let x = 76
  const blocks = colors.slice(0, 5).map((color, index) => {
    const width = widths[index]
    const block = `<rect x="${x}" y="140" width="${width}" height="118" rx="7" fill="${color}"/><text x="${x + width / 2}" y="286" text-anchor="middle" fill="#77736d" font-family="sans-serif" font-size="12">${index + 1}</text>`
    x += width + 12
    return block
  }).join('')
  return `${blocks}<line x1="76" y1="312" x2="644" y2="312" stroke="#d7d3ca"/><text x="360" y="336" text-anchor="middle" fill="#73716c" font-family="sans-serif" font-size="13">色相・明度・彩度の関係を比較</text>`
}

function wheelSvg(colors, context) {
  const count = /ヘクサード/.test(context) ? 6 : /テトラード/.test(context) ? 4 : /トライアド|トリコロール/.test(context) ? 3 : 2
  const cx = 360
  const cy = 218
  const radius = 104
  const nodes = colors.slice(0, count).map((color, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#c6c1b7" stroke-width="2"/><circle cx="${x}" cy="${y}" r="28" fill="${color}" stroke="#fff" stroke-width="5"/>`
  }).join('')
  const rings = colors.slice(0, 9).map((color, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / 9
    const x = cx + Math.cos(angle) * 142
    const y = cy + Math.sin(angle) * 142
    return `<circle cx="${x}" cy="${y}" r="11" fill="${color}"/>`
  }).join('')
  return `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#d9d5cc" stroke-width="2"/>${rings}${nodes}<circle cx="${cx}" cy="${cy}" r="9" fill="#333"/>`
}

function spectrumSvg(colors, context) {
  const longWave = /長波長|赤|橙/.test(context)
  const shortWave = /短波長|青|紫/.test(context)
  const flat = /均等|全波長|昼光/.test(context)
  const path = flat
    ? 'M108 270 C190 210 270 206 350 205 C450 205 540 194 620 170'
    : longWave
      ? 'M108 286 C280 286 390 280 470 238 C535 204 565 130 620 104'
      : shortWave
        ? 'M108 270 C155 112 205 100 250 210 C315 284 500 286 620 286'
        : 'M108 278 C165 112 220 108 260 250 C315 300 370 132 430 178 C500 232 545 120 620 214'
  return `<line x1="108" y1="294" x2="632" y2="294" stroke="#383a39" stroke-width="2"/><line x1="108" y1="294" x2="108" y2="104" stroke="#383a39" stroke-width="2"/><path d="${path}" fill="none" stroke="${colors[0]}" stroke-width="7" stroke-linecap="round"/><text x="108" y="320" fill="#777" font-family="sans-serif" font-size="12">400</text><text x="270" y="320" fill="#777" font-family="sans-serif" font-size="12">500</text><text x="440" y="320" fill="#777" font-family="sans-serif" font-size="12">600</text><text x="610" y="320" fill="#777" font-family="sans-serif" font-size="12">700nm</text><text x="62" y="202" transform="rotate(-90 62 202)" fill="#777" font-family="sans-serif" font-size="12">相対量</text>`
}

function illusionSvg(colors) {
  const vertical = Array.from({ length: 11 }, (_, index) => `<rect x="${70 + index * 24}" y="128" width="12" height="144" fill="${index % 2 ? colors[0] : colors[1]}"/>`).join('')
  const horizontal = Array.from({ length: 9 }, (_, index) => `<rect x="404" y="${128 + index * 18}" width="236" height="9" fill="${index % 2 ? colors[2] : colors[0]}"/>`).join('')
  return `${vertical}${horizontal}<circle cx="360" cy="200" r="22" fill="#fff" stroke="#d3cfc6"/><text x="360" y="205" text-anchor="middle" fill="#777" font-family="sans-serif" font-size="12">注視</text>`
}

function fashionSvg(colors) {
  return `<circle cx="360" cy="126" r="34" fill="#c8a58d"/><path d="M315 166 Q360 142 405 166 L432 286 Q360 324 288 286 Z" fill="${colors[0]}"/><path d="M315 170 L260 264" stroke="${colors[1]}" stroke-width="28" stroke-linecap="round"/><path d="M405 170 L460 264" stroke="${colors[2]}" stroke-width="28" stroke-linecap="round"/><path d="M322 286 L304 344" stroke="${colors[3]}" stroke-width="32" stroke-linecap="round"/><path d="M398 286 L416 344" stroke="${colors[3]}" stroke-width="32" stroke-linecap="round"/><circle cx="544" cy="164" r="32" fill="${colors[1]}"/><circle cx="544" cy="236" r="32" fill="${colors[2]}"/><circle cx="544" cy="308" r="32" fill="${colors[3]}"/><text x="118" y="205" fill="#76736e" font-family="sans-serif" font-size="14">全体の色相数・トーン・面積比を見る</text>`
}

function interiorSvg(colors) {
  return `<path d="M86 118 L360 90 L634 118 L634 310 L86 310 Z" fill="${colors[0]}"/><path d="M86 310 L220 236 L500 236 L634 310 Z" fill="${colors[1]}" opacity=".72"/><rect x="256" y="208" width="208" height="72" rx="10" fill="${colors[2]}"/><rect x="280" y="184" width="72" height="52" rx="9" fill="${colors[3]}"/><rect x="366" y="184" width="72" height="52" rx="9" fill="${colors[3]}"/><rect x="122" y="150" width="84" height="112" fill="#f6f2e9" stroke="#cbc6bb"/><rect x="520" y="142" width="72" height="92" fill="${colors[3]}" opacity=".8"/><text x="360" y="342" text-anchor="middle" fill="#74716b" font-family="sans-serif" font-size="13">壁・床・家具・アクセントの面積関係</text>`
}

function landscapeSvg(colors) {
  return `<rect x="74" y="112" width="572" height="198" fill="${colors[0]}"/><circle cx="560" cy="150" r="34" fill="#f0d66a"/><path d="M74 244 Q174 190 272 246 T470 240 T646 242 L646 310 L74 310 Z" fill="${colors[2]}"/><rect x="214" y="168" width="292" height="142" fill="${colors[1]}"/><rect x="242" y="198" width="54" height="56" fill="#e7eceb"/><rect x="318" y="198" width="54" height="56" fill="#e7eceb"/><rect x="394" y="198" width="54" height="56" fill="#e7eceb"/><rect x="464" y="230" width="28" height="80" fill="${colors[3]}"/><text x="360" y="342" text-anchor="middle" fill="#74716b" font-family="sans-serif" font-size="13">周辺環境・面積効果・素材を同時に確認</text>`
}

function signSvg(colors) {
  return `<rect x="250" y="112" width="220" height="220" rx="24" fill="${colors[0]}"/><circle cx="360" cy="184" r="34" fill="none" stroke="${colors[1]}" stroke-width="18"/><path d="M360 218 L360 292 M314 248 L406 248" stroke="${colors[1]}" stroke-width="18" stroke-linecap="round"/><text x="360" y="318" text-anchor="middle" fill="${colors[1]}" font-family="sans-serif" font-size="18" font-weight="800">SIGN</text>`
}

function posterSvg(colors) {
  return `<rect x="226" y="102" width="268" height="238" fill="${colors[0]}"/><circle cx="312" cy="168" r="54" fill="${colors[1]}"/><path d="M362 122 C430 120 458 178 430 218 C401 259 342 256 324 218 C306 181 326 137 362 122 Z" fill="${colors[2]}"/><rect x="260" y="264" width="200" height="20" fill="${colors[3]}"/><rect x="286" y="296" width="148" height="12" fill="${colors[3]}" opacity=".75"/>`
}

function swatchSvg(colors) {
  return `<rect x="214" y="120" width="292" height="184" rx="12" fill="${colors[0]}"/><rect x="214" y="120" width="292" height="184" rx="12" fill="none" stroke="#fff" stroke-width="9"/><text x="360" y="336" text-anchor="middle" fill="#74716b" font-family="sans-serif" font-size="13">画面色は学習用近似色</text>`
}

function diagramSvg(colors) {
  return `<rect x="104" y="128" width="140" height="140" rx="70" fill="${colors[0]}"/><rect x="290" y="128" width="140" height="140" rx="18" fill="${colors[1]}"/><path d="M546 118 L632 278 L460 278 Z" fill="${colors[2]}"/><path d="M244 198 L290 198 M430 198 L460 198" stroke="#77736e" stroke-width="4" stroke-dasharray="8 8"/>`
}

function buildBody(kind, colors, context) {
  if (kind === 'scheme') return schemeSvg(colors)
  if (kind === 'wheel') return wheelSvg(colors, context)
  if (kind === 'spectrum') return spectrumSvg(colors, context)
  if (kind === 'illusion') return illusionSvg(colors)
  if (kind === 'fashion') return fashionSvg(colors)
  if (kind === 'interior') return interiorSvg(colors)
  if (kind === 'landscape') return landscapeSvg(colors)
  if (kind === 'sign') return signSvg(colors)
  if (kind === 'poster') return posterSvg(colors)
  if (kind === 'swatch') return swatchSvg(colors)
  return diagramSvg(colors)
}

export function buildColor2FallbackImage(question) {
  if (question?.qualificationId !== COLOR2_ID) return null

  const kind = inferVisualKind(question)
  const colors = derivePalette(question, kind)
  const context = [question.prompt, question.explanation, choiceText(question.choices?.[question.correctIndex])].join(' ')
  const title = `${question.number ?? '色彩検定2級'} 学習用補助図`
  const svg = svgShell(buildBody(kind, colors, context), title)

  return {
    src: svgData(svg),
    alt: `${normalize(question.prompt)}を理解するための学習用補助図`,
    generated: true,
    visualKind: kind,
    visualVersion: VISUAL_VERSION,
    caption: '原本の転載ではなく、問題内容を理解するために再構成した学習用補助図です。',
  }
}

export function resolveColor2QuestionImage(question) {
  if (question?.image?.src) {
    return {
      ...question.image,
      fallbackSrc: buildColor2FallbackImage(question)?.src ?? null,
      generated: Boolean(question.image.generated),
    }
  }

  if (!color2QuestionNeedsVisual(question)) return null
  return buildColor2FallbackImage(question)
}

export function attachColor2QuestionVisuals(questionList) {
  const stats = {
    total: 0,
    existing: 0,
    generated: 0,
    choiceSwatches: 0,
    untouched: 0,
  }

  for (const question of questionList) {
    if (question?.qualificationId !== COLOR2_ID) continue
    stats.total += 1

    const explicit = color2QuestionExplicitlyReferencesVisual(question)
    const choiceVisual = color2QuestionHasChoiceVisual(question)
    const resolved = resolveColor2QuestionImage(question)

    if (resolved) {
      question.image = resolved
      question.visualCoverage = resolved.generated ? 'generated-fallback' : 'source-visual'
      if (resolved.generated) stats.generated += 1
      else stats.existing += 1
      continue
    }

    if (choiceVisual && !explicit) {
      question.visualCoverage = 'choice-swatches'
      stats.choiceSwatches += 1
      continue
    }

    question.visualCoverage = 'not-required'
    stats.untouched += 1
  }

  return stats
}
