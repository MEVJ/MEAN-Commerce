var localStratergy = require('passport-local').Strategy;
var User = require('./../models/User.js');

var strategyOptions = {
	usernameField: 'email'
};

exports.login = new localStratergy(strategyOptions,
	function (email, password, done) {
		console.log("inside the login local startegy "+email);
		var searchUser = {
			email: email
		};
		User.findOne(searchUser, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect userId/pwd'
				});

			}
			user.comparePasswords(password, function (err, isMatch) {

				if (err) {
					return done(err);

				}
				if (!user) {
					return done(null, false, {
						message: 'Incorrect userId/pwd'
					});

				}
				if (!isMatch) {

					return done(null, false, {
						message: 'Incorrect userId/pwd'
					});

				}
				return done(null, user);

			});

		});
	});

exports.register = new localStratergy(strategyOptions, function (email, password, done) {
	var searchUser = {
		email: email
	};
	User.findOne(searchUser, function (err, user) {
		
		if (err) {
			return done(err);
		}
		if (user) {
		
			return done(null, false, {
				message: 'Email already exist'
			});

		}


		var newUser = new User({
			email: email,
			password: password

		});
		newUser.save(function (err) {
			done(null, newUser);
		});
	})

});
