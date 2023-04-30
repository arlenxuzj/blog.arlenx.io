import { Text } from '../Typography';

export type BlogTitleProps = {
  id: string;
  title: string;
};

const BlogTitle = ({ id, title }: BlogTitleProps) => {
  return (
    <Text component='h1' fontWeight={800} size='5xl' id={id}>
      {title}
    </Text>
  );
};

export default BlogTitle;
