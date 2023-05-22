#!/bin/sh
for dir in packages/*/; do
  package_name=$(basename "${dir}")
  npm publish --access=public --workspace="@bento-editor/${package_name}"
done
