import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  // Scroll to finder so client:visible hydrates the island
  await page.evaluate(() => {
    document.getElementById('finder')?.scrollIntoView({ block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 600));

  const step1 = await page.evaluate(() => {
    const finder = document.querySelector('#finder');
    const concerns = [...finder.querySelectorAll('button[aria-pressed]')];
    return {
      concernCount: concerns.length,
      firstConcern: concerns[0]?.textContent?.trim().slice(0, 40),
      hydrated: !!finder.querySelector('[class*="animate-la-fade-rise"]'),
    };
  });
  console.log('Step 1:', JSON.stringify(step1, null, 2));

  // Pick 2 concerns, continue, skip area, go to results
  await page.evaluate(() => {
    const finder = document.querySelector('#finder');
    const concerns = [...finder.querySelectorAll('button[aria-pressed]')];
    concerns[0]?.click(); // Fine Lines
    concerns[4]?.click(); // Volume Loss (index 4 = 5th)
  });
  await new Promise((r) => setTimeout(r, 200));

  const continueBtn = await page.$$('#finder button');
  // Find "Continue →"
  const continueClicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#finder button')];
    const b = btns.find((x) => /continue/i.test(x.textContent ?? ''));
    if (b) { b.click(); return b.textContent?.trim(); }
    return null;
  });
  console.log('Clicked:', continueClicked);
  await new Promise((r) => setTimeout(r, 400));

  // Skip area → Results
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#finder button')];
    const see = btns.find((x) => /see matches/i.test(x.textContent ?? ''));
    if (see) see.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  const results = await page.evaluate(() => {
    const finder = document.querySelector('#finder');
    const cards = [...finder.querySelectorAll('a[class*="rounded-card"], div[class*="rounded-card"]')];
    const cardInfo = cards.filter((c) => c.querySelector('[class*="text-[20px]"]'))
      .map((c) => {
        const name = c.querySelector('[class*="text-[20px]"]')?.textContent?.trim();
        const duration = c.querySelector('.text-brown')?.textContent?.trim();
        const fromLabel = [...c.querySelectorAll('.font-mono')].map((x) => x.textContent?.trim());
        return { name, duration, fromLabel };
      });
    return {
      visible: finder.offsetHeight,
      cardCount: cardInfo.length,
      sampleCard: cardInfo[0],
      anyFromLabel: cardInfo.some((c) => c.fromLabel.includes('From')),
    };
  });
  console.log('Results:', JSON.stringify(results, null, 2));

  await page.screenshot({ path: '/tmp/la-s5.png', fullPage: false });
  const f = await page.$('#finder');
  if (f) await f.screenshot({ path: '/tmp/la-s5-finder.png' });
  console.log('\nScreenshots: /tmp/la-s5.png  /tmp/la-s5-finder.png');
} finally {
  await browser.close();
}
