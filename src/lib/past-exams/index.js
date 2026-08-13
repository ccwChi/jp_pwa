// Raw JLPT past-exam transcriptions, one file per exam paper. Every file in
// ./data is a plain JSON module, auto-loaded the same way every other
// content area in this repo works (see src/lib/practice/bank/index.js,
// src/lib/reading/articles/index.js, ...): drop a new file into ./data and
// it shows up here with nothing else to register.
//
// This module only reads the *structural* shape of an exam paper (section/
// problem order + instruction text) — the actual question content used at
// practice time (prompt/options/answerIndex/notes/POS tags/...) lives on
// the corresponding practice-bank item (src/lib/practice/bank/data/*.js,
// matched by examMeta.examId + examMeta.questionNumber === this JSON
// item's `id`). The JSON stays the permanent source of truth for exam
// provenance and ordering; the bank item is what actually gets rendered.
//
// Source JSON shape:
//   {
//     examId: string,      // "jlpt-{level}-{year}" for an old-style exam
//       // given once a year (pre-2010), or "jlpt-{level}-{year}-{session}"
//       // when a `session` is set (see below) — e.g. "jlpt-n4-2010-07".
//     year: number,
//     session?: string,    // two-digit sitting month, e.g. "07" or "12" —
//       // only needed for years with more than one sitting (new-format
//       // JLPT since 2010). Omit entirely for a single-sitting year.
//     level: 'N5'|'N4'|'N3'|'N2'|'N1',
//     sourceNote?: string,
//     sourcePdf?: string,
//     sections: Array<{
//       sectionId: string,   // e.g. 'vocabulary' | 'listening' | 'readingGrammar'
//       title: string,       // e.g. '文字・語彙'
//       points?: number,
//       minutes?: number,
//       problems: Array<{
//         problemId: string,   // e.g. 'I', 'II', ...
//         instruction: string, // shown as the practice page's section header
//         type: string,        // matches practice/bank's TYPES enum
//         items: Array<{ id: string, ... }>,  // id matches a bank item's
//           // examMeta.questionNumber once migrated; other fields here are
//           // authoring-time raw transcription, not read by this module
//       }>,
//     }>,
//   }
// Unlike the `./data/*.js` glob convention used elsewhere in this repo
// (practice/bank, grammar/lessons, ...), the `import: 'default'` shorthand
// doesn't resolve for `.json` matches here, so this reads the plain eager
// module and unwraps `.default` itself.
const modules = import.meta.glob('./data/*.json', { eager: true });
const exams = Object.keys(modules)
  .sort()
  .map(path => modules[path].default ?? modules[path]);

const examsById = new Map(exams.map(exam => [exam.examId, exam]));

function questionCountFor(exam) {
  return exam.sections.reduce(
    (sectionSum, section) => sectionSum + section.problems.reduce((problemSum, problem) => problemSum + problem.items.length, 0),
    0
  );
}

// One row per exam paper, sorted by level then most recent first — for the
// 考古題練習 picker page to list "which level/year(/session) has an exam."
export function getPastExamsList() {
  return exams
    .map(exam => ({
      examId: exam.examId,
      level: exam.level,
      year: exam.year,
      session: exam.session ?? null,
      sourceNote: exam.sourceNote,
      questionCount: questionCountFor(exam),
    }))
    .sort((a, b) => a.level.localeCompare(b.level) || b.year - a.year || (b.session || '').localeCompare(a.session || ''));
}

export function getPastExam(examId) {
  return examsById.get(examId) || null;
}

// Flattens one exam's sections/problems/items into original paper order,
// keeping the section/problem grouping so a practice page can render
// section headers + each problem's instruction text above its questions.
// Returns null if examId doesn't match any loaded exam.
export function getPastExamStructure(examId) {
  const exam = examsById.get(examId);
  if (!exam) return null;

  const items = [];
  for (const section of exam.sections) {
    for (const problem of section.problems) {
      for (const item of problem.items) {
        items.push({
          id: item.id,
          sectionId: section.sectionId,
          sectionTitle: section.title,
          problemId: problem.problemId,
          instruction: problem.instruction,
          type: problem.type,
        });
      }
    }
  }
  return items;
}
