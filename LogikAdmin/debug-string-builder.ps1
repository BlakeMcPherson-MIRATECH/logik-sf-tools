$logikInputs = @"
let ConditionValueA = cfg.standardSelectionAccessoryType;
let ConditionValueB = cfg.standardSelectionInletSize;
"@

$cfg = @{}

foreach ($line in $logikInputs -split "`n") {
    if ($line -match 'cfg\.(\w+);') {
        $key = $matches[1]
        $cfg[$key] = ""
    }
}

$json = @{ "cfg" = $cfg } | ConvertTo-Json -Depth 10

Write-Output $json
$json | Set-Clipboard

Write-Output "JSON also copied to clipboard:"
Write-Output $json

