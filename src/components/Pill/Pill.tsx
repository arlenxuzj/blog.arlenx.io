import { BoxProps } from '@mui/material';

import { PillVariant, StyledPill } from './Pill.styles';

export type PillProps = BoxProps & { variant?: PillVariant };

const Pill = ({ variant, children, ...rest }: PillProps) => {
  return (
    <StyledPill variant={variant} {...rest}>
      {children}
    </StyledPill>
  );
};

export default Pill;
