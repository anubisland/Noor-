# generate-tafsir-ps.ps1
# Fetches tafsir data from quran-tafseer.com for ibn-kathir, sa3di, and tabari
# Uses PowerShell's Invoke-WebRequest which handles this API reliably

param(
    [int]$TafseerId,
    [string]$SourceId
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

$allEntries = @()
$totalSurahs = 114

for ($surahId = 1; $surahId -le $totalSurahs; $surahId++) {
    $verseCount = $SURAH_COUNTS[$surahId]
    if ($verseCount -eq 0) { continue }

    $url = "http://api.quran-tafseer.com/tafseer/$TafseerId/$surahId/1/$verseCount"
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
        $content = [System.Text.Encoding]::UTF8.GetString($response.Content)
        $data = $content | ConvertFrom-Json
        
        foreach ($entry in $data) {
            $text = $entry.text.Trim()
            if ($text.Length -gt 3) {
                $allEntries += @{
                    surahId = $surahId
                    ayahNumber = $entry.ayah_number
                    text = $text
                }
            }
        }
    } catch {
        # Fallback: per-ayah fetch
        for ($ayahNum = 1; $ayahNum -le $verseCount; $ayahNum++) {
            try {
                $ayahUrl = "http://api.quran-tafseer.com/tafseer/$TafseerId/$surahId/$ayahNum"
                $resp = Invoke-WebRequest -Uri $ayahUrl -UseBasicParsing -TimeoutSec 10
                $c = [System.Text.Encoding]::UTF8.GetString($resp.Content)
                $obj = $c | ConvertFrom-Json
                $text = $obj.text.Trim()
                if ($text.Length -gt 3) {
                    $allEntries += @{
                        surahId = $surahId
                        ayahNumber = $ayahNum
                        text = $text
                    }
                }
            } catch {
                # skip
            }
        }
    }
    
    if ($surahId % 10 -eq 0) {
        Write-Host "  $SourceId surah $surahId/$totalSurahs ($($allEntries.Length) entries)"
    }
}

# Output as JSON
$output = $allEntries | ConvertTo-Json -Depth 3
Write-Host "  $SourceId DONE: $($allEntries.Length) entries"
$output
