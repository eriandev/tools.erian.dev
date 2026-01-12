#!/usr/bin/env bash

set -e

APPS_DIR="apps"
ROOT_DIST="dist"

for app in "$APPS_DIR"/*; do
  if [ -d "$app/dist" ]; then
    app_name=$(basename "$app")
    echo "➡ Moving $app_name/dist → dist/$app_name"
    mv "$app/dist" "$ROOT_DIST/$app_name"
  fi
done

echo "✅ apps dist merged in /dist"