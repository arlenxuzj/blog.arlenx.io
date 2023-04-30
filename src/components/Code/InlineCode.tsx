import { StyledInlineCode } from './InlineCode.styles';

export type InlineCodeProps = {
  children: React.ReactNode;
};

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <StyledInlineCode component='code' family='mono'>
      {children}
    </StyledInlineCode>
  );
};

export default InlineCode;
