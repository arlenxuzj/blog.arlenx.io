import { Node } from 'unist';
import { visit, type Visitor, type VisitorResult } from 'unist-util-visit';

const rehypeCodeTitle = () => {
  const visitor: Visitor = (node, index, parent): VisitorResult => {
    // @ts-ignore
    if (!parent || node.tagName !== 'pre') {
      return;
    }

    const pre = node;
    // @ts-ignore
    const code = Array.isArray(pre.children) ? pre.children[0] : pre.children;
    const className: Array<string | never> = code.properties.className || [];

    const updatedClassName = className.reduce((acc, cls) => {
      // If cls is something like...
      // i.e. language-typescript:lib/mdx.ts
      if (cls.includes(':')) {
        // Split on the ':'
        const [langClassName, title] = cls.split(':');
        acc.push(langClassName);
        // @ts-ignore
        pre.properties = { ...pre.properties, title };
        return acc;
      }
      if (cls.slice(0, 9) === 'language-') {
        acc.push(cls);
        // @ts-ignore
        pre.properties = { ...pre.properties, language: cls.slice(9) };
        return acc;
      }
      return acc;
    }, [] as Array<string>);

    // @ts-ignore
    pre.children = [{ ...code, properties: { className: updatedClassName } }];
  };

  return (tree: Node) => {
    visit(tree, 'element', visitor);
  };
};

export default rehypeCodeTitle;
