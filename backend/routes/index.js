const passport = require("passport");
const AuthController = require("../controllers/auth_controller");
const CustomerController = require("../controllers/customer_controller");
const UserController = require("../controllers/user_controller");
const CustomerOkController = require("../controllers/customerok_controller");
const FittingController = require("../controllers/fitting_controller");
const CongnoController = require("../controllers/congno_controller");
//__INIT_CONTROLLER__
const NotificationsController = require("../controllers/notifications_controller");
const OrderlenseController = require("../controllers/orderlense_controller");
const FollowupController = require("../controllers/followup_controller");
const DeptController = require("../controllers/debt_controller");

module.exports = (app) => {
  app.use(
    "/customer",
    passport.authenticate("jwt", { session: false }),
    CustomerController
  );
  app.use(
    "/user",
    passport.authenticate("jwt", { session: false }),
    UserController
  );
  app.use(
    "/customok",
    passport.authenticate("jwt", { session: false }),
    CustomerOkController
  );
  app.use(
    "/fitting",
    passport.authenticate("jwt", { session: false }),
    FittingController
  );
  app.use("/token", AuthController);
  app.use("/congno", DeptController);

  //__GENERATE_ROUTE__
  app.use(
    "/notifications",
    passport.authenticate("jwt", { session: false }),
    NotificationsController
  );
  app.use(
    "/notifications",
    passport.authenticate("jwt", { session: false }),
    NotificationsController
  );
  app.use(
    "/orderlense",
    passport.authenticate("jwt", { session: false }),
    OrderlenseController
  );
  app.use(
    "/followup",
    passport.authenticate("jwt", { session: false }),
    FollowupController
  );
};
