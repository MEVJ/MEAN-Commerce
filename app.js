var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var createSendToken = require('./api/services/jwt.js');
var googleAuth = require('./api/services/googleAuth.js');
var facebookAuth = require('./api/services/facebookAuth.js');
var localStratergy = require('./api/services/localStrategy.js');
var myBag = require('./api/services/myBag.js');

var app = express();




app.use(bodyParser.json());
app.use(passport.initialize());
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();

});
app.get('/',function(req,res){
res.sendFile(path.join(__dirname+'/index.html'));
//__dirname : It will resolve to your project folder.
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));


var whitelist = ['http://localhost:3000','http://localhost:8000'];
app.use(cors({
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

passport.use('local-register', localStratergy.register);
passport.use('local-login', localStratergy.login);
app.post('/auth/register', passport.authenticate('local-register'), function (req, res) {
	createSendToken(req.user, res);
});
app.post('/auth/login', passport.authenticate('local-login'), function (req, res) {
  console.log("inside server auth/login");
	createSendToken(req.user, res);
});
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);

app.get('/mybag', myBag);

mongoose.connect('mongodb://localhost/MEAN-Commerce');


var server = app.listen(3000, function () {
	console.log('api listening on', server.address().port);

})
