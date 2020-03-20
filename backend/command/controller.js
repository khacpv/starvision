const fs = require("fs");
var filesfiles = fs.readdirSync("../models/");
const path = require("path");

var arrayModel = [];
const modelName = process.argv[2];

readFile = function() {
  fs.readFile("controller_template/template.txt", "utf8", async (err, data) => {
    if (err) throw err;

    var result = data.replace(/MODEL_SAMPLE/g, modelName);

    writeFile(result);
  });
};

writeFile = function(data) {
  fs.writeFile("../controllers/"+ modelName.toLocaleLowerCase() + "_controller.js", data, err => {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};
// readFile();

getListModel = () => {
  filesfiles.forEach(item => {
    let name = path.parse(item).name;
    let ext = path.parse(item).ext;
    if (ext == ".js") {
      arrayModel.push(name);
    }
  });
};

main = () => {
  getListModel();

  if (arrayModel.includes(modelName.toLocaleLowerCase())) {
    readFile();
    console.log("Proccessed");
  } else {
    console.log("Model not existed");
  }
};
main();
