import { GetStaticProps } from 'next';

import { Box, Divider } from '@mui/material';

import { Text } from '@/components/Typography';

import { ProjectCard } from '../components/Card';
import projectsData from '../configs/projectsData';
import { DEFAULT_CONTENT_WIDTH } from '../constants';
import PageLayout from '../layouts/PageLayout';
import { GithubRepo, githubRepoFetcher } from '../services/github';
import { NextPageWithLayout } from './_app';

export type ProjectsPageProps = {
  repos: {
    [key: string]: GithubRepo;
  };
};

const ProjectsPage: NextPageWithLayout<ProjectsPageProps> = ({ repos }) => {
  const workProjects = projectsData.filter(project => project.type === 'work');
  const sideProjects = projectsData.filter(project => project.type === 'side');
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Text component='h2' fontWeight={700} fontSize={30} sx={{ mb: 4 }}>
        Work
      </Text>
      <Box
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4
        }}
      >
        {workProjects.map(project => (
          <ProjectCard
            key={project.title}
            project={project}
            repo={project.repo === undefined ? undefined : repos[project.repo]}
          />
        ))}
      </Box>
      <Divider sx={{ my: 6 }} />
      <Text component='h2' fontWeight={700} fontSize={30} sx={{ mb: 4 }}>
        Side Projects
      </Text>
      <Box
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4
        }}
      >
        {sideProjects.map(project => (
          <ProjectCard
            key={project.title}
            project={project}
            repo={project.repo === undefined ? undefined : repos[project.repo]}
          />
        ))}
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projectsWithRepo = projectsData.filter(project => project.repo);
  const repos = await Promise.all(
    projectsWithRepo.map(async project => {
      const data = await githubRepoFetcher(project.repo!);
      return [project.repo, data];
    })
  );

  return {
    props: {
      // eslint-disable-next-line compat/compat
      repos: Object.fromEntries(repos)
    }
  };
};

ProjectsPage.getLayout = page => {
  return (
    <PageLayout
      headTitle='Projects'
      description='My side projects ans stuff I built with others'
      path='/projects'
      contentWidth={DEFAULT_CONTENT_WIDTH}
    >
      {page}
    </PageLayout>
  );
};

export default ProjectsPage;
