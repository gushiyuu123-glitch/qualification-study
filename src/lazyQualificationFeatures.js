const COLOR2_ID = 'color-2'

let color2LoadPromise = null

function loadColor2Features() {
  if (color2LoadPromise) return color2LoadPromise

  color2LoadPromise = (async () => {
    await import('./conventionalColorNamesStudy.js')
    await import('./conventionalColorNamesQuiz.js')
    await import('./color2PeopleMemory.js')
    await import('./color2Summer2026Practice.js')
    await import('./color2Summer2025Practice.js')
    await import('./color2Summer2025ChoiceVisuals.js')
    await import('./color2Winter2025Practice.js')
    await import('./color2TextbookPractice.js')
    await import('./color2PracticeTargetGuide.js')
  })().catch((error) => {
    color2LoadPromise = null
    console.error('色彩検定2級の追加機能を読み込めませんでした。', error)
  })

  return color2LoadPromise
}

function scanQualification() {
  const qualificationId = document.querySelector('.app-shell')?.dataset?.qualification
  if (qualificationId === COLOR2_ID) loadColor2Features()
}

const root = document.getElementById('root')
if (root) {
  scanQualification()

  const observer = new MutationObserver(scanQualification)
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-qualification'],
    childList: true,
    subtree: true,
  })
}
