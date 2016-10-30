#!/usr/bin/env bash

read -p "Type the path to the redis configuration file: " REDIS_CONFIG
if [ -z $REDIS_CONFIG ]
then
  echo '>> Starting redis alpine without a configuration file.';
  docker run -p 6379:6379 --name biblicando-redis -d redis:alpine redis-server --appendonly yes
else
  echo ">> Starting redis alpine with configuration file $REDIS_CONFIG."
  docker run -p 6379:6379 -v $REDIS_CONFIG:/usr/local/etc/redis/redis.conf --name biblicando-redis redis:alpine redis-server  --appendonly yes /usr/local/etc/redis/redis.conf
fi