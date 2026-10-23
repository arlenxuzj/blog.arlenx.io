import assert from 'node:assert/strict';
import test from 'node:test';
import { getCommentConfig } from '../src/lib/common/comment';

test('comment configuration is serializable when optional environment variables are absent', () => {
  const names = [
    'GISCUS_REPO',
    'GISCUS_REPO_ID',
    'GISCUS_CATEGORY',
    'GISCUS_CATEGORY_ID'
  ];
  const saved = names.map(name => process.env[name]);
  try {
    for (const name of names) delete process.env[name];
    const config = getCommentConfig();
    for (const [name, value] of Object.entries(config)) {
      assert.notEqual(
        value,
        undefined,
        `${name} cannot be serialized by Next.js`
      );
    }
    assert.equal(config.repo, '');
  } finally {
    names.forEach((name, index) => {
      if (saved[index] === undefined) delete process.env[name];
      else process.env[name] = saved[index];
    });
  }
});

test('comment configuration retains configured repository and category', () => {
  const names = [
    'GISCUS_REPO',
    'GISCUS_REPO_ID',
    'GISCUS_CATEGORY',
    'GISCUS_CATEGORY_ID'
  ];
  const values = ['owner/blog', 'repo-id', 'Announcements', 'category-id'];
  const saved = names.map(name => process.env[name]);
  try {
    names.forEach((name, index) => {
      process.env[name] = values[index];
    });
    const config = getCommentConfig();
    assert.deepEqual(
      [config.repo, config.repoId, config.category, config.categoryId],
      values
    );
  } finally {
    names.forEach((name, index) => {
      if (saved[index] === undefined) delete process.env[name];
      else process.env[name] = saved[index];
    });
  }
});
