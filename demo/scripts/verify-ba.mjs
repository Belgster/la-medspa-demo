import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  // Scroll §6 into view to hydrate client:visible
  await page.evaluate(() => document.getElementById('results')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));

  const info = await page.evaluate(() => {
    const section = document.getElementById('results');
    if (!section) return { found: false };
    const sliders = [...section.querySelectorAll('[role="slider"]')];
    const pics = [...section.querySelectorAll('picture')];
    const sources = [...section.querySelectorAll('picture > source[type="image/avif"]')];
    const imgs = [...section.querySelectorAll('picture > img')];
    const viewAll = section.querySelector('a[href="#phase3-ba"]');
    const kicker = section.querySelector('.text-charcoal-soft')?.textContent?.trim();
    return {
      found: true,
      sliderCount: sliders.length,
      pictureCount: pics.length,
      avifSourceCount: sources.length,
      imgCount: imgs.length,
      imgsComplete: imgs.map((i) => ({ src: i.currentSrc || i.src, complete: i.complete, w: i.naturalWidth })),
      viewAll: viewAll?.textContent?.trim(),
      kicker,
      ariaLabels: sliders.map((s) => s.getAttribute('aria-label')),
    };
  });
  console.log(JSON.stringify(info, null, 2));
} finally { await browser.close(); }
