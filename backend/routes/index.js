const UserController = require('../controllers/auth_controller');
const CustomerController = require('../controllers/customer_controller');
const passport = require("passport");

module.exports = (app) =>{
  app.use('/customer', passport.authenticate('jwt', { session: false }), CustomerController);
  app.use('/token', UserController);
  // app.use('/', passport.authenticate('jwt', { session: false }), IndexController);
}