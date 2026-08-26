const STORAGE_KEY = 'qualify-study-v1'
const BACKUP_FORMAT = 'qualify-backup-v2'
const AUXILIARY_STORAGE_PREFIXES = ['qualify:color2:']
const DAY_MS = 24 * 60 * 60 * 1000

export const mistakeReasons = [
  { id: 'knowledge', label: '知識不足' },
  { id: 'confusion', label: '用語混同' },
  { id: 'misread', label: '読み違い' },
  { id: 'detail-skip', label: '細部見落とし' },
  { id: 'early-stop', label: '早合点' },
  { id: 'overthink', label: '深読み' },
  { id: 'careless', label: 'ケアレス' },
]

export function createEmptyStudyData() {
  return {
    version: 1,
    records: {},
    completedSessions: 0,
    updatedAt: null,
  }
}

export function loadStudyData() {
  if (typeof window === 'undefined') return createEmptyStudyData()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createEmptyStudyData()

    const parsed = JSON.parse(raw)
    if (!parsed || parsed.version !== 1 || typeof parsed.records !== 'object') {
      return createEmptyStudyData()
    }

    return {
      ...createEmptyStudyData(),
      ...parsed,
      records: parsed.records ?? {},
    }
  } catch {
    return createEmptyStudyData()
  }
}

export function saveStudyData(data) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  )
}

function emptyRecord() {
  return {
    attempts: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    lastAnswer: null,
    lastResult: null,
    flagged: false,
    reasons: {},
    lastAnsweredAt: null,
  }
}

export function getRecord(data, questionId) {
  return data.records[questionId] ?? emptyRecord()
}

export function getReviewIntervalDays(record) {
  if (!record || record.attempts <= 0 || !record.lastAnsweredAt) return null
  if (record.flagged) return 0
  if (record.lastResult === 'wrong') return 1
  if (record.streak >= 3) return 14
  if (record.streak === 2) return 7
  return 3
}

export function getReviewDueAt(record) {
  const intervalDays = getReviewIntervalDays(record)
  if (intervalDays === null) return null

  const answeredAt = new Date(record.lastAnsweredAt)
  if (Number.isNaN(answeredAt.getTime())) return null

  return new Date(answeredAt.getTime() + intervalDays * DAY_MS)
}

export function isReviewDue(record, now = new Date()) {
  const dueAt = getReviewDueAt(record)
  if (!dueAt) return false
  return dueAt.getTime() <= now.getTime()
}

export function recordAnswer(data, questionId, selectedIndex, isCorrect) {
  const current = getRecord(data, questionId)
  const nextRecord = {
    ...current,
    attempts: current.attempts + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    wrong: current.wrong + (isCorrect ? 0 : 1),
    streak: isCorrect ? current.streak + 1 : 0,
    lastAnswer: selectedIndex,
    lastResult: isCorrect ? 'correct' : 'wrong',
    lastAnsweredAt: new Date().toISOString(),
  }

  return {
    ...data,
    records: {
      ...data.records,
      [questionId]: nextRecord,
    },
  }
}

export function toggleFlag(data, questionId) {
  const current = getRecord(data, questionId)

  return {
    ...data,
    records: {
      ...data.records,
      [questionId]: {
        ...current,
        flagged: !current.flagged,
      },
    },
  }
}

export function addMistakeReason(data, questionId, reasonId) {
  const current = getRecord(data, questionId)

  return {
    ...data,
    records: {
      ...data.records,
      [questionId]: {
        ...current,
        reasons: {
          ...current.reasons,
          [reasonId]: (current.reasons?.[reasonId] ?? 0) + 1,
        },
      },
    },
  }
}

export function completeSession(data) {
  return {
    ...data,
    completedSessions: (data.completedSessions ?? 0) + 1,
  }
}

export function clearStudyData() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return createEmptyStudyData()
}

function isAuxiliaryStorageKey(key) {
  return AUXILIARY_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix))
}

function collectAuxiliaryStorage() {
  if (typeof window === 'undefined') return {}

  const snapshot = {}
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key || !isAuxiliaryStorageKey(key)) continue
    const value = window.localStorage.getItem(key)
    if (value !== null) snapshot[key] = value
  }
  return snapshot
}

function restoreAuxiliaryStorage(snapshot) {
  if (
    typeof window === 'undefined' ||
    !snapshot ||
    typeof snapshot !== 'object' ||
    Array.isArray(snapshot)
  ) {
    return false
  }

  const currentKeys = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (key && isAuxiliaryStorageKey(key)) currentKeys.push(key)
  }
  currentKeys.forEach((key) => window.localStorage.removeItem(key))

  let restored = false
  Object.entries(snapshot).forEach(([key, value]) => {
    if (!isAuxiliaryStorageKey(key) || typeof value !== 'string') return
    window.localStorage.setItem(key, value)
    restored = true
  })
  return restored
}

function normalizeStudyData(value) {
  if (!value || value.version !== 1 || typeof value.records !== 'object') {
    throw new Error('対応していないバックアップ形式です。')
  }

  return {
    ...createEmptyStudyData(),
    ...value,
    records: value.records ?? {},
  }
}

export function exportStudyData(data) {
  const payload = {
    format: BACKUP_FORMAT,
    exportedAt: new Date().toISOString(),
    studyData: data,
    auxiliaryStorage: collectAuxiliaryStorage(),
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `qualify-backup-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

export async function importStudyData(file) {
  const text = await file.text()
  const parsed = JSON.parse(text)

  if (parsed?.format === BACKUP_FORMAT) {
    const studyData = normalizeStudyData(parsed.studyData)
    const restoredAuxiliary = restoreAuxiliaryStorage(parsed.auxiliaryStorage)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...studyData,
          updatedAt: new Date().toISOString(),
        }),
      )

      if (restoredAuxiliary) {
        window.setTimeout(() => window.location.reload(), 450)
      }
    }

    return studyData
  }

  return normalizeStudyData(parsed)
}
