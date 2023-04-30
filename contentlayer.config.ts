import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { slug } from 'github-slugger';
import readingTime from 'reading-time';
// import { refractor } from 'refractor/lib/core.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
// import rehypePrismGenerator from 'rehype-prism-plus/generator';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';

// import treeView from './lib/prism/treeview.js';
import {
  rehypeCodeTitle,
  rehypeImage,
  rehypeSectionize,
  rehypeSlug
} from './src/lib/rehype';
import { remarkCallout } from './src/lib/remark';

// refractor.register(treeView);

// const myRehypePrism = rehypePrismGenerator(refractor);

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the post',
      required: true
    },
    description: {
      type: 'string',
      description: 'Description of the post',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the post',
      required: true
    },
    createdAt: {
      type: 'date',
      description: 'Date when the post was created',
      required: true
    },
    updatedAt: {
      type: 'date',
      description: 'Date when the post was updated',
      required: false
    },
    wip: {
      type: 'boolean',
      description: 'Whether the post is a work in progress',
      required: false
    },
    backgroundType: {
      type: 'string',
      description: 'Open Graph background type',
      required: false
    }
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: doc => readingTime(doc.body.raw)
    },
    slug: {
      type: 'string',
      resolve: post => post._raw.flattenedPath.replace('posts/', '')
    },
    titleSlug: {
      type: 'string',
      resolve: post => slug(post.title)
    },
    fileName: {
      type: 'string',
      resolve: post => post._raw.sourceFileName
    }
  }
}));

export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: `snippets/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the snippet',
      required: true
    },
    description: {
      type: 'string',
      description: 'Description of the snippet',
      required: true
    },
    language: {
      type: 'string',
      description: 'Language of the snippet',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the snippet',
      required: true
    },
    createdAt: {
      type: 'date',
      description: 'Date when the snippet was created',
      required: true
    },
    updatedAt: {
      type: 'date',
      description: 'Date when the snippet was updated',
      required: false
    },
    wip: {
      type: 'boolean',
      description: 'Whether the snippet is a work in progress',
      required: false
    },
    backgroundType: {
      type: 'string',
      description: 'Open Graph background type',
      required: false
    }
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: doc => readingTime(doc.body.raw)
    },
    slug: {
      type: 'string',
      resolve: snippet => snippet._raw.flattenedPath.replace('snippets/', '')
    },
    titleSlug: {
      type: 'string',
      resolve: snippet => slug(snippet.title)
    },
    fileName: {
      type: 'string',
      resolve: snippet => snippet._raw.sourceFileName
    }
  }
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the page',
      required: true
    },
    description: {
      type: 'string',
      description: 'Description of the page',
      required: true
    },
    createdAt: {
      type: 'date',
      description: 'Date when the post was created',
      required: true
    },
    updatedAt: {
      type: 'date',
      description: 'Date when the post was updated',
      required: false
    },
    wip: {
      type: 'boolean',
      description: 'Whether the page is a work in progress',
      required: false
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: post => post._raw.flattenedPath.replace('pages/', '')
    }
  }
}));

export default makeSource({
  contentDirPath: './contents',
  disableImportAliasWarning: true,
  documentTypes: [Post, Page, Snippet],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkUnwrapImages,
      remarkDirective,
      remarkCallout
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['heading-anchor']
          }
        }
      ],
      rehypeSectionize,
      rehypeImage,
      rehypeCodeTitle,
      [
        rehypePrism,
        {
          ignoreMissing: true,
          showLineNumbers: true
        }
      ]
      // [myRehypePrism, { ignoreMissing: true, showLineNumbers: true }]
      // rehypeLogger
    ]
  }
});
