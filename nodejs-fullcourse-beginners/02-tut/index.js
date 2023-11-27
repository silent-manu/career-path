const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, "files", "starter.txt"), "utf8");
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

    await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
    await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), '\n\nNice to meet you!');
    await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
    
    const newData = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8");
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

/*fs.readFile(path.join(__dirname, "files", "starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("Hello...");

fs.writeFile(path.join(__dirname, "files", "reply.txt"), "Nice to meet you!", (err) => {
  if (err) throw err;
  console.log("Write complete");

  fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\nYes, it is.", (err2) => {
    if (err2) throw err2;
    console.log("Append complete");

    fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "newReply.txt"), (err3) => {
      if (err3) throw err3;
      console.log("Rename complete");
    });
  });
});*/

//exit on oncaught errors
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
