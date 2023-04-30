/*
Copy and modify from
https://github.com/rehypejs/rehype-slug/blob/main/index.js
*/
import fs from 'fs';
import path from 'path';

import Slugger from 'github-slugger';
import matter from 'gray-matter';
import { hasProperty } from 'hast-util-has-property';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

const slugs = new Slugger();

const rehypeSlug = (options = {}) => {
  // @ts-ignore
  const prefix = options.prefix || '';
  // @ts-ignore

  return (tree: Node, file: VFile) => {
    slugs.reset();

    const source = fs.readFileSync(
      path.join(
        process.cwd(),
        'contents',
        // @ts-ignore
        file.data.rawDocumentData.sourceFilePath
      ),
      'utf8'
    );

    const parsedFile = matter(source);

    const data = parsedFile.data;

    if (data && data.title) {
      slugs.occurrences = {
        [data.title]: 0
      };
    }

    visit(tree, 'element', node => {
      // @ts-ignore
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        // @ts-ignore
        node.properties.id = prefix + slugs.slug(toString(node));
      }
    });
  };
};

export default rehypeSlug;
