#!/usr/bin/env bash
echo 'Make sure you are running this in the `proxy` directory' &&
rm -rf ./bin &&
mkdir ./bin &&
bun build ./proxy.ts --compile --minify --target=bun-linux-x64-modern --outfile ./bin/linux-x64 &&
chmod +x ./bin/linux-x64 &&
bun build ./proxy.ts --compile --minify --target=bun-linux-x64-baseline --outfile ./bin/linux-x64-compatibility &&
chmod +x ./bin/linux-x64-compatibility &&
bun build ./proxy.ts --compile --minify --target=bun-linux-arm64-modern --outfile ./bin/linux-arm64 &&
chmod +x ./bin/linux-arm64 &&
bun build ./proxy.ts --compile --minify --target=bun-linux-arm64-baseline --outfile ./bin/linux-arm64-compatibility &&
chmod +x ./bin/linux-arm64-compatibility
