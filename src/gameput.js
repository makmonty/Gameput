GAMEPUT = { REVISION:2 };
GAMEPUT.devices = {};
GAMEPUT.pressed_combinations = {};
GAMEPUT.map = {};

GAMEPUT.isPressed = function(combinations) {
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

GAMEPUT.splitCombinations = function(combinations) {
	var combArray = combinations.split(" "), c = [];
	for(var i=0,n=combArray.length; i<n; i++) {
		c.push(this.splitCombination(combArray[i]));
	}
	return c;
};

GAMEPUT.splitCombination = function(combination) {
	return combination.split("+");
};

GAMEPUT.findKeyDevice = function(name) {
	for(var d in this.devices) {
		if(this.devices.hasOwnProperty(d) && this.devices[d].isMine(name))
			return d;
	}
	
	return null;
};

GAMEPUT.getCodes = function(name, device) {
	return this.devices[device].getCodes(name);
};
	
GAMEPUT.bind = function(comb, callback, prevent_repeat) {
	if(typeof prevent_repeat == "undefined")
		prevent_repeat = true;
	
	var fndown = function(e) {
		if(GAMEPUT.isPressed(comb) && (!prevent_repeat || !GAMEPUT.pressed_combinations[comb])) {
			if(prevent_repeat) GAMEPUT.pressed_combinations[comb] = true;
			return callback(e);
		}
	};
	
	document.addEventListener("keydown", fndown);
	document.addEventListener("mousedown", fndown);

	if(prevent_repeat) {
		var fnup = function(e) {
			GAMEPUT.pressed_combinations[comb] = false;
		};
		
		document.addEventListener("keyup", fnup);
		document.addEventListener("mouseup", fnup);
	}
};

GAMEPUT.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

GAMEPUT.isArray = function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};
