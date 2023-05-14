import { MDXComponents as Components } from 'mdx/types';

import MDXBlockquote from './Common/MDXBlockquote';
import MDXCallout from './Common/MDXCallout';
import MDXCode from './Common/MDXCode';
import { MDXHr } from './Common/MDXCommon';
import {
  MDXHeading1,
  MDXHeading2,
  MDXHeading3,
  MDXHeading4,
  MDXHeading5,
  MDXHeading6
} from './Common/MDXHeading';
import MDXImage from './Common/MDXImage';
import MDXLink from './Common/MDXLink';
import {
  MDXListItem,
  MDXOrderedList,
  MDXUnorderedList
} from './Common/MDXList';
import MDXParagraph from './Common/MDXParagraph';
import MDXPre from './Common/MDXPre';
import {
  MDXTable,
  MDXTableBody,
  MDXTableCell,
  MDXTableHead,
  MDXTableRow
} from './Common/MDXTable';
import MDXDevIconSet, { MDXDevIcon } from './Widgets/MDXDevIconSet';
import MDXFindMe from './Widgets/MDXFindMe';
import MDXLinkPreview from './Widgets/MDXLinkPreview';

const MDXComponents: Components = {
  h1: MDXHeading1,
  h2: MDXHeading2,
  h3: MDXHeading3,
  h4: MDXHeading4,
  h5: MDXHeading5,
  h6: MDXHeading6,
  p: MDXParagraph,
  hr: MDXHr,
  blockquote: MDXBlockquote,
  ul: MDXUnorderedList,
  ol: MDXOrderedList,
  li: MDXListItem,
  img: MDXImage,
  a: MDXLink,
  aside: MDXCallout,
  code: MDXCode,
  pre: MDXPre,
  table: MDXTable,
  thead: MDXTableHead,
  tbody: MDXTableBody,
  tr: MDXTableRow,
  th: MDXTableCell,
  td: MDXTableCell,
  MDXParagraph,
  MDXDevIconSet,
  MDXDevIcon,
  MDXFindMe,
  MDXLinkPreview
};

export default MDXComponents;
