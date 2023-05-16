import fs from 'fs';

import { format as formatFn, parseISO } from 'date-fns';
import { globbySync } from 'globby';
import matter from 'gray-matter';
import _ from 'lodash';
import prettier from 'prettier';
import { exec } from 'shelljs';

import siteMeta from '@/configs/siteMeta';

console.log('Generating sitemap...');

const getLastModifiedDateFromGit = (filename: string) => {
  const stdout = exec(`git log -1 --pretty="format:%cI" ${filename}`, {
    silent: true
  }).stdout;

  return formatFn(parseISO(stdout), 'yyyy-MM-dd');
};

const pagePaths = globbySync(
  [
    'src/pages/**/*.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
    '!src/pages/404.tsx'
  ],
  {
    gitignore: true
  }
)
  .filter(path => path.indexOf('[slug]') === -1)
  .map(path => ({
    path,
    lastModified: getLastModifiedDateFromGit(path)
  }));

// console.log(pagePaths);

const pageUrls = pagePaths.map(pagePath => ({
  ...pagePath,
  url: pagePath.path
    .replace('src/pages', '')
    .replace('/index', '')
    .replace('.tsx', '')
}));

// console.log(pageUrls);

const blogContentPaths = globbySync(['contents/**/*.mdx'], {
  gitignore: true
}).filter(content => {
  const file = fs.readFileSync(content, 'utf-8');
  const { data } = matter(file);
  return !data.ignore;
});

const blogContentUrls = blogContentPaths.map(contentPath => {
  const file = fs.readFileSync(contentPath, 'utf-8');
  const { data } = matter(file);

  return {
    path: contentPath,
    lastModified: formatFn(data.updatedAt || data.createdAt, 'yyyy-MM-dd'),
    url: contentPath
      .replace('contents', '')
      .replace('.mdx', '')
      .replace('/pages', '')
  };
});

// console.log(blogContentUrls);

const pathUrlsWithoutMDX = pageUrls.filter(pageUrl => {
  return !blogContentUrls.find(item => item.url === pageUrl.url);
});

// console.log(pathUrlsWithoutMDX);

const tagsUrls = _.uniqBy(
  _.orderBy(
    _.flatten(
      blogContentPaths.map(content => {
        const file = fs.readFileSync(content, 'utf-8');
        const { data } = matter(file);

        return data.tags?.map((tag: string) => ({
          lastModified: formatFn(
            data.updatedAt || data.createdAt,
            'yyyy-MM-dd'
          ),
          url: `/tags/${tag}`
        }));
      })
    ).filter(Boolean),
    'lastModified',
    'desc'
  ),
  'url'
);

// console.log(tagsUrls);

const urlData: { url: string; path?: string; lastModified: string }[] = [
  ...pathUrlsWithoutMDX,
  ...blogContentUrls,
  ...tagsUrls
];

// console.log(urlData);

const urlTags = urlData
  .map(data => {
    return `<url>
      <loc>${`${siteMeta.url}${data.url}`}</loc>
      <lastmod>${data.lastModified}</lastmod>
    </url>
    `;
  })
  .join('');

const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlTags}
  </urlset>
`;

prettier.resolveConfig('./.prettierrc').then(options => {
  const formatted = prettier.format(sitemap, {
    ...options,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);

  console.log('Sitemap generated in public/sitemap.xml !');
});
