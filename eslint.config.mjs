import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import compat from 'eslint-plugin-compat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.contentlayer/**',
      '.generated/**',
      'out/**',
      'build/**',
      'next-env.d.ts'
    ]
  },
  ...next,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: { compat },
    settings: { react: { version: 'detect' } },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off'
    }
  },
  // Repository-authored MDX is compiled to a component, memoized by its code.
  {
    files: ['src/pages/**/*.tsx'],
    rules: { 'react-hooks/static-components': 'off' }
  },
  { files: ['src/**/*.{ts,tsx}'], rules: { 'compat/compat': 'error' } },
  // This image decoder executes only in the Node.js content compiler.
  { files: ['src/utils/image.ts'], rules: { 'compat/compat': 'off' } }
);
