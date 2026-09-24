# Runs the stg purchase tests with the browser visible.
#   .\scripts\run-e2e.ps1              headed Chrome, 5s pause before each browser action
#   .\scripts\run-e2e.ps1 -StepMs 0    same, at full speed
#   .\scripts\run-e2e.ps1 -Ui          Playwright's UI mode: pick, rerun and step through tests
param([switch]$Ui, [int]$StepMs = 5000)

Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Test-Path .env.e2e)) {
  Write-Error ".env.e2e is missing - it needs VERCEL_AUTOMATION_BYPASS_SECRET=..."
  exit 1
}

$env:E2E_STEP_MS = $StepMs
if ($Ui) { npx playwright test --ui } else { npx playwright test --headed }
exit $LASTEXITCODE
