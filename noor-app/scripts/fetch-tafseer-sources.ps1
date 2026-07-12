# fetch-tafseer-sources.ps1
# Downloads raw JSON from api.quran-tafseer.com using curl.exe
# Saves each surah as a separate file for Node.js to combine

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

$TEMP_DIR = Join-Path (Join-Path (Join-Path (Join-Path $PSScriptRoot "..") "data") "tafsir") "_temp"
New-Item -ItemType Directory -Path $TEMP_DIR -Force | Out-Null

$SOURCES = @(
    @{ id = 4; name = "ibn-kathir" }
    @{ id = 3; name = "sa3di" }
    @{ id = 8; name = "tabari" }
)

foreach ($src in $SOURCES) {
    $tafseerId = $src.id
    $sourceName = $src.name
    Write-Host ("Fetching " + $sourceName + " (id=" + $tafseerId + ")...")
    
    for ($surahId = 1; $surahId -le 114; $surahId++) {
        $verseCount = $SURAH_COUNTS[$surahId]
        if ($verseCount -eq 0) { continue }
        
        $url = "http://api.quran-tafseer.com/tafseer/" + $tafseerId + "/" + $surahId + "/1/" + $verseCount
        $outFile = Join-Path $TEMP_DIR ($sourceName + "-" + $surahId + ".json")
        
        try {
            curl.exe -s -o $outFile $url 2>$null
            if ((Get-Item $outFile).Length -gt 100) {
                Write-Host ("  " + $sourceName + " surah " + $surahId + "/114 OK")
            } else {
                Write-Host ("  " + $sourceName + " surah " + $surahId + "/114 TOO SMALL, trying per-ayah...")
                # Fallback to per-ayah
                Remove-Item $outFile -Force -ErrorAction SilentlyContinue
                $allAyahs = @()
                for ($ayahNum = 1; $ayahNum -le $verseCount; $ayahNum++) {
                    $ayahUrl = "http://api.quran-tafseer.com/tafseer/" + $tafseerId + "/" + $surahId + "/" + $ayahNum
                    $ayahFile = Join-Path $TEMP_DIR ("_tmp_" + $sourceName + "-" + $surahId + "-" + $ayahNum + ".json")
                    curl.exe -s -o $ayahFile $ayahUrl 2>$null
                    if ((Get-Item $ayahFile).Length -gt 10) {
                        $ayahJson = [System.IO.File]::ReadAllText($ayahFile, [System.Text.Encoding]::UTF8)
                        $allAyahs += $ayahJson
                    }
                    Remove-Item $ayahFile -Force -ErrorAction SilentlyContinue
                }
                if ($allAyahs.Count -gt 0) {
                    $combined = "[" + ($allAyahs -join ",") + "]"
                    [System.IO.File]::WriteAllText($outFile, $combined, [System.Text.Encoding]::UTF8)
                }
            }
        } catch {
            Write-Host ("  ERROR " + $sourceName + " surah " + $surahId)
        }
        
        if ($surahId % 10 -eq 0) {
            Write-Host ("  " + $sourceName + ": " + $surahId + "/114")
        }
    }
    
    Write-Host ("  " + $sourceName + " DONE")
}

Write-Host "`nAll done!"
