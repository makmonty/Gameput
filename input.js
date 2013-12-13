INPUT = {};
INPUT.pressed_keys = {}; // Keyboard
INPUT.pressed_buttons = {}; // Mouse
	
INPUT.keyboard_map = {
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
INPUT.mouse_map = {
		'mouseleft': 1, 'mousecenter': 2, 'mouseright': 3, 'mousecentre': 'mousecenter',
		'click': ['mouseleft', 'mouseright', 'mousecenter']
};

INPUT.keyIsPressed = function(key_code) {
	return typeof this.pressed_keys[key_code] != "undefined" && this.pressed_keys[key_code];
};
INPUT.buttonIsPressed = function(button_code) {
	return typeof this.pressed_buttons[button_code] != "undefined" && this.pressed_buttons[button_code];
};
INPUT.isPressed = function(combinations) {
	var combs = combinations.split(" "),
		c,
		i,
		j,
		k,
		n,
		m,
		o,
		type,
		codes,
		combmatch,
		keymatch;
	
	for(i=0,n=combs.length; i<n; i++) {
		c = combs[i].split("+");
		combmatch = true;
		for(j=0,m=c.length; j<m; j++) {
			type = (typeof this.mouse_map[c[j]] != "undefined")? "mouse" : "keyboard";
			codes = this.getCodes(c[j], type);
			keymatch = false;
			for(k=0,o=codes.length; k<o; k++) {
				if(type == "mouse" && this.buttonIsPressed(codes[i]) || this.keyIsPressed(codes[k])) {
					keymatch = true;
					break;
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
	
INPUT.getCodes = function(str, type) {
	var v = (type == "mouse")? this.mouse_map[str] : this.keyboard_map[str];
	
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
		throw "Key "+str+" unknown";
	}
	return [];
};

INPUT._manageKeyDown = function(event) {
	this.pressed_keys[event.keyCode] = true;
};
INPUT._manageKeyUp = function(event) {
	this.pressed_keys[event.keyCode] = false;
};
INPUT._manageButtonDown = function(event) {
	this.pressed_buttons[event.which] = true;
};
INPUT._manageButtonUp = function(event) {
	this.pressed_buttons[event.which] = false;
};
	
INPUT.bind = function(comb, callback) {
	var fn = function(e) {
		if(INPUT.isPressed(comb)) {
			return callback(e);
		}
	};

	document.addEventListener("keydown", fn);
	document.addEventListener("mousedown", fn);
};

INPUT.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

INPUT.isArray = function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};


document.addEventListener("keydown", function(event) {
	INPUT._manageKeyDown(event);
});
document.addEventListener("keyup", function(event) {
	INPUT._manageKeyUp(event);
});
document.addEventListener("mousedown", function(event) {
	INPUT._manageButtonDown(event || window.event);
});
document.addEventListener("mouseup", function(event) {
	INPUT._manageButtonUp(event || window.event);
});
