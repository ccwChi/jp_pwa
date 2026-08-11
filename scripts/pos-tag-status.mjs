// Reports per-file POS-tagging progress across src/lib/practice/bank/data —
// how many items are missing posReviewed, out of the file's total. Run with
// `node scripts/pos-tag-status.mjs`. Read-only; doesn't touch any data file.
import fs from 'node:fs';
import path from 'node:path';

const BANK_DIR = path.resolve(import.meta.dirname, '..', 'src', 'lib', 'practice', 'bank', 'data');
const FILE_PATTERN = /^const items = ([\s\S]*);\n\nexport default items;\n?$/;

const files = fs.readdirSync(BANK_DIR).filter(f => f.endsWith('.js')).sort();

let totalItems = 0;
let totalUntagged = 0;
const rows = [];

for (const filename of files) {
  const content = fs.readFileSync(path.join(BANK_DIR, filename), 'utf8');
  const match = content.match(FILE_PATTERN);
  if (!match) {
    rows.push({ filename, note: '⚠ 無法解析（非標準 JSON 格式）' });
    continue;
  }
  const items = JSON.parse(match[1]);
  const untagged = items.filter(i => !i.posReviewed);
  totalItems += items.length;
  totalUntagged += untagged.length;
  if (untagged.length > 0) {
    rows.push({ filename, total: items.length, untagged: untagged.length, ids: untagged.map(i => i.id) });
  }
}

console.log(`\n未標記完成的檔案（${rows.length} / ${files.length} 個檔案還有題目待標）：\n`);
for (const row of rows) {
  if (row.note) {
    console.log(`  ${row.filename}  ${row.note}`);
    continue;
  }
  console.log(`  ${row.filename}  ${row.untagged}/${row.total} 待標`);
}

console.log(`\n總計：${totalItems - totalUntagged} / ${totalItems} 已標記（剩餘 ${totalUntagged} 題）\n`);
