#!/usr/bin/env sh

set -e

rm -r -f dist

npm run build 

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:zivtal/interview-challenge-accuweather-api.git master:gh-pages

cd -