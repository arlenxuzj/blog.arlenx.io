import assert from 'node:assert/strict';
import test from 'node:test';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../src/database';
import postHandler from '../src/pages/api/post/[slug]';
import snippetHandler from '../src/pages/api/snippet/[slug]';

for (const [name, handler, model] of [
  ['post', postHandler, prisma.post],
  ['snippet', snippetHandler, prisma.snippet]
] as const) {
  test(`${name} API does not expose database credentials in errors`, async t => {
    const original = model.findUnique;
    Object.assign(model, {
      findUnique: async () => {
        throw new Error('mongodb://user:private-password@cluster.example/blog');
      }
    });
    t.after(() => {
      Object.assign(model, { findUnique: original });
    });
    let status = 0;
    let body: unknown;
    const response = {
      status(code: number) {
        status = code;
        return this;
      },
      json(value: unknown) {
        body = value;
        return this;
      }
    };
    await handler(
      {
        method: 'GET',
        query: { slug: 'example' }
      } as unknown as NextApiRequest,
      response as unknown as NextApiResponse
    );
    assert.equal(status, 500);
    assert.deepEqual(body, {
      message: 'Unable to load or update the view count.'
    });
  });
}
