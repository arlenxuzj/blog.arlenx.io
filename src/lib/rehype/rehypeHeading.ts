/*
Copy and modify from
https://github.com/rehypejs/rehype-slug/blob/main/index.js
*/
import Slugger from 'github-slugger';
import { hasProperty } from 'hast-util-has-property';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'mdast-util-to-string';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

import { Heading } from '@/components/TableOfContent/TableOfContent';

const slugger = new Slugger();

// @ts-ignore
const rehypeHeading = options => {
  return (tree: Node) => {
    const prefix = options.prefix || '';
    slugger.reset();
    const exportRef = options.exportRef as Heading[];

    if (exportRef.length) {
      slugger.occurrences = {
        [exportRef[0].id]: 0
      };
    }

    visit(tree, 'element', (node: Node) => {
      // @ts-ignore
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        const textContent = toString(node);
        exportRef.push({
          id: prefix + slugger.slug(textContent),
          title: textContent,
          // @ts-ignore
          level: headingRank(node)
        });
      }
    });
  };
};

export default rehypeHeading;
