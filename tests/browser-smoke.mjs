import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
await mkdir('.generated/test-artifacts', { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.BROWSER_EXECUTABLE_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.setViewport({ width: 1280, height: 900 });
await page.setRequestInterception(true);
page.on('request', request => {
  if (
    request.method() === 'POST' &&
    /\/api\/(post|snippet)\//.test(request.url())
  )
    return request.abort();
  return request.continue();
});
try {
  for (const route of [
    '/',
    '/posts',
    '/posts/deploy-flask-application-on-heroku',
    '/snippets/wait-function',
    '/projects',
    '/about',
    '/tags/python',
    '/mdx-components'
  ]) {
    const response = await page.goto(baseUrl + route, {
      waitUntil: 'networkidle2',
      timeout: 45000
    });
    assert.equal(response.status(), 200, route);
    const text = await page.evaluate(() => document.body.innerText);
    assert.ok(text.length > 150, route + ' has real rendered content');
    assert.ok(!text.includes('Application error:'), route);
    if (route.includes('deploy-flask')) {
      assert.ok(await page.$('pre code'));
      assert.equal(
        await page.$eval('h1', node => getComputedStyle(node).fontSize),
        '36px',
        'article title retains its configured size'
      );
    }
    console.log(route, 200, 'title:', await page.title());
  }
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });
  await page.click('#header a[href="/posts"]');
  await page.waitForFunction(() => location.pathname === '/posts');
  await page.waitForFunction(() => document.title.startsWith('Posts'));
  const mode = await page.evaluate(() =>
    document.documentElement.getAttribute('color-scheme')
  );
  const darkBackground = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );
  await page.click('[aria-label="Activate light mode"]');
  await page.waitForFunction(
    previous =>
      document.documentElement.getAttribute('color-scheme') !== previous,
    {},
    mode
  );
  await page.waitForFunction(
    previous => getComputedStyle(document.body).backgroundColor !== previous,
    {},
    darkBackground
  );
  // Theme changes animate the body background; compare the settled color.
  await page.evaluate(() =>
    Promise.all(
      document.body.getAnimations().map(animation => animation.finished)
    )
  );
  const lightBackground = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );
  await page.reload({ waitUntil: 'networkidle2' });
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.getAttribute('color-scheme')
    ),
    'light'
  );
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
    lightBackground,
    'selected theme survives reload'
  );
  await page.goto(baseUrl + '/snippets', { waitUntil: 'networkidle2' });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    ),
    true,
    'desktop snippets grid does not overflow'
  );
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: '.generated/test-artifacts/mobile-home.png',
    fullPage: true
  });
  assert.deepEqual(errors, [], 'browser runtime errors');
  console.log(
    'Mobile homepage and browser runtime checks passed; counter POST requests intentionally blocked.'
  );
} finally {
  await browser.close();
}
