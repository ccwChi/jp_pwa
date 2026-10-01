// Reproducible conversion of the archived Aozora HTML; no runtime network access.
import fs from 'node:fs';
const html = fs.readFileSync('resources/kumo-source.html', 'utf8');
const body = html.split('<div class="main_text">')[1].split('<div class="bibliographical_information">')[0];
const paragraphs = body.replace(/<div[^>]*>[\s\S]*?<\/div>/g, '')
  .replace(/<img[^>]*class="gaiji"[^>]*\/>/g, '犍')
  .replace(/<ruby><rb>(.*?)<\/rb><rp>.*?<\/rp><rt>(.*?)<\/rt><rp>.*?<\/rp><\/ruby>/g, '$1[$2]')
  .split(/<br\s*\/>/).map(s => s.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
if (paragraphs.length !== 14 || paragraphs.some(p => /[<>※]/.test(p))) throw new Error('Source format changed; review extraction.');
fs.writeFileSync('src/lib/reading/articles/data/kumo-text.json', JSON.stringify(paragraphs, null, 2) + '\n');
paragraphs.forEach((p, i) => console.log(i + ': ' + p));
