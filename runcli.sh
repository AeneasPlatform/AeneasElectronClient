#! /bin/bash
ps aux  |  grep -i aeneas-assembly  |  awk '{print $2}'  |  xargs kill -15
ps aux  |  grep -i Aeneas-assembly  |  awk '{print $2}'  |  xargs kill -15

chmod 755 aeneas-assembly.jar

sleep 10

STATICDIR="./client/" \
APIADDR="127.0.0.1:9084" \
	RESTAPIADDR="127.0.0.1:6554" \
	DATADIR=".blockchain/data2" \
	LOGDIR=".blockchain/log2" \
	NETADDR="127.0.0.1:9086" \
	KNOWNPEER="KNOWNPEER=localhost:9088" \
	WALLETDIR=".blockchain/wallet2" \
	PKCS12KEY="./key/server.p12" \
	WORDSDICT="./words.csv" \
SEED=2gdyJ6bFGcYrowUMENotjNwapSpFWiEj1SwXJwF2BwAAYjpgUwXLxHTGeJeN2hs2aQoZDQevhmijvisi2gUC4j5VUw5ArqYvf8HQtUabwibGQYpcrWRHcNULUbEFBK7jULWtVDa2rw4Co4riYJsEMBuetHroTwJhDuHspF9yvWpY39w6UVhYHVFb8KuCzbx78MVNoyURRZqwKQ2y7rAHJao4PBSPgeoREGkXpUaaVz53LTMWSMxS31VYfFEjTuBaoCjJhvmbvxcPdXveK4tskfBR66PDV1sEgSJi17RkiuXHY52EHBQSia2jYfoLrGyYiRMT7HZhVYrSckC4j9869tRtRDH6huL5T\
PWD=123\
	java -Xmx1g -Xms256M \
	-Dlogback.configurationFile=logback.xml -jar ./aeneas-assembly.jar &

