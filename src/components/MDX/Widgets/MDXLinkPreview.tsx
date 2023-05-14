import { Box, Card, CardMedia, Link } from '@mui/material';

import { Text } from '@/components/Typography';

import linkPreviews from '../../../../data/link-preview.json';

export type MDXLinkPreviewProps = {
  link: string;
};

const MDXLinkPreview = ({ link }: MDXLinkPreviewProps) => {
  const linkPreview = linkPreviews.find(
    linkPreview => linkPreview.link === link
  );

  if (!linkPreview) {
    return null;
  }

  return (
    <Card
      variant='outlined'
      component={Link}
      href={link}
      underline='none'
      target='_blank'
      rel='noopener noreferrer'
      sx={theme => ({
        display: 'flex',
        backgroundColor: 'background.default',
        borderColor: theme.vars.palette.border.color,
        boxShadow: `0.5px 1px 1px ${theme.vars.palette.colors.shadow}}`
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          justifyContent: 'center',
          px: 2.5,
          py: 2
        }}
      >
        <Text
          fontWeight={600}
          color='text.primary'
          mb={1}
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {linkPreview.title}
        </Text>
        <Text
          color='text.secondary'
          mb={1.5}
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {linkPreview.description}
        </Text>
        <Text color='text.disabled' fontSize='xs'>
          {linkPreview.hostname}
        </Text>
      </Box>
      {linkPreview.imageUrl && (
        <CardMedia
          component='img'
          sx={{ width: 150 }}
          image={linkPreview.imageUrl}
          alt='image'
        />
      )}
    </Card>
  );
};

export default MDXLinkPreview;
