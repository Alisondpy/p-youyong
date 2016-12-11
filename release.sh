#!/bin/bash
echo 'start release';
git add .
git commit -m 'release@$(date +%Y-%m-%d +%H:%M:%S)'
git push origin release
