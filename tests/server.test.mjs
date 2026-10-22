import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { server } from '../server.mjs';
let base;
before(async () => { await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); base = `http://127.0.0.1:${server.address().port}`; });
after(async () => { await new Promise(resolve => server.close(resolve)); });

test('homepage, sitemap and canonical use the new domain', async () => {
  const page = await fetch(base); assert.equal(page.status, 200);
  const html = await page.text();
  assert(html.includes('rel="canonical" href="https://top-payy.online/"'));
  assert(!html.includes('toppaay.com'));
  assert(html.includes('Demo only.'));
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert(sitemap.includes('https://top-payy.online/'));
});
test('duplicate pages redirect and private screens stay noindex', async () => {
  for (const path of ['/home-page','/home-page.html','/index.html']) {
    const response = await fetch(base + path, { redirect: 'manual' });
    assert.equal(response.status, 301); assert.equal(response.headers.get('location'), '/');
  }
  for (const path of ['/admin','/admin-app','/home','/admin/users']) {
    const response = await fetch(base + path); assert.equal(response.status, 200);
    assert(response.headers.get('x-robots-tag').includes('noindex'));
  }
});
test('form posts and old account APIs cannot accept credentials', async () => {
  const response = await fetch(base + '/api/admin-app/admin/login', { method: 'POST', body: 'synthetic-test' });
  assert.equal(response.status, 405);
  assert.equal((await fetch(base + '/api/admin-app/users')).status, 410);
});
test('missing files and traversal paths do not become indexable pages', async () => {
  for (const path of ['/missing-page','/.git/config','/%2e%2e%5cpackage.json','/assets/']) assert.equal((await fetch(base + path)).status, 404);
});
test('www and legacy hosts redirect to canonical domain while preserving path', async () => {
  for (const host of ['www.top-payy.online','toppaay.com','www.toppaay.com']) {
    const response = await new Promise((resolve, reject) => {
      http.get(base + '/home?test=1', { headers: { Host: host } }, res => { res.resume(); resolve(res); }).on('error', reject);
    });
    assert.equal(response.statusCode, 301);
    assert.equal(response.headers.location, 'https://top-payy.online/home?test=1');
  }
});
