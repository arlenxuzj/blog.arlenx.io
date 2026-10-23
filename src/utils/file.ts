import { glob } from 'node:fs/promises';

export const getFiles = async (pattern: string) =>
  Array.fromAsync(glob(pattern));
