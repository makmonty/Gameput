GAMEPUT.devices.mouse = {};
GAMEPUT.devices.mouse.pressed = {};
GAMEPUT.devices.mouse.frameDown = {};
GAMEPUT.devices.mouse.frameUp = {};
GAMEPUT.devices.mouse.down = {};
GAMEPUT.devices.mouse.up = {};
GAMEPUT.devices.mouse.map = {
		'mouseleft': 1,
		'mousecenter': 2,
		'mouseright': 3,
		'mousecentre': 'mousecenter',
		'click': ['mouseleft', 'mouseright', 'mousecenter']
};

GAMEPUT.devices.mouse.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

GAMEPUT.devices.mouse.getCodes = function(name) {
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
		throw "Mouse button "+name+" unknown";
	}
};

GAMEPUT.devices.mouse.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse.getDown = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.down[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse.getUp = function(name) {
	var codes = this.getCodes(name);
	for(i=0,n=codes.length; i<n; i++) {
		if(this.up[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse._manageMouseDown = function(event) {
	if(!this.pressed[event.which]) {
		this.pressed[event.which] = true;
		this.frameDown[event.which] = true;
	}
};

GAMEPUT.devices.mouse._manageMouseUp = function(event) {
	this.pressed[event.which] = false;
	this.frameUp[event.which] = true;
};

GAMEPUT.devices.mouse.frameSetup = function() {
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


document.addEventListener("mousedown", function(event) {
	GAMEPUT.devices.mouse._manageMouseDown(event || window.event);
});

document.addEventListener("mouseup", function(event) {
	GAMEPUT.devices.mouse._manageMouseUp(event || window.event);
});
