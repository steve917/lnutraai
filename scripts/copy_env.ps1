Param()
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Copy-Item "$Root/env/api.env.example" "$Root/apps/api/.env" -Force
Copy-Item "$Root/env/web.env.example" "$Root/apps/web/.env.local" -Force
Copy-Item "$Root/env/marketing.env.example" "$Root/apps/marketing/.env.local" -Force
Copy-Item "$Root/env/mobile.env.example" "$Root/apps/mobile/.env" -Force
Write-Host "Copied env examples into app .env files. Edit values as needed."
