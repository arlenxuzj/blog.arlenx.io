export type Project = {
  type: string;
  title: string;
  description: string;
  imageLightUrl?: string;
  imageDarkUrl?: string;
  url?: string;
  techStack: string[];
  repo?: string;
};

const projectsData: Project[] = [
  {
    type: 'side',
    title: 'Personal Website',
    description:
      'My personal website hosted on Vercel. Portfolio, posts, snippets, etc.',
    techStack: ['Next.js', 'React', 'MUI', 'Prisma', 'TypeScript'],
    repo: 'arlenxuzj/arlenx.io',
    imageLightUrl:
      '/projects/personal-website/images/personal-website-light.png',
    imageDarkUrl: '/projects/personal-website/images/personal-website-dark.png'
  },
  {
    type: 'side',
    title: 'Yami Market Client',
    description:
      'The front-end of a simple e-commerce website finished on the school course.',
    techStack: ['React', 'MUI', 'TypeScript'],
    repo: 'Yami-Market/yami-market-client',
    imageLightUrl:
      '/projects/yami-market-client/images/yami-market-client-light.png',
    imageDarkUrl:
      '/projects/yami-market-client/images/yami-market-client-dark.png'
  },
  {
    type: 'side',
    title: 'Yami Market Server',
    description:
      'The back-end of a simple e-commerce website finished on the school course.',
    techStack: ['Python', 'Flask', 'PostgresSQL'],
    repo: 'Yami-Market/yami-market-server'
  }
];

export default projectsData;
