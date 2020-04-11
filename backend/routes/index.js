const passport = require("passport");
const AuthController = require('../controllers/auth_controller');
const CustomerController = require('../controllers/customer_controller');
const UserController = require('../controllers/user_controller');
const CustomerOkController = require('../controllers/customerok_controller')
const FittingController = require('../controllers/fitting_controller')
//__INIT_CONTROLLER__ 
const OrderlenseController = require('../controllers/orderlense_controller') 
const FollowupController = require('../controllers/followup_controller') 


module.exports = (app) =>{
  app.use('/customer', passport.authenticate('jwt', { session: false }), CustomerController);
  app.use('/user', passport.authenticate('jwt', { session: false }), UserController);
  app.use('/customok', passport.authenticate('jwt', { session: false }), CustomerOkController);
  app.use('/fitting', passport.authenticate('jwt', { session: false }), FittingController);
  app.use('/token', AuthController);

  //__GENERATE_ROUTE__ 
app.use('/orderlense', passport.authenticate('jwt', { session: false }), OrderlenseController); 
app.use('/followup', passport.authenticate('jwt', { session: false }), FollowupController); 
}