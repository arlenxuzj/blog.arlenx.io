import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getLocalImageSize } from '../src/utils/image';

test('local content images have usable dimensions with the supported image parser', () => {
  const files = readdirSync('public', { recursive: true }) as string[];
  const file = files.find(name => name.endsWith('.png'));
  assert.ok(file, 'repository contains a real PNG fixture');
  const size = getLocalImageSize('/' + file.split(path.sep).join('/'));
  assert.ok(size.width && size.width > 0);
  assert.ok(size.height && size.height > 0);
});

test('remote images validate status and decoding and bound response size', async t => {
  const { getRemoteImageSize } = await import('../src/utils/image');
  const { readFileSync } = await import('node:fs');
  const file = (readdirSync('public', { recursive: true }) as string[]).find(
    name => name.endsWith('.png')
  )!;
  let response = new Response(readFileSync(path.join('public', file)));
  t.mock.method(
    globalThis,
    'fetch',
    async (_url: unknown, options: RequestInit) => {
      assert.ok(options.signal instanceof AbortSignal);
      return response;
    }
  );
  assert.ok((await getRemoteImageSize('https://example.invalid/image')).width);
  response = new Response('missing', { status: 404 });
  await assert.rejects(
    getRemoteImageSize('https://example.invalid/image'),
    /404/
  );
  response = new Response('not an image');
  await assert.rejects(getRemoteImageSize('https://example.invalid/image'));
  response = new Response(new Uint8Array(10 * 1024 * 1024 + 1));
  await assert.rejects(
    getRemoteImageSize('https://example.invalid/image'),
    /exceeds/
  );
  response = new Response(
    new ReadableStream({
      start(controller) {
        controller.error(new Error('broken stream'));
      }
    })
  );
  await assert.rejects(
    getRemoteImageSize('https://example.invalid/image'),
    /broken stream/
  );
  await assert.rejects(
    getRemoteImageSize('http://example.invalid/image'),
    /HTTPS/
  );
});

test('remote image timeout rejects the compilation promise', async t => {
  const { getRemoteImageSize } = await import('../src/utils/image');
  const controller = new AbortController();
  t.mock.method(AbortSignal, 'timeout', (milliseconds: number) => {
    assert.equal(milliseconds, 10000);
    return controller.signal;
  });
  t.mock.method(
    globalThis,
    'fetch',
    async (_url: unknown, options: RequestInit) => {
      return new Promise((_resolve, reject) =>
        options.signal!.addEventListener('abort', () =>
          reject(options.signal!.reason)
        )
      );
    }
  );
  const pending = getRemoteImageSize('https://example.invalid/image');
  controller.abort(new DOMException('Timed out', 'TimeoutError'));
  await assert.rejects(pending, { name: 'TimeoutError' });
});
