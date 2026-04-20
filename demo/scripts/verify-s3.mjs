import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = process.argv[2] ?? 'http://localhost:4321/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

try {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const s3 = document.querySelector('#services');
    s3?.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -96);
  });
  await new Promise((r) => setTimeout(r, 400));

  const categories = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#services a.group')];
    return cards.map((card) => {
      const rail = card.querySelector('[aria-hidden="true"]');
      const kicker = card.querySelector('.font-mono');
      const tagPills = [...card.querySelectorAll('.rounded-pill')];
      const label = card.querySelector('.font-display.uppercase.text-ink')?.textContent?.trim();
      return {
        label,
        railBg: rail ? getComputedStyle(rail).backgroundColor : null,
        kickerColor: kicker ? getComputedStyle(kicker).color : null,
        kickerText: kicker?.textContent?.trim(),
        tagBg: tagPills[0] ? getComputedStyle(tagPills[0]).backgroundColor : null,
        tagColor: tagPills[0] ? getComputedStyle(tagPills[0]).color : null,
      };
    });
  });

  console.log(JSON.stringify(categories, null, 2));

  // Screenshot the full category grid for visual diff
  const grid = await page.$('#services');
  if (grid) {
    const box = await grid.boundingBox();
    await page.screenshot({
      path: '/tmp/la-s3-grid.png',
      clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 1200) },
    });
    console.log('\nScreenshot: /tmp/la-s3-grid.png');
  }

  // Focused side-by-side of Face (01) and Medical (04) rails
  const faceCard = await page.$('#services a.group:nth-child(1)');
  const medicalCard = await page.$('#services a.group:nth-child(4)');
  if (faceCard && medicalCard) {
    const fb = await faceCard.boundingBox();
    const mb = await medicalCard.boundingBox();
    await page.screenshot({
      path: '/tmp/la-s3-face.png',
      clip: { x: fb.x, y: fb.y, width: fb.width, height: 40 },
    });
    await page.screenshot({
      path: '/tmp/la-s3-medical.png',
      clip: { x: mb.x, y: mb.y, width: mb.width, height: 40 },
    });
    console.log('Face rail crop:    /tmp/la-s3-face.png');
    console.log('Medical rail crop: /tmp/la-s3-medical.png');
  }

  // Distinctness math on the rails (Delta E could be heavier — for demo,
  // simple absolute RGB distance is enough to catch near-matches).
  const face = categories.find((c) => c.label === 'Face');
  const med = categories.find((c) => c.label === 'Medical');
  if (face && med) {
    const parse = (s) => s?.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
    const [r1, g1, b1] = parse(face.railBg);
    const [r2, g2, b2] = parse(med.railBg);
    const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
    console.log(`\nFace    rail: ${face.railBg}`);
    console.log(`Medical rail: ${med.railBg}`);
    console.log(`RGB distance: ${dist.toFixed(1)}  (>60 reads as visibly distinct)`);
  }
} finally {
  await browser.close();
}
