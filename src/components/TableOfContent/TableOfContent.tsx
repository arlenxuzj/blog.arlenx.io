/*
Copy and modify from
https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/27074d0d3c/gatsby-theme-maximeheckel/components/TableOfContent/TableOfContent.tsx
*/

import { SCROLL_OFFSET } from '@/constants';
import useProgress from '@/hooks/useProgress';
import useScrollSpy from '@/hooks/useScrollSpy';

import { InternalLink } from '../Link';
import ProgressBar from './ProgressBar';
import {
  StyledTocList,
  StyledTocListItem,
  TocWrapper
} from './TableOfContent.styles';

export type Heading = {
  id: string;
  level: number;
  title: string;
};

export type TableOfContentProps = {
  headings: Heading[];
};

const TableOfContent = ({ headings }: TableOfContentProps) => {
  const readingProgress = useProgress();
  const activeId = useScrollSpy(headings, { offset: SCROLL_OFFSET });

  const handleClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({
        top: element.offsetTop + SCROLL_OFFSET * -1,
        behavior: 'auto'
      });

      window.location.hash = id;
    }
  };

  return (
    <TocWrapper component='nav'>
      <ProgressBar progress={readingProgress} />
      <StyledTocList>
        {headings
          .filter(heading => heading.level !== 1)
          .map(heading => (
            <StyledTocListItem key={heading.id} level={heading.level}>
              <InternalLink
                href={`#${heading.id}`}
                color='text.secondary'
                underline='none'
                sx={{
                  display: 'block',
                  fontSize: '14px',
                  color:
                    activeId === heading.id ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color:
                      activeId === heading.id ? 'primary.main' : 'text.primary'
                  }
                }}
                onClick={handleClick(heading.id)}
              >
                {heading.title}
              </InternalLink>
            </StyledTocListItem>
          ))}
      </StyledTocList>
    </TocWrapper>
  );
};

export default TableOfContent;
