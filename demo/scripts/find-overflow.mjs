import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  const offenders = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    const all = document.querySelectorAll('body *');
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1) {
        const selector = [
          el.tagName.toLowerCase(),
          el.id ? `#${el.id}` : '',
          el.className ? `.${String(el.className).trim().split(/\s+/).slice(0, 3).join('.')}` : '',
        ].join('');
        offenders.push({
          selector: selector.slice(0, 100),
          right: Math.round(r.right),
          left: Math.round(r.left),
          width: Math.round(r.width),
          text: el.textContent?.trim().slice(0, 40) ?? '',
        });
      }
    }
    // Dedupe near-identical by parent chain — keep first N
    return offenders.slice(0, 20);
  });
  console.log(JSON.stringify(offenders, null, 2));
} finally {
  await browser.close();
}
