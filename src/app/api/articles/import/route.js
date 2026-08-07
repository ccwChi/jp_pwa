import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'lib', 'reading', 'articles', 'data');
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function buildFileSource({ seriesId, seriesTitle, level, excerpt, chapters }) {
  const entries = chapters.map((chapter, i) => {
    const partIndex = i + 1;
    return `  {
    id: '${seriesId}-${partIndex}',
    seriesId: '${seriesId}',
    seriesTitle: ${JSON.stringify(seriesTitle)},
    partIndex: ${partIndex},
    partTitle: ${JSON.stringify(chapter.partTitle)},
    level: '${level}',
    excerpt: ${JSON.stringify(i === 0 ? excerpt : '')},
    sentences: ${JSON.stringify(chapter.sentences, null, 2).replace(/\n/g, '\n    ')},
    vocab: [],
    grammar: [],
    quiz: [],
  }`;
  });

  return `// 由 /reading/import 匯入工具產生。之後想調整章節切法，重新跑一次匯入工具、\n// 用同一個網址代號覆蓋即可；若已手動補上 vocab/grammar/quiz，重新匯入會蓋掉，\n// 請先自行備份那部分內容。\nconst articles = [\n${entries.join(',\n')},\n];\n\nexport default articles;\n`;
}

export async function POST(request) {
  const body = await request.json();
  const { seriesId, seriesTitle, level, excerpt, chapters } = body || {};

  if (!seriesId || !ID_PATTERN.test(seriesId)) {
    return NextResponse.json({ error: '網址代號格式不正確（只能用小寫英文、數字、連字號）' }, { status: 400 });
  }
  if (!seriesTitle || !Array.isArray(chapters) || chapters.length === 0) {
    return NextResponse.json({ error: '缺少作品標題或章節內容' }, { status: 400 });
  }
  for (const c of chapters) {
    if (!Array.isArray(c.sentences) || c.sentences.length === 0) {
      return NextResponse.json({ error: '有章節沒有任何句子' }, { status: 400 });
    }
  }

  try {
    const source = buildFileSource({ seriesId, seriesTitle, level, excerpt, chapters });
    await fs.writeFile(path.join(ARTICLES_DIR, `${seriesId}.js`), source, 'utf8');

    return NextResponse.json({ firstArticleId: `${seriesId}-1` });
  } catch (err) {
    return NextResponse.json({ error: `寫入失敗：${err.message}` }, { status: 500 });
  }
}
