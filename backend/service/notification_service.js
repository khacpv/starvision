const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const NotificationTokens = models.NotificationTokens;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;
const admin = require("../config/firebase-notification");

module.exports = async function send_notification(
  sender_id,
  receiver_id,
  title,
  content
) {
  console.log("nguoi nhan: "+ receiver_id);
  console.log("nguoi gui: "+ sender_id);
  console.log("tieu de: "+ title);
  console.log("noi dung: "+ content);
  
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
      if (device_type == "ios") {
        notice = await sendNotificationToDeviceIOS(data, token.token);
      } else {
        notice = await sendNotificationToDeviceAndroid(data, token.token);
      }
    }

    await transaction.commit();
    return true;
  } catch {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return false;
  }
};
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
      return response;
    })
    .catch((error) => {
      //return error
    });
}
