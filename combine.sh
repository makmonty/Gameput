#!/bin/sh
cat src/gameput.js > build/gameput.js
cat src/devices/* >> build/gameput.js
uglifyjs build/gameput.js -o build/gameput.min.js
