#! /bin/bash
ps aux  |  grep -i aeneas-assembly  |  awk '{print $2}'  |  xargs kill -15

ps aux  |  grep -i Aeneas-assembly  |  awk '{print $2}'  |  xargs kill -15

