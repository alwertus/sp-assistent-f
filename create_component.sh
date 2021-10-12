#!/bin/bash
clear
srcPath="$PWD/template"


# CHECK PARAM
if [ -n "$1" ]; then
  component=$1
else
  echo "PARAM 'component_name' NOT EXISTS"
  return 1
fi

targetPath="$PWD/$component"

# CHECK TARGET DIR EXISTS
if [ -d "$targetPath" ]; then
  echo "Каталог $targetPath уже существует"
  return 1
fi

# CREATE TARGET DIR
mkdir "$targetPath"

# COPY FILES
cp "$srcPath"/* "$targetPath"/

# RENAME TO 'COMPONENT NAME'
for i in "$targetPath"/*;
do mv "$i" "$targetPath"/"$component"`basename $i`;
done

# REPLACE Tmpl to $component
sed "s/Tmpl/$component/" -i "$targetPath"/*