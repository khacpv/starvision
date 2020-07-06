const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const NotificationTokens = models.NotificationTokens;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;
const admin = require("../config/firebase-notification");
const cron = require("node-cron");
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const Op = require("../config/db").Sequelize.Op;
const CONSTANT = require("../config/constants.json");
const DateUtils = require("./utils_service");

module.exports = async function sendNotificationJob() {
  let now = new Date();

  let orderLense = await OrderLense.findAll({});
  cron.schedule("00 30 9 * * *", function () {
    orderLense.forEach((odl) => {
      let odl_date = new Date(odl.createdAt);
      let day_after = now.getDate() - odl_date.getDate();
      if (day_after == CONSTANT.DAY.ORDERLENSE_NOTIFICATION) {
        send_notification(
          odl.doctor_id,
          odl.doctor_id,
          "Thông báo hệ thống",
          "Hẹn với bệnh nhân ngày " + DateUtils.toDateString(odl.createdAt)
        );
      }
    },{
      scheduled: true,
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  });
};

async function send_notification(sender_id, receiver_id, title, content) {
  try {
    // get transaction
    transaction = await sequelize.transaction();
    let token = await NotificationTokens.findOne({
      where: {
        user_id: sender_id,
      },
    });
    if (token) {
      let result = await Notifications.create({
        title: title,
        content: content,
        sender_id: sender_id,
        receiver_id: receiver_id,
        send_at: new Date(),
      });

      data = {
        notification: {
          title: title,
          body: content,
        },
        user: {
          sender_id: String(sender_id),
          receiver_id: String(receiver_id),
        },
      };
      notice = await sendNotification(data, token.token);
    }

    await transaction.commit();
    return true;
  } catch {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return false;
  }
}

function sendNotification(data, token) {
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
    apns: ios,
    token: token,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      return response;
    })
    .catch((error) => {
      //return error
    });
}
