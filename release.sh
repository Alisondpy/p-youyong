#!/bin/bash
echo 'start release';
git add .
git commit -m "release@`date "+%y-%m-%d %h:%m:%s"`"
git push origin release
ssh apps:apps@192.168.20.22
cd /apps/data/web/working/s1.zhongzhihui.com/p-youyong
git pull origin release