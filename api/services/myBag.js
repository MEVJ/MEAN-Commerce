var jwt = require('jwt-simple');
var config = require('./config.js');

module.exports = function (req, res) {

	if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not Authorized'
		});
	}
	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, config.SECRET);

	if (!payload.sub) {
		return res.status(401).send({
			message: 'Authentication failed'
		});
	}

	res.json(mybag);

}

var mybag = [
    'Engineer',
    'Doctor',
    'Lawyer',
    'SuperHero'
];
