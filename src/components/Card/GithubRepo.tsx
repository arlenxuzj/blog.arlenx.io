import { Box, Divider, Stack } from '@mui/material';

import githubColor from '@/configs/githubColors';
import { GithubRepo as GithubRepoType } from '@/services/github';

import { ExternalLink } from '../Link';
import { Text } from '../Typography';

export type GithubRepoProps = {
  repo: GithubRepoType;
};

const GithubRepo = ({ repo }: GithubRepoProps) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      flexWrap='wrap'
      rowGap={1.5}
      justifyContent='space-between'
      sx={{
        width: '100%'
      }}
    >
      <Stack direction='row' gap={1.5} alignItems='center'>
        <Stack direction='row' gap={0.75} alignItems='center'>
          <Box
            sx={{
              width: 18,
              height: 18,
              backgroundColor:
                githubColor[repo.language as keyof typeof githubColor]?.color ||
                'text.primary',
              borderRadius: '50%'
            }}
          />
          <Text whiteSpace='nowrap'>{repo.language}</Text>
        </Stack>
        <Stack direction='row' gap={0.75} alignItems='center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            fill='currentColor'
          >
            <path d='M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832 4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702 5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z'></path>
          </svg>
          <Text>{repo.stargazers_count}</Text>
        </Stack>
        <Stack direction='row' gap={0.75} alignItems='center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='16'
            height='16'
            fill='currentColor'
          >
            <path d='M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-12.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5ZM12 21a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 12 21Zm6.25-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z'></path>
            <path d='M6.5 7.75v1A2.25 2.25 0 0 0 8.75 11h6.5a2.25 2.25 0 0 0 2.25-2.25v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-6.5A3.75 3.75 0 0 1 5 8.75v-1Z'></path>
            <path d='M11.25 16.25v-5h1.5v5h-1.5Z'></path>
          </svg>
          <Text>{repo.forks_count}</Text>
        </Stack>
      </Stack>
      <Stack direction='row' gap={1} alignItems='center'>
        {repo.homepage && (
          <ExternalLink
            noReferrer={false}
            lineHeight={0}
            color='text.primary'
            href={repo.homepage}
            sx={{
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
              <polyline points='15 3 21 3 21 9'></polyline>
              <line x1='10' y1='14' x2='21' y2='3'></line>
            </svg>
          </ExternalLink>
        )}
        {repo.homepage && <Divider orientation='vertical' flexItem light />}
        <ExternalLink
          lineHeight={0}
          color='text.primary'
          href={repo.html_url}
          sx={{
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
            <path d='M9 18c-4.51 2-5-2-7-2'></path>
          </svg>
        </ExternalLink>
      </Stack>
    </Stack>
  );
};

export default GithubRepo;
