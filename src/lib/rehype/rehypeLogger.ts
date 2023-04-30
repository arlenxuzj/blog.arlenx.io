import util from 'util';

import { Node } from 'unist';
import { visit, type Visitor, type VisitorResult } from 'unist-util-visit';

const rehypeLogger = () => {
  const visitor: Visitor = (node): VisitorResult => {
    console.log(util.inspect(node, false, 8, true));
    console.log('-'.repeat(80));
  };
  return (tree: Node) => visit(tree, 'element', visitor);
};

export default rehypeLogger;
