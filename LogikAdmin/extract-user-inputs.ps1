$JsFileName = "LogikScript.js"
$scriptDir = Get-Location
$jsFilePath = Join-Path $scriptDir $JsFileName
if (-Not (Test-Path $jsFilePath)) {
    Write-Error "File '${JsFileName}' not found in the script directory."
    return
}

$content = Get-Content $jsFilePath -Raw

$regex = [regex]'\bcfg\.\w+'
$matches = $regex.Matches($content)
$cfgVars = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique

if ($cfgVars.Count -eq 0) {
    Write-Output "`nNo cfg.* variables found in '${JsFileName}'."
    return
}

Write-Output "`nFound cfg variables in '${JsFileName}':"
Write-Output "----------------------------------"

foreach ($var in $cfgVars) {
    Write-Output $var
}
Write-Output $cfgVars | Out-GridHtml -Title "cfg Variables" -PassThru
