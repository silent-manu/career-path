const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "new");

if(!fs.existsSync(dir)){
  fs.mkdir(dir, (err) => {
    if (err) throw err;
    console.log("Folder created");
  });
}

if(fs.existsSync(dir)){
  fs.rmdir(dir, (err) => {
    if (err) throw err;
    console.log("Folder removed");
  });
}