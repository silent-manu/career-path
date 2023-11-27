const fs = require("fs");

fs.readFile("./calc.js", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile("./calc2.js", 'console.log("Hello World");', (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

fs.unlink("./calc2.js", (err) => {
  if (err) throw err;
  console.log("The file has been deleted!");
});
