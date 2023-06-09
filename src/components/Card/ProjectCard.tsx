/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';

import Image from 'next/image';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  CardContent,
  Modal,
  Stack,
  useColorScheme
} from '@mui/material';

import { Project } from '@/configs/projectsData';
import { DEFAULT_CONTENT_WIDTH } from '@/constants';
import { GithubRepo as GithubRepoType } from '@/services/github';
import analytics from '@/utils/analytics';

import { ExternalLink } from '../Link';
import { Text } from '../Typography';
import GithubRepo from './GithubRepo';

export type ProjectCardProps = {
  project: Project;
  repo?: GithubRepoType;
};

const TRANSPARENT_BASE_64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAD6CAQAAACYT4+6AAACD0lEQVR42u3TMQ0AAAzDsJU/6cFoDxtCpOSAqkgAJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEgAnBhIAJwYSACcGEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEsOcB4psA+xRasv8AAAAASUVORK5CYII=';

const ProjectCard = ({ project, repo }: ProjectCardProps) => {
  const {
    id,
    title,
    description,
    techStack,
    imageLightUrl,
    imageDarkUrl,
    url
  } = project;
  const href = repo?.html_url || url;
  const [open, setOpen] = useState(false);
  const { mode } = useColorScheme();
  const [imageUrl, setImageUrl] = useState(TRANSPARENT_BASE_64);

  const handleClick = () => {
    analytics.trackEvent(`project-${id}-image`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (mode === 'dark') {
      setImageUrl(imageDarkUrl || '/images/project-default-image-dark.png');
    } else {
      setImageUrl(imageLightUrl || '/images/project-default-image-light.png');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <>
      <Card
        variant='outlined'
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
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
            position: 'relative',
            width: '100%',
            height: 240,
            cursor: 'zoom-in'
          }}
          onClick={handleClick}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            style={{
              objectFit: 'cover'
            }}
          />
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor: 'background.default'
          }}
        >
          <Stack flexGrow={1}>
            <Text
              component='h3'
              color='text.primary'
              fontWeight={600}
              size='2xl'
              sx={{
                mb: 2
              }}
            >
              {href ? (
                <ExternalLink
                  color='inherit'
                  underline='none'
                  href={href}
                  sx={{
                    fontWeight: 600
                  }}
                >
                  <span
                    onClick={() => {
                      analytics.trackEvent(`project-${id}-title`);
                    }}
                  >
                    {title}
                  </span>
                </ExternalLink>
              ) : (
                title
              )}
            </Text>
            <Text
              color='text.secondary'
              sx={{
                mb: 1
              }}
            >
              {description}
            </Text>
            <Text color='text.secondary'>
              {'Tech Stack: '}
              <Text component='span' fontWeight={600}>
                {techStack.join(', ')}
              </Text>
            </Text>
          </Stack>
          <Box
            sx={{
              mt: 3
            }}
          >
            {repo ? (
              <GithubRepo repo={repo} />
            ) : (
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <ExternalLink
                  href={url}
                  noReferrer={false}
                  underline='none'
                  color='text.primary'
                  className='arrow arrow-right'
                  fontSize={16}
                  sx={{
                    ml: 0.5,
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  <span
                    onClick={() => {
                      analytics.trackEvent(`project-${id}-learn-more`);
                    }}
                  >
                    Learn More
                  </span>
                </ExternalLink>
              </Stack>
            )}
          </Box>
        </CardContent>
      </Card>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }}
          onClick={handleClose}
        >
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              width: '100%',
              top: 0,
              justifyContent: 'flex-end'
            }}
          >
            <Box
              sx={{
                p: 2
              }}
            >
              <CloseIcon fontSize='large' />
            </Box>
          </Box>
          <img
            src={
              mode === 'dark'
                ? imageDarkUrl || '/images/project-default-image-dark.png'
                : imageLightUrl || '/images/project-default-image-light.png'
            }
            alt={title}
            style={{
              maxWidth: '80vw',
              height: 'auto',
              maxHeight: '80vh',
              cursor: 'zoom-out'
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
export default ProjectCard;
