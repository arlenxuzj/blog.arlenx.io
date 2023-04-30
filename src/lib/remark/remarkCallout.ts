/*
Copy and modified from
https://github.com/Microflash/remark-callout-directives/blob/main/index.js
 */
import { defu } from 'defu';
import { fromHtml } from 'hast-util-from-html';
import { h } from 'hastscript';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { Node } from 'unist';
import { visit, type Visitor, type VisitorResult } from 'unist-util-visit';

export type Options = {
  aliases: {
    [key: string]: {
      type: string;
      title?: string;
    };
  };
  callouts: {
    [key: string]: {
      title: string;
      icon?: string;
      tagName?: string;
    };
  };
};

export const defaultOptions: Options = {
  aliases: {
    hint: {
      type: 'tip',
      title: 'Hint'
    },
    important: {
      type: 'tip',
      title: 'Important'
    },
    caution: {
      type: 'warning',
      title: 'Caution'
    },
    attention: {
      type: 'warning',
      title: 'Attention'
    }
  },
  callouts: {
    note: {
      title: 'Note',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>`
    },
    info: {
      title: 'Info',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    },
    tip: {
      title: 'Tip',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`
    },
    warning: {
      title: 'Warning',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
    }
  }
};

export const generate = (title: string, children: unknown, icon?: string) => {
  const indicators = [];

  if (icon) {
    indicators.push({
      type: 'paragraph',
      data: {
        hName: 'div',
        hProperties: { className: ['callout-icon'] }
      },
      children: [fromHtml(icon, { fragment: true })]
    });
  }

  const titleNode = fromMarkdown(title).children[0];
  if (titleNode.type === 'paragraph') {
    titleNode.data = {
      hName: 'div',
      hProperties: { className: ['callout-title'] }
    };
  } else {
    titleNode.data = {
      hProperties: { className: ['callout-title'] }
    };
  }
  indicators.push(titleNode);

  return [
    {
      type: 'paragraph',
      data: {
        hName: 'div',
        hProperties: { className: ['callout-indicator'] }
      },
      children: indicators
    },
    {
      type: 'paragraph',
      data: {
        hName: 'div',
        hProperties: { className: ['callout-content'] }
      },
      children
    }
  ];
};

const remarkCallout = (userOptions: Partial<Options> = {}) => {
  const options = defu(userOptions, defaultOptions);
  const { callouts } = options;
  const aliases = defu(
    options.aliases,
    Object.keys(callouts).reduce(
      (a, v) => ({
        ...a,
        [v]: {
          type: v,
          title: callouts[v].title
        }
      }),
      {}
    )
  );

  const visitor: Visitor = (node): VisitorResult => {
    if (node.type === 'containerDirective') {
      // @ts-ignore
      if (!aliases[node.name]) {
        return;
      }

      // @ts-ignore
      const aliasCallout = aliases[node.name];
      const calloutType = aliasCallout.type;
      const callout = callouts[calloutType];
      const data = node.data || (node.data = {});
      // @ts-ignore
      const { title, ...attributes } = node.attributes;
      // @ts-ignore
      node.attributes = {
        ...attributes,
        class: `callout callout-${calloutType}`
      };
      // @ts-ignore
      node.children = generate(
        title || aliasCallout.title || callout.title,
        // @ts-ignore
        node.children,
        callout.icon
      );
      const tagName = callout.tagName || 'aside';
      data.hName = tagName;
      // @ts-ignore
      data.hProperties = h(tagName, node.attributes).properties;
    }
  };

  return (tree: Node) => {
    visit(tree, visitor);
  };
};

export default remarkCallout;
