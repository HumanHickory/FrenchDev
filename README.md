# French

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

## Check and Remove Origin

Run `git remote -v

Run `git remote remove origin

## Connect to Proper Origin

Run `git remote add origin https://github.com/HumanHickory/FrenchDev

## Push to Git Repo

Run `git branch -m main


Run `git add .

Run `git commit -m "initial commit"

Run `git push origin HEAD:main

## Build and Deploy

Must be in main directory (not src).

If it's the first time doing so, Run `npm install -g gh-pages

Run `ng build --prod --base-href https://humanhickory.github.io/FrenchDev/french/

Run `gh-pages -d dist

## Authentication Failure
If this fails because of an authentication error, go retreive a gitHub token, then rerun `gh-pages -d dist. It will prompt you for a log in this time.
