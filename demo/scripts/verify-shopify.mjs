import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

try {
  // Desktop — check nav Shop link
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  const desktopNav = await page.evaluate(() => {
    const shopLink = [...document.querySelectorAll('nav[aria-label="Primary"] a')].find((a) =>
      /shop/i.test(a.textContent ?? ''),
    );
    return shopLink && {
      href: shopLink.getAttribute('href'),
      target: shopLink.getAttribute('target'),
      rel: shopLink.getAttribute('rel'),
      text: shopLink.textContent?.trim(),
    };
  });
  console.log('desktop nav shop:', JSON.stringify(desktopNav));

  // Skincare card — find the shop pill
  const skincareShop = await page.evaluate(() => {
    const skincareCard = [...document.querySelectorAll('#services article')].find((c) =>
      /skin care/i.test(c.querySelector('.font-display.uppercase.text-ink')?.textContent ?? ''),
    );
    const shopPill = skincareCard?.querySelector('a[href*="shopify"]');
    return shopPill && {
      href: shopPill.getAttribute('href'),
      target: shopPill.getAttribute('target'),
      rel: shopPill.getAttribute('rel'),
      text: shopPill.textContent?.trim(),
    };
  });
  console.log('skincare shop pill:', JSON.stringify(skincareShop));

  // Verify no-interactive pills (other skincare tags) are still <span>
  const otherPills = await page.evaluate(() => {
    const skincareCard = [...document.querySelectorAll('#services article')].find((c) =>
      /skin care/i.test(c.querySelector('.font-display.uppercase.text-ink')?.textContent ?? ''),
    );
    const pills = [...(skincareCard?.querySelectorAll('.rounded-pill') ?? [])];
    return pills.map((p) => ({ tag: p.tagName.toLowerCase(), text: p.textContent?.trim() }));
  });
  console.log('skincare pills:', JSON.stringify(otherPills, null, 2));

  await page.close();

  // Mobile — check drawer Shop entry
  const mpage = await browser.newPage();
  await mpage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await mpage.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));

  // Open mobile menu
  await mpage.evaluate(() => {
    const menuBtn = [...document.querySelectorAll('button')].find((b) => /menu/i.test(b.textContent ?? ''));
    menuBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  const mobileShop = await mpage.evaluate(() => {
    const shopLink = [...document.querySelectorAll('a[href*="shopify"]')].find((a) =>
      a.textContent?.trim().toLowerCase() === 'shop ↗' || /shop/i.test(a.textContent?.trim() ?? ''),
    );
    return shopLink && {
      href: shopLink.getAttribute('href'),
      target: shopLink.getAttribute('target'),
      rel: shopLink.getAttribute('rel'),
      text: shopLink.textContent?.replace(/\s+/g, ' ').trim(),
    };
  });
  console.log('mobile drawer shop:', JSON.stringify(mobileShop));
} finally {
  await browser.close();
}
