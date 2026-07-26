export interface GithubStats {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface PinnedRepo {
  repo: string;
  owner?: string;
  link?: string;
  description: string | null;
  language: string | null;
  languageColor?: string | null;
  stars: number;
  forks: number;
}
