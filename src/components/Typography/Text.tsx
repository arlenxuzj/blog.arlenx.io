import Typography, { TypographyProps } from './Typography';

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export type TextProps<C extends React.ElementType, P = {}> = TypographyProps<
  C,
  P & {
    size?: TextSize;
  }
>;

const Text = <C extends React.ElementType>({
  children,
  size = 'sm',
  ...rest
}: TextProps<C>) => {
  const handleSize = (size: TextSize) => {
    switch (size) {
      case 'xs':
        return 14;
      case 'sm':
        return 16;
      case 'md':
        return 18;
      case 'lg':
        return 20;
      case 'xl':
        return 22;
      case '2xl':
        return 24;
      case '3xl':
        return 28;
      case '4xl':
        return 32;
      case '5xl':
        return 36;
      default:
        return 16;
    }
  };

  return (
    // @ts-ignore
    <Typography fontSize={handleSize(size)} {...rest}>
      {children}
    </Typography>
  );
};

export default Text;
