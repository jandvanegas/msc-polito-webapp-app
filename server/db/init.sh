#!/bin/bash

function insert() {
  local database=$1
  local table=$2
  local columns=$3
  local values=$4
  sqlite3 $database "INSERT INTO $table ($columns) VALUES ($values);"
}

function batchInsert() {
  local file=$1
  local category=$2
  while read word; do
    local letter="${word:0:1}"
    local values="'${letter^^}','${word^^}','${category}'"
    insert "db/categories.db" "words" "letter,word,category" "$values"
  done < $file
}

batchInsert "db/animals.txt" "animals"
batchInsert "db/countries.txt" "countries"
batchInsert "db/colors.txt" "colors"
