import { Box, Divider, Stack } from '@mui/material';
import { parseISO } from 'date-fns';

import { Pill } from '@/components/Pill';
import { Seo } from '@/components/Seo';
import { Text } from '@/components/Typography';
import { ContentWrapper } from '@/components/Wrapper';
import { POST_CONTENT_WIDTH } from '@/constants';
import { formatDate } from '@/utils/date';

export type PageLayoutProps = {
  headTitle: string | undefined;
  title?: string;
  description: string;
  path: string;
  updatedAt?: string;
  updateDateAtBuildTime?: boolean;
  wip?: boolean;
  contentWidth?: number;
  children: React.ReactNode;
};

export const PageLayout = ({
  headTitle,
  title,
  description,
  path,
  updatedAt,
  updateDateAtBuildTime,
  wip,
  contentWidth,
  children
}: PageLayoutProps) => {
  return (
    <>
      <Seo title={headTitle} description={description} path={path} />
      <ContentWrapper main contentWidth={contentWidth || POST_CONTENT_WIDTH}>
        <Stack gridColumn={2} alignItems='flex-start' rowGap={8}>
          <Box
            sx={{
              width: '100%'
            }}
          >
            <Text
              component='h1'
              fontWeight={800}
              size='5xl'
              sx={{
                mb: 2
              }}
            >
              {title || headTitle}
            </Text>
            <Text size='md' color='text.secondary' sx={{ mb: 2 }}>
              {description}
            </Text>
            <Divider
              sx={theme => ({
                my: 2,
                borderBottomWidth: '2px',
                borderColor: theme.vars.palette.grey[200]
              })}
            />
            <Stack direction='row' gap={1} flexWrap='wrap'>
              {updateDateAtBuildTime ? (
                <Pill>{`Last Updated ${formatDate(new Date())}`}</Pill>
              ) : (
                updatedAt && (
                  <Pill>{`Last Updated ${formatDate(
                    parseISO(updatedAt)
                  )}`}</Pill>
                )
              )}

              {wip && <Pill variant='warning'>Working In Progress</Pill>}
            </Stack>
          </Box>
          {children}
        </Stack>
      </ContentWrapper>
    </>
  );
};

export default PageLayout;
