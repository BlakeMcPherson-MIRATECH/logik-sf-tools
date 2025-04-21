$blueprintName = "silencerSizingProgram"

$zipPath = ".\$blueprintName.zip"
$extractPath = ".\Extracted-$blueprintName"
$rulesPath = Join-Path $extractPath "rules"
$outputCsv = "$env:USERPROFILE\Downloads\Maximyzer_JavaScript_LineCounts_$blueprintName.csv"

Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

$results = @()

$jsFiles = Get-ChildItem -Path $rulesPath -Recurse -Filter *.js

foreach ($file in $jsFiles) {
    $lines = Get-Content $file.FullName
    $lineCount = 0

    foreach ($line in $lines) {
        if ($line -match '^\s*return\b') {
            break
        }

        if (-not [string]::IsNullOrWhiteSpace($line)) {
            $lineCount++
        }
    }

    $relativePath = $file.FullName.Substring($rulesPath.Length + 1)

    $parts = $relativePath -split '[\\/]'
    $filename = if ($parts.Count -ge 4) { $parts[3] } else { $parts[-1] }

    if ($filename -ne "condition") {
        $results += [PSCustomObject]@{
            "BlueprintName" = $blueprintName
            "FileName"      = $filename
            "LineCount"     = $lineCount
        }
    }


}
$sortedResults = $results | Sort-Object "LineCount" -Descending
$sortedResults | Out-GridHtml -Title "Maximyzer $blueprintName JavaScript Line Counts"
$sortedResults | Export-Csv -Path $outputCsv -NoTypeInformation
