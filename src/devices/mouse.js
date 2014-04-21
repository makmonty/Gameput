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
