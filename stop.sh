#! /bin/bash
ps aux  |  grep -i aeneas  |  awk '{print $2}'  |  xargs kill -15

ps aux  |  grep -i Aeneas  |  awk '{print $2}'  |  xargs kill -15

