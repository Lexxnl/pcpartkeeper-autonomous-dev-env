# GitHub Repository Setup Script
# Run this after creating a repo on GitHub

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git)"

if ($repoUrl) {
    Write-Host "`nSetting up remote..." -ForegroundColor Yellow
    
    # Add remote
    git remote add origin $repoUrl
    Write-Host "✓ Remote added" -ForegroundColor Green
    
    # Rename branch to main (if needed)
    git branch -M main
    Write-Host "✓ Branch renamed to main" -ForegroundColor Green
    
    # Push to GitHub
    Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Host "`n✓ Repository pushed to GitHub!" -ForegroundColor Green
    Write-Host "`nRepository URL: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host "No URL provided. Exiting." -ForegroundColor Red
}

