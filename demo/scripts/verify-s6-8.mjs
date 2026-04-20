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
  // Scroll each anchor into view so lazy images hydrate + take screenshots
  const anchors = ['results', 'finder'];
  for (const id of anchors) {
    await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({block: 'start'}), id);
    await new Promise((r) => setTimeout(r, 300));
  }

  const s = await page.evaluate(() => {
    const all = [...document.querySelectorAll('main > section, main section')];
    return {
      total: all.length,
      titles: [...document.querySelectorAll('main h2')].map((h) => h.textContent?.replace(/\s+/g, ' ').trim()),
      teamCards: document.querySelectorAll('.la-team-scroll li').length,
      igTiles: document.querySelectorAll('.grid.grid-cols-4 > a').length,
      ba: !!document.querySelector('#results'),
      findHeaderPresent: !!document.querySelector('#finder'),
    };
  });
  console.log(JSON.stringify(s, null, 2));

  // Screenshot each section
  const sections = [
    { id: 'results', name: 'la-s6-ba.png' },
    { id: null, name: 'la-s7-testi.png', selector: 'section:has(.la-team-scroll) ~ *, h2:has-text(Clients)' },
  ];
  // Simpler: scroll to the before/after element and screenshot it
  const ba = await page.$('#results');
  if (ba) await ba.screenshot({ path: '/tmp/la-s6-ba.png' });
  // Testimonials section is the one before the team section
  const testiH2 = await page.evaluateHandle(() => {
    const headings = [...document.querySelectorAll('main h2')];
    const h = headings.find((x) => /clients say/i.test(x.textContent ?? ''));
    return h?.closest('section');
  });
  if (testiH2) {
    const node = testiH2.asElement();
    if (node) await node.screenshot({ path: '/tmp/la-s7-testi.png' });
  }
  // Team section
  const teamH2 = await page.evaluateHandle(() => {
    const headings = [...document.querySelectorAll('main h2')];
    const h = headings.find((x) => /^the team$/i.test(x.textContent?.trim() ?? ''));
    return h?.closest('section');
  });
  if (teamH2) {
    const node = teamH2.asElement();
    if (node) await node.screenshot({ path: '/tmp/la-s7-team.png' });
  }
  // Financing/IG
  const finH2 = await page.evaluateHandle(() => {
    const headings = [...document.querySelectorAll('main h2')];
    const h = headings.find((x) => /pay over time/i.test(x.textContent ?? ''));
    return h?.closest('section');
  });
  if (finH2) {
    const node = finH2.asElement();
    if (node) await node.screenshot({ path: '/tmp/la-s8.png' });
  }

  console.log('Screenshots: /tmp/la-s6-ba.png  /tmp/la-s7-testi.png  /tmp/la-s7-team.png  /tmp/la-s8.png');
} finally {
  await browser.close();
}
