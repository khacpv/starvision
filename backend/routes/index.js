const UserController = require('../controllers/user_controller');
const IndexController = require('../controllers/index_controller');

module.exports = (app) =>{
  app.use('/user', UserController);
  app.use('/', IndexController);
}