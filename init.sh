#!/usr/bin/env bash

# Initialize a new project from the current branch

# replace $1 with $2 in file $3
replace() {
  if [[ $1 != "" && $2 != "" ]]; then
    perl -pi -e "s/$1/$2/" $3
  fi
}

echo "Ready? Let's get your info:"

echo
echo "Project name?"
read -r name

echo
echo "Project description?"
read -r description

echo
echo "Initializing project…"
echo

echo "Cloning boiler..."
git clone git@github.com:Greelow-LLC/boiler-express-type.git $name
cd $name
echo

echo "Configuring files…"

replace "greelow-boiler" "$name" "./package.json"
replace "A reusable boilerplate with Express - Typescript - typeORM for greelow projects", "$description" "./package.json"

cp ./.env.example ./.env

echo
echo "Installing packages"
npm install

echo
echo "Running migrations"
npm run db:drop
npm run db:generate



echo
echo "Initializing Git…"
rm -rf .git
git init
git add . 
git commit -m 'Project Initialized'  --quiet
git branch -m develop

cd ..

echo
echo "🥃 Project Initialized!"
echo
echo "To start your project:"
echo "cd $name"
echo "npm run db:start"
echo "npm run dev"
echo
