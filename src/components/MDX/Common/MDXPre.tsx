import { useRef, useState } from 'react';

import { copyToClipboard } from '@/utils/browser';

import { StyledButton } from '../../Button/Button.styles';
import { Text } from '../../Typography';
import {
  StyledMDXCodeBlock,
  StyledMDXCodeBlockTitle,
  StyledMDXPre
} from './MDXPre.styles';

export type MDXPreProps = {
  className?: string;
  title?: string;
  language?: string;
  children?: React.ReactNode;
};

const MDXPre = (props: MDXPreProps) => {
  const { className, children, title } = props;
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const codeContentRef = useRef<HTMLPreElement>(null);
  // console.log(children);

  const handleCopyButtonClick = () => {
    setCopyButtonText('Copied!');
    copyToClipboard(codeContentRef.current?.textContent || '');
    setTimeout(() => {
      setCopyButtonText('Copy');
    }, 2000);
  };

  return (
    <StyledMDXCodeBlock
      onMouseEnter={() => {
        setShowCopyButton(true);
        setCopyButtonText('Copy');
      }}
      onMouseLeave={() => {
        setShowCopyButton(false);
        setCopyButtonText('Copy');
      }}
    >
      {title && (
        <StyledMDXCodeBlockTitle direction='row' alignItems='center'>
          <Text
            fontWeight={500}
            sx={{
              flexGrow: 1
            }}
          >
            {title}
          </Text>
          <StyledButton
            onClick={handleCopyButtonClick}
            sx={theme => ({
              display: { xs: 'block', sm: showCopyButton ? 'block' : 'none' },
              padding: theme.spacing(0.5, 1),
              fontSize: '14px',
              color: theme.vars.palette.primary.main,
              backgroundColor: `hsla(
                ${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity}
              )`
            })}
          >
            {copyButtonText}
          </StyledButton>
        </StyledMDXCodeBlockTitle>
      )}
      <StyledMDXPre className={className} ref={codeContentRef} title={title}>
        {children}
      </StyledMDXPre>
    </StyledMDXCodeBlock>
  );
};
export default MDXPre;
