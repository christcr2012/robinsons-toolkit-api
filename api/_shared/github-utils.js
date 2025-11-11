/**
 * Shared GitHub API utilities
 */

const GITHUB_API_BASE = 'https://api.github.com';
const MAX_RESPONSE_SIZE = 100 * 1024;

function checkResponseSize(data) {
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > MAX_RESPONSE_SIZE) {
    throw new Error(`Response too large: ${(jsonStr.length / 1024).toFixed(2)}KB`);
  }
  return data;
}

function getAuthHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not configured');
  
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json'
  };
}

// Minimal field extractors to reduce response size
const minimalRepo = (r) => ({
  id: r.id,
  name: r.name,
  full_name: r.full_name,
  private: r.private,
  description: r.description,
  html_url: r.html_url,
  created_at: r.created_at,
  updated_at: r.updated_at,
  language: r.language,
  default_branch: r.default_branch,
  stargazers_count: r.stargazers_count,
  forks_count: r.forks_count
});

const minimalIssue = (i) => ({
  id: i.id,
  number: i.number,
  title: i.title,
  state: i.state,
  created_at: i.created_at,
  updated_at: i.updated_at,
  html_url: i.html_url,
  user: i.user ? { login: i.user.login, id: i.user.id } : null,
  labels: i.labels ? i.labels.map(l => ({ name: l.name, color: l.color })) : []
});

const minimalPR = (pr) => ({
  id: pr.id,
  number: pr.number,
  title: pr.title,
  state: pr.state,
  created_at: pr.created_at,
  updated_at: pr.updated_at,
  html_url: pr.html_url,
  user: pr.user ? { login: pr.user.login, id: pr.user.id } : null,
  head: pr.head ? { ref: pr.head.ref, sha: pr.head.sha } : null,
  base: pr.base ? { ref: pr.base.ref, sha: pr.base.sha } : null,
  merged: pr.merged,
  mergeable: pr.mergeable
});

const minimalCommit = (c) => ({
  sha: c.sha,
  commit: {
    message: c.commit?.message,
    author: c.commit?.author,
    committer: c.commit?.committer
  },
  html_url: c.html_url,
  author: c.author ? { login: c.author.login, id: c.author.id } : null,
  committer: c.committer ? { login: c.committer.login, id: c.committer.id } : null
});

const minimalBranch = (b) => ({
  name: b.name,
  commit: { sha: b.commit?.sha, url: b.commit?.url },
  protected: b.protected
});

const minimalRelease = (r) => ({
  id: r.id,
  tag_name: r.tag_name,
  name: r.name,
  draft: r.draft,
  prerelease: r.prerelease,
  created_at: r.created_at,
  published_at: r.published_at,
  html_url: r.html_url,
  author: r.author ? { login: r.author.login, id: r.author.id } : null
});

const minimalWorkflow = (w) => ({
  id: w.id,
  name: w.name,
  path: w.path,
  state: w.state,
  created_at: w.created_at,
  updated_at: w.updated_at,
  html_url: w.html_url
});

const minimalWorkflowRun = (wr) => ({
  id: wr.id,
  name: wr.name,
  status: wr.status,
  conclusion: wr.conclusion,
  created_at: wr.created_at,
  updated_at: wr.updated_at,
  html_url: wr.html_url,
  run_number: wr.run_number,
  event: wr.event
});

module.exports = {
  GITHUB_API_BASE,
  checkResponseSize,
  getAuthHeaders,
  minimalRepo,
  minimalIssue,
  minimalPR,
  minimalCommit,
  minimalBranch,
  minimalRelease,
  minimalWorkflow,
  minimalWorkflowRun
};

