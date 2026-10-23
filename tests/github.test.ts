import assert from 'node:assert/strict';
import test from 'node:test';
import axios from 'axios';
import { githubRepoFetcher } from '../src/services/github';

for (const status of [401, 403, 404, 429, 500, undefined]) {
  test(`GitHub failure (${status ?? 'timeout'}) returns serializable unavailable metadata without leaking credentials`, async t => {
    const warnings: unknown[][] = [];
    t.mock.method(console, 'warn', (...args: unknown[]) => warnings.push(args));
    t.mock.method(axios, 'get', async () => {
      throw Object.assign(
        new Error('Authorization: Bearer private-github-key'),
        {
          response: status ? { status } : undefined
        }
      );
    });
    const result = await githubRepoFetcher('owner/repository');
    assert.equal(result, null);
    assert.equal(JSON.stringify({ repo: result }), '{"repo":null}');
    assert.ok(warnings.length > 0);
    assert.ok(!JSON.stringify(warnings).includes('private-github-key'));
  });
}

test('public GitHub metadata does not send a fabricated token when unconfigured', async t => {
  const token = process.env.GITHUB_TOKEN;
  delete process.env.GITHUB_TOKEN;
  t.after(() => {
    if (token === undefined) delete process.env.GITHUB_TOKEN;
    else process.env.GITHUB_TOKEN = token;
  });
  const requests: unknown[] = [];
  t.mock.method(axios, 'get', async (_url: string, config: unknown) => {
    requests.push(config);
    return { data: {} };
  });
  await githubRepoFetcher('owner/repository');
  assert.equal(requests.length, 2);
  assert.ok(!JSON.stringify(requests).includes('Bearer undefined'));
});
