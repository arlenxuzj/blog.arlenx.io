import assert from 'node:assert/strict';
import test from 'node:test';
import axios from 'axios';
import { githubRepoFetcher } from '../src/services/github';

test('GitHub metadata failures do not expose authentication headers', async t => {
  t.mock.method(axios, 'get', async () => {
    throw new Error('Authorization: Bearer private-github-key');
  });
  await assert.rejects(githubRepoFetcher('owner/repository'), error => {
    assert.ok(error instanceof Error);
    assert.match(error.message, /Unable to fetch GitHub repository metadata/);
    assert.ok(!error.message.includes('private-github-key'));
    return true;
  });
});

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
