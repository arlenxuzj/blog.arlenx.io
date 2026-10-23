import { useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';
import { runSync } from '@mdx-js/mdx';

export function useMDXComponent(code: string) {
  return useMemo(() => runSync(code, runtime).default, [code]);
}
