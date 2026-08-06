// Article sentences are hand-authored with inline furigana using the
// convention `漢字[かんじ]` — the kanji run immediately followed by its
// reading in square brackets. This lets articles be plain hardcoded strings
// with no separate annotation step, dictionary, or backend lookup.

const FURIGANA_RE = /([一-龯々]+)\[([^\]]+)\]/g;

export function parseFurigana(raw) {
  const parts = [];
  let lastIndex = 0;
  let match;

  FURIGANA_RE.lastIndex = 0;
  while ((match = FURIGANA_RE.exec(raw))) {
    if (match.index > lastIndex) parts.push({ text: raw.slice(lastIndex, match.index) });
    parts.push({ text: match[1], reading: match[2] });
    lastIndex = FURIGANA_RE.lastIndex;
  }
  if (lastIndex < raw.length) parts.push({ text: raw.slice(lastIndex) });

  return parts;
}

// Plain kana reading of a whole sentence (kanji swapped for their furigana),
// used as the input to toRomaji().
export function readingOf(raw) {
  return parseFurigana(raw).map(p => p.reading || p.text).join('');
}

const ROMAJI = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ー: '',
};

const YOON = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
};

// Katakana shares the same sounds as hiragana; map each katakana char to
// its hiragana equivalent so the tables above can be reused as-is.
const KATA_TO_HIRA = {};
for (const ch of 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ') {
  KATA_TO_HIRA[ch] = String.fromCharCode(ch.charCodeAt(0) - 0x60);
}
KATA_TO_HIRA['ー'] = 'ー';

const PUNCTUATION = { '、': ', ', '。': '. ', '！': '! ', '？': '? ', '「': '"', '」': '"' };

function toHira(ch) {
  return KATA_TO_HIRA[ch] || ch;
}

export function toRomaji(kana) {
  let out = '';
  let i = 0;

  while (i < kana.length) {
    const ch = kana[i];

    if (ch === 'っ' || ch === 'ッ') {
      const nextRomaji = toRomaji(toHira(kana[i + 1] || '') + toHira(kana[i + 2] || ''));
      const firstLetter = nextRomaji[0] === 'c' ? 't' : nextRomaji[0];
      out += firstLetter || '';
      i += 1;
      continue;
    }

    if (ch === 'ー') {
      out += out.slice(-1);
      i += 1;
      continue;
    }

    if (PUNCTUATION[ch]) {
      out += PUNCTUATION[ch];
      i += 1;
      continue;
    }

    const pair = toHira(ch) + toHira(kana[i + 1] || '');
    if (YOON[pair]) {
      out += YOON[pair];
      i += 2;
      continue;
    }

    const hira = toHira(ch);
    if (ROMAJI[hira] !== undefined) {
      out += ROMAJI[hira];
    } else {
      out += ch;
    }
    i += 1;
  }

  return out;
}
