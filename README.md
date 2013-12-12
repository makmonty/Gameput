INPUT.js
========

Simple javascript input manager. Listen to key+mouse combinations easily.

Examples
--------

* Listen to a `shift + J` combination: `INPUT.bind("shift+j", function(e) { /* Do stuff */ });`
* Listen to a `G + Left mouse button`: `INPUT.bind("g+mouseleft", function(e) { /* Do other stuff */ });`
* Is a combination pressed at some point?: `INPUT.isPressed("p+e+altgr+mousecenter");`
