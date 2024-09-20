#!/bin/sh
if [ ! -e "$CLASSES_PATH" ] || [ ! -e "$ASSETS_PATH" ] || [ ! -e "$LANG_PATH" ] || [ -z "$OUTPUT_PATH" ]; then
  echo "Error: Missing required variables.\nYou need: CLASSES_PATH, ASSETS_PATH, OUTPUT_PATH, LANG_PATH"
  exit 1
fi
java -cp "makeOffline.jar" net.lax1dude.eaglercraft.v1_8.buildtools.workspace.MakeOfflineDownload "template.html" "$CLASSES_PATH" "$ASSETS_PATH" "/dev/null" "$OUTPUT_PATH" "$LANG_PATH"
