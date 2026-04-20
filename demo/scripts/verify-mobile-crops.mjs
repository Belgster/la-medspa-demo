import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  // Overflow check without scrollbar confusion
  const overflow = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    return {
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      htmlScrollWidth: html.scrollWidth,
      htmlClientWidth: html.clientWidth,
      windowInner: window.innerWidth,
    };
  });
  console.log('overflow:', JSON.stringify(overflow, null, 2));

  // Screenshot each section at 375 for review
  const sections = await page.$$('main > section');
  console.log('sections found:', sections.length);
  const titles = await page.$$eval('main h2, main h1', (hs) => hs.map((h) => h.textContent?.replace(/\s+/g, ' ').trim().slice(0, 30)));
  for (let i = 0; i < sections.length; i++) {
    await sections[i].scrollIntoView();
    await new Promise((r) => setTimeout(r, 200));
    await sections[i].screenshot({ path: `/tmp/la-m375-${i}.png` });
  }
  console.log('titles:', JSON.stringify(titles, null, 2));
} finally {
  await browser.close();
}
