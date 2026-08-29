import {
  ensureColor2QuestionIdentity,
  getColor2QuestionIdentity,
} from './color2QuestionIdentity.js'
import { getColor2PracticeSafety } from './color2PracticeSafety.js'

const NOTICE_TEXT = '精度優先：原本再確認が済んでいない図・写真・色票の設問は、自動で出題対象から外します。'

const PRACTICE_CONFIGS = Object.freeze([
  Object.freeze({
    mode: '2026-summer',
    dialog: '.color2-summer-quiz[aria-label="2026年度夏期 色彩検定2級 4択練習"]',
    host: '[data-summer-question]',
  }),
  Object.freeze({
    mode: '2025-summer',
    dialog: '.color2-summer-quiz[aria-label="2025年度夏期 色彩検定2級 4択練習"]',
    host: '[data-summer2025-question]',
  }),
  Object.freeze({
    mode: '2025-winter',
    dialog: '.color2-summer-quiz[aria-label="2025年度冬期 色彩検定2級 4択練習"]',
    host: '[data-w25-question]',
  }),
  Object.freeze({
    mode: 'all-random',
    dialog: '.color2-summer-quiz[aria-label="色彩検定2級 全過去問 無限ランダム練習"]',
    host: '[data-all-random-question]',
  }),
  Object.freeze({
    mode: 'adaptive',
    dialog: '.color2-summer-quiz[aria-label="色彩検定2級 苦手優先ランダム練習"]',
    host: '[data-adaptive-question]',
  }),
])

const blockedIdentityByHost = new WeakMap()
let scanQueued = false

function injectNotice(dialog) {
  if (dialog.querySelector('[data-color2-practice-safety-notice]')) return
  const setup = dialog.querySelector('.color2-summer-quiz__setup')
  if (!setup) return

  const notice = document.createElement('p')
  notice.dataset.color2PracticeSafetyNotice = 'true'
  notice.className = 'color2-practice-safety-notice'
  notice.textContent = NOTICE_TEXT
  setup.appendChild(notice)
}

function restoreHost(host) {
  host.style.removeProperty('visibility')
  host.removeAttribute('aria-busy')
  delete host.dataset.color2PracticeSafetyBlocked
  blockedIdentityByHost.delete(host)
}

function dispatchSafetySkip(host, config, identityKey, safety) {
  queueMicrotask(() => {
    if (!host.isConnected || host.hidden) return

    ensureColor2QuestionIdentity(host)
    const current = getColor2QuestionIdentity(host)?.entry
    if (!current || current.key !== identityKey) return

    window.dispatchEvent(new CustomEvent('qualify:color2-skip', {
      detail: {
        mode: config.mode,
        source: 'practice-safety-gate',
        reason: safety.reason,
        randomKey: identityKey,
      },
    }))
  })
}

function guardPractice(config) {
  const dialog = document.querySelector(config.dialog)
  if (!dialog) return
  injectNotice(dialog)

  const host = dialog.querySelector(config.host)
  if (!host || host.hidden) return

  ensureColor2QuestionIdentity(host)
  const identity = getColor2QuestionIdentity(host)?.entry
  if (!identity) return

  const safety = getColor2PracticeSafety(identity.question)
  if (safety.eligible) {
    restoreHost(host)
    return
  }

  host.style.visibility = 'hidden'
  host.setAttribute('aria-busy', 'true')
  host.dataset.color2PracticeSafetyBlocked = safety.reason

  if (blockedIdentityByHost.get(host) === identity.key) return
  blockedIdentityByHost.set(host, identity.key)
  dispatchSafetySkip(host, config, identity.key, safety)
}

function scan() {
  ensureColor2QuestionIdentity(document)
  PRACTICE_CONFIGS.forEach(guardPractice)
}

function queueScan() {
  if (scanQueued) return
  scanQueued = true
  queueMicrotask(() => {
    scanQueued = false
    scan()
  })
}

scan()
const observer = new MutationObserver(queueScan)
observer.observe(document.documentElement, {
  childList: true,
  characterData: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['hidden', 'src'],
})

for (const eventName of [
  'qualify:color2-summer-2026-ready',
  'qualify:color2-summer-2025-ready',
  'qualify:color2-winter-2025-ready',
  'qualify:color2-all-random-ready',
  'qualify:color2-adaptive-random-ready',
  'qualify:color2-question-identity',
]) {
  window.addEventListener(eventName, queueScan)
}
