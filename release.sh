#!/bin/bash
echo 'start copy dist'
cp -r /app/data/www/working/s1.zzhstatic.com/p-youyong/dist /app/data/www/working/s1.zzhstatic.com-release/p-youyong/ 
echo 'start release';
git add .
git commit -m "release@`date "+%y-%m-%d %h:%m:%s"`"
git push origin release
echo 'done'
#ssh apps@192.168.20.22
#cd /apps/data/web/working/s1.zhongzhihui.com/p-youyong
#git pull origin release