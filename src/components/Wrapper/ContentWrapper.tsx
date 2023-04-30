import { DEFAULT_CONTENT_WIDTH } from '@/constants';

import { StyledContentWrapper } from './ContentWrapper.styles';

export type ContentWrapperProps = {
  contentWidth?: number;
  main?: boolean;
  children: React.ReactNode;
};

const ContentWrapper = ({
  contentWidth = DEFAULT_CONTENT_WIDTH,
  main = false,
  children
}: ContentWrapperProps) => {
  return (
    <StyledContentWrapper
      contentWidth={contentWidth}
      component={main ? 'main' : 'div'}
    >
      {children}
    </StyledContentWrapper>
  );
};

export default ContentWrapper;
