INPUT.js
========

Simple javascript input manager. Listen to key+mouse combinations easily.

Examples
--------

* Listen to a `shift + J` combination:

`INPUT.bind("shift+j", function(e) { /* Do stuff */ });`

* Listen to a `G + Left mouse button`:

`INPUT.bind("g+mouseleft", function(e) { /* Do other stuff */ });`

* Is a combination pressed at some point?:

`INPUT.isPressed("p+e+altgr+mousecenter");`

Supported keys/buttons
----------------------

### Keyboard

* `backspace`
* `tab`
* `enter`
* `shift`
* `control`
* `alt`
* `capslock`
* `altgr`
* `del`
* `pagedown`
* `pageup`
* `end`
* `home`
* `left`
* `up`
* `right`
* `down`
* `boardplus`: The plus sign in the *main keyboard* (not the numeric pad)
* `numpadplus`: The plus sign in the *numeric pad*
* `plus`: Triggers by pressing `boardplus` *or* `numpadplus`.
* `boardhyphen`: Hyphen in the *main keyboard*
* `numpadhyphen`: Hyphen in the *numeric pad*
* `hyphen`: `boardhyphen` or `numpadhyphen`
* `minus`: Same as `hyphen`
* `space`
* `leftwindows`: Left Windows key
* `rightwindows`: Right Windows key
* `windows`: `leftwindows` or `rightwindows`
* `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m` `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
* `numpad0` `numpad1` `numpad2` `numpad3` `numpad4` `numpad5` `numpad6` `numpad7` `numpad8` `numpad9`: Numbers in the *numeric pad*
* `board0` `board1` `board2` `board3` `board4` `board5` `board6` `board7` `board8` `board9`: Numbers in the *main keyboard*
* `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`: Numbers in the *numeric pad* or the *main keyboard*

### Mouse

* `mouseleft`
* `mouseright`
* `mousecenter`
* `mousecentre`: Same as `mousecenter`
* `click`: Any mouse button
