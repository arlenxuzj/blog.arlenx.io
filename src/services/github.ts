import { GITHUB_API_URL } from '@/constants';
import { fetcher } from '@/utils/fetcher';

export type GithubRepoRaw = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
};

export type GithubRepoLanguages = {
  [key: string]: number;
};

export type GithubRepo = GithubRepoRaw & {
  languages: GithubRepoLanguages;
};

export const githubRepoApiURL = `${GITHUB_API_URL}/repos`;

export const githubRepoFetcher = async (repo: string) => {
  const repoRaw = await fetcher<GithubRepoRaw>(`${githubRepoApiURL}/${repo}`, {
    // @ts-ignore
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  });

  const repoLanguages = await fetcher<GithubRepoLanguages>(
    `${githubRepoApiURL}/${repo}/languages`,
    {
      // @ts-ignore
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  );

  return {
    ...repoRaw,
    languages: repoLanguages
  };
};
