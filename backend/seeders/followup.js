const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);
const models = require("../models/index");
const { mainModule } = require("process");
const FollowUp = models.FollowUp;
const FollowUpCheck = models.FollowUpCheck;

function writeData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/du_bao.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [225];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[10]))) {
        fs.appendFileSync(appDir + "/followup.txt", dubao + "\r\n");
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function leftData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/followup.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [225];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[10]))) {
        // fs.appendFileSync(appDir + "/followup.txt", dubao + "\r\n");
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            if (Number(spl_san_pham[2] == 14)) {
              FollowUp.create({
                note: spl_san_pham[44],
                side: "L",
                bcva_va: spl_san_pham[43],
                image: spl_san_pham[42],
                video: spl_san_pham[45],
                thumb: spl_san_pham[54],
              }).then(function (data) {
                FollowUpCheck.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (followup) {
                  if (followup) {
                    FollowUpCheck.update(
                      {
                        id_left: data.id,
                      },
                      {
                        where: {
                          id: followup.id,
                        },
                      }
                    );
                  } else {
                    FollowUpCheck.create({
                      id: spl[0],
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[27],
                      re_examination_date: null,
                      id_left: data.id,
                      id_right: null,
                      note: spl_san_pham[44],
                      contract_code: dubao[5],
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
    let du_bao = fs.readFileSync(appDir + "/followup.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [225];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[10]))) {
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            if (Number(spl_san_pham[2] == 13)) {
              FollowUp.create({
                note: spl_san_pham[44],
                side: "R",
                bcva_va: spl_san_pham[43],
                image: spl_san_pham[42],
                video: spl_san_pham[45],
                thumb: spl_san_pham[54],
              }).then(function (data) {
                FollowUpCheck.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (followup) {
                  if (followup) {
                    FollowUpCheck.update(
                      {
                        id_right: data.id,
                      },
                      {
                        where: {
                          id: followup.id,
                        },
                      }
                    );
                  } else {
                    FollowUpCheck.create({
                      id: spl[0],
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[27],
                      re_examination_date: null,
                      id_left: left.id,
                      id_right: null,
                      note: spl_san_pham[44],
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
async function fillFullDataRight() {
  FollowUpCheck.findAll({
    where: {
      id_right: null,
    },
  }).then(function (data) {
    if (data) {
      data.forEach((element) => {
        FollowUp.create({
          note: null,
          side: "R",
          bcva_va: null,
          image: null,
          video: null,
          thumb: null,
        }).then(function (followup) {
          FollowUpCheck.update(
            {
              id_right: followup.id,
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
  // await writeData();
  //await leftData();
  //await rightData();
  await fillFullDataRight();
}

main();
