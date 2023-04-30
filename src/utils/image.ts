import https from 'https';
import path from 'path';
import url from 'url';

import imageSize from 'image-size';
import { ISize } from 'image-size/dist/types/interface';

export const getRemoteImageSize = async (urlString: string): Promise<ISize> => {
  const options = url.parse(urlString);

  return new Promise((resolve, reject) => {
    https
      .get(options, res => {
        const chunks: Array<Buffer> = [];

        res.on('data', chunk => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const size = imageSize(buffer);

          resolve(size);
        });
      })
      .on('error', e => {
        reject(e);
      });
  });
};

export const getLocalImageSize = (pathString: string): ISize => {
  return imageSize(path.join(process.cwd(), 'public', pathString));
};
