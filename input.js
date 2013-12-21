INPUT = {};
INPUT.pressed = {};
INPUT.pressed.combinations = {};
INPUT.pressed.keyboard = {};
INPUT.pressed.mouse = {};

INPUT.GAMEPAD_ANALOGUE_THRESHOLD = 0.5;

INPUT.map = {};
INPUT.map.keyboard = {
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
INPUT.map.mouse = {
		'mouseleft': 1, 'mousecenter': 2, 'mouseright': 3, 'mousecentre': 'mousecenter',
		'click': ['mouseleft', 'mouseright', 'mousecenter']
};
INPUT.map.gamepad = {
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

INPUT.isPressed = function(combinations) {
	var combs = combinations.split(" "),
		c,
		i,n,
		j,m,
		k,o,
		type,
		codes,
		combmatch,
		keymatch,
		gpdesc,
		gptype;
	
	for(i=0,n=combs.length; i<n; i++) {
		c = combs[i].split("+");
		combmatch = true;
		for(j=0,m=c.length; j<m; j++) {
			type = this.findType(c[j]);
			keymatch = false;
			if(type == "mouse" || type == "keyboard") {
				codes = this.getCodes(c[j], type);
				for(k=0,o=codes.length; k<o; k++) {
					if(this.pressed[type][codes[k]]) {
						keymatch = true;
						break;
					}
				}
			} else {
				gpdesc = this.getGamepadButtonDescription(c[j]);
				gptype = (gpdesc.type == "axis")? "axes" : "buttons";
				if(this.getGamepads()[gpdesc.gamepad] && Math.abs(this.getGamepads()[gpdesc.gamepad][gptype][gpdesc.num]) > this.GAMEPAD_ANALOGUE_THRESHOLD) {
					keymatch = true;
				}
			}

			if(!keymatch) {
				combmatch = false;
				break;
			}
		}
		if(combmatch)
			return true;
	}
	return false;
};

INPUT.getAxis = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name);
	if(this.getGamepads()[gpdesc.gamepad])
		return this.getGamepads()[gpdesc.gamepad].axes[gpdesc.num];
	else
		return 0;
};

INPUT.getGamepadButtonDescription = function(name) {
	var gpcode = name.split("/");
	var gpnum = parseInt(gpcode[0].substr(7))-1;
	var gptype, gpbutton;
	if(gpcode.length == 2) {
		gptype = (typeof this.map.gamepad.button[gpcode[1]] != "undefined")? "button" : "axis";
		gpbutton = this.map.gamepad[gptype][gpcode[1]];
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

INPUT.findType = function(name) {
	for(var t in this.map) {
		if(this.map.hasOwnProperty(t) && this.map[t][name])
			return t;
	}
	
	return "gamepad";
};

INPUT.getCodes = function(name, type) {
	var v = this.map[type][name];
	
	if(typeof v != "undefined") {
		if(this.isNumber(v)) {
			return [v];
			
		} else if(typeof v === "string") {
			return this.getCodes(v, type);
			
		} else if(this.isArray(v)) {
			var codes = [];
			for(var i=0; i < v.length; i++) {
				codes = codes.concat(this.getCodes(v[i], type));
			}
			return codes;
		}
	} else {
		throw "Key "+name+" unknown";
	}
	return [];
};

INPUT._manageKeyDown = function(event) {
	this.pressed.keyboard[event.keyCode] = true;
};
INPUT._manageKeyUp = function(event) {
	this.pressed.keyboard[event.keyCode] = false;
};
INPUT._manageMouseDown = function(event) {
	this.pressed.mouse[event.which] = true;
};
INPUT._manageMouseUp = function(event) {
	this.pressed.mouse[event.which] = false;
};
	
INPUT.bind = function(comb, callback, prevent_repeat) {
	if(typeof prevent_repeat == "undefined")
		prevent_repeat = true;
	
	var fndown = function(e) {
		if(INPUT.isPressed(comb) && (!prevent_repeat || !INPUT.pressed.combinations[comb])) {
			if(prevent_repeat) INPUT.pressed.combinations[comb] = true;
			return callback(e);
		}
	};
	
	document.addEventListener("keydown", fndown);
	document.addEventListener("mousedown", fndown);

	if(prevent_repeat) {
		var fnup = function(e) {
			INPUT.pressed.combinations[comb] = false;
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

INPUT.getGamepads = function() {
	return navigator.getGamepads && navigator.getGamepads()
		|| navigator.webkitGetGamepads && navigator.webkitGetGamepads()
		|| navigator.webkitGamepads;
	
};

document.addEventListener("keydown", function(event) {
	INPUT._manageKeyDown(event);
});
document.addEventListener("keyup", function(event) {
	INPUT._manageKeyUp(event);
});
document.addEventListener("mousedown", function(event) {
	INPUT._manageMouseDown(event || window.event);
});
document.addEventListener("mouseup", function(event) {
	INPUT._manageMouseUp(event || window.event);
});
