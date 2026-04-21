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

  // Simulate slow mouse transit from trigger to flyout
  const triggerBox = await page.$eval('[data-flyout-trigger="face"]', (el) => {
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  });
  const flyoutBox = await page.$eval('[data-flyout="face"]', (el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left + 40, height: r.height };
  });

  console.log('trigger bottom y:', triggerBox.bottom);
  console.log('flyout top y    :', flyoutBox.top);
  console.log('gap             :', flyoutBox.top - triggerBox.bottom, 'px');

  // Move slowly through the gap
  await page.mouse.move(triggerBox.cx, triggerBox.cy);
  await new Promise((r) => setTimeout(r, 100));
  const atTrigger = await page.evaluate(() => {
    const f = document.querySelector('[data-flyout="face"]');
    return { visibility: getComputedStyle(f).visibility, opacity: getComputedStyle(f).opacity };
  });
  console.log('at trigger       :', JSON.stringify(atTrigger));

  // Simulate slow transit — 10 steps across the gap
  const steps = 10;
  for (let i = 1; i <= steps; i++) {
    const y = triggerBox.cy + ((flyoutBox.top + 10) - triggerBox.cy) * (i / steps);
    await page.mouse.move(triggerBox.cx, y, { steps: 1 });
    await new Promise((r) => setTimeout(r, 60));
    if (i === Math.floor(steps / 2)) {
      const mid = await page.evaluate(() => {
        const f = document.querySelector('[data-flyout="face"]');
        return { visibility: getComputedStyle(f).visibility, opacity: parseFloat(getComputedStyle(f).opacity).toFixed(2) };
      });
      console.log(`mid-transit y=${Math.round(y)}:`, JSON.stringify(mid));
    }
  }

  await new Promise((r) => setTimeout(r, 100));
  const atFlyout = await page.evaluate(() => {
    const f = document.querySelector('[data-flyout="face"]');
    return { visibility: getComputedStyle(f).visibility, opacity: getComputedStyle(f).opacity };
  });
  console.log('at flyout       :', JSON.stringify(atFlyout));

  // Sanity check: visibility must still be visible at the end
  if (atFlyout.visibility === 'visible' && parseFloat(atFlyout.opacity) > 0.9) {
    console.log('PASS — flyout stayed open through the gap');
  } else {
    console.log('FAIL — flyout closed during transit');
  }
} finally {
  await browser.close();
}
