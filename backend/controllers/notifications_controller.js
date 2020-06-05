const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;
var admin = require("firebase-admin");

var serviceAccount = require("./../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starvision-e75c5.firebaseio.com",
});

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

router.get("/", async (req, res) => {
  let result = await Notifications.findAll({
    attributes: ["id", "title", "content", "send_at", "is_read"],
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
  const registrationToken = req.body.registrationToken;

  // try {
  //   // get transaction
  //   transaction = await sequelize.transaction();
  customerList.forEach(async (customerId) => {
    let result = await Notifications.create({
      title: req.body.title,
      content: req.body.content,
      sender_id: req.user.id,
      receiver_id: customerId,
      send_at: new Date(),
    });
  });
  //  await transaction.commit();

  var payload = {
    notification: {
      title: req.body.title,
      body: req.body.content,
    },
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  let notice = await admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      console.log("Successfully sent message:", response);
      console.log(response.results[0].error);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });

  return res.send({
    status: "success",
    message:notice,
    data: "",
  });

  // commit
  // } catch (err) {
  //   // Rollback transaction only if the transaction object is defined
  //   if (transaction) await transaction.rollback();

  //   return res.send({
  //     status: "error",
  //     message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
  //     data: "",
  //   });
  // }

  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

module.exports = router;
