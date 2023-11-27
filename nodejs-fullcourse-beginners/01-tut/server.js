// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window
console.log("Hello world");
// 3) global object instead of window object
console.log("============================================================");
console.log(global);
// 4) Has Common Core modules to explore
// 5) CommonJS modules instead of ES6 modules
console.log("============================================================");
const os = require("os");
const path = require("path");
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log("============================================================");
const { add, substract, multiply, divide } = require("./math");
console.log("Add:", add(2, 3));
console.log("Substract:", substract(2, 3));
console.log("Multiply:", multiply(2, 3));
console.log("Divide:", divide(2, 3));