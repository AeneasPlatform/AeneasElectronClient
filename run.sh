#! /bin/bash
ps aux  |  grep -i aeneas-assembly  |  awk '{print $2}'  |  xargs kill -9
ps aux  |  grep -i Aeneas-assembly  |  awk '{print $2}'  |  xargs kill -9

chmod 755 aeneas-assembly.jar

sleep 10

STATICDIR="./client/" \
APIADDR="127.0.0.1:9085" \
	RESTAPIADDR="127.0.0.1:6555" \
	DATADIR=".blockchain/data2" \
	LOGDIR=".blockchain/log2" \
	NETADDR="127.0.0.1:9089" \
	KNOWNPEER="51.15.226.190:8995" \
	WALLETDIR=".blockchain/wallet2" \
	PKCS12KEY="./key/server.p12" \
	WORDSDICT="./words.csv" \
	java -Xmx1g -Xms256M \
	-Dlogback.configurationFile=logback.xml -jar ./aeneas-assembly.jar &
