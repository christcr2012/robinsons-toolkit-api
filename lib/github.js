/**
 * GitHub Integration - Pure JavaScript REST API
 * Converted from TypeScript MCP server
 * NO MCP dependencies - uses native fetch()
 */

async function githubFetch(token, path, options = {}) {
  const url = path.startsWith('http') ? path : `https://api.github.com${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${error}`);
  }

  return response.json();
}

async function listRepos(token, args) {
    const params = {};
    if (args.type) params.type = args.type;
    if (args.sort) params.sort = args.sort;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const path = args.org ? `/orgs/${args.org}/repos` : '/user/repos';
    const response = await githubFetch(token, path, { method: 'GET' });
}

async function getRepo(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}`);
}

async function createRepo(token, args) {
    const body = { name: args.name };
    if (args.description) body.description = args.description;
    if (args.auto_init !== undefined) body.auto_init = args.auto_init;
    if (args.gitignore_template) body.gitignore_template = args.gitignore_template;
    if (args.license_template) body.license_template = args.license_template;
    const path = args.org ? `/orgs/${args.org}/repos` : '/user/repos';
    const response = await githubFetch(token, path, { method: 'POST', body: JSON.stringify(body) });
}

async function updateRepo(token, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.description !== undefined) body.description = args.description;
    if (args.has_issues !== undefined) body.has_issues = args.has_issues;
    if (args.has_projects !== undefined) body.has_projects = args.has_projects;
    if (args.has_wiki !== undefined) body.has_wiki = args.has_wiki;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteRepo(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}`, { method: 'DELETE' });
}

async function listRepoTopics(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/topics`);
}

async function replaceRepoTopics(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/topics`, { method: 'PUT', body: JSON.stringify({ names: args.names }) });
}

async function listRepoLanguages(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/languages`);
}

async function listRepoTags(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/tags`, { method: 'GET' });
}

async function listRepoTeams(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/teams`);
}

async function transferRepo(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/transfer`, { method: 'POST', body: JSON.stringify({ new_owner: args.new_owner }) });
}

async function enableAutomatedSecurityFixes(token, args) {
    await this.client.put(`/repos/${args.owner}/${args.repo}/automated-security-fixes`);
}

async function disableAutomatedSecurityFixes(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/automated-security-fixes`, { method: 'DELETE' });
}

async function enableVulnerabilityAlerts(token, args) {
    await this.client.put(`/repos/${args.owner}/${args.repo}/vulnerability-alerts`);
}

async function disableVulnerabilityAlerts(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/vulnerability-alerts`, { method: 'DELETE' });
}

async function getRepoReadme(token, args) {
    const params = {};
    if (args.ref) params.ref = args.ref;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/readme`, { method: 'GET' });
}

async function getRepoLicense(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/license`);
}

async function getRepoCommunityProfile(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/community/profile`);
}

async function getRepoStatsContributors(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/stats/contributors`);
}

async function getRepoStatsCommitActivity(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/stats/commit_activity`);
}

async function listBranches(token, args) {
    const params = {};
    if (args.protected !== undefined) params.protected = args.protected;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches`, { method: 'GET' });
}

async function getBranch(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/branches/${args.branch}`);
}

async function createBranch(token, args) {
    const fromBranch = args.from_branch || 'main';
    const refResponse = await this.client.get(`/repos/${args.owner}/${args.repo}/git/ref/heads/${fromBranch}`);
    const sha = refResponse.object.sha;
    const response = await this.client.post(`/repos/${args.owner}/${args.repo}/git/refs`, {
      ref: `refs/heads/${args.branch}`,
      sha
    });
}

async function deleteBranch(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/git/refs/heads/${args.branch}`, { method: 'DELETE' });
}

async function mergeBranch(token, args) {
    const body = { base: args.base, head: args.head };
    if (args.commit_message) body.commit_message = args.commit_message;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/merges`, { method: 'POST', body: JSON.stringify(body) });
}

async function getBranchProtection(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection`);
}

async function updateBranchProtection(token, args) {
    const body = {};
    if (args.required_status_checks) body.required_status_checks = args.required_status_checks;
    if (args.enforce_admins !== undefined) body.enforce_admins = args.enforce_admins;
    if (args.required_pull_request_reviews) body.required_pull_request_reviews = args.required_pull_request_reviews;
    if (args.restrictions) body.restrictions = args.restrictions;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection`, { method: 'PUT', body: JSON.stringify(body) });
}

async function deleteBranchProtection(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection`, { method: 'DELETE' });
}

async function getRequiredStatusChecks(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/required_status_checks`);
}

async function updateRequiredStatusChecks(token, args) {
    const body = {};
    if (args.strict !== undefined) body.strict = args.strict;
    if (args.contexts) body.contexts = args.contexts;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/required_status_checks`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function getAdminEnforcement(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/enforce_admins`);
}

async function setAdminEnforcement(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/enforce_admins`, { method: 'POST', body: JSON.stringify({}) });
}

async function getPullRequestReviewEnforcement(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/required_pull_request_reviews`);
}

async function updatePullRequestReviewEnforcement(token, args) {
    const body = {};
    if (args.dismissal_restrictions) body.dismissal_restrictions = args.dismissal_restrictions;
    if (args.dismiss_stale_reviews !== undefined) body.dismiss_stale_reviews = args.dismiss_stale_reviews;
    if (args.require_code_owner_reviews !== undefined) body.require_code_owner_reviews = args.require_code_owner_reviews;
    if (args.required_approving_review_count) body.required_approving_review_count = args.required_approving_review_count;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/protection/required_pull_request_reviews`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function renameBranch(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/branches/${args.branch}/rename`, { method: 'POST', body: JSON.stringify({ new_name: args.new_name }) });
}

async function listCommits(token, args) {
    const params = {};
    if (args.sha) params.sha = args.sha;
    if (args.path) params.path = args.path;
    if (args.author) params.author = args.author;
    if (args.since) params.since = args.since;
    if (args.until) params.until = args.until;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/commits`, { method: 'GET' });
}

async function getCommit(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/commits/${args.ref}`);
}

async function compareCommits(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/compare/${args.base}...${args.head}`);
}

async function listCommitComments(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/commits/${args.ref}/comments`, { method: 'GET' });
}

async function createCommitComment(token, args) {
    const body = { body: args.body };
    if (args.path) body.path = args.path;
    if (args.position) body.position = args.position;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/commits/${args.commit_sha}/comments`, { method: 'POST', body: JSON.stringify(body) });
}

async function getCommitStatus(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/commits/${args.ref}/status`);
}

async function listCommitStatuses(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/commits/${args.ref}/statuses`, { method: 'GET' });
}

async function createCommitStatus(token, args) {
    const body = { state: args.state };
    if (args.target_url) body.target_url = args.target_url;
    if (args.description) body.description = args.description;
    if (args.context) body.context = args.context;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/statuses/${args.sha}`, { method: 'POST', body: JSON.stringify(body) });
}

async function listPullRequestsAssociatedWithCommit(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/commits/${args.commit_sha}/pulls`);
}

async function getCommitSignatureVerification(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/commits/${args.ref}`);
}

async function listIssues(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    if (args.labels) params.labels = args.labels.join(',');
    if (args.sort) params.sort = args.sort;
    if (args.direction) params.direction = args.direction;
    if (args.since) params.since = args.since;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues`, { method: 'GET' });
}

async function getIssue(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/issues/${args.issue_number}`);
}

async function createIssue(token, args) {
    const body = { title: args.title };
    if (args.body) body.body = args.body;
    if (args.assignees) body.assignees = args.assignees;
    if (args.milestone) body.milestone = args.milestone;
    if (args.labels) body.labels = args.labels;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues`, { method: 'POST', body: JSON.stringify(body) });
}

async function updateIssue(token, args) {
    const body = {};
    if (args.title) body.title = args.title;
    if (args.body) body.body = args.body;
    if (args.state) body.state = args.state;
    if (args.assignees) body.assignees = args.assignees;
    if (args.labels) body.labels = args.labels;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function lockIssue(token, args) {
    const body = {};
    if (args.lock_reason) body.lock_reason = args.lock_reason;
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/lock`, { method: 'PUT', body: JSON.stringify(body) });
}

async function unlockIssue(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/lock`, { method: 'DELETE' });
}

async function addAssignees(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/assignees`, { method: 'POST', body: JSON.stringify({ assignees: args.assignees }) });
}

async function removeAssignees(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/assignees`, { method: 'DELETE' });
}

async function addLabels(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/labels`, { method: 'POST', body: JSON.stringify({ labels: args.labels }) });
}

async function removeLabel(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/labels/${args.name}`, { method: 'DELETE' });
}

async function replaceLabels(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/labels`, { method: 'PUT', body: JSON.stringify({ labels: args.labels || [] }) });
}

async function listIssueComments(token, args) {
    const params = {};
    if (args.since) params.since = args.since;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/comments`, { method: 'GET' });
}

async function createIssueComment(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/comments`, { method: 'POST', body: JSON.stringify({ body: args.body }) });
}

async function updateIssueComment(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/comments/${args.comment_id}`, { method: 'PATCH', body: JSON.stringify({ body: args.body }) });
}

async function deleteIssueComment(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/comments/${args.comment_id}`, { method: 'DELETE' });
}

async function listIssueEvents(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/events`, { method: 'GET' });
}

async function listIssueTimeline(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/issues/${args.issue_number}/timeline`, { method: 'GET' });
}

async function listLabels(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/labels`, { method: 'GET' });
}

async function createLabel(token, args) {
    const body = { name: args.name, color: args.color };
    if (args.description) body.description = args.description;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/labels`, { method: 'POST', body: JSON.stringify(body) });
}

async function deleteLabel(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/labels/${args.name}`, { method: 'DELETE' });
}

async function listPullRequests(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    if (args.head) params.head = args.head;
    if (args.base) params.base = args.base;
    if (args.sort) params.sort = args.sort;
    if (args.direction) params.direction = args.direction;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls`, { method: 'GET' });
}

async function getPullRequest(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}`);
}

async function createPullRequest(token, args) {
    const body = { title: args.title, head: args.head, base: args.base };
    if (args.body) body.body = args.body;
    if (args.draft !== undefined) body.draft = args.draft;
    if (args.maintainer_can_modify !== undefined) body.maintainer_can_modify = args.maintainer_can_modify;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls`, { method: 'POST', body: JSON.stringify(body) });
}

async function updatePullRequest(token, args) {
    const body = {};
    if (args.title) body.title = args.title;
    if (args.body) body.body = args.body;
    if (args.state) body.state = args.state;
    if (args.base) body.base = args.base;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function mergePullRequest(token, args) {
    const body = {};
    if (args.commit_title) body.commit_title = args.commit_title;
    if (args.commit_message) body.commit_message = args.commit_message;
    if (args.merge_method) body.merge_method = args.merge_method;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/merge`, { method: 'PUT', body: JSON.stringify(body) });
}

async function getPullRequestMergeStatus(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/merge`);
}

async function listPullRequestCommits(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/commits`, { method: 'GET' });
}

async function listPullRequestFiles(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/files`, { method: 'GET' });
}

async function listPullRequestReviews(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/reviews`, { method: 'GET' });
}

async function getPullRequestReview(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/reviews/${args.review_id}`);
}

async function createPullRequestReview(token, args) {
    const body = { event: args.event };
    if (args.body) body.body = args.body;
    if (args.comments) body.comments = args.comments;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/reviews`, { method: 'POST', body: JSON.stringify(body) });
}

async function submitPullRequestReview(token, args) {
    const body = { event: args.event };
    if (args.body) body.body = args.body;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/reviews/${args.review_id}/events`, { method: 'POST', body: JSON.stringify(body) });
}

async function dismissPullRequestReview(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/reviews/${args.review_id}/dismissals`, { method: 'PUT', body: JSON.stringify({ message: args.message }) });
}

async function listPullRequestReviewComments(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/comments`, { method: 'GET' });
}

async function createPullRequestReviewComment(token, args) {
    const body = { body: args.body, commit_id: args.commit_id, path: args.path };
    if (args.line) body.line = args.line;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/comments`, { method: 'POST', body: JSON.stringify(body) });
}

async function updatePullRequestReviewComment(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/comments/${args.comment_id}`, { method: 'PATCH', body: JSON.stringify({ body: args.body }) });
}

async function deletePullRequestReviewComment(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/comments/${args.comment_id}`, { method: 'DELETE' });
}

async function requestPullRequestReviewers(token, args) {
    const body = {};
    if (args.reviewers) body.reviewers = args.reviewers;
    if (args.team_reviewers) body.team_reviewers = args.team_reviewers;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/requested_reviewers`, { method: 'POST', body: JSON.stringify(body) });
}

async function removePullRequestReviewers(token, args) {
    const body = {};
    if (args.reviewers) body.reviewers = args.reviewers;
    if (args.team_reviewers) body.team_reviewers = args.team_reviewers;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/requested_reviewers`, { method: 'DELETE' });
}

async function updatePullRequestBranch(token, args) {
    const body = {};
    if (args.expected_head_sha) body.expected_head_sha = args.expected_head_sha;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/update-branch`, { method: 'PUT', body: JSON.stringify(body) });
}

async function listRequestedReviewers(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}/requested_reviewers`);
}

async function checkPullRequestReviewability(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}`);
}

async function getPullRequestDiff(token, args) {
    const response = await this.fetch(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}`, { headers: { 'Accept': 'application/vnd.github.v3.diff' } });
}

async function getPullRequestPatch(token, args) {
    const response = await this.fetch(`/repos/${args.owner}/${args.repo}/pulls/${args.pull_number}`, { headers: { 'Accept': 'application/vnd.github.v3.patch' } });
}

async function convertIssueToPullRequest(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/pulls`, { method: 'POST', body: JSON.stringify({ issue: args.issue_number, head: args.head, base: args.base }) });
}

async function listWorkflows(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/workflows`, { method: 'GET' });
}

async function getWorkflow(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/actions/workflows/${args.workflow_id}`);
}

async function disableWorkflow(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/workflows/${args.workflow_id}/disable`, { method: 'PUT', body: JSON.stringify({}) });
}

async function enableWorkflow(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/workflows/${args.workflow_id}/enable`, { method: 'PUT', body: JSON.stringify({}) });
}

async function createWorkflowDispatch(token, args) {
    const body = { ref: args.ref };
    if (args.inputs) body.inputs = args.inputs;
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/workflows/${args.workflow_id}/dispatches`, { method: 'POST', body: JSON.stringify(body) });
}

async function listWorkflowRuns(token, args) {
    const params = {};
    if (args.workflow_id) params.workflow_id = args.workflow_id;
    if (args.actor) params.actor = args.actor;
    if (args.branch) params.branch = args.branch;
    if (args.event) params.event = args.event;
    if (args.status) params.status = args.status;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs`, { method: 'GET' });
}

async function getWorkflowRun(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}`);
}

async function cancelWorkflowRun(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/cancel`, { method: 'POST', body: JSON.stringify({}) });
}

async function rerunWorkflow(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/rerun`, { method: 'POST', body: JSON.stringify({}) });
}

async function rerunFailedJobs(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/rerun-failed-jobs`, { method: 'POST', body: JSON.stringify({}) });
}

async function deleteWorkflowRun(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}`, { method: 'DELETE' });
}

async function listWorkflowRunArtifacts(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/artifacts`, { method: 'GET' });
}

async function downloadWorkflowRunLogs(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/logs`);
}

async function deleteWorkflowRunLogs(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/logs`, { method: 'DELETE' });
}

async function listWorkflowRunJobs(token, args) {
    const params = {};
    if (args.filter) params.filter = args.filter;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/runs/${args.run_id}/jobs`, { method: 'GET' });
}

async function getWorkflowRunJob(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/actions/jobs/${args.job_id}`);
}

async function downloadJobLogs(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/actions/jobs/${args.job_id}/logs`);
}

async function listRepoSecrets(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/secrets`, { method: 'GET' });
}

async function createOrUpdateRepoSecret(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/secrets/${args.secret_name}`, { method: 'PUT', body: JSON.stringify({ encrypted_value: args.encrypted_value }) });
}

async function deleteRepoSecret(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/actions/secrets/${args.secret_name}`, { method: 'DELETE' });
}

async function listReleases(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases`, { method: 'GET' });
}

async function getRelease(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/releases/${args.release_id}`);
}

async function getLatestRelease(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/releases/latest`);
}

async function getReleaseByTag(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/releases/tags/${args.tag}`);
}

async function createRelease(token, args) {
    const body = { tag_name: args.tag_name };
    if (args.target_commitish) body.target_commitish = args.target_commitish;
    if (args.name) body.name = args.name;
    if (args.body) body.body = args.body;
    if (args.draft !== undefined) body.draft = args.draft;
    if (args.prerelease !== undefined) body.prerelease = args.prerelease;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases`, { method: 'POST', body: JSON.stringify(body) });
}

async function updateRelease(token, args) {
    const body = {};
    if (args.tag_name) body.tag_name = args.tag_name;
    if (args.name) body.name = args.name;
    if (args.body) body.body = args.body;
    if (args.draft !== undefined) body.draft = args.draft;
    if (args.prerelease !== undefined) body.prerelease = args.prerelease;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/${args.release_id}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteRelease(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/${args.release_id}`, { method: 'DELETE' });
}

async function listReleaseAssets(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/${args.release_id}/assets`, { method: 'GET' });
}

async function getReleaseAsset(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/releases/assets/${args.asset_id}`);
}

async function updateReleaseAsset(token, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.label) body.label = args.label;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/assets/${args.asset_id}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteReleaseAsset(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/assets/${args.asset_id}`, { method: 'DELETE' });
}

async function generateReleaseNotes(token, args) {
    const body = { tag_name: args.tag_name };
    if (args.target_commitish) body.target_commitish = args.target_commitish;
    if (args.previous_tag_name) body.previous_tag_name = args.previous_tag_name;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/releases/generate-notes`, { method: 'POST', body: JSON.stringify(body) });
}

async function getContent(token, args) {
    const params = {};
    if (args.ref) params.ref = args.ref;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/contents/${args.path}`, { method: 'GET' });
}

async function createOrUpdateFile(token, args) {
    const body = { message: args.message, content: args.content };
    if (args.sha) body.sha = args.sha;
    if (args.branch) body.branch = args.branch;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/contents/${args.path}`, { method: 'PUT', body: JSON.stringify(body) });
}

async function deleteFile(token, args) {
    const body = { message: args.message, sha: args.sha };
    if (args.branch) body.branch = args.branch;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/contents/${args.path}`, { method: 'DELETE' });
}

async function getArchive(token, args) {
    const params = {};
    if (args.ref) params.ref = args.ref;
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/${args.archive_format}/${args.ref || 'main'}`);
}

async function listRepoContributors(token, args) {
    const params = {};
    if (args.anon) params.anon = args.anon;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/contributors`, { method: 'GET' });
}

async function getRepoClones(token, args) {
    const params = {};
    if (args.per) params.per = args.per;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/traffic/clones`, { method: 'GET' });
}

async function getRepoViews(token, args) {
    const params = {};
    if (args.per) params.per = args.per;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/traffic/views`, { method: 'GET' });
}

async function getRepoTopPaths(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/traffic/popular/paths`);
}

async function getRepoTopReferrers(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/traffic/popular/referrers`);
}

async function createTree(token, args) {
    const body = { tree: args.tree };
    if (args.base_tree) body.base_tree = args.base_tree;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/git/trees`, { method: 'POST', body: JSON.stringify(body) });
}

async function getTree(token, args) {
    const params = {};
    if (args.recursive) params.recursive = '1';
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/git/trees/${args.tree_sha}`, { method: 'GET' });
}

async function getBlob(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/git/blobs/${args.file_sha}`);
}

async function createBlob(token, args) {
    const body = { content: args.content };
    if (args.encoding) body.encoding = args.encoding;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/git/blobs`, { method: 'POST', body: JSON.stringify(body) });
}

async function createCommit(token, args) {
    const body = { message: args.message, tree: args.tree };
    if (args.parents) body.parents = args.parents;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/git/commits`, { method: 'POST', body: JSON.stringify(body) });
}

async function getRef(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/git/ref/${args.ref}`);
}

async function listCollaborators(token, args) {
    const params = {};
    if (args.affiliation) params.affiliation = args.affiliation;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/collaborators`, { method: 'GET' });
}

async function checkCollaborator(token, args) {
    try {
      await this.client.get(`/repos/${args.owner}/${args.repo}/collaborators/${args.username}`);
    } catch (error) {
}

async function addCollaborator(token, args) {
    const body = {};
    if (args.permission) body.permission = args.permission;
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/collaborators/${args.username}`, { method: 'PUT', body: JSON.stringify(body) });
}

async function removeCollaborator(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/collaborators/${args.username}`, { method: 'DELETE' });
}

async function getCollaboratorPermission(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/collaborators/${args.username}/permission`);
}

async function listInvitations(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/invitations`, { method: 'GET' });
}

async function updateInvitation(token, args) {
    const body = {};
    if (args.permissions) body.permissions = args.permissions;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/invitations/${args.invitation_id}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteInvitation(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/invitations/${args.invitation_id}`, { method: 'DELETE' });
}

async function listDeployKeys(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/keys`, { method: 'GET' });
}

async function createDeployKey(token, args) {
    const body = { title: args.title, key: args.key };
    if (args.read_only !== undefined) body.read_only = args.read_only;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/keys`, { method: 'POST', body: JSON.stringify(body) });
}

async function listWebhooks(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks`, { method: 'GET' });
}

async function getWebhook(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}`);
}

async function createWebhook(token, args) {
    const body = { config: args.config };
    if (args.name) body.name = args.name;
    if (args.events) body.events = args.events;
    if (args.active !== undefined) body.active = args.active;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks`, { method: 'POST', body: JSON.stringify(body) });
}

async function updateWebhook(token, args) {
    const body = {};
    if (args.config) body.config = args.config;
    if (args.events) body.events = args.events;
    if (args.active !== undefined) body.active = args.active;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteWebhook(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}`, { method: 'DELETE' });
}

async function pingWebhook(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}/pings`, { method: 'POST', body: JSON.stringify({}) });
}

async function testWebhook(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}/tests`, { method: 'POST', body: JSON.stringify({}) });
}

async function listWebhookDeliveries(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/hooks/${args.hook_id}/deliveries`, { method: 'GET' });
}

async function listUserOrgs(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const path = args.username ? `/users/${args.username}/orgs` : '/user/orgs';
    const response = await githubFetch(token, path, { method: 'GET' });
}

async function getOrg(token, args) {
    const response = await this.client.get(`/orgs/${args.org}`);
}

async function updateOrg(token, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.description) body.description = args.description;
    if (args.email) body.email = args.email;
    if (args.location) body.location = args.location;
    const response = await githubFetch(token, `/orgs/${args.org}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function listOrgMembers(token, args) {
    const params = {};
    if (args.filter) params.filter = args.filter;
    if (args.role) params.role = args.role;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/orgs/${args.org}/members`, { method: 'GET' });
}

async function checkOrgMembership(token, args) {
    try {
      await this.client.get(`/orgs/${args.org}/members/${args.username}`);
    } catch (error) {
}

async function removeOrgMember(token, args) {
    await githubFetch(token, `/orgs/${args.org}/members/${args.username}`, { method: 'DELETE' });
}

async function listOrgTeams(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/orgs/${args.org}/teams`, { method: 'GET' });
}

async function getTeam(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/teams/${args.team_slug}`);
}

async function createTeam(token, args) {
    const body = { name: args.name };
    if (args.description) body.description = args.description;
    if (args.privacy) body.privacy = args.privacy;
    const response = await githubFetch(token, `/orgs/${args.org}/teams`, { method: 'POST', body: JSON.stringify(body) });
}

async function updateTeam(token, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.description) body.description = args.description;
    if (args.privacy) body.privacy = args.privacy;
    const response = await githubFetch(token, `/orgs/${args.org}/teams/${args.team_slug}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteTeam(token, args) {
    await githubFetch(token, `/orgs/${args.org}/teams/${args.team_slug}`, { method: 'DELETE' });
}

async function listTeamMembers(token, args) {
    const params = {};
    if (args.role) params.role = args.role;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/orgs/${args.org}/teams/${args.team_slug}/members`, { method: 'GET' });
}

async function searchRepositories(token, args) {
    const params = { q: args.q };
    if (args.sort) params.sort = args.sort;
    if (args.order) params.order = args.order;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/repositories', { method: 'GET' });
}

async function searchCode(token, args) {
    const params = { q: args.q };
    if (args.sort) params.sort = args.sort;
    if (args.order) params.order = args.order;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/code', { method: 'GET' });
}

async function searchIssues(token, args) {
    const params = { q: args.q };
    if (args.sort) params.sort = args.sort;
    if (args.order) params.order = args.order;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/issues', { method: 'GET' });
}

async function searchUsers(token, args) {
    const params = { q: args.q };
    if (args.sort) params.sort = args.sort;
    if (args.order) params.order = args.order;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/users', { method: 'GET' });
}

async function searchCommits(token, args) {
    const params = { q: args.q };
    if (args.sort) params.sort = args.sort;
    if (args.order) params.order = args.order;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/commits', { method: 'GET' });
}

async function searchTopics(token, args) {
    const params = { q: args.q };
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/search/topics', { method: 'GET' });
}

async function getAuthenticatedUser(token, args) {
    const response = await this.client.get('/user');
}

async function getUser(token, args) {
    const response = await this.client.get(`/users/${args.username}`);
}

async function updateAuthenticatedUser(token, args) {
    const body = {};
    if (args.name) body.name = args.name;
    if (args.email) body.email = args.email;
    if (args.blog) body.blog = args.blog;
    if (args.company) body.company = args.company;
    if (args.location) body.location = args.location;
    if (args.bio) body.bio = args.bio;
    const response = await githubFetch(token, '/user', { method: 'PATCH', body: JSON.stringify(body) });
}

async function listUserRepos(token, args) {
    const params = {};
    if (args.type) params.type = args.type;
    if (args.sort) params.sort = args.sort;
    if (args.direction) params.direction = args.direction;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/users/${args.username}/repos`, { method: 'GET' });
}

async function listUserFollowers(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/users/${args.username}/followers`, { method: 'GET' });
}

async function listUserFollowing(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/users/${args.username}/following`, { method: 'GET' });
}

async function checkFollowing(token, args) {
    try {
      await this.client.get(`/users/${args.username}/following/${args.target_user}`);
    } catch (error) {
}

async function listUserGists(token, args) {
    const params = {};
    if (args.since) params.since = args.since;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/users/${args.username}/gists`, { method: 'GET' });
}

async function listGists(token, args) {
    const params = {};
    if (args.since) params.since = args.since;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, '/gists/public', { method: 'GET' });
}

async function getGist(token, args) {
    const response = await this.client.get(`/gists/${args.gist_id}`);
}

async function createGist(token, args) {
    const body = { files: args.files };
    if (args.description) body.description = args.description;
    if (args.public !== undefined) body.public = args.public;
    const response = await githubFetch(token, '/gists', { method: 'POST', body: JSON.stringify(body) });
}

async function updateGist(token, args) {
    const body = {};
    if (args.description) body.description = args.description;
    if (args.files) body.files = args.files;
    const response = await githubFetch(token, `/gists/${args.gist_id}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteGist(token, args) {
    await githubFetch(token, `/gists/${args.gist_id}`, { method: 'DELETE' });
}

async function starGist(token, args) {
    await githubFetch(token, `/gists/${args.gist_id}/star`, { method: 'PUT', body: JSON.stringify({}) });
}

async function unstarGist(token, args) {
    await githubFetch(token, `/gists/${args.gist_id}/star`, { method: 'DELETE' });
}

async function checkGistStar(token, args) {
    try {
      await this.client.get(`/gists/${args.gist_id}/star`);
    } catch (error) {
}

async function forkGist(token, args) {
    const response = await githubFetch(token, `/gists/${args.gist_id}/forks`, { method: 'POST', body: JSON.stringify({}) });
}

async function listGistCommits(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/gists/${args.gist_id}/commits`, { method: 'GET' });
}

async function listMilestones(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    if (args.sort) params.sort = args.sort;
    if (args.direction) params.direction = args.direction;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/milestones`, { method: 'GET' });
}

async function getMilestone(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/milestones/${args.milestone_number}`);
}

async function createMilestone(token, args) {
    const body = { title: args.title };
    if (args.state) body.state = args.state;
    if (args.description) body.description = args.description;
    if (args.due_on) body.due_on = args.due_on;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/milestones`, { method: 'POST', body: JSON.stringify(body) });
}

async function updateMilestone(token, args) {
    const body = {};
    if (args.title) body.title = args.title;
    if (args.state) body.state = args.state;
    if (args.description) body.description = args.description;
    if (args.due_on) body.due_on = args.due_on;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/milestones/${args.milestone_number}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteMilestone(token, args) {
    await githubFetch(token, `/repos/${args.owner}/${args.repo}/milestones/${args.milestone_number}`, { method: 'DELETE' });
}

async function listProjects(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    if (args.per_page) params.per_page = args.per_page;
    if (args.page) params.page = args.page;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/projects`, { method: 'GET' });
}

async function getProject(token, args) {
    const response = await this.client.get(`/projects/${args.project_id}`);
}

async function createProject(token, args) {
    const body = { name: args.name };
    if (args.body) body.body = args.body;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/projects`, { method: 'POST', body: JSON.stringify(body) });
}

async function createRepoSecretHandler(token, args) {
    const response = await this.client.put(`/repos/${args.owner}/${args.repo}/actions/secrets/${args.secret_name}`, {
      encrypted_value: args.encrypted_value
    });
}

async function listPackages(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/packages`, { method: 'GET' });
}

async function getPackage(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/packages/${args.package_type}/${args.package_name}`);
}

async function deletePackage(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/packages/${args.package_type}/${args.package_name}`, { method: 'DELETE' });
}

async function restorePackage(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/packages/${args.package_type}/${args.package_name}/restore`, { method: 'POST', body: JSON.stringify({}) });
}

async function listPackageVersions(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/packages/${args.package_type}/${args.package_name}/versions`);
}

async function getPackageVersion(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/packages/${args.package_type}/${args.package_name}/versions/${args.version_id}`);
}

async function deletePackageVersion(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/packages/${args.package_type}/${args.package_name}/versions/${args.version_id}`, { method: 'DELETE' });
}

async function restorePackageVersion(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/packages/${args.package_type}/${args.package_name}/versions/${args.version_id}/restore`, { method: 'POST', body: JSON.stringify({}) });
}

async function listOrgProjectsV2(token, args) {
    const query = `query { organization(login: "${args.org}") { projectsV2(first: 20) { nodes { id title } } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query }) });
}

async function getProjectV2(token, args) {
    const query = `query { node(id: "${args.project_id}") { ... on ProjectV2 { id title description } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query }) });
}

async function createProjectV2(token, args) {
    const mutation = `mutation { createProjectV2(input: { ownerId: "${args.org}", title: "${args.title}" }) { projectV2 { id title } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query: mutation }) });
}

async function updateProjectV2(token, args) {
    const mutation = `mutation { updateProjectV2(input: { projectId: "${args.project_id}", title: "${args.title || ''}" }) { projectV2 { id title } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query: mutation }) });
}

async function deleteProjectV2(token, args) {
    const mutation = `mutation { deleteProjectV2(input: { projectId: "${args.project_id}" }) { projectV2 { id } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query: mutation }) });
}

async function listProjectItems(token, args) {
    const query = `query { node(id: "${args.project_id}") { ... on ProjectV2 { items(first: 20) { nodes { id } } } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query }) });
}

async function addProjectItem(token, args) {
    const mutation = `mutation { addProjectV2ItemById(input: { projectId: "${args.project_id}", contentId: "${args.content_id}" }) { item { id } } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query: mutation }) });
}

async function removeProjectItem(token, args) {
    const mutation = `mutation { deleteProjectV2Item(input: { projectId: "${args.project_id}", itemId: "${args.item_id}" }) { deletedItemId } }`;
    const response = await githubFetch(token, '/graphql', { method: 'POST', body: JSON.stringify({ query: mutation }) });
}

async function listDiscussions(token, args) {
    const params = {};
    if (args.category) params.category = args.category;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/discussions`, { method: 'GET' });
}

async function getDiscussion(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/discussions/${args.discussion_number}`);
}

async function createDiscussion(token, args) {
    const response = await this.client.post(`/repos/${args.owner}/${args.repo}/discussions`, {
      title: args.title,
      body: args.body,
      category_id: args.category_id
    });
}

async function updateDiscussion(token, args) {
    const body = {};
    if (args.title) body.title = args.title;
    if (args.body) body.body = args.body;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/discussions/${args.discussion_number}`, { method: 'PATCH', body: JSON.stringify(body) });
}

async function deleteDiscussion(token, args) {
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/discussions/${args.discussion_number}`, { method: 'DELETE' });
}

async function listDiscussionComments(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/discussions/${args.discussion_number}/comments`);
}

async function createDiscussionComment(token, args) {
    const response = await this.client.post(`/repos/${args.owner}/${args.repo}/discussions/${args.discussion_number}/comments`, {
      body: args.body
    });
}

async function listDiscussionCategories(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/discussions/categories`);
}

async function listCodespaces(token, args) {
    const params = {};
    if (args.per_page) params.per_page = args.per_page;
    const response = await githubFetch(token, '/user/codespaces', { method: 'GET' });
}

async function getCodespace(token, args) {
    const response = await this.client.get(`/user/codespaces/${args.codespace_name}`);
}

async function createCodespace(token, args) {
    const body = {};
    if (args.ref) body.ref = args.ref;
    if (args.machine) body.machine = args.machine;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/codespaces`, { method: 'POST', body: JSON.stringify(body) });
}

async function startCodespace(token, args) {
    const response = await githubFetch(token, `/user/codespaces/${args.codespace_name}/start`, { method: 'POST', body: JSON.stringify({}) });
}

async function stopCodespace(token, args) {
    const response = await githubFetch(token, `/user/codespaces/${args.codespace_name}/stop`, { method: 'POST', body: JSON.stringify({}) });
}

async function deleteCodespace(token, args) {
    const response = await githubFetch(token, `/user/codespaces/${args.codespace_name}`, { method: 'DELETE' });
}

async function listRepoCodespaces(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/codespaces`);
}

async function getCopilotOrgSettings(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/copilot/billing`);
}

async function listCopilotSeats(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/copilot/billing/seats`);
}

async function addCopilotSeats(token, args) {
    const response = await this.client.post(`/orgs/${args.org}/copilot/billing/selected_users`, {
      selected_usernames: args.selected_usernames
    });
}

async function removeCopilotSeats(token, args) {
    const response = await githubFetch(token, `/orgs/${args.org}/copilot/billing/selected_users`, { method: 'DELETE' });
}

async function getCopilotUsage(token, args) {
    const response = await this.client.get(`/orgs/${args.org}/copilot/usage`);
}

async function listCodeScanningAlerts(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/code-scanning/alerts`, { method: 'GET' });
}

async function getCodeScanningAlert(token, args) {
    const response = await this.client.get(`/repos/${args.owner}/${args.repo}/code-scanning/alerts/${args.alert_number}`);
}

async function updateCodeScanningAlert(token, args) {
    const response = await this.client.patch(`/repos/${args.owner}/${args.repo}/code-scanning/alerts/${args.alert_number}`, {
      state: args.state
    });
}

async function listSecretScanningAlerts(token, args) {
    const params = {};
    if (args.state) params.state = args.state;
    const response = await githubFetch(token, `/repos/${args.owner}/${args.repo}/secret-scanning/alerts`, { method: 'GET' });
}

async function updateSecretScanningAlert(token, args) {
    const response = await this.client.patch(`/repos/${args.owner}/${args.repo}/secret-scanning/alerts/${args.alert_number}`, {
      state: args.state
    });
}

// Router function - maps tool names to methods
async function executeGitHubTool(toolName, args, token) {
  const tools = {
    'github_listRepos': listRepos,
    'github_getRepo': getRepo,
    'github_createRepo': createRepo,
    'github_updateRepo': updateRepo,
    'github_deleteRepo': deleteRepo,
    'github_listRepoTopics': listRepoTopics,
    'github_replaceRepoTopics': replaceRepoTopics,
    'github_listRepoLanguages': listRepoLanguages,
    'github_listRepoTags': listRepoTags,
    'github_listRepoTeams': listRepoTeams,
    'github_transferRepo': transferRepo,
    'github_enableAutomatedSecurityFixes': enableAutomatedSecurityFixes,
    'github_disableAutomatedSecurityFixes': disableAutomatedSecurityFixes,
    'github_enableVulnerabilityAlerts': enableVulnerabilityAlerts,
    'github_disableVulnerabilityAlerts': disableVulnerabilityAlerts,
    'github_getRepoReadme': getRepoReadme,
    'github_getRepoLicense': getRepoLicense,
    'github_getRepoCommunityProfile': getRepoCommunityProfile,
    'github_getRepoStatsContributors': getRepoStatsContributors,
    'github_getRepoStatsCommitActivity': getRepoStatsCommitActivity,
    'github_listBranches': listBranches,
    'github_getBranch': getBranch,
    'github_createBranch': createBranch,
    'github_deleteBranch': deleteBranch,
    'github_mergeBranch': mergeBranch,
    'github_getBranchProtection': getBranchProtection,
    'github_updateBranchProtection': updateBranchProtection,
    'github_deleteBranchProtection': deleteBranchProtection,
    'github_getRequiredStatusChecks': getRequiredStatusChecks,
    'github_updateRequiredStatusChecks': updateRequiredStatusChecks,
    'github_getAdminEnforcement': getAdminEnforcement,
    'github_setAdminEnforcement': setAdminEnforcement,
    'github_getPullRequestReviewEnforcement': getPullRequestReviewEnforcement,
    'github_updatePullRequestReviewEnforcement': updatePullRequestReviewEnforcement,
    'github_renameBranch': renameBranch,
    'github_listCommits': listCommits,
    'github_getCommit': getCommit,
    'github_compareCommits': compareCommits,
    'github_listCommitComments': listCommitComments,
    'github_createCommitComment': createCommitComment,
    'github_getCommitStatus': getCommitStatus,
    'github_listCommitStatuses': listCommitStatuses,
    'github_createCommitStatus': createCommitStatus,
    'github_listPullRequestsAssociatedWithCommit': listPullRequestsAssociatedWithCommit,
    'github_getCommitSignatureVerification': getCommitSignatureVerification,
    'github_listIssues': listIssues,
    'github_getIssue': getIssue,
    'github_createIssue': createIssue,
    'github_updateIssue': updateIssue,
    'github_lockIssue': lockIssue,
    'github_unlockIssue': unlockIssue,
    'github_addAssignees': addAssignees,
    'github_removeAssignees': removeAssignees,
    'github_addLabels': addLabels,
    'github_removeLabel': removeLabel,
    'github_replaceLabels': replaceLabels,
    'github_listIssueComments': listIssueComments,
    'github_createIssueComment': createIssueComment,
    'github_updateIssueComment': updateIssueComment,
    'github_deleteIssueComment': deleteIssueComment,
    'github_listIssueEvents': listIssueEvents,
    'github_listIssueTimeline': listIssueTimeline,
    'github_listLabels': listLabels,
    'github_createLabel': createLabel,
    'github_deleteLabel': deleteLabel,
    'github_listPullRequests': listPullRequests,
    'github_getPullRequest': getPullRequest,
    'github_createPullRequest': createPullRequest,
    'github_updatePullRequest': updatePullRequest,
    'github_mergePullRequest': mergePullRequest,
    'github_getPullRequestMergeStatus': getPullRequestMergeStatus,
    'github_listPullRequestCommits': listPullRequestCommits,
    'github_listPullRequestFiles': listPullRequestFiles,
    'github_listPullRequestReviews': listPullRequestReviews,
    'github_getPullRequestReview': getPullRequestReview,
    'github_createPullRequestReview': createPullRequestReview,
    'github_submitPullRequestReview': submitPullRequestReview,
    'github_dismissPullRequestReview': dismissPullRequestReview,
    'github_listPullRequestReviewComments': listPullRequestReviewComments,
    'github_createPullRequestReviewComment': createPullRequestReviewComment,
    'github_updatePullRequestReviewComment': updatePullRequestReviewComment,
    'github_deletePullRequestReviewComment': deletePullRequestReviewComment,
    'github_requestPullRequestReviewers': requestPullRequestReviewers,
    'github_removePullRequestReviewers': removePullRequestReviewers,
    'github_updatePullRequestBranch': updatePullRequestBranch,
    'github_listRequestedReviewers': listRequestedReviewers,
    'github_checkPullRequestReviewability': checkPullRequestReviewability,
    'github_getPullRequestDiff': getPullRequestDiff,
    'github_getPullRequestPatch': getPullRequestPatch,
    'github_convertIssueToPullRequest': convertIssueToPullRequest,
    'github_listWorkflows': listWorkflows,
    'github_getWorkflow': getWorkflow,
    'github_disableWorkflow': disableWorkflow,
    'github_enableWorkflow': enableWorkflow,
    'github_createWorkflowDispatch': createWorkflowDispatch,
    'github_listWorkflowRuns': listWorkflowRuns,
    'github_getWorkflowRun': getWorkflowRun,
    'github_cancelWorkflowRun': cancelWorkflowRun,
    'github_rerunWorkflow': rerunWorkflow,
    'github_rerunFailedJobs': rerunFailedJobs,
    'github_deleteWorkflowRun': deleteWorkflowRun,
    'github_listWorkflowRunArtifacts': listWorkflowRunArtifacts,
    'github_downloadWorkflowRunLogs': downloadWorkflowRunLogs,
    'github_deleteWorkflowRunLogs': deleteWorkflowRunLogs,
    'github_listWorkflowRunJobs': listWorkflowRunJobs,
    'github_getWorkflowRunJob': getWorkflowRunJob,
    'github_downloadJobLogs': downloadJobLogs,
    'github_listRepoSecrets': listRepoSecrets,
    'github_createOrUpdateRepoSecret': createOrUpdateRepoSecret,
    'github_deleteRepoSecret': deleteRepoSecret,
    'github_listReleases': listReleases,
    'github_getRelease': getRelease,
    'github_getLatestRelease': getLatestRelease,
    'github_getReleaseByTag': getReleaseByTag,
    'github_createRelease': createRelease,
    'github_updateRelease': updateRelease,
    'github_deleteRelease': deleteRelease,
    'github_listReleaseAssets': listReleaseAssets,
    'github_getReleaseAsset': getReleaseAsset,
    'github_updateReleaseAsset': updateReleaseAsset,
    'github_deleteReleaseAsset': deleteReleaseAsset,
    'github_generateReleaseNotes': generateReleaseNotes,
    'github_getContent': getContent,
    'github_createOrUpdateFile': createOrUpdateFile,
    'github_deleteFile': deleteFile,
    'github_getArchive': getArchive,
    'github_listRepoContributors': listRepoContributors,
    'github_getRepoClones': getRepoClones,
    'github_getRepoViews': getRepoViews,
    'github_getRepoTopPaths': getRepoTopPaths,
    'github_getRepoTopReferrers': getRepoTopReferrers,
    'github_createTree': createTree,
    'github_getTree': getTree,
    'github_getBlob': getBlob,
    'github_createBlob': createBlob,
    'github_createCommit': createCommit,
    'github_getRef': getRef,
    'github_listCollaborators': listCollaborators,
    'github_checkCollaborator': checkCollaborator,
    'github_addCollaborator': addCollaborator,
    'github_removeCollaborator': removeCollaborator,
    'github_getCollaboratorPermission': getCollaboratorPermission,
    'github_listInvitations': listInvitations,
    'github_updateInvitation': updateInvitation,
    'github_deleteInvitation': deleteInvitation,
    'github_listDeployKeys': listDeployKeys,
    'github_createDeployKey': createDeployKey,
    'github_listWebhooks': listWebhooks,
    'github_getWebhook': getWebhook,
    'github_createWebhook': createWebhook,
    'github_updateWebhook': updateWebhook,
    'github_deleteWebhook': deleteWebhook,
    'github_pingWebhook': pingWebhook,
    'github_testWebhook': testWebhook,
    'github_listWebhookDeliveries': listWebhookDeliveries,
    'github_listUserOrgs': listUserOrgs,
    'github_getOrg': getOrg,
    'github_updateOrg': updateOrg,
    'github_listOrgMembers': listOrgMembers,
    'github_checkOrgMembership': checkOrgMembership,
    'github_removeOrgMember': removeOrgMember,
    'github_listOrgTeams': listOrgTeams,
    'github_getTeam': getTeam,
    'github_createTeam': createTeam,
    'github_updateTeam': updateTeam,
    'github_deleteTeam': deleteTeam,
    'github_listTeamMembers': listTeamMembers,
    'github_searchRepositories': searchRepositories,
    'github_searchCode': searchCode,
    'github_searchIssues': searchIssues,
    'github_searchUsers': searchUsers,
    'github_searchCommits': searchCommits,
    'github_searchTopics': searchTopics,
    'github_getAuthenticatedUser': getAuthenticatedUser,
    'github_getUser': getUser,
    'github_updateAuthenticatedUser': updateAuthenticatedUser,
    'github_listUserRepos': listUserRepos,
    'github_listUserFollowers': listUserFollowers,
    'github_listUserFollowing': listUserFollowing,
    'github_checkFollowing': checkFollowing,
    'github_listUserGists': listUserGists,
    'github_listGists': listGists,
    'github_getGist': getGist,
    'github_createGist': createGist,
    'github_updateGist': updateGist,
    'github_deleteGist': deleteGist,
    'github_starGist': starGist,
    'github_unstarGist': unstarGist,
    'github_checkGistStar': checkGistStar,
    'github_forkGist': forkGist,
    'github_listGistCommits': listGistCommits,
    'github_listMilestones': listMilestones,
    'github_getMilestone': getMilestone,
    'github_createMilestone': createMilestone,
    'github_updateMilestone': updateMilestone,
    'github_deleteMilestone': deleteMilestone,
    'github_listProjects': listProjects,
    'github_getProject': getProject,
    'github_createProject': createProject,
    'github_createRepoSecretHandler': createRepoSecretHandler,
    'github_listPackages': listPackages,
    'github_getPackage': getPackage,
    'github_deletePackage': deletePackage,
    'github_restorePackage': restorePackage,
    'github_listPackageVersions': listPackageVersions,
    'github_getPackageVersion': getPackageVersion,
    'github_deletePackageVersion': deletePackageVersion,
    'github_restorePackageVersion': restorePackageVersion,
    'github_listOrgProjectsV2': listOrgProjectsV2,
    'github_getProjectV2': getProjectV2,
    'github_createProjectV2': createProjectV2,
    'github_updateProjectV2': updateProjectV2,
    'github_deleteProjectV2': deleteProjectV2,
    'github_listProjectItems': listProjectItems,
    'github_addProjectItem': addProjectItem,
    'github_removeProjectItem': removeProjectItem,
    'github_listDiscussions': listDiscussions,
    'github_getDiscussion': getDiscussion,
    'github_createDiscussion': createDiscussion,
    'github_updateDiscussion': updateDiscussion,
    'github_deleteDiscussion': deleteDiscussion,
    'github_listDiscussionComments': listDiscussionComments,
    'github_createDiscussionComment': createDiscussionComment,
    'github_listDiscussionCategories': listDiscussionCategories,
    'github_listCodespaces': listCodespaces,
    'github_getCodespace': getCodespace,
    'github_createCodespace': createCodespace,
    'github_startCodespace': startCodespace,
    'github_stopCodespace': stopCodespace,
    'github_deleteCodespace': deleteCodespace,
    'github_listRepoCodespaces': listRepoCodespaces,
    'github_getCopilotOrgSettings': getCopilotOrgSettings,
    'github_listCopilotSeats': listCopilotSeats,
    'github_addCopilotSeats': addCopilotSeats,
    'github_removeCopilotSeats': removeCopilotSeats,
    'github_getCopilotUsage': getCopilotUsage,
    'github_listCodeScanningAlerts': listCodeScanningAlerts,
    'github_getCodeScanningAlert': getCodeScanningAlert,
    'github_updateCodeScanningAlert': updateCodeScanningAlert,
    'github_listSecretScanningAlerts': listSecretScanningAlerts,
    'github_updateSecretScanningAlert': updateSecretScanningAlert,
  };

  const handler = tools[toolName];
  if (!handler) {
    throw new Error(`Unknown GitHub tool: ${toolName}`);
  }

  return handler(token, args);
}

module.exports = { executeGitHubTool };