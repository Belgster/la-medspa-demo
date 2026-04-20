import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTHS = [375, 414, 768];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
});

try {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 844, deviceScaleFactor: 2, isMobile: width < 768, hasTouch: width < 768 });
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

    // Scroll through the whole page to trigger all lazy images
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 500));

    const report = await page.evaluate(() => {
      const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      const mobileNavVisible = !!document.querySelector('.md\\:hidden header.la-nav, .md\\:hidden .la-nav');
      const desktopNavVisible = document.querySelector('.hidden.md\\:contents header.la-nav, .md\\:contents header.la-nav')?.offsetParent !== null;
      const finder = document.querySelector('#finder');
      const financeGridCols = getComputedStyle(document.querySelector('section.grid.md\\:grid-cols-2') ?? document.body).gridTemplateColumns;
      return {
        overflowX,
        docWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        mobileNavVisible,
        desktopNavVisible,
        financeGridCols,
        finderHasIsland: !!finder?.querySelector('astro-island'),
      };
    });
    console.log(`--- ${width}px ---`);
    console.log(JSON.stringify(report, null, 2));

    await page.screenshot({ path: `/tmp/la-m${width}.png`, fullPage: true });
    console.log(`Screenshot /tmp/la-m${width}.png`);
    await page.close();
  }
} finally {
  await browser.close();
}
