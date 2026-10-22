import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { safeUserRecords, clearLegacyCredentials } from '../js/privacy.js';

class MemoryStorage {
  values = new Map();
  writes = 0;
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); this.writes++; }
  removeItem(key) { this.values.delete(key); }
}

test('legacy records retain only allowed metadata and cleanup is idempotent', () => {
  const unsafe = { id: '1', phone: '0000000000', lastLogin: '', status: 'completed', password: 'private-password', mpin: '123456', nested: { secret: true } };
  assert.deepEqual(Object.keys(safeUserRecords([unsafe])[0]), ['id', 'phone', 'lastLogin', 'status']);
  globalThis.localStorage = new MemoryStorage();
  globalThis.sessionStorage = new MemoryStorage();
  for (const storage of [localStorage, sessionStorage]) {
    storage.setItem('toppay.admin.users', JSON.stringify([unsafe]));
    storage.setItem('toppay.admin.trash', JSON.stringify([unsafe]));
    storage.setItem('pwd_pending', 'private-password');
    storage.setItem('mpin_pending', '123456');
    storage.setItem('toppay.admin-app.settings.v1', '{"slides":[]}');
  }
  clearLegacyCredentials();
  for (const storage of [localStorage, sessionStorage]) {
    assert.equal(storage.getItem('pwd_pending'), null);
    assert.equal(storage.getItem('mpin_pending'), null);
    assert(!JSON.stringify([...storage.values]).includes('private-password'));
    assert(!JSON.stringify([...storage.values]).includes('123456'));
    assert.equal(storage.getItem('toppay.admin-app.settings.v1'), '{"slides":[]}');
  }
  const writes = localStorage.writes + sessionStorage.writes;
  clearLegacyCredentials();
  assert.equal(localStorage.writes + sessionStorage.writes, writes);
});

test('demo login and PIN sequence has no network access or credential persistence', () => {
  const makeElement = () => ({ value: '', handlers: {}, classList: { add() {}, toggle() {} }, setAttribute() {}, addEventListener(name, fn) { this.handlers[name] = fn; } });
  const ids = Object.fromEntries(['loginForm','mobile','password','mpinOverlay'].map(id => [id, makeElement()]));
  const keys = Array.from({ length: 10 }, makeElement);
  for (const key of keys) Object.defineProperty(key, 'dataset', { get() { throw new Error('PIN values must not be read'); } });
  const deleteKey = makeElement();
  const session = new MemoryStorage();
  let destination;
  let ready;
  const source = fs.readFileSync(new URL('../js/local-flow.js', import.meta.url), 'utf8').replace(/^import[^\n]+\n/, '');
  vm.runInNewContext(source, {
    clearLegacyCredentials() {}, sessionStorage: session,
    fetch() { throw new Error('Network access forbidden'); },
    document: {
      addEventListener(_name, fn) { ready = fn; },
      getElementById(id) { return ids[id]; },
      querySelectorAll(selector) { return selector === '[data-key]' ? keys : Array.from({ length: 6 }, makeElement); },
      querySelector() { return deleteKey; }, body: { style: {} },
    },
    window: { addEventListener() {}, location: { assign(url) { destination = url; }, replace(url) { destination = url; } } },
  });
  ready();
  ids.mobile.value = '0000000000';
  ids.password.value = 'not-a-real-password';
  ids.loginForm.handlers.submit({ preventDefault() {} });
  assert.equal(ids.password.value, '');
  assert.equal(ids.mobile.value, '');
  for (let i = 0; i < 5; i++) keys[i].handlers.click();
  assert.equal(destination, undefined);
  deleteKey.handlers.click();
  keys[0].handlers.click();
  assert.equal(destination, undefined);
  keys[1].handlers.click();
  assert.equal(destination, './home.html');
  assert.deepEqual([...session.values], [['toppay_demo_session_v1', 'active']]);
});

test('admin source and API cannot fetch or export visitor credentials', () => {
  const admin = fs.readFileSync(new URL('../admin/Admin.tsx', import.meta.url), 'utf8');
  assert(!/supabase|fetch\(|user\.password|user\.mpin|u\.password|u\.mpin/.test(admin));
  assert(admin.includes('Not collected'));
  assert(admin.includes('safeUserRecords(nextUsers)'));
});
