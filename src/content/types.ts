import type { ReadTimeResults } from 'reading-time';

type Document = {
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    flattenedPath: string;
    contentType: 'mdx';
  };
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  wip?: boolean;
  ignore?: boolean;
  slug: string;
  body: { raw: string; code: string };
};

type Article = Document & {
  tags: string[];
  backgroundType?: string;
  readingTime: ReadTimeResults;
  titleSlug: string;
  fileName: string;
};

export type Post = Article & { type: 'Post' };
export type Snippet = Article & { type: 'Snippet'; language: string };
export type Page = Document & { type: 'Page'; updateDateAtBuildTime?: boolean };
export type ContentDocument = Post | Snippet | Page;
