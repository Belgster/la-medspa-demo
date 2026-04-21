import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

try {
  const page = await browser.newPage();
  // iPhone 14 Pro CSS size
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  // Measure distance from bottom-of-last-button to top-of-next-section at §5
  const gaps = await page.evaluate(() => {
    const finder = document.getElementById('finder');
    const nextSection = finder?.nextElementSibling;
    const buttons = finder ? [...finder.querySelectorAll('button')] : [];
    const lastButton = buttons[buttons.length - 1];
    if (!finder || !nextSection || !lastButton) return { found: false };
    const lbRect = lastButton.getBoundingClientRect();
    const finderRect = finder.getBoundingClientRect();
    const nextRect = nextSection.getBoundingClientRect();
    return {
      found: true,
      lastButtonText: lastButton.textContent?.trim().slice(0, 40),
      lastButtonBottom: Math.round(lbRect.bottom),
      finderBottom: Math.round(finderRect.bottom),
      nextTop: Math.round(nextRect.top),
      gap_button_to_finder_end: Math.round(finderRect.bottom - lbRect.bottom),
      gap_finder_end_to_next: Math.round(nextRect.top - finderRect.bottom),
      total_button_to_next: Math.round(nextRect.top - lbRect.bottom),
    };
  });
  console.log('§5 finder bottom metrics:', JSON.stringify(gaps, null, 2));

  // Hero height at 390 × 844 viewport
  const heroHeight = await page.evaluate(() => {
    const hero = document.querySelector('main > section:first-child');
    return hero?.getBoundingClientRect().height;
  });
  console.log('hero height (vh=844):', heroHeight);

  // Footer tel + mailto sanity
  const footerLinks = await page.evaluate(() => {
    const phone = document.querySelector('a[href^="tel:"]');
    const mail = document.querySelector('a[href^="mailto:"]');
    return {
      tel: phone?.getAttribute('href'),
      telText: phone?.textContent?.trim(),
      mailto: mail?.getAttribute('href'),
      mailText: mail?.textContent?.trim(),
    };
  });
  console.log('footer links:', JSON.stringify(footerLinks, null, 2));

  // Overall body overflow check
  const overflow = await page.evaluate(() => ({
    sw: document.body.scrollWidth,
    cw: document.body.clientWidth,
  }));
  console.log('body overflow:', JSON.stringify(overflow));
} finally {
  await browser.close();
}
