#!/bin/bash
echo 'start release';
git add .
git commit -m "release@ `date "+%y-%m-%d %h:%m:%s"` "
git push origin release
