#!/bin/sh
find src/ -name "*.js" -exec cat {} \; > build/input.js
uglifyjs build/input.js -o build/input.min.js
