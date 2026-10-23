import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import * as runtime from 'react/jsx-runtime';
import { runSync } from '@mdx-js/mdx';
import { renderToStaticMarkup } from 'react-dom/server';
import { compileDocument } from '../src/content/build';

const source = `---
title: Test post
description: A real MDX article
tags: [typescript]
createdAt: 2023-04-30
---
## Hello world

**Strong text** and a link to [Next.js](https://nextjs.org).

\`\`\`ts
const answer = 42;
\`\`\`
`;

test('MDX compilation preserves slugs, dates, headings, formatting and highlighted code', async () => {
  const doc = await compileDocument('posts/test-post.mdx', source);
  assert.equal(doc.type, 'Post');
  assert.equal(doc.slug, 'test-post');
  assert.equal(doc.createdAt, '2023-04-30T00:00:00.000Z');
  assert.ok(doc.body.raw.includes('const answer = 42'));
  assert.ok('readingTime' in doc && doc.readingTime.words > 0);
  const { default: Content } = runSync(doc.body.code, runtime);
  const html = renderToStaticMarkup(createElement(Content));
  assert.match(html, /<strong>Strong text<\/strong>/);
  assert.match(html, /id="hello-world"/);
  assert.match(html, /language-ts/);
  assert.match(html, /token/);
});

test('invalid required frontmatter fails with its source path', async () => {
  await assert.rejects(
    compileDocument(
      'posts/broken.mdx',
      '---\ntitle: Missing fields\n---\nHello'
    ),
    /posts\/broken.mdx.*description/
  );
});

test('snippet language and tags remain required', async () => {
  await assert.rejects(
    compileDocument('snippets/example.mdx', source),
    /language/
  );
});

test('MDX exports after headings remain module declarations', async () => {
  const doc = await compileDocument(
    'posts/export.mdx',
    source +
      '\nexport const value = "exported content";\n\n<span>{value}</span>\n'
  );
  const { default: Content } = runSync(doc.body.code, runtime);
  assert.match(
    renderToStaticMarkup(createElement(Content)),
    /exported content/
  );
});
