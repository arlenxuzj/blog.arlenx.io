/* eslint-disable no-undef */
/*
Copy and modify from
https://github.com/Golmote/prism-treeview/blob/master/prism-treeview.js
*/
treeview.displayName = 'treeview';
treeview.aliases = [];

/** @type {import('refractor/lib/core.js').Syntax} */
export default function treeview(Prism) {
  Prism.languages.treeview = {
    'treeview-part': {
      pattern: /(^|\n).+/,
      inside: {
        'entry-line': [
          {
            pattern: /\|-- |├── /,
            alias: 'line-h'
          },
          {
            // eslint-disable-next-line no-regex-spaces
            pattern: /\|   |│   /,
            alias: 'line-v'
          },
          {
            pattern: /`-- |└── /,
            alias: 'line-v-last'
          },
          {
            pattern: / {4}/,
            alias: 'line-v-gap'
          }
        ],
        'entry-name': {
          pattern: /.*\S.*/,
          inside: {
            // symlink
            operator: / -> /
          }
        }
      }
    }
  };
}
