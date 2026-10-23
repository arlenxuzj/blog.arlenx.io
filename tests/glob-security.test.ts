import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const braces = require('braces') as {
  expand: (pattern: string) => string[];
  compile: (pattern: string) => string;
};

for (const [open, close] of [
  ['{', '}'],
  ['(', ')']
]) {
  test(`deep ${open}${close} patterns are rejected before recursive compilation`, () => {
    assert.throws(
      () => braces.compile(open.repeat(256) + 'a,b' + close.repeat(256)),
      /exceeds maximum nesting depth/
    );
  });
}

test('normal brace expansion remains compatible with lint and file discovery', () => {
  assert.deepEqual(braces.expand('src/{pages,components}/**/*.{ts,tsx}'), [
    'src/pages/**/*.ts',
    'src/pages/**/*.tsx',
    'src/components/**/*.ts',
    'src/components/**/*.tsx'
  ]);
});
