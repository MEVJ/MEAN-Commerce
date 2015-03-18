var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config.js');
module.exports = function (user, res) {

	var payload = {
		sub: user.id,
		exp: moment().add(1, 'days').unix()
	};
	var token = jwt.encode(payload, config.SECRET);

	res.status(200).send({
		user: user.toJSON(),
		token: token

	});

}
