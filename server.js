var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router); //gebruik router
var path = require('path');
app.use(morgan('dev'));
app.use(bodyParser.json()); //parsing 
app.use(bodyParser.urlencoded({ extended: true})); //parsing
//app.use(express.static(__dirname + 'public'));  ///access geven naar een static location
//   (public moet dan ni geschreven worden)

///////////////////MONGODB
mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
	if (err){
		console.log('####################  Not connected to the database' + err + "####################");
	} else{
		console.log('#################### Successfully connected to MongoDB ####################');
	}
});

////////////////////voor de FRONTEND 
app.set('appPath', 'public');
app.use(express.static(__dirname +'/public')); //het schone aan EXPRESS <3
app.route('/*') // <3
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/app/views/index.html'); // <3
  });

//app.get('*', function(req, res){
//	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
//});
//////////////SERVER
app.listen(port, function(){
	console.log('Running the server on port ' + port);
});
