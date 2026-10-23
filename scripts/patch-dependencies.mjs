// Mitigation for GHSA-vfj7-8cjw-p6xm until braces publishes a fixed release.
// npm integrity verification remains enabled; only the exact reviewed source is patched.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(
  readFileSync(path.join(root, 'package-lock.json'), 'utf8')
);
const hash = source => createHash('sha256').update(source).digest('hex');
const originalHash =
  'e572166565f15fa6ad9865ae49d678218e32aabfd1b3720f6d0d43d39800d310';
const patchedHash =
  'a8a5cc9e5ada32c1cae1feb2d9ed4de085805d047442d1e10ae3b873643d0cf9';
let patched = 0;
for (const [location, entry] of Object.entries(lock.packages)) {
  if (!location.endsWith('/braces')) continue;
  const file = path.resolve(root, location, 'lib/parse.js');
  if (!file.startsWith(root + path.sep))
    throw new Error('Invalid dependency path');
  // Production-only installs can omit the affected development dependencies.
  if (!existsSync(file)) continue;
  const source = readFileSync(file, 'utf8');
  if (entry.version !== '3.0.3')
    throw new Error('Review braces security patch for the new version');
  if (hash(source) === patchedHash) continue;
  if (hash(source) !== originalHash)
    throw new Error('Unexpected braces source; refusing to patch');
  const result = source.replaceAll(
    'stack.push(block);',
    `if (stack.length >= 128) {
        throw new SyntaxError('Pattern exceeds maximum nesting depth (127)');
      }
      stack.push(block);`
  );
  if (hash(result) !== patchedHash)
    throw new Error('Braces patch verification failed');
  writeFileSync(file, result);
  patched++;
}
console.log(
  `Verified braces nesting-limit mitigation (${patched} copies patched)`
);
