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
  const token = process.env.GITHUB_TOKEN;
  const config = {
    timeout: 10000,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {})
  };
  try {
    const [repoRaw, repoLanguages] = await Promise.all([
      fetcher<GithubRepoRaw>(`${githubRepoApiURL}/${repo}`, config),
      fetcher<GithubRepoLanguages>(
        `${githubRepoApiURL}/${repo}/languages`,
        config
      )
    ]);
    return { ...repoRaw, languages: repoLanguages };
  } catch {
    // Do not attach the Axios error: its request headers can contain credentials.
    throw new Error(`Unable to fetch GitHub repository metadata for ${repo}`);
  }
};
