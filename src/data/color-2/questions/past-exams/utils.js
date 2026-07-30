export function defineExamGroup({
  number,
  questionPage,
  answerPage,
  defaultPoints,
  caution,
  items,
}) {
  return items.map((item, index) => ({
    originalQuestionNumber: number,
    originalQuestionPart: item.part,
    originalQuestionOrder: index + 1,
    questionPage,
    answerPage,
    points: item.points ?? defaultPoints,
    type: 'choice',
    questionType: item.questionType ?? 'choice',
    prompt: item.prompt,
    choices: item.choices,
    correctIndex: item.correctIndex,
    explanation: item.explanation,
    caution: item.caution ?? caution,
    ...(item.image ? { image: item.image } : {}),
  }))
}

export const defineSummerGroup = defineExamGroup
export const defineWinterGroup = defineExamGroup
export const definePracticeGroup = defineExamGroup
