# download-tafseer-simple.ps1
# Downloads tafsir using .NET WebClient with adaptive batch sizes
# Uses large batches (up to 50 ayahs) but falls back to smaller batches if truncated

param([string]$TempDir)

$SURAH_COUNTS = @(0,7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,6,6,6,5,6,15,19,11,10,20,7,8,6,5,6,5,3,6,6,5,4,6,6,6)

$SOURCES = @(@{id=4;name="ibn-kathir"}, @{id=3;name="sa3di"}, @{id=8;name="tabari"})
$client = New-Object System.Net.WebClient

function DownloadRange($tafseerId, $surahId, $from, $to) {
    $url = "http://api.quran-tafseer.com/tafseer/$tafseerId/$surahId/$from/$to"
    $tmp = [System.IO.Path]::GetTempFileName()
    $client.DownloadFile($url, $tmp)
    $content = [System.IO.File]::ReadAllText($tmp, [System.Text.Encoding]::UTF8)
    Remove-Item $tmp -Force
    return $content
}

try {
    foreach ($src in $SOURCES) {
        $tafseerId = $src.id
        $sourceName = $src.name
        Write-Host ("=== " + $sourceName + " ===")
        $totalEntries = 0
        
        for ($surahId = 1; $surahId -le 114; $surahId++) {
            $verseCount = $SURAH_COUNTS[$surahId]
            if ($verseCount -eq 0) { continue }
            
            $allEntries = @()
            $current = 1
            
            while ($current -le $verseCount) {
                $remaining = $verseCount - $current + 1
                $batchSize = if ($remaining -gt 50) { 50 } else { $remaining }
                $to = $current + $batchSize - 1
                
                try {
                    $content = DownloadRange $tafseerId $surahId $current $to
                    
                    if ($content.EndsWith("]") -and $content.Length -gt 10) {
                        # Complete response - parse it
                        $batch = $content | ConvertFrom-Json
                        foreach ($entry in $batch) {
                            $text = $entry.text.Trim()
                            if ($text.Length -gt 3) {
                                $allEntries += @{surahId=$surahId;ayahNumber=$entry.ayah_number;text=$text}
                            }
                        }
                        $current = $to + 1
                    } else {
                        # Truncated - try smaller batch
                        $batchSize = [Math]::Max(1, [Math]::Floor($batchSize / 2))
                        $to = $current + $batchSize - 1
                    }
                } catch {
                    # Error - try single ayah
                    $batchSize = 1
                    $to = $current
                }
            }
            
            # Save surah data
            if ($allEntries.Count -gt 0) {
                $outFile = Join-Path $TempDir ($sourceName + "-" + $surahId + ".json")
                [System.IO.File]::WriteAllText($outFile, ($allEntries | ConvertTo-Json -Depth 3 -Compress), [System.Text.Encoding]::UTF8)
            }
            
            $totalEntries += $allEntries.Count
            if ($surahId % 10 -eq 0) { Write-Host ("  " + $sourceName + " surah $surahId/114") }
        }
        Write-Host ("  " + $sourceName + " DONE: " + $totalEntries + " total entries")
    }
} finally { $client.Dispose() }
Write-Host "`nAll done!"
