
Get-Process | Where-Object { $_.Name -eq "Aeneas Sanctum" } | Select-Object -First 1 | Stop-Process


& {$env:STATICDIR="./client/"; $env:APIADDR="127.0.0.1:9085"; $env:RESTAPIADDR="127.0.0.1:6555"; $env:DATADIR=".blockchain/data2"; $env:LOGDIR=".blockchain/log2"; $env:NETADDR="127.0.0.1:9089"; $env:SECONDPEER="127.0.0.1:9088"; $env:WALLETDIR=".blockchain/wallet2"; $env:PKCS12KEY="./key/server.p12"; $env:WORDSDICT="./words.csv"; java -jar aeneas.jar -Dlogback.configurationFile=logback.xml }

start "http://localhost:9085"



