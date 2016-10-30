#!/usr/bin/env bash

read -p "Type the path to the mongodb configuration file: " MONGO_CONFIG
if [ -z $MONGO_CONFIG ]
then
  echo '>> Starting mongo without a configuration file.';
  docker run -d --name mongodb -p 27017:27017 mvertes/alpine-mongo
else
  echo ">> Starting mongo with configuration file $MONGO_CONFIG."
  docker run -d --name mongodb -p 27017:27017 mvertes/alpine-mongo
fi