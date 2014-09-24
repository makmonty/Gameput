
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = express();

// all environments
app.engine('jade', require('jade').__express);
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
