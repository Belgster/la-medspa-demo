import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  const s4idx = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('main > section')];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].textContent?.includes('Hormone Therapy') && sections[i].querySelector('ol')) {
        return i;
      }
    }
    return -1;
  });

  if (s4idx < 0) {
    console.log('§4 section not found');
  } else {
    const s = await page.evaluate((idx) => {
      const sec = document.querySelectorAll('main > section')[idx];
      const h2 = sec.querySelector('h2');
      const chip = sec.querySelector('.bg-category-medical-tone');
      const chipDot = chip?.querySelector('.bg-category-medical-line');
      const steps = [...sec.querySelectorAll('ol li')];
      const img = sec.querySelector('picture img');
      return {
        h2: h2?.textContent?.trim(),
        chipBg: chip ? getComputedStyle(chip).backgroundColor : null,
        chipDotBg: chipDot ? getComputedStyle(chipDot).backgroundColor : null,
        stepsCount: steps.length,
        stepLabels: steps.map((x) => x.querySelector('.font-display.uppercase')?.textContent?.trim()),
        imgLoaded: img?.complete && img?.naturalWidth > 0,
        sectionBg: getComputedStyle(sec).backgroundColor,
      };
    }, s4idx);
    console.log(JSON.stringify(s, null, 2));

    const sectionsHandle = await page.$$('main > section');
    if (sectionsHandle[s4idx]) {
      await sectionsHandle[s4idx].scrollIntoView();
      // Wait for the lazy <img> inside this section to fully decode
      await page.waitForFunction((idx) => {
        const sec = document.querySelectorAll('main > section')[idx];
        const img = sec?.querySelector('picture img');
        return img && img.complete && img.naturalWidth > 0;
      }, { timeout: 10_000 }, s4idx);
      await sectionsHandle[s4idx].screenshot({ path: '/tmp/la-s4.png' });
      console.log('Screenshot: /tmp/la-s4.png');
      const re = await page.evaluate((idx) => {
        const img = document.querySelectorAll('main > section')[idx]?.querySelector('picture img');
        return { imgLoaded: img?.complete && img?.naturalWidth > 0, imgWidth: img?.naturalWidth };
      }, s4idx);
      console.log('After wait:', JSON.stringify(re));
    }
  }
} finally {
  await browser.close();
}
