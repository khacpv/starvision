const passport = require("passport");
const AuthController = require("../controllers/auth_controller");
const CustomerController = require("../controllers/customer_controller");
const UserController = require("../controllers/user_controller");
const CustomerOkController = require("../controllers/customerok_controller");
const FittingController = require("../controllers/fitting_controller");
//__INIT_CONTROLLER__
const LensepriceController = require("../controllers/admin/lenseprice_controller");
const DoctorsController = require("../controllers/doctors_controller");
const NotificationsController = require("../controllers/notifications_controller");
const OrderlenseController = require("../controllers/orderlense_controller");
const FollowupController = require("../controllers/followup_controller");
const DeptController = require("../controllers/debt_controller");

const AdminOrderlenseController = require("../controllers/admin/orderlense_controller");

module.exports = (app) => {
  app.use("/customer", CustomerController);
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
    "/doctor",
    passport.authenticate("jwt", { session: false }),
    DoctorsController
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

  // admin
  app.use(
    "/admin/orderlense",
    passport.authenticate("jwt", { session: false }),
    AdminOrderlenseController
  );
  app.use(
    "/admin/lenseprice",
    passport.authenticate("jwt", { session: false }),
    LensepriceController
  );
};
