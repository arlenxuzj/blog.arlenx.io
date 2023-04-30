import fs from 'fs';

import axios from 'axios';
import { globbySync } from 'globby';
import matter from 'gray-matter';

import siteMeta from '@/configs/siteMeta';

console.log('Generating open graph images...');

const blogContent = globbySync(['contents/**/*.mdx', '!contents/pages'], {
  gitignore: true
}).filter(content => {
  const file = fs.readFileSync(content, 'utf-8');
  const { data } = matter(file);

  return !data.wip;
});

if (!fs.existsSync('public/images/og')) {
  fs.mkdirSync('public/images/og', { recursive: true });
}

blogContent.forEach(async content => {
  const file = fs.readFileSync(content, 'utf-8');
  const { data } = matter(file);

  const slug = content
    .replace('contents/', '')
    .replace('posts/', '')
    .replace('snippets/', '')
    .replace('.mdx', '');

  const ogImagePath = `public/images/og/${slug}.png`;
  const backgroundType = data.backgroundType || 'default';

  const writer = fs.createWriteStream(ogImagePath);

  try {
    const response = await axios.get(`${siteMeta.url}/api/og`, {
      params: {
        title: data.title,
        backgroundType
      },
      responseType: 'stream'
    });

    const stream = response.data.pipe(writer);

    stream.on('finish', () => {
      console.log(`Generated ${slug}.png in public/images/og`);
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
});
