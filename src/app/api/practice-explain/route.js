import { NextResponse } from 'next/server';
import { findItemById, saveItemExplain } from '@/lib/practice/bank/devTagStore';

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: '缺少題目 id' }, { status: 400 });

  const { item } = await findItemById(id);
  if (!item) return NextResponse.json({ error: `找不到題目 "${id}"` }, { status: 404 });
  return NextResponse.json({ item });
}

export async function POST(request) {
  const body = await request.json();
  const { id, notes, optionExplanations } = body || {};
  if (!id) return NextResponse.json({ error: '缺少題目 id' }, { status: 400 });

  try {
    const saved = await saveItemExplain(id, { notes, optionExplanations });
    return NextResponse.json({ item: saved });
  } catch (err) {
    return NextResponse.json({ error: `儲存失敗：${err.message}` }, { status: 500 });
  }
}
