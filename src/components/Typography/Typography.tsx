import {
  default as MuiTypography,
  type TypographyProps as MuiTypographyProps
} from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

export type TypographyFontFamily = 'default' | 'display' | 'mono';

export type TypographyProps<
  C extends React.ElementType,
  P = {}
> = MuiTypographyProps<
  C,
  P & {
    component?: C;
    noSelect?: boolean;
    family?: TypographyFontFamily;
  }
>;
export const StyledTypography = styled(MuiTypography)<MuiTypographyProps>(
  () => ({})
) as typeof MuiTypography;

const Typography = <C extends React.ElementType>({
  children,
  noSelect,
  family,
  sx,
  ...rest
}: TypographyProps<C>) => {
  const theme = useTheme();

  const handleFontFamily = (family: TypographyFontFamily) => {
    switch (family) {
      case 'default':
        return '"Inter", "Helvetica", "Arial", sans-serif';
      case 'mono':
        return '"Fira Code", monospace';
      default:
        return `${family}, ${theme.typography.fontFamily}`;
    }
  };

  return (
    <StyledTypography
      {...rest}
      sx={[
        {
          fontFamily: family && handleFontFamily(family),
          userSelect: noSelect && 'none'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
