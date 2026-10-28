import { Injectable } from '@angular/core';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  created_at: string;
}

export interface DynamicProject {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Python & Django' | 'Bots & Automation' | 'Systems & C' | 'Web Design';
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  status: 'Live' | 'Production' | 'Open Source';
  pushedAt?: string;
  stars?: number;
  isAutoDetected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly GITHUB_USERNAME = 'kogo198';
  private readonly CACHE_KEY = 'kogo_github_repos_cache_v1';
  private readonly CACHE_TIME_KEY = 'kogo_github_cache_time_v1';
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

  async getProjects(curatedProjects: DynamicProject[]): Promise<{ projects: DynamicProject[]; lastSynced: Date; isLive: boolean }> {
    // Check cached data first for immediate load
    const cached = this.getCachedProjects();
    const isCacheValid = this.isCacheFresh();

    if (cached && isCacheValid) {
      // Return cached while refreshing in background
      this.refreshFromApi(curatedProjects).catch(() => {});
      const cacheTime = localStorage.getItem(this.CACHE_TIME_KEY);
      return {
        projects: cached,
        lastSynced: cacheTime ? new Date(cacheTime) : new Date(),
        isLive: true
      };
    }

    try {
      const liveProjects = await this.refreshFromApi(curatedProjects);
      return {
        projects: liveProjects,
        lastSynced: new Date(),
        isLive: true
      };
    } catch (err) {
      console.warn('GitHub Live API fetch failed, falling back to curated list / cache:', err);
      if (cached) {
        return { projects: cached, lastSynced: new Date(), isLive: false };
      }
      return { projects: curatedProjects, lastSynced: new Date(), isLive: false };
    }
  }

  async forceRefresh(curatedProjects: DynamicProject[]): Promise<{ projects: DynamicProject[]; lastSynced: Date }> {
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.CACHE_TIME_KEY);
    const projects = await this.refreshFromApi(curatedProjects);
    return { projects, lastSynced: new Date() };
  }

  private async refreshFromApi(curatedProjects: DynamicProject[]): Promise<DynamicProject[]> {
    const response = await fetch(
      `https://api.github.com/users/${this.GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    const merged = this.mergeReposWithCurated(repos, curatedProjects);

    // Save to cache
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(merged));
      localStorage.setItem(this.CACHE_TIME_KEY, new Date().toISOString());
    } catch (e) {
      // Storage quota or privacy mode exception handling
    }

    return merged;
  }

  private mergeReposWithCurated(repos: GitHubRepo[], curated: DynamicProject[]): DynamicProject[] {
    const curatedMap = new Map<string, DynamicProject>();
    for (const p of curated) {
      curatedMap.set(p.githubUrl.toLowerCase().trim(), p);
      curatedMap.set(p.id.toLowerCase().trim(), p);
    }

    const result: DynamicProject[] = [];
    const processedGithubUrls = new Set<string>();

    // 1. Process all GitHub repositories returned by the live API
    for (const repo of repos) {
      const repoUrl = repo.html_url.toLowerCase().trim();
      processedGithubUrls.add(repoUrl);

      // Check if we have curated metadata for this repo
      const existing = curatedMap.get(repoUrl) || curatedMap.get(repo.name.toLowerCase().trim());

      if (existing) {
        // Enhance curated project with real-time GitHub data
        result.push({
          ...existing,
          description: existing.description || repo.description || 'Open-source project by @kogo198',
          liveUrl: existing.liveUrl || repo.homepage || undefined,
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
          status: (existing.liveUrl || repo.homepage) ? 'Live' : existing.status
        });
      } else {
        // This is a NEW repository created or updated on GitHub!
        // Automatically convert it into a rich project card
        const categoryInfo = this.categorizeRepo(repo);
        result.push({
          id: repo.name.toLowerCase(),
          title: this.formatTitle(repo.name),
          category: categoryInfo.category,
          categoryLabel: categoryInfo.label,
          tagline: repo.description || `Repository created on GitHub by @${this.GITHUB_USERNAME}`,
          description: repo.description || `Active software repository developed and published on GitHub by @${this.GITHUB_USERNAME}.`,
          image: this.pickImageForCategory(categoryInfo.category),
          gradient: categoryInfo.gradient,
          tags: this.extractTags(repo),
          liveUrl: repo.homepage ? repo.homepage : undefined,
          githubUrl: repo.html_url,
          featured: false,
          status: repo.homepage ? 'Live' : 'Open Source',
          pushedAt: repo.pushed_at,
          stars: repo.stargazers_count,
          isAutoDetected: true
        });
      }
    }

    // 2. Add any curated projects that might not have been returned by API (e.g. offline/private)
    for (const p of curated) {
      if (!processedGithubUrls.has(p.githubUrl.toLowerCase().trim())) {
        result.push(p);
      }
    }

    return result;
  }

  private categorizeRepo(repo: GitHubRepo): { category: DynamicProject['category']; label: string; gradient: string } {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const topics = repo.topics.map(t => t.toLowerCase());

    if (lang === 'python' || desc.includes('django') || name.includes('django') || topics.includes('python')) {
      return {
        category: 'Python & Django',
        label: 'Python & Django',
        gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)'
      };
    }

    if (
      name.includes('bot') ||
      desc.includes('bot') ||
      desc.includes('whatsapp') ||
      topics.includes('bot') ||
      name.includes('cypher')
    ) {
      return {
        category: 'Bots & Automation',
        label: 'Bots & Automation',
        gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
      };
    }

    if (
      lang === 'c' ||
      lang === 'c++' ||
      name.includes('program-c') ||
      name.includes('code-c') ||
      name.includes('hardware')
    ) {
      return {
        category: 'Systems & C',
        label: 'Systems (C)',
        gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)'
      };
    }

    if (lang === 'css' || lang === 'html') {
      return {
        category: 'Web Design',
        label: 'Web Design',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
      };
    }

    return {
      category: 'Full-Stack',
      label: 'Full-Stack & Web',
      gradient: 'linear-gradient(135deg, #6345ed 0%, #4338ca 100%)'
    };
  }

  private formatTitle(rawName: string): string {
    return rawName
      .replace(/^[-_]+|[-_]+$/g, '')
      .split(/[-_]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  private extractTags(repo: GitHubRepo): string[] {
    const tags: string[] = [];
    if (repo.language) {
      tags.push(repo.language);
    }
    if (repo.topics && repo.topics.length > 0) {
      for (const t of repo.topics.slice(0, 3)) {
        if (!tags.includes(t)) {
          tags.push(t);
        }
      }
    }
    if (tags.length === 0) {
      tags.push('Code', 'GitHub');
    }
    return tags.slice(0, 4);
  }

  private pickImageForCategory(category: DynamicProject['category']): string {
    switch (category) {
      case 'Python & Django':
        return 'project-ecommerce.png';
      case 'Bots & Automation':
        return 'project-mobile.png';
      case 'Systems & C':
        return 'project-travel.png';
      case 'Web Design':
        return 'kiplaa-studio.png';
      default:
        return 'project-dashboard.png';
    }
  }

  private getCachedProjects(): DynamicProject[] | null {
    try {
      const data = localStorage.getItem(this.CACHE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private isCacheFresh(): boolean {
    try {
      const timeStr = localStorage.getItem(this.CACHE_TIME_KEY);
      if (!timeStr) return false;
      const elapsed = Date.now() - new Date(timeStr).getTime();
      return elapsed < this.CACHE_TTL_MS;
    } catch {
      return false;
    }
  }
}
