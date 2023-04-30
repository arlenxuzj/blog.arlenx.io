import { Box, Card, Stack } from '@mui/material';
import { Snippet } from 'contentlayer/generated';

import { DEFAULT_CONTENT_WIDTH } from '@/constants';

import { DevIconName, DevSvgIcon } from '../Icon';
import { InternalLink } from '../Link';
import { Text } from '../Typography';

export type SnippetCardProps = {
  snippet: Snippet;
};

const SnippetCard = ({ snippet }: SnippetCardProps) => {
  return (
    <InternalLink href={`/snippets/${snippet.slug}`} underline='none'>
      <Card
        variant='outlined'
        sx={theme => ({
          display: 'flex',
          margin: 'auto',
          maxWidth: DEFAULT_CONTENT_WIDTH / 2,
          backgroundColor: 'background.default',
          borderColor: theme.vars.palette.border.snippet,
          '&:hover': {
            borderColor: theme.vars.palette.text.secondary
          }
        })}
      >
        <Box
          sx={{
            p: 2,
            lineHeight: 0
          }}
        >
          <DevSvgIcon
            name={snippet.language as DevIconName}
            sx={{
              fontSize: 96
            }}
          />
        </Box>
        <Stack
          gap={1}
          sx={{
            p: 2
          }}
        >
          <Text component='h3' color='text.primary' fontWeight={600} size='2xl'>
            {snippet.title}
          </Text>
          <Text
            color='text.secondary'
            sx={{
              mb: 1
            }}
          >
            {snippet.description}
          </Text>
        </Stack>
      </Card>
    </InternalLink>
  );
};

export default SnippetCard;
