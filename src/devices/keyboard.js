GAMEPUT.devices.keyboard = {};
GAMEPUT.devices.keyboard.pressed = {};
GAMEPUT.devices.keyboard.frameDown = {};
GAMEPUT.devices.keyboard.frameUp = {};
GAMEPUT.devices.keyboard.down = {};
GAMEPUT.devices.keyboard.up = {};
GAMEPUT.devices.keyboard.map = {
		'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'control': 17, 'alt': 18, 'capslock': 20, 'altgr': 225, 'del': 46,
		'pagedown': 33, 'pageup': 34, 'end': 35, 'home': 36,
		'left': 37, 'up': 38, 'right': 39, 'down': 40,
		'boardplus': 187, 'numpadplus': 107, 'plus': ['boardplus', 'numpadplus'],
		'boardhyphen': 189, 'numpadhyphen': 109, 'hyphen': ['boardhyphen', 'numpadhyphen'], 'minus': 'hyphen',
		'space': 32, 'leftwindows': 91, 'rightwindows': 92, 'windows': ['leftwindows', 'rightwindows'],

		'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
		'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
		'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,

		'numpad0': 96, 'numpad1': 97, 'numpad2': 98, 'numpad3': 99, 'numpad4': 100, 'numpad5': 101, 'numpad6': 102, 'numpad7': 103, 'numpad8': 104, 'numpad9': 105,
		'board0': 48, 'board1': 49, 'board2': 50, 'board3': 51, 'board4': 52, 'board5': 53, 'board6': 54, 'board7': 55, 'board8': 56, 'board9': 57,
		'0': ['numpad0','board0'], '1': ['numpad1','board1'], '2': ['numpad2','board2'], '3': ['numpad3','board3'], '4': ['numpad4','board4'],
		'5': ['numpad5','board5'], '6': ['numpad6','board6'], '7': ['numpad7','board7'], '8': ['numpad8','board8'], '9': ['numpad9','board9']
};

GAMEPUT.devices.keyboard.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

GAMEPUT.devices.keyboard.getCodes = function(name) {
	var v = this.map[name];

	if(typeof v != "undefined") {
		if(GAMEPUT.isNumber(v)) {
			return [v];

		} else if(typeof v === "string") {
			return this.getCodes(v);

		} else if(this.isArray(v)) {
			var codes = [];
			for(var i=0; i < v.length; i++) {
				codes = codes.concat(this.getCodes(v[i]));
			}
			return codes;
		}
	} else {
		throw "Key "+name+" unknown";
	}
};

GAMEPUT.devices.keyboard.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.getDown = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.down[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.getUp = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.up[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.frameSetup = function() {
	var i;
	for(i in this.frameDown) {
		if(this.frameDown.hasOwnProperty(i)) {
			this.down[i] = this.frameDown[i];
			this.frameDown[i] = false;
		}
	}
	for(i in this.frameUp) {
		if(this.frameUp.hasOwnProperty(i)) {
			this.up[i] = this.frameUp[i];
			this.frameUp[i] = false;
		}
	}
};

GAMEPUT.devices.keyboard._manageKeyDown = function(event) {
	if(!this.pressed[event.keyCode]) {
		this.pressed[event.keyCode] = true;
		this.frameDown[event.keyCode] = true;
	}
};

GAMEPUT.devices.keyboard._manageKeyUp = function(event) {
	this.pressed[event.keyCode] = false;
	this.frameUp[event.keyCode] = true;
};

document.addEventListener("keydown", function(event) {
	GAMEPUT.devices.keyboard._manageKeyDown(event);
});
document.addEventListener("keyup", function(event) {
	GAMEPUT.devices.keyboard._manageKeyUp(event);
});
