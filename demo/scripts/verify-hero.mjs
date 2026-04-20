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
  const reqs = [];
  page.on('response', (r) => {
    const url = r.url();
    const type = r.headers()['content-type'] ?? '';
    if (type.startsWith('image/') || /\.(avif|webp|jpg|jpeg|png)$/i.test(url)) {
      reqs.push({ url: url.split('?')[0].split('/').pop(), type, bytes: Number(r.headers()['content-length'] ?? 0) });
    }
  });

  await page.goto(URL, { waitUntil: 'networkidle0' });

  const vh = await page.evaluate(() => window.innerHeight);

  const atScroll = async (y) => {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 250));
    return page.evaluate(() => {
      const header = document.querySelector('header.la-nav');
      const hero = document.querySelector('section.relative');
      const h1 = document.querySelector('h1');
      const pic = document.querySelector('picture');
      const img = pic?.querySelector('img');
      const cs = header ? getComputedStyle(header) : null;
      return {
        scrollY: window.scrollY,
        headerTop: header?.getBoundingClientRect().top,
        headerBg: cs?.backgroundColor,
        headerBackdrop: cs?.backdropFilter,
        heroH: hero?.getBoundingClientRect().height,
        h1Text: h1?.textContent?.replace(/\s+/g, ' ').trim(),
        h1Color: h1 ? getComputedStyle(h1).color : null,
        imgSrcset: img?.getAttribute('srcset')?.split(', ').length,
        imgSizes: img?.getAttribute('sizes'),
        imgLoaded: img?.complete && (img?.naturalWidth ?? 0) > 0,
        imgCurrent: img?.currentSrc?.split('/').pop()?.split('?')[0],
        fetchPriority: img?.getAttribute('fetchpriority'),
        loading: img?.getAttribute('loading'),
        sourcesCount: pic?.querySelectorAll('source').length,
        buttonsCount: document.querySelectorAll('section.relative a[class*="rounded-pill"]').length,
        scrollIndicator: !!document.querySelector('.la-scroll-pulse'),
      };
    });
  };

  const zero = await atScroll(0);
  const mid = await atScroll(Math.round(vh / 2));
  const preReveal = await atScroll(vh - 120);
  const reveal = await atScroll(vh - 40);
  const past = await atScroll(vh + 100);

  console.log('viewport height:', vh);
  console.log('--- scrollY=0 ---');          console.log(JSON.stringify(zero, null, 2));
  console.log('--- scrollY=vh/2 ---');       console.log(JSON.stringify(mid, null, 2));
  console.log('--- scrollY=vh-120 ---');     console.log(JSON.stringify(preReveal, null, 2));
  console.log('--- scrollY=vh-40 ---');      console.log(JSON.stringify(reveal, null, 2));
  console.log('--- scrollY=vh+100 ---');     console.log(JSON.stringify(past, null, 2));

  const imgReqs = reqs.filter((r) => /\.(avif|webp)$/i.test(r.url) || r.type.startsWith('image/'));
  console.log('\n--- image requests ---');
  imgReqs.slice(0, 20).forEach((r) => console.log(`  ${r.type}  ${r.url}`));
} finally {
  await browser.close();
}
