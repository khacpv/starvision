const passport = require("passport");
const AuthController = require('../controllers/auth_controller');
const CustomerController = require('../controllers/customer_controller');
const UserController = require('../controllers/user_controller');
const CustomerOkController = require('../controllers/customerok_controller')

module.exports = (app) =>{
  app.use('/customer', passport.authenticate('jwt', { session: false }), CustomerController);
  app.use('/user', passport.authenticate('jwt', { session: false }), UserController);
  app.use('/customok', passport.authenticate('jwt', { session: false }), CustomerOkController);
  app.use('/token', AuthController);
  // app.use('/', passport.authenticate('jwt', { session: false }), IndexController);
}