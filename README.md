INPUT.js
========

Simple javascript input manager. Listen to key+mouse combinations easily. Now with experimental gamepad support.

Main functions
--------------

* `INPUT.bind(combinations, callback, prevent_repeat)`: binds the given combinations to the callback. **This function does not support gamepads yet**
 * combinations: A group of space-separated combinations. A combination contains one or more keys and mouse buttons identified by their names and separated by plus signs.
 * callback: The function to be called.
 * prevent_repeat: if true, INPUT.js will fire the callback function only once even if the keys remain pressed. *Optional. Default: true*
* `INPUT.isPressed(combinations)`: Returns true if any of the combinations is being pressed at the moment the function is called.
* `INPUT.getGamepads()`: Returns the connected gamepads as an array.
* `INPUT.getAxis(name)`: Returns the state of the named axis, a number between -1.0 and 1.0.

Examples
--------

* Listen to a `shift + J` **or** `control + 9` combination:

`INPUT.bind("shift+j control+9", function(e) { /* Do stuff */ });`

* Listen to a `G + Left mouse button`:

`INPUT.bind("g+mouseleft", function(e) { /* Do other stuff */ });`

* Is a combination pressed at some point?:

`INPUT.isPressed("p+e+altgr+mousecenter");`

* Is the second right button of the third gamepad pressed?:

`INPUT.isPressed("gamepad3/R2")`

* What is the state of the right vertical analogue stick of the first gamepad?

`INPUT.getAxis("gamepad1/rightanaloguevert")`

* Is the button 836 of the first gamepad pressed?

`INPUT.isPressed("gamepad1/button/836")`

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

### Gamepad

The gamepads have an special notation, as there can be more than one gamepad connected. The format is `gamepad_name/button_or_axis_name`

* `gamepad1` `gamepad2` `gamepad3` `gamepad4`... : The gamepad names are just the word _gamepad_ followed by its number
* `1` `2` `3` `4` `L1` `L2` `R1` `R2` `start` `select` `leftanalogue` `rightanalogue` `padup` `paddown` `padleft` `padright`: The buttons of the gamepad. A gamepad might not have some of these buttons, but this list responds to a standard in gamepads. The _analogue_ buttons are analogue sticks pressed.
* `leftanaloguehor` `leftanaloguevert` `rightanaloguehor` `rightanaloguevert`: The standard axes. When asking about an axis with the `INPUT.isPressed` function, if will only return true if the axis is pressed beyond the 0.1 or the -0.1 threshold.

There's another way to ask about the buttons and axes, in case you don't like these names, or if you need more buttons and axes.

* `button/1` `button/2` `button/3` `button/4`... : A button identified by its number.
* `axis/1` `axis/2` `axis/3` `axis/4`... : An axis identified by its number.
