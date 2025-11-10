$baseUrl = "https://robinsons-toolkit-2b66om660-chris-projects-de6cd1bf.vercel.app"
$apiKey = "moyNducC36LwVGXhrIkY8txfqUOpAgva"

Write-Host "=== COMPREHENSIVE API TESTING ===" -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl`n" -ForegroundColor Gray

# Test 1: Health Check
Write-Host "1. Testing /api/test (health check)..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/test" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    }
    Write-Host "  ✓ PASS - Node: $($response.environment.nodeVersion), Fetch: $($response.environment.hasFetch)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Vercel List Projects
Write-Host "`n2. Testing vercel_list_projects..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "vercel_list_projects"
        args = @{}
    } | ConvertTo-Json)
    Write-Host "  ✓ PASS - Found $($response.result.projects.Count) projects" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Vercel Get Project
Write-Host "`n3. Testing vercel_get_project..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "vercel_get_project"
        args = @{
            projectId = "robinsons-toolkit-api"
        }
    } | ConvertTo-Json)
    Write-Host "  ✓ PASS - Project: $($response.result.name)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Vercel List Deployments
Write-Host "`n4. Testing vercel_list_deployments..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "vercel_list_deployments"
        args = @{
            projectId = "robinsons-toolkit-api"
        }
    } | ConvertTo-Json)
    Write-Host "  ✓ PASS - Found $($response.result.deployments.Count) deployments" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: GitHub List Repos
Write-Host "`n5. Testing github_list_repos..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "github_list_repos"
        args = @{}
    } | ConvertTo-Json)
    Write-Host "  ✓ PASS - Found $($response.result.Count) repos" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: GitHub Get Repo
Write-Host "`n6. Testing github_get_repo..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "github_get_repo"
        args = @{
            owner = "christcr2012"
            repo = "robinsons-toolkit-api"
        }
    } | ConvertTo-Json)
    Write-Host "  ✓ PASS - Repo: $($response.result.full_name)" -ForegroundColor Green
} catch {
    Write-Host "  ✗ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Invalid Tool
Write-Host "`n7. Testing error handling (invalid tool)..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        tool = "nonexistent_tool"
        args = @{}
    } | ConvertTo-Json)
    Write-Host "  ✗ FAIL - Should have returned error" -ForegroundColor Red
} catch {
    Write-Host "  ✓ PASS - Correctly returned error" -ForegroundColor Green
}

# Test 8: Missing Tool Parameter
Write-Host "`n8. Testing error handling (missing tool)..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = $apiKey
    } -Body (@{
        args = @{}
    } | ConvertTo-Json)
    Write-Host "  ✗ FAIL - Should have returned error" -ForegroundColor Red
} catch {
    Write-Host "  ✓ PASS - Correctly returned error" -ForegroundColor Green
}

# Test 9: Invalid API Key
Write-Host "`n9. Testing authentication (invalid API key)..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" -Method POST -Headers @{
        "Content-Type" = "application/json"
        "X-API-Key" = "invalid_key_12345"
    } -Body (@{
        tool = "vercel_list_projects"
        args = @{}
    } | ConvertTo-Json)
    Write-Host "  ✗ FAIL - Should have rejected invalid key" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "  ✓ PASS - Correctly rejected invalid key (401 Unauthorized)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ FAIL - Wrong error code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

Write-Host "`n=== TESTING COMPLETE ===" -ForegroundColor Cyan

