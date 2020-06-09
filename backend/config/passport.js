// load up the user model
const config = require('../config/config');
const models = require('../models/index');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = models.Users;

const opts = {};
module.exports = function (passport) {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.app.secret;
  passport.use(
    new JwtStrategy(opts, (async (jwt_payload, done) => {
      // console.log("payload received", jwt_payload.id);
      const user = await User.findByPk(jwt_payload.id);
      console.log(user);
      
      if (user) {
        return done(null, user);
      }     
      return done(null, false);
    })),
  );
};
