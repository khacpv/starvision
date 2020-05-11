const express = require("express");
const router = express.Router();
const models = require("../models/index");
const User = models.Doctors;


router.get("/", async (req, res) => {
  let userId = req.query.id;

  let user = await User.findOne({
    where: { 
      user_id: userId
    }
  })

  if (user){
    return res.send({
      status: "success",
      data:[
          {
            Id_Dttc: String(user.dttc_id),
            Id_bacsi: String(user.doctor_id),
            Ten_DTTC: user.dttc_name,
            Tenbacsi: user.name,
            Mabacsi: user.code,
            Diachi: user.address,
            Sodienthoai: user.phone
          }
      ]
    })
  }
  return res.send({
    status: "error",
    data: ''
  })
});

module.exports = router;
