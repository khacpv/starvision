const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const NotificationTokens = models.NotificationTokens;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;
var admin = require("firebase-admin");
const Doctors = models.Doctors;

var serviceAccount = require("./../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starvision-e75c5.firebaseio.com",
});
router.post("/token", async (req, res) => {
  let user_id = req.body.user_id;
  let token = req.body.token;

  let checkToken = await NotificationTokens.findOne({
    where: {
      user_id: user_id,
      token: token,
    },
  });
  if (!checkToken) {
    let result = await NotificationTokens.create({
      token: token,
      user_id: user_id,
    });
    if (result) {
      return res.send({
        status: "success",
        message: "Đã thêm mới token",
        data: "",
      });
    }
  } else {
    let result = await NotificationTokens.update(
      {
        token: token,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );
    if (result) {
      return res.send({
        status: "success",
        message: "Đã cập nhật token",
        data: "",
      });
    }
  }

  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.get("/", async (req, res) => {
  let result = await Notifications.findAll({
    attributes: ["id", "title", "content", "send_at", "is_read"],
    order: [["send_at", "DESC"]],
    limit: 50,
    where: {
      receiver_id: req.user.id,
    },
  });
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: result,
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.get("/count_unread", async (req, res) => {
  let result = await Notifications.count({
    where: {
      is_read: 0,
      receiver_id: req.user.id,
    },
  });
  return res.send({
    status: "success",
    message: "",
    data: result,
  });
});

router.post("/read", async (req, res) => {
  let result = await Notifications.update(
    {
      is_read: 1,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: "",
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});
router.post("/read/all", async (req, res) => {
  let result = await Notifications.update(
    {
      is_read: 1,
    },
    {
      where: {
        receiver_id: req.body.user_id ? req.body.user_id : req.user.id,
      },
    }
  );
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: req.body.user_id,
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.post("/", async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({
      status: "error",
      message: errors.array()[0].msg,
      data: "",
    });
  }
  let customerList = req.body.receiver_id.split(",");
  const device_type = req.body.device_type;
  let notice = null;
  try {
    // get transaction
    transaction = await sequelize.transaction();
    customerList.forEach(async (customerId) => {
      let token = await NotificationTokens.findOne({
        where: {
          user_id: customerId,
        },
      });
      if (token) {
        let result = await Notifications.create({
          title: req.body.title,
          content: req.body.content,
          sender_id: req.user.id,
          receiver_id: customerId,
          send_at: new Date(),
        });

        data = {
          notification: {
            title: req.body.title,
            body: req.body.content,
          },
          user: {
            sender_id: String(req.user.id),
            receiver_id: String(customerId),
          },
        };
        if (device_type == "ios") {
          notice = await sendNotificationToDeviceIOS(data, token.token);
        } else {
          notice = await sendNotificationToDeviceAndroid(data, token.token);
        }
      } else {
        return res.send({
          status: "error",
          message:
            "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
          data: "",
        });
      }
    });
    await transaction.commit();
  } catch {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }
  return res.send({
    status: "success",
    data: "",
  });
});
router.get("/admin", async (req, res) => {
  let result = await Notifications.findAll({
    include: [
      {
        model: Doctors,
        as: "user",
        attributes: [
          "id",
          "name",
          "dttc_name",
          "username",
          "department_name",
          "dttc_name",
        ],
      },
    ],
    attributes: ["id", "title", "content", "send_at", "is_read"],
    order: [["send_at", "DESC"]],
    limit: 100,
    where: {
      sender_id: req.user.id,
    },
  });
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: result,
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

function sendNotificationToDeviceIOS(data, token) {
  let ios = {
    headers: {
      "apns-priority": "10", //mức độ ưu tiên khi push notification
      "apns-expiration": "360000", // hết hạn trong 1h
    },
    payload: {
      aps: {
        badge: 1,
        sound: "default",
      },
    },
  };
  let message = {
    notification: data.notification,
    data: data.user,
    apns: ios,
    token: token, // token của thiết bị muốn push notification
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("ios");
      console.log(response);
      // Response is a message ID string.
    })
    .catch((error) => {
      //return error
    });
}
function sendNotificationToDeviceAndroid(data, token) {
  var message = {
    notification: data.notification,
    data: data.user,
    android: {
      ttl: 3600 * 1000,
      notification: {
        icon: "stock_ticker_update",
        color: "#f45342",
      },
    },
    token: token,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("android");
      console.log(response);
      return response;
    })
    .catch((error) => {
      //return error
    });
}

module.exports = router;
