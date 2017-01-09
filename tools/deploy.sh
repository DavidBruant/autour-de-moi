#!/bin/bash

git init
git config user.name "David Bruant (via Travis CI)"
git config user.email "bruant.d+travisci@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
git fetch upstream && git reset upstream/$DEPLOY_TARGET_BRANCH

touch .

git add -A .
git commit -m "rebuild of repo at commit https://github.com/$TRAVIS_REPO_SLUG/tree/TRAVIS_COMMIT"
git push -q upstream HEAD:$DEPLOY_TARGET_BRANCH
