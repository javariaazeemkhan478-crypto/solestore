cd E:\solestore
for ($i = 1; $i -le 10; $i++) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Set-Content activity.txt "Commit $i - $date"
    git add .
    git commit -m "Update $i - $date"
    Start-Sleep -Seconds 1
}
git push
Write-Host "Done! Dark green today!" -ForegroundColor Green
