const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);
const models = require("../models/index");
const { mainModule } = require("process");
const OrderLense = models.OrderLense;
const Lense = models.Lense;

function writeData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/du_bao.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [159, 160];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[9]))) {
        fs.appendFileSync(appDir + "/orderlense.txt", dubao + "\r\n");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function leftData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/orderlense.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [159, 160];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[9]))) {
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            let lense_L = spl_san_pham[2];
            if (spl_san_pham[2] == 1) lense_L = "XMJ";
            else if (spl_san_pham[2] == 2) lense_L = "XM";
            else if (spl_san_pham[2] == 3) lense_L = "H";
            else if (spl_san_pham[2] == 4) lense_L = "HP";
            if (Number(spl[9] == 159)) {
              Lense.create({
                id: spl[0],
                lense: lense_L,
                kcode: spl_san_pham[5],
                power: spl_san_pham[6],
                size: spl_san_pham[7],
                note: spl_san_pham[44],
                side: "L",
                prefix: "",
                price: spl_san_pham[10],
                status: 1,
              }).then(function (data) {
                OrderLense.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (orderlense) {
                  if (orderlense) {
                    OrderLense.update(
                      {
                        id_lense_left: data.id,
                      },
                      {
                        where: {
                          id: orderlense.id,
                        },
                      }
                    );
                  } else {
                    OrderLense.create({
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[31],
                      contract_code: spl[5],
                      type: "GOV",
                      id_lense_left: spl[0],
                      id_lense_right: null,
                      is_active: 1,
                      order_number: spl[22],
                      createdAt: spl[31],
                      updatedAt: spl[31],
                    });
                  }
                });
              });
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}
function rightData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/orderlense.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [159, 160];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[9]))) {
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            let lense_L = spl_san_pham[2];
            if (spl_san_pham[2] == 1) lense_L = "XMJ";
            else if (spl_san_pham[2] == 2) lense_L = "XM";
            else if (spl_san_pham[2] == 3) lense_L = "H";
            else if (spl_san_pham[2] == 4) lense_L = "HP";
            if (Number(spl[9] == 160)) {
              Lense.create({
                id: spl[0],
                lense: lense_L,
                kcode: spl_san_pham[5],
                power: spl_san_pham[6],
                size: spl_san_pham[7],
                note: spl_san_pham[44],
                side: "R",
                prefix: "",
                price: spl_san_pham[10],
                status: 1,
              }).then(function (data) {
                OrderLense.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (orderlense) {
                  if (orderlense) {
                    OrderLense.update(
                      {
                        id_lense_right: data.id,
                      },
                      {
                        where: {
                          id: orderlense.id,
                        },
                      }
                    );
                  } else {
                    OrderLense.create({
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[31],
                      contract_code: spl[5],
                      type: "GOV",
                      id_lense_left: null,
                      id_lense_right: spl[0],
                      is_active: 1,
                      order_number: spl[22],
                    });
                  }
                });
              });
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function fillFullDataLeft() {
  OrderLense.findAll({
    where: {
      id_lense_left: null,
    },
  }).then(function (data) {
    if (data) {
      data.forEach((element) => {
        Lense.create({
          lense: null,
          kcode: null,
          power: null,
          size: null,
          note: null,
          side: "R",
          prefix: "",
          price: null,
          status: 1,
        }).then(function (orderlense) {
          OrderLense.update(
            {
              id_lense_left: orderlense.id,
            },
            {
              where: {
                id: element.id,
              },
            }
          );
        });
      });
    }
  });
}
async function fillFullDataRight() {
  OrderLense.findAll({
    where: {
      id_lense_right: null,
    },
  }).then(function (data) {
    if (data) {
      data.forEach((element) => {
        Lense.create({
          lense: null,
          kcode: null,
          power: null,
          size: null,
          note: null,
          side: "R",
          prefix: "",
          price: null,
          status: 1,
        }).then(function (orderlense) {
          OrderLense.update(
            {
              id_lense_right: orderlense.id,
            },
            {
              where: {
                id: element.id,
              },
            }
          );
        });
      });
    }
  });
}
async function main() {
  //   await writeData();
  //await leftData();
  //await rightData();
  //await fillFullDataLeft();
  await fillFullDataRight();
}

main();
