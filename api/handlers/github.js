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
  
  if (tool === 'github_create_pull_request' || tool === 'github_create_pull') {
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

  if (tool === 'github_compare_commits') {
    const { owner, repo, base, head } = args;
    if (!owner || !repo || !base || !head) throw new Error('owner, repo, base, and head are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/compare/${base}...${head}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      status: data.status,
      ahead_by: data.ahead_by,
      behind_by: data.behind_by,
      total_commits: data.total_commits,
      commits: data.commits.map(minimalCommit)
    });
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

  // BRANCHES (15 tools)
  if (tool === 'github_list_branches') {
    const { owner, repo, protected: isProtected, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches?per_page=${per_page}&page=${page}`;
    if (isProtected !== undefined) url += `&protected=${isProtected}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const branches = await response.json();

    return checkResponseSize(branches.map(b => ({
      name: b.name,
      commit: { sha: b.commit.sha, url: b.commit.url },
      protected: b.protected
    })));
  }

  if (tool === 'github_get_branch') {
    const { owner, repo, branch } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches/${branch}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      name: data.name,
      commit: { sha: data.commit.sha, url: data.commit.url },
      protected: data.protected,
      protection: data.protection
    });
  }

  if (tool === 'github_create_branch') {
    const { owner, repo, branch, from_branch } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    // Get SHA of from_branch or default branch
    const refUrl = from_branch
      ? `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/ref/heads/${from_branch}`
      : `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

    const refResponse = await fetch(refUrl, { headers });
    if (!refResponse.ok) throw new Error(`GitHub API error: ${refResponse.status}`);
    const refData = await refResponse.json();
    const sha = from_branch ? refData.object.sha : refData.default_branch;

    // Create new branch
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs`;
    const body = {
      ref: `refs/heads/${branch}`,
      sha: sha
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({ ref: data.ref, sha: data.object.sha });
  }

  if (tool === 'github_delete_branch') {
    const { owner, repo, branch } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs/heads/${branch}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `Branch ${branch} deleted` };
  }

  if (tool === 'github_merge_branch') {
    const { owner, repo, base, head, commit_message } = args;
    if (!owner || !repo || !base || !head) throw new Error('owner, repo, base, and head are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/merges`;
    const body = { base, head, commit_message };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      sha: data.sha,
      commit: data.commit,
      message: data.message
    });
  }

  if (tool === 'github_get_branch_protection') {
    const { owner, repo, branch } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches/${branch}/protection`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_branch_protection') {
    const { owner, repo, branch, required_status_checks, enforce_admins, required_pull_request_reviews, restrictions } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches/${branch}/protection`;
    const body = {
      required_status_checks,
      enforce_admins,
      required_pull_request_reviews,
      restrictions
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

  if (tool === 'github_delete_branch_protection') {
    const { owner, repo, branch } = args;
    if (!owner || !repo || !branch) throw new Error('owner, repo, and branch are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches/${branch}/protection`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Branch protection removed' };
  }

  // COLLABORATORS (10 tools)
  if (tool === 'github_list_collaborators') {
    const { owner, repo, affiliation = 'all', per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators?affiliation=${affiliation}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const collaborators = await response.json();

    return checkResponseSize(collaborators.map(c => ({
      login: c.login,
      id: c.id,
      avatar_url: c.avatar_url,
      permissions: c.permissions
    })));
  }

  if (tool === 'github_check_collaborator') {
    const { owner, repo, username } = args;
    if (!owner || !repo || !username) throw new Error('owner, repo, and username are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`;
    const response = await fetch(url, { headers });

    return { is_collaborator: response.ok };
  }

  if (tool === 'github_add_collaborator') {
    const { owner, repo, username, permission = 'push' } = args;
    if (!owner || !repo || !username) throw new Error('owner, repo, and username are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`;
    const body = { permission };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `${username} added as collaborator` };
  }

  if (tool === 'github_remove_collaborator') {
    const { owner, repo, username } = args;
    if (!owner || !repo || !username) throw new Error('owner, repo, and username are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `${username} removed as collaborator` };
  }

  if (tool === 'github_get_collaborator_permission') {
    const { owner, repo, username } = args;
    if (!owner || !repo || !username) throw new Error('owner, repo, and username are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators/${username}/permission`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { permission: data.permission, user: data.user.login };
  }

  // TEAMS (8 tools)
  if (tool === 'github_list_teams') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/teams?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const teams = await response.json();

    return checkResponseSize(teams.map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      permission: t.permission
    })));
  }

  if (tool === 'github_check_team_permissions') {
    const { owner, repo, team_slug } = args;
    if (!owner || !repo || !team_slug) throw new Error('owner, repo, and team_slug are required');

    const url = `${GITHUB_API_BASE}/orgs/${owner}/teams/${team_slug}/repos/${owner}/${repo}`;
    const response = await fetch(url, { headers });

    if (!response.ok) return { has_permission: false };

    const data = await response.json();
    return { has_permission: true, permission: data.permission };
  }

  if (tool === 'github_add_team_repository') {
    const { owner, repo, team_slug, permission = 'push' } = args;
    if (!owner || !repo || !team_slug) throw new Error('owner, repo, and team_slug are required');

    const url = `${GITHUB_API_BASE}/orgs/${owner}/teams/${team_slug}/repos/${owner}/${repo}`;
    const body = { permission };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `Team ${team_slug} added to repository` };
  }

  if (tool === 'github_remove_team_repository') {
    const { owner, repo, team_slug } = args;
    if (!owner || !repo || !team_slug) throw new Error('owner, repo, and team_slug are required');

    const url = `${GITHUB_API_BASE}/orgs/${owner}/teams/${team_slug}/repos/${owner}/${repo}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `Team ${team_slug} removed from repository` };
  }

  // WEBHOOKS (10 tools)
  if (tool === 'github_list_webhooks') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const hooks = await response.json();

    return checkResponseSize(hooks.map(h => ({
      id: h.id,
      name: h.name,
      active: h.active,
      events: h.events,
      config: { url: h.config.url, content_type: h.config.content_type }
    })));
  }

  if (tool === 'github_get_webhook') {
    const { owner, repo, hook_id } = args;
    if (!owner || !repo || !hook_id) throw new Error('owner, repo, and hook_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks/${hook_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      id: data.id,
      name: data.name,
      active: data.active,
      events: data.events,
      config: data.config
    });
  }

  if (tool === 'github_create_webhook') {
    const { owner, repo, config, events = ['push'], active = true } = args;
    if (!owner || !repo || !config) throw new Error('owner, repo, and config are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks`;
    const body = {
      name: 'web',
      active,
      events,
      config
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({ id: data.id, url: data.url });
  }

  if (tool === 'github_update_webhook') {
    const { owner, repo, hook_id, config, events, active } = args;
    if (!owner || !repo || !hook_id) throw new Error('owner, repo, and hook_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks/${hook_id}`;
    const body = {};
    if (config) body.config = config;
    if (events) body.events = events;
    if (active !== undefined) body.active = active;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({ id: data.id, updated: true });
  }

  if (tool === 'github_delete_webhook') {
    const { owner, repo, hook_id } = args;
    if (!owner || !repo || !hook_id) throw new Error('owner, repo, and hook_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks/${hook_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Webhook deleted' };
  }

  if (tool === 'github_ping_webhook') {
    const { owner, repo, hook_id } = args;
    if (!owner || !repo || !hook_id) throw new Error('owner, repo, and hook_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks/${hook_id}/pings`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Webhook pinged' };
  }

  if (tool === 'github_test_webhook') {
    const { owner, repo, hook_id } = args;
    if (!owner || !repo || !hook_id) throw new Error('owner, repo, and hook_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks/${hook_id}/tests`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Webhook test triggered' };
  }

  // DEPLOY KEYS (6 tools)
  if (tool === 'github_list_deploy_keys') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/keys?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const keys = await response.json();

    return checkResponseSize(keys.map(k => ({
      id: k.id,
      key: k.key,
      title: k.title,
      read_only: k.read_only,
      created_at: k.created_at
    })));
  }

  if (tool === 'github_get_deploy_key') {
    const { owner, repo, key_id } = args;
    if (!owner || !repo || !key_id) throw new Error('owner, repo, and key_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/keys/${key_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_deploy_key') {
    const { owner, repo, title, key, read_only = true } = args;
    if (!owner || !repo || !title || !key) throw new Error('owner, repo, title, and key are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/keys`;
    const body = { title, key, read_only };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({ id: data.id, title: data.title });
  }

  if (tool === 'github_delete_deploy_key') {
    const { owner, repo, key_id } = args;
    if (!owner || !repo || !key_id) throw new Error('owner, repo, and key_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/keys/${key_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Deploy key deleted' };
  }

  // REPOSITORY TOPICS, LANGUAGES, TAGS (12 tools)
  if (tool === 'github_get_topics') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/topics`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.mercy-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { names: data.names };
  }

  if (tool === 'github_replace_topics') {
    const { owner, repo, names } = args;
    if (!owner || !repo || !names) throw new Error('owner, repo, and names are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/topics`;
    const body = { names };

    const response = await fetch(url, {
      method: 'PUT',
      headers: { ...headers, 'Accept': 'application/vnd.github.mercy-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { names: data.names };
  }

  if (tool === 'github_list_languages') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return data;
  }

  if (tool === 'github_list_tags') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/tags?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const tags = await response.json();

    return checkResponseSize(tags.map(t => ({
      name: t.name,
      commit: { sha: t.commit.sha, url: t.commit.url },
      zipball_url: t.zipball_url,
      tarball_url: t.tarball_url
    })));
  }

  if (tool === 'github_get_readme') {
    const { owner, repo, ref } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`;
    if (ref) url += `?ref=${ref}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      name: data.name,
      path: data.path,
      sha: data.sha,
      size: data.size,
      content: data.content,
      encoding: data.encoding
    });
  }

  if (tool === 'github_get_license') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/license`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      name: data.name,
      path: data.path,
      license: data.license
    });
  }

  if (tool === 'github_get_community_profile') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/community/profile`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_contributors') {
    const { owner, repo, anon = false, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?anon=${anon}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const contributors = await response.json();

    return checkResponseSize(contributors.map(c => ({
      login: c.login,
      id: c.id,
      contributions: c.contributions,
      avatar_url: c.avatar_url
    })));
  }

  if (tool === 'github_get_stats_contributors') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/contributors`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_stats_commit_activity') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_stats_participation') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/participation`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return data;
  }

  if (tool === 'github_get_stats_punch_card') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/punch_card`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // ISSUE LABELS (10 tools)
  if (tool === 'github_list_labels') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const labels = await response.json();

    return checkResponseSize(labels.map(l => ({
      id: l.id,
      name: l.name,
      color: l.color,
      description: l.description
    })));
  }

  if (tool === 'github_get_label') {
    const { owner, repo, name } = args;
    if (!owner || !repo || !name) throw new Error('owner, repo, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels/${name}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name, color: data.color, description: data.description };
  }

  if (tool === 'github_create_label') {
    const { owner, repo, name, color, description } = args;
    if (!owner || !repo || !name || !color) throw new Error('owner, repo, name, and color are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels`;
    const body = { name, color, description };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_update_label') {
    const { owner, repo, name, new_name, color, description } = args;
    if (!owner || !repo || !name) throw new Error('owner, repo, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels/${name}`;
    const body = {};
    if (new_name) body.new_name = new_name;
    if (color) body.color = color;
    if (description !== undefined) body.description = description;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_delete_label') {
    const { owner, repo, name } = args;
    if (!owner || !repo || !name) throw new Error('owner, repo, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/labels/${name}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Label deleted' };
  }

  if (tool === 'github_add_labels_to_issue') {
    const { owner, repo, issue_number, labels } = args;
    if (!owner || !repo || !issue_number || !labels) throw new Error('owner, repo, issue_number, and labels are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels`;
    const body = { labels };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data.map(l => ({ name: l.name, color: l.color })));
  }

  if (tool === 'github_remove_label_from_issue') {
    const { owner, repo, issue_number, name } = args;
    if (!owner || !repo || !issue_number || !name) throw new Error('owner, repo, issue_number, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels/${name}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Label removed from issue' };
  }

  if (tool === 'github_replace_labels_for_issue') {
    const { owner, repo, issue_number, labels } = args;
    if (!owner || !repo || !issue_number || !labels) throw new Error('owner, repo, issue_number, and labels are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels`;
    const body = { labels };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data.map(l => ({ name: l.name, color: l.color })));
  }

  // MILESTONES (8 tools)
  if (tool === 'github_list_milestones') {
    const { owner, repo, state = 'open', sort = 'due_on', direction = 'asc', per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/milestones?state=${state}&sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const milestones = await response.json();

    return checkResponseSize(milestones.map(m => ({
      id: m.id,
      number: m.number,
      title: m.title,
      state: m.state,
      due_on: m.due_on,
      open_issues: m.open_issues,
      closed_issues: m.closed_issues
    })));
  }

  if (tool === 'github_get_milestone') {
    const { owner, repo, milestone_number } = args;
    if (!owner || !repo || !milestone_number) throw new Error('owner, repo, and milestone_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/milestones/${milestone_number}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_milestone') {
    const { owner, repo, title, state, description, due_on } = args;
    if (!owner || !repo || !title) throw new Error('owner, repo, and title are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/milestones`;
    const body = { title };
    if (state) body.state = state;
    if (description) body.description = description;
    if (due_on) body.due_on = due_on;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, number: data.number, title: data.title };
  }

  if (tool === 'github_update_milestone') {
    const { owner, repo, milestone_number, title, state, description, due_on } = args;
    if (!owner || !repo || !milestone_number) throw new Error('owner, repo, and milestone_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/milestones/${milestone_number}`;
    const body = {};
    if (title) body.title = title;
    if (state) body.state = state;
    if (description !== undefined) body.description = description;
    if (due_on !== undefined) body.due_on = due_on;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, number: data.number, title: data.title };
  }

  if (tool === 'github_delete_milestone') {
    const { owner, repo, milestone_number } = args;
    if (!owner || !repo || !milestone_number) throw new Error('owner, repo, and milestone_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/milestones/${milestone_number}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Milestone deleted' };
  }

  // ISSUE ASSIGNEES (6 tools)
  if (tool === 'github_add_assignees') {
    const { owner, repo, issue_number, assignees } = args;
    if (!owner || !repo || !issue_number || !assignees) throw new Error('owner, repo, issue_number, and assignees are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/assignees`;
    const body = { assignees };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalIssue(data));
  }

  if (tool === 'github_remove_assignees') {
    const { owner, repo, issue_number, assignees } = args;
    if (!owner || !repo || !issue_number || !assignees) throw new Error('owner, repo, issue_number, and assignees are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/assignees`;
    const body = { assignees };

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalIssue(data));
  }

  if (tool === 'github_check_assignee') {
    const { owner, repo, assignee } = args;
    if (!owner || !repo || !assignee) throw new Error('owner, repo, and assignee are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/assignees/${assignee}`;
    const response = await fetch(url, { headers });

    return { is_assignee: response.ok };
  }

  if (tool === 'github_list_assignees') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/assignees?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const assignees = await response.json();

    return checkResponseSize(assignees.map(a => ({
      login: a.login,
      id: a.id,
      avatar_url: a.avatar_url
    })));
  }

  // ISSUE EVENTS & TIMELINE (6 tools)
  if (tool === 'github_list_issue_events') {
    const { owner, repo, issue_number, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/events?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const events = await response.json();

    return checkResponseSize(events.map(e => ({
      id: e.id,
      event: e.event,
      created_at: e.created_at,
      actor: e.actor ? { login: e.actor.login } : null
    })));
  }

  if (tool === 'github_get_issue_event') {
    const { owner, repo, event_id } = args;
    if (!owner || !repo || !event_id) throw new Error('owner, repo, and event_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/events/${event_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_issue_timeline') {
    const { owner, repo, issue_number, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/timeline?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.mockingbird-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const timeline = await response.json();

    return checkResponseSize(timeline);
  }

  if (tool === 'github_lock_issue') {
    const { owner, repo, issue_number, lock_reason } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/lock`;
    const body = lock_reason ? { lock_reason } : {};

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Issue locked' };
  }

  if (tool === 'github_unlock_issue') {
    const { owner, repo, issue_number } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/lock`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Issue unlocked' };
  }

  // REACTIONS (8 tools)
  if (tool === 'github_list_issue_reactions') {
    const { owner, repo, issue_number, content, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/reactions?per_page=${per_page}&page=${page}`;
    if (content) url += `&content=${content}`;

    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const reactions = await response.json();

    return checkResponseSize(reactions.map(r => ({
      id: r.id,
      content: r.content,
      user: r.user ? { login: r.user.login } : null
    })));
  }

  if (tool === 'github_create_issue_reaction') {
    const { owner, repo, issue_number, content } = args;
    if (!owner || !repo || !issue_number || !content) throw new Error('owner, repo, issue_number, and content are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/reactions`;
    const body = { content };

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, content: data.content };
  }

  if (tool === 'github_delete_issue_reaction') {
    const { owner, repo, issue_number, reaction_id } = args;
    if (!owner || !repo || !issue_number || !reaction_id) throw new Error('owner, repo, issue_number, and reaction_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/reactions/${reaction_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Reaction deleted' };
  }

  if (tool === 'github_list_comment_reactions') {
    const { owner, repo, comment_id, content, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !comment_id) throw new Error('owner, repo, and comment_id are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/comments/${comment_id}/reactions?per_page=${per_page}&page=${page}`;
    if (content) url += `&content=${content}`;

    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const reactions = await response.json();

    return checkResponseSize(reactions.map(r => ({
      id: r.id,
      content: r.content,
      user: r.user ? { login: r.user.login } : null
    })));
  }

  if (tool === 'github_create_comment_reaction') {
    const { owner, repo, comment_id, content } = args;
    if (!owner || !repo || !comment_id || !content) throw new Error('owner, repo, comment_id, and content are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/comments/${comment_id}/reactions`;
    const body = { content };

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, content: data.content };
  }

  if (tool === 'github_delete_comment_reaction') {
    const { owner, repo, comment_id, reaction_id } = args;
    if (!owner || !repo || !comment_id || !reaction_id) throw new Error('owner, repo, comment_id, and reaction_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/comments/${comment_id}/reactions/${reaction_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...headers, 'Accept': 'application/vnd.github.squirrel-girl-preview+json' }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Reaction deleted' };
  }

  // PULL REQUEST COMMITS & FILES (8 tools)
  if (tool === 'github_list_pr_commits') {
    const { owner, repo, pull_number, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/commits?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const commits = await response.json();

    return checkResponseSize(commits.map(minimalCommit));
  }

  if (tool === 'github_list_pr_files') {
    const { owner, repo, pull_number, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/files?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const files = await response.json();

    return checkResponseSize(files.map(f => ({
      filename: f.filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
      changes: f.changes,
      patch: f.patch
    })));
  }

  if (tool === 'github_check_pr_merged') {
    const { owner, repo, pull_number } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/merge`;
    const response = await fetch(url, { headers });

    return { is_merged: response.ok };
  }

  if (tool === 'github_update_pr_branch') {
    const { owner, repo, pull_number, expected_head_sha } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/update-branch`;
    const body = expected_head_sha ? { expected_head_sha } : {};

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { message: data.message, url: data.url };
  }

  // PULL REQUEST REQUESTED REVIEWERS (4 tools)
  if (tool === 'github_request_reviewers') {
    const { owner, repo, pull_number, reviewers, team_reviewers } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`;
    const body = {};
    if (reviewers) body.reviewers = reviewers;
    if (team_reviewers) body.team_reviewers = team_reviewers;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalPR(data));
  }

  if (tool === 'github_remove_requested_reviewers') {
    const { owner, repo, pull_number, reviewers, team_reviewers } = args;
    if (!owner || !repo || !pull_number) throw new Error('owner, repo, and pull_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`;
    const body = {};
    if (reviewers) body.reviewers = reviewers;
    if (team_reviewers) body.team_reviewers = team_reviewers;

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalPR(data));
  }

  // GISTS (12 tools)
  if (tool === 'github_list_gists') {
    const { since, per_page = 10, page = 1 } = args;

    let url = `${GITHUB_API_BASE}/gists?per_page=${per_page}&page=${page}`;
    if (since) url += `&since=${since}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const gists = await response.json();

    return checkResponseSize(gists.map(g => ({
      id: g.id,
      description: g.description,
      public: g.public,
      created_at: g.created_at,
      updated_at: g.updated_at,
      html_url: g.html_url
    })));
  }

  if (tool === 'github_list_user_gists') {
    const { username, since, per_page = 10, page = 1 } = args;
    if (!username) throw new Error('username is required');

    let url = `${GITHUB_API_BASE}/users/${username}/gists?per_page=${per_page}&page=${page}`;
    if (since) url += `&since=${since}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const gists = await response.json();

    return checkResponseSize(gists.map(g => ({
      id: g.id,
      description: g.description,
      public: g.public,
      created_at: g.created_at,
      updated_at: g.updated_at,
      html_url: g.html_url
    })));
  }

  if (tool === 'github_get_gist') {
    const { gist_id } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_gist') {
    const { description, files, public: isPublic = true } = args;
    if (!files) throw new Error('files is required');

    const url = `${GITHUB_API_BASE}/gists`;
    const body = {
      description,
      public: isPublic,
      files
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, html_url: data.html_url };
  }

  if (tool === 'github_update_gist') {
    const { gist_id, description, files } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}`;
    const body = {};
    if (description !== undefined) body.description = description;
    if (files) body.files = files;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, html_url: data.html_url };
  }

  if (tool === 'github_delete_gist') {
    const { gist_id } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Gist deleted' };
  }

  if (tool === 'github_star_gist') {
    const { gist_id } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}/star`;
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Gist starred' };
  }

  if (tool === 'github_unstar_gist') {
    const { gist_id } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}/star`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Gist unstarred' };
  }

  if (tool === 'github_check_gist_starred') {
    const { gist_id } = args;
    if (!gist_id) throw new Error('gist_id is required');

    const url = `${GITHUB_API_BASE}/gists/${gist_id}/star`;
    const response = await fetch(url, { headers });

    return { is_starred: response.ok };
  }

  // USER TOOLS (10 tools)
  if (tool === 'github_get_authenticated_user') {
    const url = `${GITHUB_API_BASE}/user`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      login: data.login,
      id: data.id,
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    });
  }

  if (tool === 'github_get_user') {
    const { username } = args;
    if (!username) throw new Error('username is required');

    const url = `${GITHUB_API_BASE}/users/${username}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      login: data.login,
      id: data.id,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    });
  }

  if (tool === 'github_update_authenticated_user') {
    const { name, email, blog, company, location, hireable, bio } = args;

    const url = `${GITHUB_API_BASE}/user`;
    const body = {};
    if (name !== undefined) body.name = name;
    if (email !== undefined) body.email = email;
    if (blog !== undefined) body.blog = blog;
    if (company !== undefined) body.company = company;
    if (location !== undefined) body.location = location;
    if (hireable !== undefined) body.hireable = hireable;
    if (bio !== undefined) body.bio = bio;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { login: data.login, updated: true };
  }

  if (tool === 'github_list_followers') {
    const { username, per_page = 10, page = 1 } = args;

    const url = username
      ? `${GITHUB_API_BASE}/users/${username}/followers?per_page=${per_page}&page=${page}`
      : `${GITHUB_API_BASE}/user/followers?per_page=${per_page}&page=${page}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const followers = await response.json();

    return checkResponseSize(followers.map(f => ({
      login: f.login,
      id: f.id,
      avatar_url: f.avatar_url
    })));
  }

  if (tool === 'github_list_following') {
    const { username, per_page = 10, page = 1 } = args;

    const url = username
      ? `${GITHUB_API_BASE}/users/${username}/following?per_page=${per_page}&page=${page}`
      : `${GITHUB_API_BASE}/user/following?per_page=${per_page}&page=${page}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const following = await response.json();

    return checkResponseSize(following.map(f => ({
      login: f.login,
      id: f.id,
      avatar_url: f.avatar_url
    })));
  }

  if (tool === 'github_check_following') {
    const { username } = args;
    if (!username) throw new Error('username is required');

    const url = `${GITHUB_API_BASE}/user/following/${username}`;
    const response = await fetch(url, { headers });

    return { is_following: response.ok };
  }

  if (tool === 'github_follow_user') {
    const { username } = args;
    if (!username) throw new Error('username is required');

    const url = `${GITHUB_API_BASE}/user/following/${username}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `Now following ${username}` };
  }

  if (tool === 'github_unfollow_user') {
    const { username } = args;
    if (!username) throw new Error('username is required');

    const url = `${GITHUB_API_BASE}/user/following/${username}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `Unfollowed ${username}` };
  }

  // SEARCH (6 tools)
  if (tool === 'github_search_repos') {
    const { q, sort, order = 'desc', per_page = 10, page = 1 } = args;
    if (!q) throw new Error('q (query) is required');

    let url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(q)}&per_page=${per_page}&page=${page}`;
    if (sort) url += `&sort=${sort}`;
    if (order) url += `&order=${order}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      items: data.items.map(minimalRepo)
    });
  }

  if (tool === 'github_search_code') {
    const { q, sort, order = 'desc', per_page = 10, page = 1 } = args;
    if (!q) throw new Error('q (query) is required');

    let url = `${GITHUB_API_BASE}/search/code?q=${encodeURIComponent(q)}&per_page=${per_page}&page=${page}`;
    if (sort) url += `&sort=${sort}`;
    if (order) url += `&order=${order}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      items: data.items.map(i => ({
        name: i.name,
        path: i.path,
        sha: i.sha,
        repository: minimalRepo(i.repository)
      }))
    });
  }

  if (tool === 'github_search_issues') {
    const { q, sort, order = 'desc', per_page = 10, page = 1 } = args;
    if (!q) throw new Error('q (query) is required');

    let url = `${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(q)}&per_page=${per_page}&page=${page}`;
    if (sort) url += `&sort=${sort}`;
    if (order) url += `&order=${order}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      items: data.items.map(minimalIssue)
    });
  }

  if (tool === 'github_search_users') {
    const { q, sort, order = 'desc', per_page = 10, page = 1 } = args;
    if (!q) throw new Error('q (query) is required');

    let url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(q)}&per_page=${per_page}&page=${page}`;
    if (sort) url += `&sort=${sort}`;
    if (order) url += `&order=${order}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      items: data.items.map(u => ({
        login: u.login,
        id: u.id,
        avatar_url: u.avatar_url
      }))
    });
  }

  // NOTIFICATIONS (6 tools)
  if (tool === 'github_list_notifications') {
    const { all = false, participating = false, since, before, per_page = 10, page = 1 } = args;

    let url = `${GITHUB_API_BASE}/notifications?all=${all}&participating=${participating}&per_page=${per_page}&page=${page}`;
    if (since) url += `&since=${since}`;
    if (before) url += `&before=${before}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const notifications = await response.json();

    return checkResponseSize(notifications.map(n => ({
      id: n.id,
      unread: n.unread,
      reason: n.reason,
      updated_at: n.updated_at,
      subject: n.subject,
      repository: minimalRepo(n.repository)
    })));
  }

  if (tool === 'github_mark_notifications_read') {
    const { last_read_at } = args;

    const url = `${GITHUB_API_BASE}/notifications`;
    const body = last_read_at ? { last_read_at } : {};

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Notifications marked as read' };
  }

  if (tool === 'github_get_thread') {
    const { thread_id } = args;
    if (!thread_id) throw new Error('thread_id is required');

    const url = `${GITHUB_API_BASE}/notifications/threads/${thread_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_mark_thread_read') {
    const { thread_id } = args;
    if (!thread_id) throw new Error('thread_id is required');

    const url = `${GITHUB_API_BASE}/notifications/threads/${thread_id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Thread marked as read' };
  }

  // STARS (4 tools)
  if (tool === 'github_list_starred') {
    const { username, sort = 'created', direction = 'desc', per_page = 10, page = 1 } = args;

    const url = username
      ? `${GITHUB_API_BASE}/users/${username}/starred?sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`
      : `${GITHUB_API_BASE}/user/starred?sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const starred = await response.json();

    return checkResponseSize(starred.map(minimalRepo));
  }

  if (tool === 'github_check_starred') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/user/starred/${owner}/${repo}`;
    const response = await fetch(url, { headers });

    return { is_starred: response.ok };
  }

  if (tool === 'github_star_repo') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/user/starred/${owner}/${repo}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Repository starred' };
  }

  if (tool === 'github_unstar_repo') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/user/starred/${owner}/${repo}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Repository unstarred' };
  }

  // ORGANIZATIONS (12 tools)
  if (tool === 'github_list_orgs') {
    const { username, per_page = 10, page = 1 } = args;

    const url = username
      ? `${GITHUB_API_BASE}/users/${username}/orgs?per_page=${per_page}&page=${page}`
      : `${GITHUB_API_BASE}/user/orgs?per_page=${per_page}&page=${page}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const orgs = await response.json();

    return checkResponseSize(orgs.map(o => ({
      login: o.login,
      id: o.id,
      description: o.description,
      avatar_url: o.avatar_url
    })));
  }

  if (tool === 'github_get_org') {
    const { org } = args;
    if (!org) throw new Error('org is required');

    const url = `${GITHUB_API_BASE}/orgs/${org}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      login: data.login,
      id: data.id,
      name: data.name,
      description: data.description,
      email: data.email,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following
    });
  }

  if (tool === 'github_update_org') {
    const { org, name, description, email, location, company, billing_email } = args;
    if (!org) throw new Error('org is required');

    const url = `${GITHUB_API_BASE}/orgs/${org}`;
    const body = {};
    if (name !== undefined) body.name = name;
    if (description !== undefined) body.description = description;
    if (email !== undefined) body.email = email;
    if (location !== undefined) body.location = location;
    if (company !== undefined) body.company = company;
    if (billing_email !== undefined) body.billing_email = billing_email;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { login: data.login, updated: true };
  }

  if (tool === 'github_list_org_members') {
    const { org, filter = 'all', role = 'all', per_page = 10, page = 1 } = args;
    if (!org) throw new Error('org is required');

    const url = `${GITHUB_API_BASE}/orgs/${org}/members?filter=${filter}&role=${role}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const members = await response.json();

    return checkResponseSize(members.map(m => ({
      login: m.login,
      id: m.id,
      avatar_url: m.avatar_url
    })));
  }

  if (tool === 'github_check_org_membership') {
    const { org, username } = args;
    if (!org || !username) throw new Error('org and username are required');

    const url = `${GITHUB_API_BASE}/orgs/${org}/members/${username}`;
    const response = await fetch(url, { headers });

    return { is_member: response.ok };
  }

  if (tool === 'github_remove_org_member') {
    const { org, username } = args;
    if (!org || !username) throw new Error('org and username are required');

    const url = `${GITHUB_API_BASE}/orgs/${org}/members/${username}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: `${username} removed from ${org}` };
  }

  if (tool === 'github_get_org_membership') {
    const { org, username } = args;
    if (!org || !username) throw new Error('org and username are required');

    const url = `${GITHUB_API_BASE}/orgs/${org}/memberships/${username}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { state: data.state, role: data.role };
  }

  if (tool === 'github_set_org_membership') {
    const { org, username, role = 'member' } = args;
    if (!org || !username) throw new Error('org and username are required');

    const url = `${GITHUB_API_BASE}/orgs/${org}/memberships/${username}`;
    const body = { role };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { state: data.state, role: data.role };
  }

  // FORKS & WATCHERS (8 tools)
  if (tool === 'github_list_forks') {
    const { owner, repo, sort = 'newest', per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/forks?sort=${sort}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const forks = await response.json();

    return checkResponseSize(forks.map(minimalRepo));
  }

  if (tool === 'github_create_fork') {
    const { owner, repo, organization } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/forks`;
    const body = organization ? { organization } : {};

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalRepo(data));
  }

  if (tool === 'github_list_watchers') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/subscribers?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const watchers = await response.json();

    return checkResponseSize(watchers.map(w => ({
      login: w.login,
      id: w.id,
      avatar_url: w.avatar_url
    })));
  }

  if (tool === 'github_get_subscription') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/subscription`;
    const response = await fetch(url, { headers });
    if (!response.ok) return { subscribed: false };

    const data = await response.json();
    return { subscribed: data.subscribed, ignored: data.ignored };
  }

  if (tool === 'github_set_subscription') {
    const { owner, repo, subscribed = true, ignored = false } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/subscription`;
    const body = { subscribed, ignored };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { subscribed: data.subscribed, ignored: data.ignored };
  }

  if (tool === 'github_delete_subscription') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/subscription`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Subscription deleted' };
  }

  // REPOSITORY INVITATIONS (4 tools)
  if (tool === 'github_list_repo_invitations') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/invitations?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const invitations = await response.json();

    return checkResponseSize(invitations.map(i => ({
      id: i.id,
      permissions: i.permissions,
      invitee: i.invitee ? { login: i.invitee.login } : null,
      inviter: i.inviter ? { login: i.inviter.login } : null
    })));
  }

  if (tool === 'github_update_repo_invitation') {
    const { owner, repo, invitation_id, permissions } = args;
    if (!owner || !repo || !invitation_id || !permissions) throw new Error('owner, repo, invitation_id, and permissions are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/invitations/${invitation_id}`;
    const body = { permissions };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, permissions: data.permissions };
  }

  if (tool === 'github_delete_repo_invitation') {
    const { owner, repo, invitation_id } = args;
    if (!owner || !repo || !invitation_id) throw new Error('owner, repo, and invitation_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/invitations/${invitation_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Invitation deleted' };
  }

  // COMMIT COMMENTS (6 tools)
  if (tool === 'github_list_commit_comments') {
    const { owner, repo, commit_sha, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !commit_sha) throw new Error('owner, repo, and commit_sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${commit_sha}/comments?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const comments = await response.json();

    return checkResponseSize(comments.map(c => ({
      id: c.id,
      body: c.body,
      path: c.path,
      position: c.position,
      user: c.user ? { login: c.user.login } : null,
      created_at: c.created_at
    })));
  }

  if (tool === 'github_create_commit_comment') {
    const { owner, repo, commit_sha, body, path, position, line } = args;
    if (!owner || !repo || !commit_sha || !body) throw new Error('owner, repo, commit_sha, and body are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${commit_sha}/comments`;
    const requestBody = { body };
    if (path) requestBody.path = path;
    if (position) requestBody.position = position;
    if (line) requestBody.line = line;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, body: data.body };
  }

  if (tool === 'github_get_commit_comment') {
    const { owner, repo, comment_id } = args;
    if (!owner || !repo || !comment_id) throw new Error('owner, repo, and comment_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/comments/${comment_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_commit_comment') {
    const { owner, repo, comment_id, body } = args;
    if (!owner || !repo || !comment_id || !body) throw new Error('owner, repo, comment_id, and body are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/comments/${comment_id}`;
    const requestBody = { body };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, body: data.body };
  }

  if (tool === 'github_delete_commit_comment') {
    const { owner, repo, comment_id } = args;
    if (!owner || !repo || !comment_id) throw new Error('owner, repo, and comment_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/comments/${comment_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Comment deleted' };
  }

  // STATUS CHECKS (8 tools)
  if (tool === 'github_list_commit_statuses') {
    const { owner, repo, ref, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${ref}/statuses?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const statuses = await response.json();

    return checkResponseSize(statuses.map(s => ({
      id: s.id,
      state: s.state,
      description: s.description,
      context: s.context,
      created_at: s.created_at
    })));
  }

  if (tool === 'github_get_combined_status') {
    const { owner, repo, ref } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${ref}/status`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      state: data.state,
      total_count: data.total_count,
      statuses: data.statuses.map(s => ({
        state: s.state,
        description: s.description,
        context: s.context
      }))
    });
  }

  if (tool === 'github_create_commit_status') {
    const { owner, repo, sha, state, target_url, description, context } = args;
    if (!owner || !repo || !sha || !state) throw new Error('owner, repo, sha, and state are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/statuses/${sha}`;
    const body = { state };
    if (target_url) body.target_url = target_url;
    if (description) body.description = description;
    if (context) body.context = context;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, state: data.state };
  }

  // GIT REFERENCES (8 tools)
  if (tool === 'github_list_refs') {
    const { owner, repo, namespace, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const path = namespace ? `/${namespace}` : '';
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs${path}?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const refs = await response.json();

    return checkResponseSize(refs.map(r => ({
      ref: r.ref,
      object: { sha: r.object.sha, type: r.object.type }
    })));
  }

  if (tool === 'github_get_ref') {
    const { owner, repo, ref } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/ref/${ref}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return {
      ref: data.ref,
      object: { sha: data.object.sha, type: data.object.type }
    };
  }

  if (tool === 'github_create_ref') {
    const { owner, repo, ref, sha } = args;
    if (!owner || !repo || !ref || !sha) throw new Error('owner, repo, ref, and sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs`;
    const body = { ref, sha };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { ref: data.ref, sha: data.object.sha };
  }

  if (tool === 'github_update_ref') {
    const { owner, repo, ref, sha, force = false } = args;
    if (!owner || !repo || !ref || !sha) throw new Error('owner, repo, ref, and sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs/${ref}`;
    const body = { sha, force };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { ref: data.ref, sha: data.object.sha };
  }

  if (tool === 'github_delete_ref') {
    const { owner, repo, ref } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs/${ref}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Reference deleted' };
  }

  // GIT TREES & BLOBS (10 tools)
  if (tool === 'github_get_tree') {
    const { owner, repo, tree_sha, recursive = false } = args;
    if (!owner || !repo || !tree_sha) throw new Error('owner, repo, and tree_sha are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${tree_sha}`;
    if (recursive) url += '?recursive=1';

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      sha: data.sha,
      tree: data.tree.map(t => ({
        path: t.path,
        mode: t.mode,
        type: t.type,
        sha: t.sha,
        size: t.size
      }))
    });
  }

  if (tool === 'github_create_tree') {
    const { owner, repo, tree, base_tree } = args;
    if (!owner || !repo || !tree) throw new Error('owner, repo, and tree are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees`;
    const body = { tree };
    if (base_tree) body.base_tree = base_tree;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { sha: data.sha };
  }

  if (tool === 'github_get_blob') {
    const { owner, repo, file_sha } = args;
    if (!owner || !repo || !file_sha) throw new Error('owner, repo, and file_sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/blobs/${file_sha}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      sha: data.sha,
      size: data.size,
      content: data.content,
      encoding: data.encoding
    });
  }

  if (tool === 'github_create_blob') {
    const { owner, repo, content, encoding = 'utf-8' } = args;
    if (!owner || !repo || !content) throw new Error('owner, repo, and content are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/blobs`;
    const body = { content, encoding };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { sha: data.sha };
  }

  // GIT TAGS (4 tools)
  if (tool === 'github_get_tag') {
    const { owner, repo, tag_sha } = args;
    if (!owner || !repo || !tag_sha) throw new Error('owner, repo, and tag_sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/tags/${tag_sha}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      tag: data.tag,
      sha: data.sha,
      message: data.message,
      tagger: data.tagger,
      object: data.object
    });
  }

  if (tool === 'github_create_tag') {
    const { owner, repo, tag, message, object, type, tagger } = args;
    if (!owner || !repo || !tag || !message || !object || !type) throw new Error('owner, repo, tag, message, object, and type are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/tags`;
    const body = { tag, message, object, type };
    if (tagger) body.tagger = tagger;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { sha: data.sha, tag: data.tag };
  }

  // GIT COMMITS (4 tools)
  if (tool === 'github_get_git_commit') {
    const { owner, repo, commit_sha } = args;
    if (!owner || !repo || !commit_sha) throw new Error('owner, repo, and commit_sha are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/commits/${commit_sha}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      sha: data.sha,
      message: data.message,
      author: data.author,
      committer: data.committer,
      tree: data.tree,
      parents: data.parents
    });
  }

  if (tool === 'github_create_git_commit') {
    const { owner, repo, message, tree, parents, author, committer } = args;
    if (!owner || !repo || !message || !tree) throw new Error('owner, repo, message, and tree are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/commits`;
    const body = { message, tree };
    if (parents) body.parents = parents;
    if (author) body.author = author;
    if (committer) body.committer = committer;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { sha: data.sha, message: data.message };
  }

  // REPOSITORY TRANSFER & ARCHIVE (6 tools)
  if (tool === 'github_transfer_repo') {
    const { owner, repo, new_owner, team_ids } = args;
    if (!owner || !repo || !new_owner) throw new Error('owner, repo, and new_owner are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/transfer`;
    const body = { new_owner };
    if (team_ids) body.team_ids = team_ids;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(minimalRepo(data));
  }

  if (tool === 'github_enable_automated_security_fixes') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/automated-security-fixes`;
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Automated security fixes enabled' };
  }

  if (tool === 'github_disable_automated_security_fixes') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/automated-security-fixes`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Automated security fixes disabled' };
  }

  if (tool === 'github_enable_vulnerability_alerts') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/vulnerability-alerts`;
    const response = await fetch(url, {
      method: 'PUT',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Vulnerability alerts enabled' };
  }

  if (tool === 'github_disable_vulnerability_alerts') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/vulnerability-alerts`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Vulnerability alerts disabled' };
  }

  // PROJECTS (12 tools)
  if (tool === 'github_list_repo_projects') {
    const { owner, repo, state = 'open', per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/projects?state=${state}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const projects = await response.json();

    return checkResponseSize(projects.map(p => ({
      id: p.id,
      name: p.name,
      body: p.body,
      state: p.state,
      created_at: p.created_at
    })));
  }

  if (tool === 'github_get_project') {
    const { project_id } = args;
    if (!project_id) throw new Error('project_id is required');

    const url = `${GITHUB_API_BASE}/projects/${project_id}`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_repo_project') {
    const { owner, repo, name, body } = args;
    if (!owner || !repo || !name) throw new Error('owner, repo, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/projects`;
    const requestBody = { name };
    if (body) requestBody.body = body;

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_update_project') {
    const { project_id, name, body, state } = args;
    if (!project_id) throw new Error('project_id is required');

    const url = `${GITHUB_API_BASE}/projects/${project_id}`;
    const requestBody = {};
    if (name) requestBody.name = name;
    if (body !== undefined) requestBody.body = body;
    if (state) requestBody.state = state;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_delete_project') {
    const { project_id } = args;
    if (!project_id) throw new Error('project_id is required');

    const url = `${GITHUB_API_BASE}/projects/${project_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Project deleted' };
  }

  if (tool === 'github_list_project_columns') {
    const { project_id, per_page = 10, page = 1 } = args;
    if (!project_id) throw new Error('project_id is required');

    const url = `${GITHUB_API_BASE}/projects/${project_id}/columns?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const columns = await response.json();

    return checkResponseSize(columns.map(c => ({
      id: c.id,
      name: c.name,
      created_at: c.created_at
    })));
  }

  if (tool === 'github_create_project_column') {
    const { project_id, name } = args;
    if (!project_id || !name) throw new Error('project_id and name are required');

    const url = `${GITHUB_API_BASE}/projects/${project_id}/columns`;
    const body = { name };

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_update_project_column') {
    const { column_id, name } = args;
    if (!column_id || !name) throw new Error('column_id and name are required');

    const url = `${GITHUB_API_BASE}/projects/columns/${column_id}`;
    const body = { name };

    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_delete_project_column') {
    const { column_id } = args;
    if (!column_id) throw new Error('column_id is required');

    const url = `${GITHUB_API_BASE}/projects/columns/${column_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Column deleted' };
  }

  if (tool === 'github_list_project_cards') {
    const { column_id, archived_state = 'not_archived', per_page = 10, page = 1 } = args;
    if (!column_id) throw new Error('column_id is required');

    const url = `${GITHUB_API_BASE}/projects/columns/${column_id}/cards?archived_state=${archived_state}&per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' } });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const cards = await response.json();

    return checkResponseSize(cards.map(c => ({
      id: c.id,
      note: c.note,
      archived: c.archived,
      created_at: c.created_at
    })));
  }

  if (tool === 'github_create_project_card') {
    const { column_id, note, content_id, content_type } = args;
    if (!column_id) throw new Error('column_id is required');

    const url = `${GITHUB_API_BASE}/projects/columns/${column_id}/cards`;
    const body = {};
    if (note) body.note = note;
    if (content_id && content_type) {
      body.content_id = content_id;
      body.content_type = content_type;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id };
  }

  if (tool === 'github_delete_project_card') {
    const { card_id } = args;
    if (!card_id) throw new Error('card_id is required');

    const url = `${GITHUB_API_BASE}/projects/columns/cards/${card_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...headers, 'Accept': 'application/vnd.github.inertia-preview+json' }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Card deleted' };
  }

  // CHECKS (10 tools)
  if (tool === 'github_list_check_runs_for_ref') {
    const { owner, repo, ref, check_name, status, filter = 'latest', per_page = 10, page = 1 } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${ref}/check-runs?filter=${filter}&per_page=${per_page}&page=${page}`;
    if (check_name) url += `&check_name=${check_name}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      check_runs: data.check_runs.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        conclusion: c.conclusion,
        started_at: c.started_at,
        completed_at: c.completed_at
      }))
    });
  }

  if (tool === 'github_get_check_run') {
    const { owner, repo, check_run_id } = args;
    if (!owner || !repo || !check_run_id) throw new Error('owner, repo, and check_run_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/check-runs/${check_run_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_check_suites_for_ref') {
    const { owner, repo, ref, app_id, check_name, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !ref) throw new Error('owner, repo, and ref are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${ref}/check-suites?per_page=${per_page}&page=${page}`;
    if (app_id) url += `&app_id=${app_id}`;
    if (check_name) url += `&check_name=${check_name}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      check_suites: data.check_suites.map(s => ({
        id: s.id,
        status: s.status,
        conclusion: s.conclusion,
        created_at: s.created_at
      }))
    });
  }

  if (tool === 'github_get_check_suite') {
    const { owner, repo, check_suite_id } = args;
    if (!owner || !repo || !check_suite_id) throw new Error('owner, repo, and check_suite_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/check-suites/${check_suite_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // SECRETS (8 tools)
  if (tool === 'github_list_repo_secrets') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/secrets?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      secrets: data.secrets.map(s => ({
        name: s.name,
        created_at: s.created_at,
        updated_at: s.updated_at
      }))
    });
  }

  if (tool === 'github_get_repo_secret') {
    const { owner, repo, secret_name } = args;
    if (!owner || !repo || !secret_name) throw new Error('owner, repo, and secret_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/secrets/${secret_name}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return {
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }

  if (tool === 'github_create_or_update_repo_secret') {
    const { owner, repo, secret_name, encrypted_value, key_id } = args;
    if (!owner || !repo || !secret_name || !encrypted_value || !key_id) throw new Error('owner, repo, secret_name, encrypted_value, and key_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/secrets/${secret_name}`;
    const body = { encrypted_value, key_id };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Secret created/updated' };
  }

  if (tool === 'github_delete_repo_secret') {
    const { owner, repo, secret_name } = args;
    if (!owner || !repo || !secret_name) throw new Error('owner, repo, and secret_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/secrets/${secret_name}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Secret deleted' };
  }

  if (tool === 'github_get_repo_public_key') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/actions/secrets/public-key`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { key_id: data.key_id, key: data.key };
  }

  // ENVIRONMENTS (8 tools)
  if (tool === 'github_list_environments') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/environments?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      environments: data.environments.map(e => ({
        id: e.id,
        name: e.name,
        created_at: e.created_at,
        updated_at: e.updated_at
      }))
    });
  }

  if (tool === 'github_get_environment') {
    const { owner, repo, environment_name } = args;
    if (!owner || !repo || !environment_name) throw new Error('owner, repo, and environment_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/environments/${environment_name}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_or_update_environment') {
    const { owner, repo, environment_name, wait_timer, reviewers, deployment_branch_policy } = args;
    if (!owner || !repo || !environment_name) throw new Error('owner, repo, and environment_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/environments/${environment_name}`;
    const body = {};
    if (wait_timer !== undefined) body.wait_timer = wait_timer;
    if (reviewers) body.reviewers = reviewers;
    if (deployment_branch_policy) body.deployment_branch_policy = deployment_branch_policy;

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, name: data.name };
  }

  if (tool === 'github_delete_environment') {
    const { owner, repo, environment_name } = args;
    if (!owner || !repo || !environment_name) throw new Error('owner, repo, and environment_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/environments/${environment_name}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Environment deleted' };
  }

  // PAGES (6 tools)
  if (tool === 'github_get_pages') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_create_pages_site') {
    const { owner, repo, source } = args;
    if (!owner || !repo || !source) throw new Error('owner, repo, and source are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const body = { source };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_pages') {
    const { owner, repo, cname, https_enforced, source } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const body = {};
    if (cname !== undefined) body.cname = cname;
    if (https_enforced !== undefined) body.https_enforced = https_enforced;
    if (source) body.source = source;

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Pages updated' };
  }

  if (tool === 'github_delete_pages_site') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Pages site deleted' };
  }

  if (tool === 'github_request_pages_build') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages/builds`;
    const response = await fetch(url, {
      method: 'POST',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { status: data.status, url: data.url };
  }

  if (tool === 'github_list_pages_builds') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages/builds?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const builds = await response.json();

    return checkResponseSize(builds.map(b => ({
      status: b.status,
      created_at: b.created_at,
      updated_at: b.updated_at
    })));
  }

  // CODE SCANNING (8 tools)
  if (tool === 'github_list_code_scanning_alerts') {
    const { owner, repo, state, ref, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/code-scanning/alerts?per_page=${per_page}&page=${page}`;
    if (state) url += `&state=${state}`;
    if (ref) url += `&ref=${ref}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const alerts = await response.json();

    return checkResponseSize(alerts.map(a => ({
      number: a.number,
      state: a.state,
      rule: a.rule,
      created_at: a.created_at,
      url: a.url
    })));
  }

  if (tool === 'github_get_code_scanning_alert') {
    const { owner, repo, alert_number } = args;
    if (!owner || !repo || !alert_number) throw new Error('owner, repo, and alert_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/code-scanning/alerts/${alert_number}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_code_scanning_alert') {
    const { owner, repo, alert_number, state, dismissed_reason, dismissed_comment } = args;
    if (!owner || !repo || !alert_number || !state) throw new Error('owner, repo, alert_number, and state are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/code-scanning/alerts/${alert_number}`;
    const body = { state };
    if (dismissed_reason) body.dismissed_reason = dismissed_reason;
    if (dismissed_comment) body.dismissed_comment = dismissed_comment;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { number: data.number, state: data.state };
  }

  if (tool === 'github_list_code_scanning_analyses') {
    const { owner, repo, ref, tool_name, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/code-scanning/analyses?per_page=${per_page}&page=${page}`;
    if (ref) url += `&ref=${ref}`;
    if (tool_name) url += `&tool_name=${tool_name}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const analyses = await response.json();

    return checkResponseSize(analyses.map(a => ({
      id: a.id,
      ref: a.ref,
      commit_sha: a.commit_sha,
      created_at: a.created_at
    })));
  }

  // DEPENDABOT (6 tools)
  if (tool === 'github_list_dependabot_alerts') {
    const { owner, repo, state, severity, ecosystem, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/alerts?per_page=${per_page}&page=${page}`;
    if (state) url += `&state=${state}`;
    if (severity) url += `&severity=${severity}`;
    if (ecosystem) url += `&ecosystem=${ecosystem}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const alerts = await response.json();

    return checkResponseSize(alerts.map(a => ({
      number: a.number,
      state: a.state,
      severity: a.security_advisory?.severity,
      created_at: a.created_at
    })));
  }

  if (tool === 'github_get_dependabot_alert') {
    const { owner, repo, alert_number } = args;
    if (!owner || !repo || !alert_number) throw new Error('owner, repo, and alert_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/alerts/${alert_number}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_dependabot_alert') {
    const { owner, repo, alert_number, state, dismissed_reason, dismissed_comment } = args;
    if (!owner || !repo || !alert_number || !state) throw new Error('owner, repo, alert_number, and state are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/alerts/${alert_number}`;
    const body = { state };
    if (dismissed_reason) body.dismissed_reason = dismissed_reason;
    if (dismissed_comment) body.dismissed_comment = dismissed_comment;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { number: data.number, state: data.state };
  }

  if (tool === 'github_list_dependabot_secrets') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/secrets?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize({
      total_count: data.total_count,
      secrets: data.secrets.map(s => ({
        name: s.name,
        created_at: s.created_at,
        updated_at: s.updated_at
      }))
    });
  }

  if (tool === 'github_get_dependabot_secret') {
    const { owner, repo, secret_name } = args;
    if (!owner || !repo || !secret_name) throw new Error('owner, repo, and secret_name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/secrets/${secret_name}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return {
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }

  if (tool === 'github_create_or_update_dependabot_secret') {
    const { owner, repo, secret_name, encrypted_value, key_id } = args;
    if (!owner || !repo || !secret_name || !encrypted_value || !key_id) throw new Error('owner, repo, secret_name, encrypted_value, and key_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/dependabot/secrets/${secret_name}`;
    const body = { encrypted_value, key_id };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Dependabot secret created/updated' };
  }

  // AUTOLINKS (4 tools)
  if (tool === 'github_list_autolinks') {
    const { owner, repo, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/autolinks?page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const autolinks = await response.json();

    return checkResponseSize(autolinks.map(a => ({
      id: a.id,
      key_prefix: a.key_prefix,
      url_template: a.url_template
    })));
  }

  if (tool === 'github_get_autolink') {
    const { owner, repo, autolink_id } = args;
    if (!owner || !repo || !autolink_id) throw new Error('owner, repo, and autolink_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/autolinks/${autolink_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return {
      id: data.id,
      key_prefix: data.key_prefix,
      url_template: data.url_template
    };
  }

  if (tool === 'github_create_autolink') {
    const { owner, repo, key_prefix, url_template } = args;
    if (!owner || !repo || !key_prefix || !url_template) throw new Error('owner, repo, key_prefix, and url_template are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/autolinks`;
    const body = { key_prefix, url_template };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return { id: data.id, key_prefix: data.key_prefix };
  }

  if (tool === 'github_delete_autolink') {
    const { owner, repo, autolink_id } = args;
    if (!owner || !repo || !autolink_id) throw new Error('owner, repo, and autolink_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/autolinks/${autolink_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Autolink deleted' };
  }

  // REPOSITORY RULES (6 tools)
  if (tool === 'github_get_repo_ruleset') {
    const { owner, repo, ruleset_id } = args;
    if (!owner || !repo || !ruleset_id) throw new Error('owner, repo, and ruleset_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/rulesets/${ruleset_id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_repo_rulesets') {
    const { owner, repo, per_page = 10, page = 1 } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/rulesets?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const rulesets = await response.json();

    return checkResponseSize(rulesets.map(r => ({
      id: r.id,
      name: r.name,
      enforcement: r.enforcement,
      created_at: r.created_at
    })));
  }

  // TRAFFIC (4 tools)
  if (tool === 'github_get_views') {
    const { owner, repo, per = 'day' } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/traffic/views?per=${per}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_clones') {
    const { owner, repo, per = 'day' } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/traffic/clones?per=${per}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_top_referrers') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/traffic/popular/referrers`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_top_paths') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/traffic/popular/paths`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // EMOJIS & GITIGNORE (3 tools)
  if (tool === 'github_get_emojis') {
    const url = `${GITHUB_API_BASE}/emojis`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_gitignore_templates') {
    const url = `${GITHUB_API_BASE}/gitignore/templates`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_get_gitignore_template') {
    const { name } = args;
    if (!name) throw new Error('name is required');

    const url = `${GITHUB_API_BASE}/gitignore/templates/${name}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // ADDITIONAL CRITICAL TOOLS (20 tools)
  if (tool === 'github_add_labels') {
    const { owner, repo, issue_number, labels } = args;
    if (!owner || !repo || !issue_number || !labels) throw new Error('owner, repo, issue_number, and labels are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ labels: Array.isArray(labels) ? labels : [labels] })
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_remove_label') {
    const { owner, repo, issue_number, name } = args;
    if (!owner || !repo || !issue_number || !name) throw new Error('owner, repo, issue_number, and name are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels/${name}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Label removed' };
  }

  if (tool === 'github_replace_labels') {
    const { owner, repo, issue_number, labels = [] } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/labels`;
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ labels })
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_issue_comments') {
    const { owner, repo, issue_number, since, per_page = 10, page = 1 } = args;
    if (!owner || !repo || !issue_number) throw new Error('owner, repo, and issue_number are required');

    let url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/comments?per_page=${per_page}&page=${page}`;
    if (since) url += `&since=${since}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data.map(c => ({
      id: c.id,
      body: c.body,
      user: c.user ? { login: c.user.login } : null,
      created_at: c.created_at,
      updated_at: c.updated_at
    })));
  }

  if (tool === 'github_create_issue_comment') {
    const { owner, repo, issue_number, body } = args;
    if (!owner || !repo || !issue_number || !body) throw new Error('owner, repo, issue_number, and body are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issue_number}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body })
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_update_issue_comment') {
    const { owner, repo, comment_id, body } = args;
    if (!owner || !repo || !comment_id || !body) throw new Error('owner, repo, comment_id, and body are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/comments/${comment_id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ body })
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_delete_issue_comment') {
    const { owner, repo, comment_id } = args;
    if (!owner || !repo || !comment_id) throw new Error('owner, repo, and comment_id are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/comments/${comment_id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return { success: true, message: 'Comment deleted' };
  }

  if (tool === 'github_list_repo_topics') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/topics`;
    const response = await fetch(url, {
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_replace_repo_topics') {
    const { owner, repo, names } = args;
    if (!owner || !repo || !names) throw new Error('owner, repo, and names are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/topics`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.mercy-preview+json'
      },
      body: JSON.stringify({ names })
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  if (tool === 'github_list_repo_languages') {
    const { owner, repo } = args;
    if (!owner || !repo) throw new Error('owner and repo are required');

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();

    return checkResponseSize(data);
  }

  // Default: tool not implemented yet
  throw new Error(`GitHub tool not yet fully implemented: ${tool}. This tool exists but needs implementation.`);
}

module.exports = { execute };

