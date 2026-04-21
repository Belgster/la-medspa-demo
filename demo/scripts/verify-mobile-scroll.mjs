import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  // Trigger lazy images everywhere
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 400));

  // Capture each section as its own screenshot
  const sections = await page.$$('main > section');
  for (let i = 0; i < sections.length; i++) {
    await sections[i].scrollIntoView();
    await new Promise((r) => setTimeout(r, 250));
    await sections[i].screenshot({ path: `/tmp/la-390-s${i}.png` });
  }
  console.log(`${sections.length} sections screenshotted → /tmp/la-390-s{0..${sections.length - 1}}.png`);

  // Also footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.scrollIntoView();
    await new Promise((r) => setTimeout(r, 250));
    await footer.screenshot({ path: '/tmp/la-390-footer.png' });
  }

  // One-shot full page (may be tall)
  await page.screenshot({ path: '/tmp/la-390-full.png', fullPage: true });
  console.log('Full page: /tmp/la-390-full.png');
} finally {
  await browser.close();
}
