# Test Custom GPT Integration
$baseUrl = "https://robinsons-toolkit-2b66om660-chris-projects-de6cd1bf.vercel.app"
$apiKey = "moyNducC36LwVGXhrIkY8txfqUOpAgva"

Write-Host "=== CUSTOM GPT INTEGRATION TEST ===" -ForegroundColor Cyan
Write-Host "Simulating how Custom GPT calls the API`n" -ForegroundColor Gray

# Test 1: List Vercel projects (most common use case)
Write-Host "1. List Vercel projects..." -ForegroundColor Yellow
try {
    $body = @{
        tool = "vercel_list_projects"
        args = @{}
    } | ConvertTo-Json -Compress
    
    Write-Host "   Request: $body" -ForegroundColor Gray
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✓ Success" -ForegroundColor Green
    Write-Host "   Projects: $($response.result.projects.Count)" -ForegroundColor Gray
    Write-Host "   Response size: $([math]::Round(($response | ConvertTo-Json -Depth 10).Length / 1KB, 2)) KB" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

# Test 2: List with limit parameter
Write-Host "`n2. List Vercel projects with limit..." -ForegroundColor Yellow
try {
    $body = @{
        tool = "vercel_list_projects"
        args = @{
            limit = 5
        }
    } | ConvertTo-Json -Compress
    
    Write-Host "   Request: $body" -ForegroundColor Gray
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✓ Success" -ForegroundColor Green
    Write-Host "   Projects: $($response.result.projects.Count)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Get specific project
Write-Host "`n3. Get specific project..." -ForegroundColor Yellow
try {
    $body = @{
        tool = "vercel_get_project"
        args = @{
            projectId = "robinsons-toolkit-api"
        }
    } | ConvertTo-Json -Compress
    
    Write-Host "   Request: $body" -ForegroundColor Gray
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✓ Success" -ForegroundColor Green
    Write-Host "   Project: $($response.result.name)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: List GitHub repos
Write-Host "`n4. List GitHub repos..." -ForegroundColor Yellow
try {
    $body = @{
        tool = "github_list_repos"
        args = @{}
    } | ConvertTo-Json -Compress
    
    Write-Host "   Request: $body" -ForegroundColor Gray
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✓ Success" -ForegroundColor Green
    Write-Host "   Repos: $($response.result.Count)" -ForegroundColor Gray
    Write-Host "   Response size: $([math]::Round(($response | ConvertTo-Json -Depth 10).Length / 1KB, 2)) KB" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Invalid tool (error handling)
Write-Host "`n5. Test error handling (invalid tool)..." -ForegroundColor Yellow
try {
    $body = @{
        tool = "invalid_tool_name"
        args = @{}
    } | ConvertTo-Json -Compress
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✗ Should have failed but didn't" -ForegroundColor Red
} catch {
    Write-Host "   ✓ Correctly returned error" -ForegroundColor Green
    Write-Host "   Error: $($_.ErrorDetails.Message)" -ForegroundColor Gray
}

# Test 6: Missing required parameter
Write-Host "`n6. Test error handling (missing tool parameter)..." -ForegroundColor Yellow
try {
    $body = @{
        args = @{}
    } | ConvertTo-Json -Compress
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/execute" `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
            "X-API-Key" = $apiKey
        } `
        -Body $body
    
    Write-Host "   ✗ Should have failed but didn't" -ForegroundColor Red
} catch {
    Write-Host "   ✓ Correctly returned error" -ForegroundColor Green
    Write-Host "   Error: $($_.ErrorDetails.Message)" -ForegroundColor Gray
}

Write-Host "`n=== TEST COMPLETE ===" -ForegroundColor Cyan
Write-Host "If all tests passed, the API is working correctly." -ForegroundColor Gray
Write-Host "If Custom GPT is still having issues, please share the exact error message." -ForegroundColor Yellow

