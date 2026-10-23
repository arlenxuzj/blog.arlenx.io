import { Text } from '../Typography';

export type BlogTitleProps = {
  id: string;
  title: string;
};

const BlogTitle = ({ id, title }: BlogTitleProps) => {
  return (
    <Text
      component='h1'
      size='5xl'
      id={id}
      sx={{
        fontWeight: 800
      }}
    >
      {title}
    </Text>
  );
};

export default BlogTitle;
