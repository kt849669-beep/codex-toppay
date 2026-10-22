import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker.js';

function assets() {
  const seen = [];
  return { seen, ASSETS: { async fetch(request) {
    seen.push(new URL(request.url).pathname);
    const path = seen.at(-1);
    return new Response(path, { status: ['/index.html', '/home.html', '/admin.html', '/admin-app.html', '/assets/toppay-logo.jpeg'].includes(path) ? 200 : 404, headers: { 'Content-Type': path.endsWith('.jpeg') ? 'image/jpeg' : 'text/html' } });
  } } };
}

test('Worker blocks credential submissions and disabled account APIs before asset access', async () => {
  const env = assets();
  for (const method of ['POST','PUT','PATCH','DELETE']) assert.equal((await worker.fetch(new Request('https://top-payy.online/api/users', {method, body:'dummy'}),env)).status,405);
  assert.equal((await worker.fetch(new Request('https://top-payy.online/api/users'),env)).status,410);
  assert.equal(env.seen.length,0);
});
test('Worker serves clean admin routes privately and keeps missing pages as 404',async()=>{
  const env=assets();
  for(const path of ['/admin','/admin/users','/admin-app','/home']){
    const r=await worker.fetch(new Request('https://top-payy.online'+path),env);
    assert.equal(r.status,200);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);
  }
  assert.equal((await worker.fetch(new Request('https://top-payy.online/unknown'),env)).status,404);
  const home=await worker.fetch(new Request('https://top-payy.online/'),env);
  assert.equal(home.headers.get('X-Robots-Tag'),null);
  const preview=await worker.fetch(new Request('https://top-payy-online.kt849669.workers.dev/'),env);
  assert.match(preview.headers.get('X-Robots-Tag'),/noindex/);
});
test('Worker preserves queries in canonical redirects and rejects traversal paths',async()=>{
  const env=assets();
  const r=await worker.fetch(new Request('http://www.top-payy.online/home?q=1'),env);
  assert.equal(r.status,301);assert.equal(r.headers.get('Location'),'https://top-payy.online/home?q=1');
  const duplicate=await worker.fetch(new Request('https://top-payy.online/home-page?ref=1'),env);
  assert.equal(duplicate.headers.get('Location'),'https://top-payy.online/?ref=1');
  const invalid=await worker.fetch(new Request('https://top-payy.online/%2e%2e%5cpackage.json'),env);
  assert.equal(invalid.status,404);
});
