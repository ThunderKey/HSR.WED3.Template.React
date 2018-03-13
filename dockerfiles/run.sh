#!/bin/bash

set -e

DIR="$(cd "$(dirname $0)"; pwd)"
ROOT_DIR="$(dirname "$DIR")"

git submodule update --init

if [[ "$@" == "" ]]; then
  docker-compose -f $DIR/docker-compose.yml up
else
  docker-compose -f $DIR/docker-compose.yml run --rm web "$@"
fi
