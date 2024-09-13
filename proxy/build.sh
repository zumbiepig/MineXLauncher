#!/usr/bin/env bash
echo 'Make sure you are running this in the `proxy` directory' &&
rm -r ./bin &&
mkdir ./bin &&
bun build ./proxy.ts --compile --minify --target=bun-linux-x64-modern --outfile ./bin/linux-x64 &&
chmod +x ./bin/linux-x64 &&
bun build ./proxy.ts --compile --minify --target=bun-linux-arm64-modern --outfile ./bin/linux-arm64 &&
chmod +x ./bin/linux-arm64
