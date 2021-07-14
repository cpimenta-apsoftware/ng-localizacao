#!/usr/bin/env bash

echo "Copying the lib package.json"
cp projects/ng-localizacao/package.json ./dist/ng-localizacao/

echo "Copying the lib README.md"
cp ./README.md ./dist/ng-localizacao/

echo "Copying the license"
cp ./LICENSE ./dist/ng-localizacao/

echo "Retrieving credentials"
if [ -z "$NODE_AUTH_TOKEN" ]; then
    echo "EMPTY_TOKEN_ERROR"
    exit 1
fi

echo "Publishing the package"
cd ./dist/ng-localizacao/ || exit 1
npm publish
