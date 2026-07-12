# download-tafseer-complete.ps1
# Downloads tafsir sources from api.quran-tafseer.com using .NET WebClient
# Uses 50-ayah batch requests to avoid API truncation

param(
    [string]$TempDir
)

$SURAH_COUNTS = @(
    0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
    128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
    34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37,
    35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40,
    31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5,
    4, 6, 6, 6, 5, 6, 15, 19, 11, 10, 20, 7, 8, 6, 5,
    6, 5, 3, 6, 6, 5, 4, 6, 6, 6
)

$BATCH_SIZE = 50

$SOURCES = @(
    @{ id = 4; name = "ibn-kathir" }
    @{ id = 3; name = "sa3di" }
    @{ id = 8; name = "tabari" }
)

$client = New-Object System.Net.WebClient

try {
    foreach ($src in $SOURCES) {
        $tafseerId = $src.id
        $sourceName = $src.name
        Write-Host ("=== " + $sourceName + " (id=" + $tafseerId + ") ===")
        
        for ($surahId = 1; $surahId -le 114; $surahId++) {
            $verseCount = $SURAH_COUNTS[$surahId]
            if ($verseCount -eq 0) { continue }
            
            $allEntries = @()
            $from = 1
            
            while ($from -le $verseCount) {
                $to = [Math]::Min($from + $BATCH_SIZE - 1, $verseCount)
                $url = "http://api.quran-tafseer.com/tafseer/$tafseerId/$surahId/$from/$to"
                
                $tmpFile = [System.IO.Path]::GetTempFileName()
                try {
                    $client.DownloadFile($url, $tmpFile)
                    $content = [System.IO.File]::ReadAllText($tmpFile, [System.Text.Encoding]::UTF8)
                    if ($content.Length -gt 10 -and $content.EndsWith("]")) {
                        $batch = $content | ConvertFrom-Json
                        foreach ($entry in $batch) {
                            $text = $entry.text.Trim()
                            if ($text.Length -gt 3) {
                                $allEntries += @{
                                    surahId = $surahId
                                    ayahNumber = $entry.ayah_number
                                    text = $text
                                }
                            }
                        }
                    }
                } finally {
                    Remove-Item $tmpFile -Force -ErrorAction SilentlyContinue
                }
                $from = $to + 1
            }
            
            # Save this surah's entries
            $outFile = Join-Path $TempDir ($sourceName + "-" + $surahId + ".json")
            if ($allEntries.Count -gt 0) {
                $json = $allEntries | ConvertTo-Json -Depth 3 -Compress
                [System.IO.File]::WriteAllText($outFile, $json, [System.Text.Encoding]::UTF8)
            }
            
            if ($surahId % 10 -eq 0) {
                Write-Host ("  " + $sourceName + ": " + $surahId + "/114 (" + $allEntries.Count + " entries in surah)")
            }
        }
        Write-Host ("  " + $sourceName + " DONE")
    }
} finally {
    $client.Dispose()
}

Write-Host "`nAll sources downloaded successfully!"
