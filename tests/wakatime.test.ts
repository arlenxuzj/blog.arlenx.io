import assert from 'node:assert/strict';
import test from 'node:test';
import { getWakatimeData } from '../src/services/wakatime';

const total = { data: { range: { start: '2023-01-01' }, text: '10 hrs' } };
const stats = {
  data: { editors: [], languages: [], machines: [], operating_systems: [] }
};

test('missing WakaTime credentials omit statistics without making requests', async () => {
  let calls = 0;
  const result = await getWakatimeData('', async () => {
    calls++;
    throw new Error('must not fetch');
  });
  assert.equal(result, null);
  assert.equal(calls, 0);
});

test('WakaTime failures cannot leak credentials or break unrelated blog content', async t => {
  const warnings: unknown[][] = [];
  t.mock.method(console, 'warn', (...args: unknown[]) => {
    warnings.push(args);
  });
  const result = await getWakatimeData('private-key', async () => {
    throw new Error('401 at ?api_key=private-key');
  });
  assert.equal(result, null);
  assert.equal(warnings.length, 1);
  assert.ok(!JSON.stringify(warnings).includes('private-key'));
});

test('successful WakaTime responses retain real statistics', async () => {
  const result = await getWakatimeData('test-key', async (url: string) =>
    url.includes('all_time_since_today') ? total : stats
  );
  assert.deepEqual(result, { allTime: total, stats });
});

test('malformed WakaTime data is omitted rather than rendered as fake statistics', async t => {
  t.mock.method(console, 'warn', () => undefined);
  assert.equal(
    await getWakatimeData('test-key', async () => ({ data: {} })),
    null
  );
});

test('public statistics exclude private provider fields', async () => {
  const result = await getWakatimeData('test-key', async url =>
    url.includes('all_time_since_today')
      ? { data: { ...total.data, private: 'private-value' } }
      : {
          data: {
            ...stats.data,
            projects: [{ name: 'private-value' }],
            editors: [
              {
                name: 'VS Code',
                text: '1 hr',
                percent: 100,
                private: 'private-value'
              }
            ]
          }
        }
  );
  assert.ok(result);
  assert.ok(!JSON.stringify(result).includes('private-value'));
});
