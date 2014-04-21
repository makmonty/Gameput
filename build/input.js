INPUT = {};
INPUT.devices = {};
INPUT.pressed_combinations = {};
INPUT.map = {};

INPUT.isPressed = function(combinations) {
	var combs = this.splitCombinations(combinations),
		c,
		i,n,
		j,m,
		device,
		combmatch;
	
	for(i=0,n=combs.length; i<n; i++) {
		combmatch = true;
		for(j=0,m=combs[i].length; j<m; j++) {
			c = combs[i][j];
			device = this.findKeyDevice(c);

			if(!this.devices[device].isPressed(c)) {
				combmatch = false;
				break;
			}
		}
		if(combmatch)
			return true;
	}
	return false;
};

INPUT.splitCombinations = function(combinations) {
	var combArray = combinations.split(" "), c = [];
	for(var i=0,n=combArray.length; i<n; i++) {
		c.push(this.splitCombination(combArray[i]));
	}
	return c;
};

INPUT.splitCombination = function(combination) {
	return combination.split("+");
};

INPUT.findKeyDevice = function(name) {
	for(var d in this.devices) {
		if(this.devices.hasOwnProperty(d) && this.devices[d].isMine(name))
			return d;
	}
	
	return null;
};

INPUT.getCodes = function(name, device) {
	return this.devices[device].getCodes(name);
};
	
INPUT.bind = function(comb, callback, prevent_repeat) {
	if(typeof prevent_repeat == "undefined")
		prevent_repeat = true;
	
	var fndown = function(e) {
		if(INPUT.isPressed(comb) && (!prevent_repeat || !INPUT.pressed_combinations[comb])) {
			if(prevent_repeat) INPUT.pressed_combinations[comb] = true;
			return callback(e);
		}
	};
	
	document.addEventListener("keydown", fndown);
	document.addEventListener("mousedown", fndown);

	if(prevent_repeat) {
		var fnup = function(e) {
			INPUT.pressed_combinations[comb] = false;
		};
		
		document.addEventListener("keyup", fnup);
		document.addEventListener("mouseup", fnup);
	}
};

INPUT.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

INPUT.isArray = function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};
INPUT.devices.keyboard = {};
INPUT.devices.keyboard.pressed = {};
INPUT.devices.keyboard.map = {
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

INPUT.devices.keyboard.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

INPUT.devices.keyboard.getCodes = function(name) {
	var v = this.map[name];
	
	if(typeof v != "undefined") {
		if(INPUT.isNumber(v)) {
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

INPUT.devices.keyboard.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

INPUT.devices.keyboard._manageKeyDown = function(event) {
	this.pressed[event.keyCode] = true;
};

INPUT.devices.keyboard._manageKeyUp = function(event) {
	this.pressed[event.keyCode] = false;
};

document.addEventListener("keydown", function(event) {
	INPUT.devices.keyboard._manageKeyDown(event);
});
document.addEventListener("keyup", function(event) {
	INPUT.devices.keyboard._manageKeyUp(event);
});
INPUT.devices.gamepad = {};

INPUT.devices.gamepad.GAMEPAD_ANALOGUE_THRESHOLD = 0.5;

INPUT.devices.gamepad.map = {
		button: {
			'1': 0,
			'2': 1,
			'3': 2,
			'4': 3,
			'L1': 4,
			'R1': 5,
			'L2': 6,
			'R2': 7,
			'select': 8,
			'start': 9,
			'leftanalogue': 10,
			'rightanalogue': 11,
			'padup': 12,
			'paddown': 13,
			'padleft': 14,
			'padright': 15
		},
		axis: {
			'leftanaloguehor': 0,
			'leftanaloguevert': 1,
			'rightanaloguehor': 2,
			'rightanaloguevert': 3
		}
};

INPUT.devices.gamepad.isMine = function(name) {
	return name.substr(0,7) == "gamepad";
};

INPUT.devices.gamepad.getCodes = function(name) {};

INPUT.devices.gamepad.isPressed = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name),
		gptype = (gpdesc.type == "axis")? "axes" : "buttons",
		gamepads = this.getGamepads();
	return gamepads[gpdesc.gamepad] && Math.abs(gamepads[gpdesc.gamepad][gptype][gpdesc.num]) > this.GAMEPAD_ANALOGUE_THRESHOLD;
};

INPUT.devices.gamepad.getGamepads = function() {
	return navigator.getGamepads && navigator.getGamepads()
		|| navigator.webkitGetGamepads && navigator.webkitGetGamepads()
		|| navigator.webkitGamepads;
	
};

INPUT.devices.gamepad.getAxis = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name);
	if(this.getGamepads()[gpdesc.gamepad])
		return this.getGamepads()[gpdesc.gamepad].axes[gpdesc.num];
	else
		return 0;
};

INPUT.devices.gamepad.getGamepadButtonDescription = function(name) {
	var gpcode = name.split("/");
	var gpnum = parseInt(gpcode[0].substr(7))-1;
	var gptype, gpbutton;
	if(gpcode.length == 2) {
		gptype = (typeof this.map.button[gpcode[1]] != "undefined")? "button" : "axis";
		gpbutton = this.map[gptype][gpcode[1]];
	} else {
		gptype = gpcode[1];
		gpbutton = parseInt(gpcode[2])-1;
	}
	
	return {
		gamepad: gpnum,
		type: gptype,
		num: gpbutton
	};
};
INPUT.devices.mouse = {};
INPUT.devices.mouse.pressed = {};
INPUT.devices.mouse.map = {
		'mouseleft': 1,
		'mousecenter': 2,
		'mouseright': 3,
		'mousecentre': 'mousecenter',
		'click': ['mouseleft', 'mouseright', 'mousecenter']
};

INPUT.devices.mouse.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

INPUT.devices.mouse.getCodes = function(name) {
	var v = this.map[name];
	
	if(typeof v != "undefined") {
		if(INPUT.isNumber(v)) {
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
		throw "Mouse button "+name+" unknown";
	}
};

INPUT.devices.mouse.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

INPUT.devices.mouse._manageMouseDown = function(event) {
	this.pressed[event.which] = true;
};

INPUT.devices.mouse._manageMouseUp = function(event) {
	this.pressed[event.which] = false;
};

document.addEventListener("mousedown", function(event) {
	INPUT.devices.mouse._manageMouseDown(event || window.event);
});

document.addEventListener("mouseup", function(event) {
	INPUT.devices.mouse._manageMouseUp(event || window.event);
});