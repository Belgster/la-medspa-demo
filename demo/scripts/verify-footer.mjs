import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
  const page = await browser.newPage();

  // 1) Mobile — 390 × 844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  const mobile = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const h = f?.getBoundingClientRect().height ?? 0;
    const mobileBlock = f?.querySelector('.md\\:hidden');
    const desktopBlock = f?.querySelector('.hidden.md\\:block');
    const mobileVisible = mobileBlock ? getComputedStyle(mobileBlock).display !== 'none' : false;
    const desktopVisible = desktopBlock ? getComputedStyle(desktopBlock).display !== 'none' : false;
    const bands = mobileBlock ? mobileBlock.children.length : 0;
    const explore = mobileBlock?.querySelectorAll('ul')[1]?.querySelectorAll('li').length ?? 0;
    const connect = mobileBlock?.querySelectorAll('ul')[2]?.querySelectorAll('li').length ?? 0;
    const tel = f?.querySelector('a[href^="tel:"]');
    const mailto = f?.querySelector('a[href^="mailto:"]');
    return {
      footerHeightPx: Math.round(h),
      inScreens: (h / 844).toFixed(2),
      mobileBlockVisible: mobileVisible,
      desktopBlockVisible: desktopVisible,
      mobileBandCount: bands,
      exploreLinkCount: explore,
      connectLinkCount: connect,
      tel: tel?.getAttribute('href'),
      mailto: mailto?.getAttribute('href'),
    };
  });
  console.log('MOBILE 390×844:');
  console.log(JSON.stringify(mobile, null, 2));

  // 2) Desktop — 1280 × 900
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: 'networkidle0' });
  const desktop = await page.evaluate(() => {
    const f = document.querySelector('footer');
    const h = f?.getBoundingClientRect().height ?? 0;
    const mobileBlock = f?.querySelector('.md\\:hidden');
    const desktopBlock = f?.querySelector('.hidden.md\\:block');
    const mobileVisible = mobileBlock ? getComputedStyle(mobileBlock).display !== 'none' : false;
    const desktopVisible = desktopBlock ? getComputedStyle(desktopBlock).display !== 'none' : false;
    const grid = desktopBlock?.querySelector('.grid');
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;
    return {
      footerHeightPx: Math.round(h),
      mobileBlockVisible: mobileVisible,
      desktopBlockVisible: desktopVisible,
      gridColumnCount: cols,
    };
  });
  console.log('\nDESKTOP 1280×900:');
  console.log(JSON.stringify(desktop, null, 2));
} finally { await browser.close(); }
