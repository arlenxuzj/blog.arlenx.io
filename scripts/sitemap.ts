import fs from 'fs';

import { globbySync } from 'globby';
import matter from 'gray-matter';
import _ from 'lodash';
import prettier from 'prettier';

import navLinks from '@/configs/navLinks';
import siteMeta from '@/configs/siteMeta';

console.log('Generating sitemap...');

const pages = globbySync(
  ['pages/*.tsx', '!pages/_*.tsx', '!pages/api', '!pages/404.tsx'],
  {
    gitignore: true
  }
);

const pageUrls = pages.map(page =>
  page.replace('pages', '').replace('.tsx', '').replace('/index', '/')
);

const navLinkUrls = navLinks.map(navLink => navLink.href);

const blogContent = globbySync(['contents/**/*.mdx', '!contents/pages'], {
  gitignore: true
}).filter(content => {
  const file = fs.readFileSync(content, 'utf-8');
  const { data } = matter(file);

  return !data.wip;
});

const blogContentUrls = blogContent.map(content =>
  content.replace('contents', '').replace('.mdx', '')
);

const tagsUrls = _.uniq(
  _.flatten(
    blogContent.map(content => {
      const file = fs.readFileSync(content, 'utf-8');
      const { data } = matter(file);

      return data.tags.map((tag: string) => `/tags/${tag}`);
    })
  )
);

const paths = _.uniq([
  ...pageUrls,
  ...navLinkUrls,
  ...blogContentUrls,
  ...tagsUrls
]).sort();

const urlTags = paths
  .map(path => {
    return `<url>
      <loc>${`${siteMeta.url}${path}`}</loc>
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
