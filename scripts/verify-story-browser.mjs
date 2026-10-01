// Usage: STORY_BASE_URL=http://localhost:3100 PLAYWRIGHT_MODULE=<optional path> node scripts/verify-story-browser.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
function moduleUrl(file) {
  const source = fs.readFileSync(file, 'utf8');
  const code = file.endsWith('.json') ? `export default ${source};` : source.replace(/from ['"](\.[^'"]+)['"]/g, (_, relative) => `from '${moduleUrl(path.resolve(path.dirname(file), relative))}'`);
  return `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
}
const { journeys } = await import(moduleUrl(path.resolve('src/lib/journeys.js')));
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const base = process.env.STORY_BASE_URL || 'http://localhost:3100';
  await page.goto(base);
  await page.getByRole('link', { name: '開始我的第一關 →' }).click();
  await page.getByRole('heading', { name: '認識山裡的小狐狸', exact: true }).waitFor();
  await page.getByText('章節地圖 ·', { exact: false }).click();
  assert.equal(await page.getByRole('button', { name: /未解鎖 · 2\./ }).isDisabled(), true);
  await page.getByRole('button', { name: '查看中文翻譯' }).click();
  await page.getByText('這是我小時候，從村裡一位叫茂平的老爺爺那裡聽來的故事。', { exact: true }).waitFor();
  await page.getByRole('button', { name: '試著理解這一段 →' }).click();
  await page.getByRole('button', { name: '與兵十一起種田', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: '完成這一關 →' }).isDisabled(), true);
  await page.reload();
  await page.getByText('再試一次：', { exact: false }).waitFor();

  for (const id of ['gon', 'kumo']) {
    const story = journeys.find(j => j.id === id);
    if (id !== 'gon') await page.goto(`${base}/journey/${id}`);
    for (let i = 0; i < story.stages.length; i++) {
      const stage = story.stages[i];
      await page.getByRole('heading', { name: stage.title, exact: true }).first().waitFor();
      const start = page.getByRole('button', { name: '試著理解這一段 →' });
      if (await start.isVisible()) await start.click();
      for (const question of stage.questions) await page.getByRole('button', { name: question.options[question.answerIndex], exact: true }).click();
      await page.getByRole('button', { name: '完成這一關 →' }).click();
      await page.getByRole('heading', { name: stage.reward, exact: true }).waitFor();
      if (i === 0 && id === 'gon') {
        await page.getByRole('link', { name: '← 路線與書架' }).click();
        await page.getByRole('heading', { name: 'ごん狐 · 第 2 關' }).waitFor();
        await page.getByRole('link', { name: '繼續學習 →', exact: true }).click();
        await page.getByRole('heading', { name: story.stages[1].title, exact: true }).first().waitFor();
        await page.reload();
      } else if (i < story.stages.length - 1) {
        await page.getByRole('button', { name: `下一關：${story.stages[i + 1].title} →` }).click();
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Mobile overflow at ${id}/${i}`);
    }
    await page.getByText('全書讀畢 · 所有關卡完成', { exact: true }).waitFor();
    await page.getByText('通關回顧：連讀完整故事', { exact: true }).click();
    assert.equal(await page.locator('.story-full-text section').count(), story.stages.length);
    await page.reload();
    await page.getByText('全書讀畢 · 所有關卡完成', { exact: true }).waitFor();
  }
  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('nj_journeys')));
  assert.equal(progress.gon.completed.length, 14);
  assert.equal(progress.kumo.completed.length, 10);
  await page.goto(`${base}/reading/kumo-1`);
  await page.getByText('從蓮池往下看', { exact: false }).first().waitFor();
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  fs.mkdirSync('out/qa', { recursive: true });
  await page.screenshot({ path: 'out/qa/story-home-mobile.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'out/qa/story-home-desktop.png', fullPage: true, animations: 'disabled' });
  await page.goto(`${base}/journey/gon`);
  await page.screenshot({ path: 'out/qa/story-lesson-desktop.png', fullPage: true, animations: 'disabled' });
  assert.deepEqual(errors, []);
  console.log('PASS: 24 lessons completed in a mobile browser, wrong-answer retry, reload, next-stage locks, home resume, independent books, full-text review, reading route, no overflow or runtime errors.');
} finally {
  await browser.close();
}
