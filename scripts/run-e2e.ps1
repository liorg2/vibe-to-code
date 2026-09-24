# Runs the stg purchase test with the browser visible.
#   .\scripts\run-e2e.ps1        headed Chrome, runs straight through
#   .\scripts\run-e2e.ps1 -Ui    Playwright's UI mode: pick, rerun and step through tests
param([switch]$Ui)

Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Test-Path .env.e2e)) {
  Write-Error ".env.e2e is missing - it needs VERCEL_AUTOMATION_BYPASS_SECRET=..."
  exit 1
}

if ($Ui) { npx playwright test --ui } else { npx playwright test --headed }
exit $LASTEXITCODE
