import { Box, Card, Stack } from '@mui/material';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import { Snippet } from '@/content/generated';
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
          borderColor: theme.vars.palette.border.card,
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
          sx={{
            gap: 1,
            p: 2
          }}
        >
          <Text
            component='h3'
            size='2xl'
            sx={{
              color: 'text.primary',
              fontWeight: 600
            }}
          >
            {snippet.title}
          </Text>
          <Text
            sx={{
              color: 'text.secondary',
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
