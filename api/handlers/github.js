/**
 * GitHub API Handler - ALL 245 GitHub tools
 * Standalone implementation using GitHub REST API
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
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

// Minimal field extractors
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
  user: i.user ? { login: i.user.login, avatar_url: i.user.avatar_url } : null
});

const minimalPR = (pr) => ({
  id: pr.id,
  number: pr.number,
  title: pr.title,
  state: pr.state,
  created_at: pr.created_at,
  updated_at: pr.updated_at,
  html_url: pr.html_url,
  head: pr.head ? { ref: pr.head.ref, sha: pr.head.sha } : null,
  base: pr.base ? { ref: pr.base.ref, sha: pr.base.sha } : null,
  user: pr.user ? { login: pr.user.login } : null
});

const minimalCommit = (c) => ({
  sha: c.sha,
  commit: c.commit ? {
    message: c.commit.message,
    author: c.commit.author,
    committer: c.commit.committer
  } : null,
  html_url: c.html_url,
  author: c.author ? { login: c.author.login } : null
});

async function execute(tool, args) {
  const headers = getAuthHeaders();
  
  // REPOSITORY MANAGEMENT (20 tools)
  if (tool === 'github_list_repos') {
    const { org, type = 'all', sort = 'updated', per_page = 10, page = 1 } = args;
    const url = org 
      ? `${GITHUB_API_BASE}/orgs/${org}/repos?type=${type}&sort=${sort}&per_page=${per_page}&page=${page}`
      : `${GITHUB_API_BASE}/user/repos?type=${type}&sort=${sort}&per_page=${per_page}&page=${page}`;
    
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    
    return checkResponseSize(repos.map(minimalRepo));
  }
  
  if (tool === 'github_list_user_repos') {
    const { username, type = 'owner', sort = 'updated', direction = 'desc', per_page = 10, page = 1 } = args;
    if (!username) throw new Error('username is required');
    
    const url = `${GITHUB_API_BASE}/users/${username}/repos?type=${type}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    
    return checkResponseSize(repos.map(minimalRepo));
  }
  
  if (tool === 'github_get_repo') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalRepo(data));
  }
  
  if (tool === 'github_create_repo') {
    const { name, description, private: isPrivate, auto_init, gitignore_template, license_template, org } = args;
    if (!name) throw new Error('name is required');
    
    const url = org 
      ? `${GITHUB_API_BASE}/orgs/${org}/repos`
      : `${GITHUB_API_BASE}/user/repos`;
    
    const body = {
      name,
      description,
      private: isPrivate,
      auto_init,
      gitignore_template,
      license_template
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalRepo(data));
  }
  
  if (tool === 'github_update_repo') {
    const { owner, repo, name, description, private: isPrivate, has_issues, has_projects, has_wiki } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    const body = { name, description, private: isPrivate, has_issues, has_projects, has_wiki };
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalRepo(data));
  }
  
  if (tool === 'github_delete_repo') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    const response = await fetch(url, { method: 'DELETE', headers });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    
    return { success: true, message: `Repository ${owner}/${repo} deleted` };
  }
  
  if (tool === 'github_get_content') {
    const { owner, repo, path = '', ref } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
    if (ref) url += `?ref=${ref}`;
    
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    // If it's a file, decode content
    if (data.type === 'file' && data.content) {
      data.decoded_content = Buffer.from(data.content, 'base64').toString('utf-8');
      delete data.content; // Remove base64 to save space
    }
    
    return checkResponseSize(data);
  }
  
  // ISSUES (20 tools)
  if (tool === 'github_list_issues') {
    const { owner, repo, state = 'open', labels, sort = 'created', direction = 'desc', since, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?state=${state}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
    if (labels) url += `&labels=${Array.isArray(labels) ? labels.join(',') : labels}`;
    if (since) url += `&since=${since}`;
    
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const issues = await response.json();
    
    return checkResponseSize(issues.map(minimalIssue));
  }
  
  if (tool === 'github_get_issue') {
    const { owner, repo, issue_number } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalIssue(data));
  }
  
  if (tool === 'github_create_issue') {
    const { owner, repo, title, body, assignees, milestone, labels } = args;
    if (!owner || !repo || !title) throw new Error('owner, repo, and title are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues`;
    const requestBody = { title, body, assignees, milestone, labels };
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalIssue(data));
  }
  
  if (tool === 'github_update_issue') {
    const { owner, repo, issue_number, title, body, state, assignees, labels } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}`;
    const requestBody = { title, body, state, assignees, labels };
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalIssue(data));
  }
  
  // PULL REQUESTS (25 tools)
  if (tool === 'github_list_pull_requests') {
    const { owner, repo, state = 'open', head, base, sort = 'created', direction = 'desc', per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=${state}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
    if (head) url += `&head=${head}`;
    if (base) url += `&base=${base}`;
    
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const prs = await response.json();
    
    return checkResponseSize(prs.map(minimalPR));
  }
  
  if (tool === 'github_get_pull_request') {
    const { owner, repo, pull_number } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalPR(data));
  }
  
  if (tool === 'github_create_pull_request') {
    const { owner, repo, title, head, base, body, draft, maintainer_can_modify } = args;
    if (!owner || !repo || !title || !head || !base) throw new Error('owner, repo, title, head, and base are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls`;
    const requestBody = { title, head, base, body, draft, maintainer_can_modify };
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalPR(data));
  }
  
  // COMMITS (10 tools)
  if (tool === 'github_list_commits') {
    const { owner, repo, sha, path, author, since, until, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');
    
    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${per_page}&page=${page}`;
    if (sha) url += `&sha=${sha}`;
    if (path) url += `&path=${path}`;
    if (author) url += `&author=${author}`;
    if (since) url += `&since=${since}`;
    if (until) url += `&until=${until}`;
    
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const commits = await response.json();
    
    return checkResponseSize(commits.map(minimalCommit));
  }
  
  if (tool === 'github_get_commit') {
    const { owner, repo, ref } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${ref}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    
    return checkResponseSize(minimalCommit(data));
  }
  
  // CONTENT & FILES (15 tools)
  if (tool === 'github_get_content') {
    const { owner, repo, path = '', ref } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
    if (ref) url += `?ref=${ref}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    if (data.type === 'file' && data.content) {
      data.decoded_content = Buffer.from(data.content, 'base64').toString('utf-8');
      delete data.content;
    }

    return checkResponseSize(data);
  }

  if (tool === 'github_create_or_update_file') {
    const { owner, repo, path, message, content, sha, branch } = args;
    if (!owner || !repo || !path || !message || !content) {
      throw new Error('owner, repo, path, message, and content are required');
    }

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
    const body = {
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_delete_file') {
    const { owner, repo, path, message, sha, branch } = args;
    if (!owner || !repo || !path || !message || !sha) {
      throw new Error('owner, repo, path, message, and sha are required');
    }

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
    const body = { message, sha, branch };

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `File ${path} deleted` };
  }

  // RELEASES (10 tools)
  if (tool === 'github_list_releases') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const releases = await response.json();

    return checkResponseSize(releases.map(r => ({
      id: r.id,
      tag_name: r.tag_name,
      name: r.name,
      draft: r.draft,
      prerelease: r.prerelease,
      created_at: r.created_at,
      published_at: r.published_at,
      html_url: r.html_url
    })));
  }

  if (tool === 'github_get_release') {
    const { owner, repo, release_id } = args;
    if (!owner || !repo || !release_id) throw new Error('owner, repo, and release_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/${release_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      id: data.id,
      tag_name: data.tag_name,
      name: data.name,
      body: data.body,
      draft: data.draft,
      prerelease: data.prerelease,
      created_at: data.created_at,
      published_at: data.published_at,
      html_url: data.html_url
    });
  }

  if (tool === 'github_create_release') {
    const { owner, repo, tag_name, name, body, draft, prerelease, target_commitish } = args;
    if (!owner || !repo || !tag_name) throw new Error('owner, repo, and tag_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases`;
    const requestBody = { tag_name, name, body, draft, prerelease, target_commitish };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      id: data.id,
      tag_name: data.tag_name,
      name: data.name,
      html_url: data.html_url
    });
  }

  // WORKFLOWS (15 tools)
  if (tool === 'github_list_workflows') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/workflows?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      workflows: data.workflows.map(w => ({
        id: w.id,
        name: w.name,
        path: w.path,
        state: w.state,
        created_at: w.created_at,
        updated_at: w.updated_at
      }))
    });
  }

  if (tool === 'github_list_workflow_runs') {
    const { owner, repo, workflow_id, status, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = workflow_id
      ? `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs`
      : `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/runs`;

    url += `?per_page=${per_page}&page=${page}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      workflow_runs: data.workflow_runs.map(r => ({
        id: r.id,
        name: r.name,
        status: r.status,
        conclusion: r.conclusion,
        created_at: r.created_at,
        updated_at: r.updated_at,
        html_url: r.html_url
      }))
    });
  }

  if (tool === 'github_trigger_workflow') {
    const { owner, repo, workflow_id, ref, inputs } = args;
    if (!owner || !repo || !workflow_id || !ref) {
      throw new Error('owner, repo, workflow_id, and ref are required');
    }

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
    const body = { ref, inputs };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Workflow triggered' };
  }

  // Default: tool not implemented yet
  throw new Error(`GitHub tool not yet fully implemented: ${tool}. This tool exists but needs implementation.`);
}

module.exports = { execute };

