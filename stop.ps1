Get-Process -Name "Aeneas Sanctum" | where { $_.Id -ne $PID } | Stop-Process