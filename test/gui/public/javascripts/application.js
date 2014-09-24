(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());

var update = function() {
  GAMEPUT.frameSetup();

  var combs = $("#combinations").val();

  if(combs && GAMEPUT.isPressed(combs)) {
    $("#combinations_pressed").text("Pressed");
  } else {
    $("#combinations_pressed").text("");
  }

  $ud_log = $("#updown_log");
  if(combs && GAMEPUT.getDown(combs)) {
    $ud_log.html($ud_log.html() + "<br />" + "Down: " + combs);
  }
  if(combs && GAMEPUT.getUp(combs)) {
    $ud_log.html($ud_log.html() + "<br />" + "Up: " + combs);
  }

  requestAnimationFrame(update);
};

update();
