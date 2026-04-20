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
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));

  const snap = await page.evaluate(() => {
    const pick = (sel) => document.querySelector(sel);
    const header = pick('header.la-nav');
    const logo = pick('.la-nav-logo');
    const item = pick('.la-nav-item');
    const bodyChildren = [...document.body.children].map((el) => ({
      tag: el.tagName.toLowerCase(),
      cls: el.className,
      top: el.getBoundingClientRect().top,
    }));
    const cs = header ? getComputedStyle(header) : null;
    const csLogo = logo ? getComputedStyle(logo) : null;
    const csItem = item ? getComputedStyle(item) : null;
    return {
      scrollY: window.scrollY,
      docScroll: document.documentElement.scrollTop,
      bodyTop: document.body.getBoundingClientRect().top,
      bodyChildren,
      header: header ? {
        rectTop: header.getBoundingClientRect().top,
        rectHeight: header.getBoundingClientRect().height,
        position: cs.position,
        backgroundColor: cs.backgroundColor,
        backdropFilter: cs.backdropFilter,
        borderBottomColor: cs.borderBottomColor,
        borderBottomWidth: cs.borderBottomWidth,
        marginTop: cs.marginTop,
      } : 'missing',
      logoColor: csLogo?.color ?? 'missing',
      itemColor: csItem?.color ?? 'missing',
      supportsScrollTimeline: CSS.supports('animation-timeline', 'scroll()'),
    };
  });
  console.log(JSON.stringify(snap, null, 2));

  const sweep = [20, 40, 100];
  for (const y of sweep) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 150));
    const sample = await page.evaluate(() => {
      const header = document.querySelector('header.la-nav');
      const logo = document.querySelector('.la-nav-logo');
      const cs = getComputedStyle(header);
      return {
        scrollY: window.scrollY,
        bg: cs.backgroundColor,
        backdrop: cs.backdropFilter,
        border: cs.borderBottomColor,
        logoColor: getComputedStyle(logo).color,
      };
    });
    console.log(`--- scrollY=${y} ---`);
    console.log(JSON.stringify(sample, null, 2));
  }
} finally {
  await browser.close();
}
