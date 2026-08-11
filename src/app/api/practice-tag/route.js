import { NextResponse } from 'next/server';
import { findNextUntagged, saveItemTags, loadPosOptions, addPosOption } from '@/lib/practice/bank/devTagStore';

const POS_FIELDS = ['verbCategory', 'verbConjugation', 'adjCategory', 'adjConjugation'];

export async function GET() {
  const [{ item, remaining }, posOptions] = await Promise.all([findNextUntagged(), loadPosOptions()]);
  return NextResponse.json({ item, remaining, posOptions });
}

export async function POST(request) {
  const body = await request.json();
  const { id, tags, newOptions } = body || {};

  if (!id) {
    return NextResponse.json({ error: '缺少題目 id' }, { status: 400 });
  }

  try {
    // Persist any brand-new option values first, so the item can reference
    // them immediately.
    if (newOptions) {
      for (const field of POS_FIELDS) {
        const value = newOptions[field];
        if (value) await addPosOption(field, value);
      }
    }

    const saved = await saveItemTags(id, tags || {});
    const [{ item: nextItem, remaining }, posOptions] = await Promise.all([findNextUntagged(), loadPosOptions()]);
    return NextResponse.json({ saved, next: nextItem, remaining, posOptions });
  } catch (err) {
    return NextResponse.json({ error: `儲存失敗：${err.message}` }, { status: 500 });
  }
}
