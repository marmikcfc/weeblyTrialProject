var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var GOOGLE_APP_ID = "860704949440-1617ctjql9tpt46liq2srfrbvm9vif6g.apps.googleusercontent.com";
var GOOGLE_APP_SECRET = "cc9Nz4Do5L2t9-gOObpuZn-c";

passport.use(new GoogleStrategy({
		clientID: GOOGLE_APP_ID,
		clientSecret: GOOGLE_APP_SECRET,
		callbackURL: "/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					username: profile._json.id, //should change this later
					pictureURL: profile._json.image.url,
					name: profile.displayName,
					provider: profile.provider,
					json_info: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err)
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		})
	}
));
