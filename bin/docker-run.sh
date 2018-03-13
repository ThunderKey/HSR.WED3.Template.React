#!/bin/bash

docker_run() {
  docker run --rm -ti -v "$(pwd):/opt/project" --workdir "/opt/project" --publish 3000:3000 node:9.8-alpine "$@"
}

if [[ "$@" == "" ]]; then
  docker_run npm start
else
  docker_run "$@"
fi
