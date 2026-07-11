cd E:\solestore
$date = Get-Date -Format "yyyy-MM-dd HH:mm"
Set-Content activity.txt "Last updated: $date"
git add .
git commit -m "Daily commit - $date"
git push
Write-Host "Done! GitHub is green for today!" -ForegroundColor Green
