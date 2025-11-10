# Custom GPT Setup Guide

## Step-by-Step Instructions

### 1. Open Custom GPT Configuration

1. Go to ChatGPT
2. Click on your Custom GPT
3. Click **"Configure"**
4. Scroll down to **"Actions"** section

### 2. Import the Schema

1. Click **"Create new action"**
2. Copy the entire contents of `CUSTOM-GPT-SCHEMA.json`
3. Paste into the schema editor
4. Click **"Save"** (or the schema will auto-save)

### 3. Configure Authentication (CRITICAL!)

**This is where the 403 error comes from - you MUST configure authentication:**

1. Scroll down to the **"Authentication"** section (below the schema editor)
2. Click the dropdown and select **"API Key"**
3. Configure as follows:

   ```
   Authentication Type: API Key
   API Key: moyNducC36LwVGXhrIkY8txfqUOpAgva
   Auth Type: Custom
   Custom Header Name: X-API-Key
   ```

4. Click **"Save"**

### 4. Test the Integration

Try these commands in your Custom GPT:

```
List my Vercel projects
```

```
Show me my GitHub repositories
```

```
Get details for the robinsons-toolkit-api project
```

## Troubleshooting

### Error: 403 Forbidden

**Cause**: API key not configured or incorrect

**Solution**: 
1. Go to Configure → Actions → Authentication
2. Make sure "API Key" is selected
3. Verify the API key is: `moyNducC36LwVGXhrIkY8txfqUOpAgva`
4. Verify "Custom Header Name" is: `X-API-Key`

### Error: 401 Unauthorized

**Cause**: Wrong API key

**Solution**: Double-check the API key matches exactly (no extra spaces)

### Error: ResponseTooLargeError

**Cause**: Response exceeded Custom GPT's size limit

**Solution**: Use pagination parameters:
```
List my Vercel projects with limit 5
```

The API automatically limits responses to 10 items by default, but you can reduce further if needed.

### Error: Tool not found

**Cause**: Using wrong tool name

**Solution**: Use the correct tool names:
- `vercel_list_projects`
- `vercel_get_project`
- `vercel_list_deployments`
- `github_list_repos`
- `github_get_repo`

## Available Tools

### Vercel Tools
- `vercel_list_projects` - List all Vercel projects
  - Optional args: `{ limit: 10 }`
- `vercel_get_project` - Get specific project
  - Required args: `{ projectId: "project-name" }`
- `vercel_list_deployments` - List deployments
  - Optional args: `{ projectId: "project-name", limit: 10 }`

### GitHub Tools
- `github_list_repos` - List repositories
  - Optional args: `{ per_page: 10, page: 1 }`
- `github_get_repo` - Get specific repository
  - Required args: `{ owner: "username", repo: "repo-name" }`

## API Details

- **Base URL**: `https://robinsons-toolkit-2b66om660-chris-projects-de6cd1bf.vercel.app`
- **Authentication**: API Key in `X-API-Key` header
- **API Key**: `moyNducC36LwVGXhrIkY8txfqUOpAgva`
- **Response Size Limit**: 100KB (automatically enforced)
- **Default Pagination**: 10 items per request

## Example Requests

### List Vercel Projects
```json
{
  "tool": "vercel_list_projects",
  "args": {}
}
```

### Get Specific Project
```json
{
  "tool": "vercel_get_project",
  "args": {
    "projectId": "robinsons-toolkit-api"
  }
}
```

### List GitHub Repos
```json
{
  "tool": "github_list_repos",
  "args": {
    "per_page": 5
  }
}
```

## Support

If you continue to have issues:

1. Run the diagnostic endpoint:
   ```bash
   curl -X POST https://robinsons-toolkit-2b66om660-chris-projects-de6cd1bf.vercel.app/api/diagnostic \
     -H "Content-Type: application/json" \
     -H "X-API-Key: moyNducC36LwVGXhrIkY8txfqUOpAgva"
   ```

2. Run the test suite:
   ```bash
   cd "C:\Users\chris\Git Local\robinsons-toolkit-api"
   .\test-custom-gpt.ps1
   ```

3. Check the Vercel logs:
   ```bash
   vercel logs
   ```

