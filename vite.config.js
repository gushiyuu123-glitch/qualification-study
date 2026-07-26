import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const textbookReaderFiles = new Map([
  ['colorReferenceStudyV2.js', 'color-universal-design'],
  ['colorVisionTheoryStudy.js', 'color-vision-theory'],
  ['lightPropertiesColorStudy.js', 'light-properties-color'],
  ['visualSystemColorStudy.js', 'visual-system-color'],
  ['visualSystemColorContinuationStudy.js', 'visual-system-color-continuation'],
  ['lightingStudy.js', 'lighting'],
  ['munsellColorSystemStudy.js', 'munsell-color-system'],
  ['colorPsychologyStudy.js', 'color-psychology'],
  ['colorHarmonyStudy.js', 'color-harmony'],
  ['colorImageStudy.js', 'color-image'],
  ['visualDesignStudy.js', 'visual-design'],
  ['fashionStudy.js', 'fashion'],
  ['interiorStudy.js', 'interior'],
])

function exposeTextbookReaders() {
  return {
    name: 'qualify-expose-textbook-readers',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.split('?')[0].replaceAll('\\', '/')
      const entry = [...textbookReaderFiles.entries()].find(([filename]) =>
        normalizedId.endsWith(`/src/${filename}`),
      )

      if (!entry) return null

      const [filename, readerKey] = entry
      const signature = 'function openReader() {'

      if (!code.includes(signature)) {
        this.error(`${filename}: openReader() が見つかりません。教材リーダーの構造を確認してください。`)
      }

      let transformed = code.replace(
        signature,
        'function openReader(startIndex = 0) {',
      )

      const readerStartPattern =
        /function openReader\(startIndex = 0\) \{([\s\S]*?)readerIndex = 0/

      if (!readerStartPattern.test(transformed)) {
        this.error(`${filename}: readerIndex の初期化位置を特定できません。`)
      }

      transformed = transformed.replace(
        readerStartPattern,
        (_, beforeIndex) =>
          `function openReader(startIndex = 0) {${beforeIndex}readerIndex = Math.max(0, Math.min(Math.trunc(Number(startIndex) || 0), content.items.length - 1))`,
      )

      transformed += `\n{\n  const __qualifyRegistry = (window.__QUALIFY_TEXTBOOK_READERS__ ??= {})\n  __qualifyRegistry[${JSON.stringify(readerKey)}] = Object.freeze({\n    count: content.items.length,\n    open(startIndex = 0) {\n      openReader(startIndex)\n    },\n  })\n  window.dispatchEvent(\n    new CustomEvent('qualify:textbook-readers-ready', {\n      detail: { readerKey: ${JSON.stringify(readerKey)} },\n    }),\n  )\n}\n`

      return { code: transformed, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [exposeTextbookReaders(), react()],
})
