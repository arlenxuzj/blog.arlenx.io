/*
Copy and modify from
https://github.com/rehypejs/rehype-slug/blob/main/index.js
*/
import Slugger from 'github-slugger';
import { hasProperty } from 'hast-util-has-property';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

const rehypeSlug = (options = {}) => {
  // @ts-ignore
  const prefix = options.prefix || '';
  // @ts-ignore

  return (tree: Node, file: VFile) => {
    const slugs = new Slugger();

    const data = file.data.frontmatter as { title?: string } | undefined;

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
