#!/bin/bash

echo 'CONFIG'

git config user.name "David Bruant (via Travis CI)"
git config user.email "bruant.d+travisci@gmail.com"

echo 'REMOTE 1'

git remote add upstream "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"

echo 'REMOTE 2'

git fetch upstream && git reset upstream/$DEPLOY_TARGET_BRANCH

echo 'ADD'

git add -A .

echo 'COMMIT'

git commit -m "rebuild of repo at commit https://github.com/$TRAVIS_REPO_SLUG/tree/$TRAVIS_COMMIT"

echo 'PUSH'

git push -q upstream HEAD:$DEPLOY_TARGET_BRANCH

echo 'END'
