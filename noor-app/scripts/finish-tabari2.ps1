Add-Type -AssemblyName System.Net.Http
$client = New-Object System.Net.WebClient
$TEMP_DIR = "C:\Users\melwa\OneDrive\Documents\GitHub\Noor-\noor-app\data\tafsir\_temp"
$SURAH_COUNTS = @(0,7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,6,6,6,5,6,15,19,11,10,20,7,8,6,5,6,5,3,6,6,5,4,6,6,6)
for ($surahId = 61; $surahId -le 114; $surahId++) {
    $verseCount = $SURAH_COUNTS[$surahId]
    $url = "http://api.quran-tafseer.com/tafseer/8/$surahId/1/$verseCount"
    $outFile = "$TEMP_DIR/tabari-$surahId.json"
    try {
        $client.DownloadFile($url, $outFile)
        if ((Get-Item $outFile).Length -gt 100) {
            Write-Host "tabari $surahId/114 OK"
        } else {
            Write-Host "tabari $surahId/114 TOO SMALL"
        }
    } catch {
        Write-Host "tabari $surahId/114 ERROR: $_"
    }
}
$client.Dispose()
Write-Host "Tabari done!"
