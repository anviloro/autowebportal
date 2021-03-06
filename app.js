var express = require('express');
var handlers = require('./AppHandlers');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
	res.render('index.html')
});
app.get('/users', user.list);
app.get('/makes/', handlers.listMakes);
app.get('/models/', handlers.listModelsByMake);
app.get('/vehicle/:make/:model',handlers.getVehiclesPerMakeModel);
app.get('/vehicle/price/',handlers.sortedListVehiclePerPrice);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});