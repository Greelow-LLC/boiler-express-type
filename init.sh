#!/usr/bin/env bash

# replace $1 with $2 in file $3
replace() {
  if [[ $1 != "" && $2 != "" ]]; then
    perl -pi -e "s/$1/$2/" $3
  fi
}

echo "Please, make sure you have SSH key for clonning GitHub repo." 
echo
echo "Ready? Let's get your info:"

echo
echo "Project name?"
read -r name

echo
echo "Project description?"
read -r description

echo
echo "Initializing project..."
echo

echo "Cloning boiler..."
echo
git clone git@github.com:Greelow-LLC/boiler-express-type.git $name
cd $name
echo

echo "Configuring files..."

replace "greelow-boiler" "$name" "./package.json"
replace "A reusable boilerplate with Express - Typescript - typeORM for greelow projects" "$description" "./package.json"

cp ./.env.example ./.env

echo
echo "Installing packages..."

npm install &>/dev/null

echo
echo "Running migrations..."
echo
npm run db:start &>/dev/null
npm run db:drop &>/dev/null
npm run db:generate &>/dev/null
migrations_file=$(find ./src/migrations/ -name 1*-migrations.ts)
SUBSTRING=$(echo $migrations_file | cut -d'-' -f 1)
FILE_NAME=$(echo $SUBSTRING | cut -d'/' -f 4)
replace "migrations$FILE_NAME" "migrations1111111111111" $migrations_file
mv $migrations_file ./src/migrations/1111111111111-migrations.ts
npm run db:up &>/dev/null
npm run db:stop &>/dev/null
echo Migrations generated and seeded! 


echo
echo "Initializing Git..."
echo
rm -rf .git
git init
git add . 
git commit -m 'Project Initialized'  --quiet
git branch -m develop

cd ..

echo
echo "Project Initialized!"
echo
echo "To start your project:"
echo "cd $name"
echo "npm run db:start"
echo "npm run dev"
echo
