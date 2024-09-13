#!/usr/bin/env bash
rm -rf ./bin &&
mkdir ./bin &&
bun build ./proxy.ts --compile --minify --target=bun-linux-x64-modern --outfile ./bin/linux-x64 &&
chmod +x ./bin/linux-x64 &&
bun build ./proxy.ts --compile --minify --target=bun-linux-arm64-modern --outfile ./bin/linux-arm64 &&
chmod +x ./bin/linux-arm64 &&
bun build ./proxy.ts --compile --minify --target=bun-windows-x64-modern --outfile ./bin/windows-x64.exe &&
bun build ./proxy.ts --compile --minify --target=bun-darwin-x64-modern --outfile ./bin/macos-x64 &&
chmod +x ./bin/macos-x64 &&
bun build ./proxy.ts --compile --minify --target=bun-darwin-arm64-modern --outfile ./bin/macos-arm64 &&
chmod +x ./bin/macos-arm64
