import puppeteer from 'puppeteer-core';

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

  const result = await page.evaluate(() => {
    const section = document.querySelectorAll('main > section')[1];
    if (!section) return { found: false };
    const h2 = section.querySelector('h2');
    const img = section.querySelector('picture img');
    const stats = [...section.querySelectorAll('.grid.md\\:grid-cols-3 > div')];
    return {
      found: true,
      h2: h2?.textContent?.replace(/\s+/g, ' ').trim(),
      imgSources: section.querySelectorAll('picture source').length,
      imgLoaded: img?.complete && (img?.naturalWidth ?? 0) > 0,
      imgLoading: img?.getAttribute('loading'),
      imgSizes: img?.getAttribute('sizes'),
      statCount: stats.length,
      statHeadings: stats.map((s) => s.querySelector('.font-mono, .tracking-\\[0\\.14em\\]')?.textContent?.trim()),
      statBigNumbers: stats.map((s) => s.querySelector('.text-\\[clamp\\(48px\\,6vw\\,64px\\)\\]')?.textContent?.trim()),
    };
  });

  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
