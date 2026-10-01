// Explicit, contiguous ranges make omissions detectable when adding a book.
export function buildStory({ chapters, lessons, ...metadata }) {
  const cursors = chapters.map(() => 0);
  let previousChapter = 0;
  const ids = new Set();
  const stages = lessons.map((lesson, index) => {
    const chapter = chapters[lesson.chapter];
    const start = cursors[lesson.chapter];
    if (!chapter || !Number.isInteger(lesson.end) || lesson.chapter < previousChapter || lesson.end <= start || lesson.end > chapter.sentences.length || !lesson.id || ids.has(lesson.id)) {
      throw new Error(`Invalid story range: ${metadata.id}/${index}`);
    }
    cursors[lesson.chapter] = lesson.end;
    previousChapter = lesson.chapter;
    ids.add(lesson.id);
    return {
      ...lesson,
      id: lesson.id,
      chapterLabel: `原作第 ${lesson.chapter + 1} 章`,
      lines: chapter.sentences.slice(start, lesson.end),
      sourceRange: { chapter: lesson.chapter, start, end: lesson.end },
      grammarIds: lesson.grammarIds || [],
      minutes: lesson.minutes || '5–10',
      reward: lesson.reward || `你已讀懂「${lesson.title}」，也完成了這一段的語言練習。`,
    };
  });
  if (chapters.some((chapter, i) => cursors[i] !== chapter.sentences.length)) {
    throw new Error(`Incomplete story: ${metadata.id}`);
  }
  return { ...metadata, kind: '公版小說', sequential: true, stages };
}

export function question(prompt, options, answerIndex, explanation) {
  return { prompt, options, answerIndex, explanation };
}

export function journeyStatus(journey, stored = {}) {
  const completed = journey.stages.filter(s => stored.completed?.includes(s.id)).length;
  const nextIndex = journey.stages.findIndex(s => !stored.completed?.includes(s.id));
  return { completed, nextIndex, finished: nextIndex === -1 };
}
