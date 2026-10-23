import { readFileSync } from 'node:fs';
import path from 'path';
import { imageSize } from 'image-size';

type ISize = ReturnType<typeof imageSize>;

export const getRemoteImageSize = async (urlString: string): Promise<ISize> => {
  const url = new URL(urlString);
  if (url.protocol !== 'https:') throw new Error('Remote images require HTTPS');
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok || !response.body) {
    await response.body?.cancel();
    throw new Error(`Remote image request failed (${response.status})`);
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 10 * 1024 * 1024) {
        await reader.cancel();
        throw new Error('Remote image exceeds 10 MiB');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return imageSize(Buffer.concat(chunks));
};

export const getLocalImageSize = (pathString: string): ISize => {
  return imageSize(
    readFileSync(path.join(process.cwd(), 'public', pathString))
  );
};
