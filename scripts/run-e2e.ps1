# Runs the stg purchase tests in a visible, maximized Chrome.
#   .\scripts\run-e2e.ps1                       3s before each click or page load, 2s before each form field
#   .\scripts\run-e2e.ps1 -StepMs 0 -FillMs 0   same, at full speed
#   .\scripts\run-e2e.ps1 -Ui                   Playwright's UI mode: pick, rerun and step through tests
param([switch]$Ui, [int]$StepMs = 3000, [int]$FillMs = 2000)

Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Test-Path .env.e2e)) {
  Write-Error ".env.e2e is missing - it needs VERCEL_AUTOMATION_BYPASS_SECRET=..."
  exit 1
}

$env:E2E_STEP_MS = $StepMs
$env:E2E_FILL_MS = $FillMs
if ($Ui) { npx playwright test --ui } else { npx playwright test --headed }
exit $LASTEXITCODE
