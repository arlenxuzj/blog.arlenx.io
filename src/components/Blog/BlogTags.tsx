import { Stack } from '@mui/material';

import { Tag } from '../Tag';

export type BlogTagsProps = {
  tags: string[];
};

const BlogTags = ({ tags }: BlogTagsProps) => {
  return (
    <Stack direction='row' rowGap={1} columnGap={2} flexWrap='wrap'>
      {tags.map(tag => (
        <Tag key={tag} label={tag} />
      ))}
    </Stack>
  );
};

export default BlogTags;
