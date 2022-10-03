replace() {
  if [[ $1 != "" && $2 != "" ]]; then
    perl -pi -e "s/$1/$2/" $3
  fi
}

FILE=$(find ./src/migrations/ -name 1*-migrations.ts)
SUBSTRING=$(echo $FILE | cut -d'-' -f 1)
FILE_NAME=$(echo $SUBSTRING | cut -d'/' -f 4)
echo ${FILE_NAME}
replace "migrations$FILE_NAME" "migrations1111111111111" $FILE
mv $FILE ./src/migrations/1111111111111-migrations.ts
