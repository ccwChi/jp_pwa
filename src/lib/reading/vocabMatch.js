// Splits a sentence's furigana parts (see furigana.js) into segments so any
// vocab entry whose `surface` appears in the sentence's visible text can be
// rendered as its own clickable/hoverable span, while everything else
// renders exactly as parseFurigana produced it.
//
// A match is only accepted if it doesn't cut a ruby (kanji+reading) part in
// half — a vocab word can only start/end mid-part inside plain kana text,
// never inside a `漢字[かな]` token, since splitting that would break the
// ruby annotation.

export function buildVocabSegments(parts, vocabList) {
  const candidates = (vocabList || []).filter(v => v.surface);
  if (candidates.length === 0) return [{ vocab: null, subParts: parts }];

  let flat = '';
  const partStart = [];
  for (const p of parts) {
    partStart.push(flat.length);
    flat += p.text;
  }

  const spans = [];
  const seenSurface = new Set();
  const bySurfaceLengthDesc = [...candidates].sort((a, b) => b.surface.length - a.surface.length);
  for (const entry of bySurfaceLengthDesc) {
    if (seenSurface.has(entry.surface)) continue;
    seenSurface.add(entry.surface);
    let idx = flat.indexOf(entry.surface);
    while (idx !== -1) {
      spans.push({ start: idx, end: idx + entry.surface.length, entry });
      idx = flat.indexOf(entry.surface, idx + 1);
    }
  }
  spans.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  const accepted = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start < cursor) continue;
    if (splitsARubyPart(parts, partStart, span.start, span.end)) continue;
    accepted.push(span);
    cursor = span.end;
  }

  if (accepted.length === 0) return [{ vocab: null, subParts: parts }];

  const segments = [];
  let pos = 0;
  for (const span of accepted) {
    if (span.start > pos) segments.push({ vocab: null, subParts: sliceParts(parts, partStart, pos, span.start) });
    segments.push({ vocab: span.entry, subParts: sliceParts(parts, partStart, span.start, span.end) });
    pos = span.end;
  }
  if (pos < flat.length) segments.push({ vocab: null, subParts: sliceParts(parts, partStart, pos, flat.length) });

  return segments;
}

function splitsARubyPart(parts, partStart, start, end) {
  return parts.some((p, i) => {
    if (!p.reading) return false;
    const pStart = partStart[i];
    const pEnd = pStart + p.text.length;
    const overlaps = start < pEnd && end > pStart;
    const fullyContains = start <= pStart && end >= pEnd;
    return overlaps && !fullyContains;
  });
}

function sliceParts(parts, partStart, start, end) {
  const result = [];
  parts.forEach((p, i) => {
    const pStart = partStart[i];
    const pEnd = pStart + p.text.length;
    if (pEnd <= start || pStart >= end) return;
    const text = p.text.slice(Math.max(start, pStart) - pStart, Math.min(end, pEnd) - pStart);
    if (!text) return;
    result.push(p.reading ? { text, reading: p.reading } : { text });
  });
  return result;
}
