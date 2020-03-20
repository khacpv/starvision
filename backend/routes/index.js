const UserController = require('../controllers/user_controller');
const IndexController = require('../controllers/index_controller');
const passport = require("passport");

module.exports = (app) =>{
  app.use('/token', UserController);
  // app.use('/', passport.authenticate('jwt', { session: false }), IndexController);
}